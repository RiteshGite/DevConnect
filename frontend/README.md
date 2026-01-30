🚀 AWS Deployment Guide
React + Node.js + Nginx + DuckDNS + SSL (Let’s Encrypt)

This guide explains step-by-step how to deploy a full-stack application on AWS EC2 with:

Custom domain name (DuckDNS – free)

HTTPS / SSL certificate (Let’s Encrypt)

Nginx reverse proxy

PM2 for backend process management

🧾 Prerequisites

AWS account

GitHub repository (frontend + backend)

Node.js app (React frontend + Express backend)

1️⃣ Sign up on AWS

Go to https://aws.amazon.com

Create an account

Login to AWS Console

2️⃣ Launch EC2 Instance

Go to EC2 → Launch Instance

Choose:

AMI: Ubuntu 22.04 LTS

Instance Type: t2.micro (free tier)

Create / select Key Pair

Security Group:

Allow SSH (22)

Allow HTTP (80)

Allow HTTPS (443)

Launch instance

3️⃣ Connect to EC2 Instance

From AWS EC2 → Connect → SSH

ssh -i "your-key.pem" ubuntu@<PUBLIC-IP>


Update system:

sudo apt update && sudo apt upgrade -y

4️⃣ Install Required Software
Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
node -v
npm -v

Git
sudo apt install git -y

Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

PM2
sudo npm install -g pm2

5️⃣ Clone GitHub Repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>


Project structure example:

devTinder/
 ├── frontend/
 └── backend/

6️⃣ Backend Setup
cd backend
npm install


Create .env:

nano .env


Example:

PORT=7777
MONGO_URI=your_mongodb_url
JWT_SECRET_KEY=your_secret
NODE_ENV=production


Start backend:

pm2 start src/app.js --name backend
pm2 save

7️⃣ Frontend Setup
cd ../frontend
npm install


Create .env.production:

nano .env.production

VITE_BACKEND_URL=http://your-domain/api


Build frontend:

npm run build


Copy build to Nginx:

sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

8️⃣ Configure DuckDNS (Free Domain)

Go to https://www.duckdns.org

Login

Create subdomain (example: developerstinder.duckdns.org)

Set current IP = EC2 Public IP

Test:

ping developerstinder.duckdns.org

9️⃣ Configure Nginx (Reverse Proxy)
sudo nano /etc/nginx/sites-available/default

server {
    listen 80;
    server_name developerstinder.duckdns.org;

    root /var/www/html;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    location / {
        try_files $uri /index.html;
    }
}


Restart Nginx:

sudo nginx -t
sudo systemctl reload nginx

🔐 10️⃣ SSL Certificate (Let’s Encrypt via acme.sh)
Install acme.sh
curl https://get.acme.sh | sh
source ~/.bashrc

Set DuckDNS credentials
export DuckDNS_Token="YOUR_DUCKDNS_TOKEN"
export DuckDNS_Domain="developerstinder"

Issue certificate
~/.acme.sh/acme.sh --issue \
  --dns dns_duckdns \
  -d developerstinder.duckdns.org

Install certificate
sudo mkdir -p /home/ubuntu/ssl

~/.acme.sh/acme.sh --install-cert \
  -d developerstinder.duckdns.org \
  --key-file /home/ubuntu/ssl/privkey.pem \
  --fullchain-file /home/ubuntu/ssl/fullchain.pem \
  --reloadcmd "sudo systemctl reload nginx"

🔒 11️⃣ Enable HTTPS in Nginx

Edit Nginx:

sudo nano /etc/nginx/sites-available/default


Add SSL:

server {
    listen 443 ssl;
    server_name developerstinder.duckdns.org;

    ssl_certificate /home/ubuntu/ssl/fullchain.pem;
    ssl_certificate_key /home/ubuntu/ssl/privkey.pem;

    root /var/www/html;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_set_header Host $host;
    }

    location / {
        try_files $uri /index.html;
    }
}


Reload:

sudo nginx -t
sudo systemctl reload nginx

12️⃣ Update Frontend Backend URL
nano frontend/.env.production

VITE_BACKEND_URL=https://developerstinder.duckdns.org/api


Rebuild frontend:

npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

✅ Final Check

Open browser:

https://developerstinder.duckdns.org


SSL 🔒 should be visible

Login, API, cookies all working

🧠 Key Learnings

Always use path: "/" for auth cookies

sameSite: "lax" works best for same-origin

Nginx must proxy /api correctly

Frontend build must be copied to /var/www/html

HTTPS required for secure cookies

🏁 Done

🎉 Production deployment complete
AWS + Domain + SSL + React + Node — all live