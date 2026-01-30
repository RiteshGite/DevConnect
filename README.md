# 🚀 DevTinder – Full Stack Application

## 🌐 Live URL
**https://developerstinder.duckdns.org**

---

## 🚀 AWS Deployment Guide
**React + Node.js + Nginx + DuckDNS + SSL (Let's Encrypt)**

This guide explains step-by-step how to deploy a full-stack application on AWS EC2 with:
- ✅ Custom domain name (DuckDNS – free)
- ✅ HTTPS / SSL certificate (Let's Encrypt)
- ✅ Nginx reverse proxy
- ✅ PM2 for backend process management

---

## 🧾 Prerequisites
- AWS account
- GitHub repository (frontend + backend)
- Node.js app (React frontend + Express backend)

---

## 1️⃣ Sign up on AWS
1. Go to https://aws.amazon.com
2. Create an account
3. Login to AWS Console

---

## 2️⃣ Launch EC2 Instance
1. Go to **EC2 → Launch Instance**
2. Choose:
   - **AMI:** Ubuntu 22.04 LTS
   - **Instance Type:** t2.micro (free tier)
3. Create / select **Key Pair**
4. **Security Group:**
   - Allow **SSH (22)**
   - Allow **HTTP (80)**
   - Allow **HTTPS (443)**
5. Launch instance

---

## 3️⃣ Connect to EC2 Instance
From AWS EC2 → Connect → SSH
```bash
ssh -i "your-key.pem" ubuntu@<EC2_PUBLIC_IP>
```

Update system:
```bash
sudo apt update && sudo apt upgrade -y
```

---

## 4️⃣ Install Required Software

### **Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
node -v
npm -v
```

### **Git**
```bash
sudo apt install git -y
```

### **Nginx**
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **PM2**
```bash
sudo npm install -g pm2
```

---

## 5️⃣ Clone GitHub Repository
```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

**Project structure example:**
```
devTinder/
 ├── frontend/
 └── backend/
```

---

## 6️⃣ Backend Setup
```bash
cd backend
npm install
```

**Create .env:**
```bash
nano .env
```

**Example:**
```
PORT=7777
MONGO_URI=your_mongodb_url
JWT_SECRET_KEY=your_secret
NODE_ENV=production
```

**Start backend:**
```bash
pm2 start src/app.js --name backend
pm2 save
```

---

## 7️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

**Create .env.production:**
```bash
nano .env.production
```
```
VITE_BACKEND_URL=http://your-domain/api
```

**Build frontend:**
```bash
npm run build
```

**Copy build to Nginx:**
```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

---

## 8️⃣ Configure DuckDNS (Free Domain)
1. Go to https://www.duckdns.org
2. Login
3. Create subdomain (example: `developerstinder.duckdns.org`)
4. Set current IP = **EC2 Public IP**

**Test:**
```bash
ping developerstinder.duckdns.org
```

---

## 9️⃣ Configure Nginx (Reverse Proxy)
```bash
sudo nano /etc/nginx/sites-available/default
```
```nginx
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
```

**Restart Nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔐 10️⃣ SSL Certificate (Let's Encrypt via acme.sh)

### **Install acme.sh**
```bash
curl https://get.acme.sh | sh
source ~/.bashrc
```

### **Set DuckDNS credentials**
```bash
export DuckDNS_Token="YOUR_DUCKDNS_TOKEN"
export DuckDNS_Domain="developerstinder"
```

### **Issue certificate**
```bash
~/.acme.sh/acme.sh --issue \
  --dns dns_duckdns \
  -d developerstinder.duckdns.org
```

### **Install certificate**
```bash
sudo mkdir -p /home/ubuntu/ssl
~/.acme.sh/acme.sh --install-cert \
  -d developerstinder.duckdns.org \
  --key-file /home/ubuntu/ssl/privkey.pem \
  --fullchain-file /home/ubuntu/ssl/fullchain.pem \
  --reloadcmd "sudo systemctl reload nginx"
```

---

## 🔒 11️⃣ Enable HTTPS in Nginx

**Edit Nginx:**
```bash
sudo nano /etc/nginx/sites-available/default
```

**Add SSL:**
```nginx
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
```

**Reload:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 12️⃣ Update Frontend Backend URL
```bash
nano frontend/.env.production
```
```
VITE_BACKEND_URL=https://developerstinder.duckdns.org/api
```

**Rebuild frontend:**
```bash
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

---

## ✅ Final Check
1. Open browser: **https://developerstinder.duckdns.org**
2. SSL 🔒 should be visible
3. Login, API, cookies all working

---

## 🧠 Key Learnings
- ✅ Always use `path: "/"` for auth cookies
- ✅ `sameSite: "lax"` works best for same-origin
- ✅ Nginx must proxy `/api` correctly
- ✅ Frontend build must be copied to `/var/www/html`
- ✅ HTTPS required for secure cookies

---

## 🏁 Done 🎉
**Production deployment complete**  
**AWS + Domain + SSL + React + Node — all live**