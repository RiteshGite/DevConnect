import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Dev<span className="text-primary">Connect</span>
            </h2>
            <p className="mt-3 text-sm text-base-content/70">
              A developer-first platform to connect, collaborate, and grow
              together. Built with passion for clean code and real networking.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>

            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              <li className="flex items-center gap-3">
                <Mail size={16} />
                <a
                  href="mailto:riteshgite2005@gmail.com"
                  className="hover:underline"
                >
                  riteshgite2005@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={16} />
                <a href="tel:+918446170267" className="hover:underline">
                  +91 8446170267
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Connect</h3>

            <div className="flex justify-center md:justify-start gap-4">
              <Link
                to="https://github.com/RiteshGite"
                target="_blank"
                className="group relative p-2 rounded-full transition hover:bg-primary hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </Link>

              <Link
                to="https://www.linkedin.com/in/ritesh-gite/"
                target="_blank"
                className="group relative p-2 rounded-full transition hover:bg-primary hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-base-content/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} DevConnect. All rights reserved.</p>
          <p>
            Built by{" "}
            <span className="font-medium text-base-content">Ritesh Gite</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
