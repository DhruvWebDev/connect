"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Github, Linkedin } from "lucide-react";
import { BackgroundGradient } from "./ui/background-gradient";

export function Footer() {
  return (
    <BackgroundGradient className="p-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              VidSync
            </h3>
            <p className="text-gray-400 mb-4">
              Empowering creators to streamline their video production workflow.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Features", "Pricing", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex space-x-4">
              <SocialIcon href="https://twitter.com" icon={<Twitter />} />
              <SocialIcon href="https://github.com" icon={<Github />} />
              <SocialIcon href="https://linkedin.com" icon={<Linkedin />} />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} VidSync. All rights reserved.
          </p>
        </div>
      </div>
    </BackgroundGradient>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-blue-400 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}