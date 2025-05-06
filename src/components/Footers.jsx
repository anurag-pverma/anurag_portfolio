import React from "react";
import { motion } from "framer-motion";
import { Heart, Code, Github, Linkedin, Mail, Star } from "lucide-react";

function Footers() {
const d = new Date();
let year = d.getFullYear();

// Social links for footer
const socialLinks = [
  { icon: <Github size={16} />, href: "https://github.com/anurag-pverma", label: "GitHub" },
  { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/anurag-verma-935bbb138/", label: "LinkedIn" },
  { icon: <Mail size={16} />, href: "mailto:anurag.premaverma@gmail.com", label: "Email" }
];

return (
  <div className="relative py-12 px-6 bg-gray-900 overflow-hidden">
    {/* Gradient border on top */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
    
    {/* Background elements */}
    <motion.div 
      className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-emerald-600/5 blur-2xl"
      animate={{ 
        opacity: [0.2, 0.3, 0.2],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    ></motion.div>
    
    <motion.div 
      className="absolute top-10 right-10 w-40 h-40 rounded-full bg-amber-500/5 blur-2xl"
      animate={{ 
        opacity: [0.1, 0.2, 0.1],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    ></motion.div>

    <div className="container mx-auto max-w-5xl relative z-10">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Logo/Name column */}
        <div className="flex flex-col items-center md:items-start">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent mb-2"
            animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            Anurag Verma
          </motion.div>
          <p className="text-emerald-300/80 text-sm">Full Stack Developer</p>
        </div>
        
        {/* Navigation links */}
        <div className="flex flex-col items-center text-sm">
          <p className="text-emerald-100 font-medium mb-3">Quick Links</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {["Home", "Skills", "Project", "Contact"].map((link, i) => (
              <motion.a 
                key={i}
                href={`#${link.toLowerCase()}page`}
                className="text-emerald-100/70 hover:text-amber-300 transition-colors duration-300"
                whileHover={{ x: 3 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Social links */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-emerald-100 font-medium mb-3">Connect With Me</p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a 
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-700/40 text-emerald-300 hover:text-amber-300 hover:border-amber-500/50 transition-colors duration-300"
                whileHover={{ y: -3, scale: 1.1}}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Divider with subtle animation */}
      <motion.div 
        className="h-[1px] bg-emerald-700/30 my-6 mx-auto"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
      ></motion.div>
      
      {/* Copyright and signature */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mt-6">
        <motion.p 
          className="text-emerald-200/70 flex items-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span>Designed & Built with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block mx-1.5"
          >
            <Heart size={16} className="text-amber-500" />
          </motion.span>
          <span>by Anurag Verma</span>
        </motion.p>
        
        <motion.div 
          className="flex items-center mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Code size={16} className="mr-1.5 text-emerald-400" />
          <p className="text-sm text-emerald-200/70">
            © {year} All Rights Reserved
          </p>
        </motion.div>
      </div>
      
      {/* Signature element */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-400/50">
          <Star size={10} />
          <span>Thank you for visiting my portfolio</span>
          <Star size={10} />
        </div>
      </motion.div>
    </div>
  </div>
);
}

export default Footers;