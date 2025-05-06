import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Mails, Send, ArrowRight } from "lucide-react";

function Contact() {
const [isLoaded, setIsLoaded] = useState(false);
const [formStatus, setFormStatus] = useState({ state: null, message: "" });
const [hoveredIcon, setHoveredIcon] = useState(null);

// Handle page load animation sequence
useEffect(() => {
  setTimeout(() => setIsLoaded(true), 500);
}, []);

// Parallax effect for background shapes
useEffect(() => {
  const handleMouseMove = (e) => {
    const shapes = document.querySelectorAll('.parallax-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
      const speed = index * 0.01 + 0.02;
      const xOffset = (x - 0.5) * speed * 100;
      const yOffset = (y - 0.5) * speed * 100;
      shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  return () => document.removeEventListener('mousemove', handleMouseMove);
}, []);

// Background constellation effect
useEffect(() => {
  const canvas = document.getElementById('contact-constellation-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  const connectionDistance = 150;
  const moveSpeed = 0.5;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * moveSpeed - moveSpeed/2,
      speedY: Math.random() * moveSpeed - moveSpeed/2
    });
  }
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Move particles
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Boundary check
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
        
        if (distance < connectionDistance) {
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance/connectionDistance)})`;
          ctx.lineWidth = 1 * (1 - distance/connectionDistance);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  };
  
  animate();
  
  return () => cancelAnimationFrame(animate);
}, []);

const handleSubmit = (e) => {
  e.preventDefault();
  // Simulate form submission
  setFormStatus({ state: "submitting", message: "Sending..." });
  
  setTimeout(() => {
    setFormStatus({ 
      state: "success", 
      message: "Message sent successfully! I'll get back to you soon."
    });
    
    // Reset form after submission
    e.target.reset();
    
    // Reset status after a few seconds
    setTimeout(() => {
      setFormStatus({ state: null, message: "" });
    }, 5000);
  }, 1500);
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

// Contact info array for easier mapping
const contactInfo = [
  { 
    icon: <Mail className="text-emerald-400" size={20} />, 
    text: "anurag.premaverma@gmail.com", 
    href: "mailto:anurag.premaverma@gmail.com",
    label: "Email"
  },
  { 
    icon: <Phone className="text-emerald-400" size={20} />, 
    text: "+91 8004833682", 
    href: "tel:+918004833682",
    label: "Phone"
  },
  { 
    icon: <MapPin className="text-emerald-400" size={20} />, 
    text: "Pratapgarh, UP, India", 
    href: "#",
    label: "Location"
  }
];

// Social links
const socialLinks = [
  { 
    icon: <Github size={20} />, 
    href: "https://github.com/anurag-pverma", 
    label: "GitHub",
    hoverColor: "github"
  },
  { 
    icon: <Linkedin size={20} />, 
    href: "https://www.linkedin.com/in/anurag-verma-935bbb138/", 
    label: "LinkedIn",
    hoverColor: "linkedin"
  },
  { 
    icon: <Mails size={20} />, 
    href: "mailto:anurag.premaverma@gmail.com", 
    label: "Email",
    hoverColor: "email"
  }
];

return (
  <div id="contactpage" className="relative min-h-screen overflow-hidden bg-gray-900 text-white py-20 px-6">
    {/* Entry overlay animation */}
    <AnimatePresence>
      {!isLoaded && (
        <motion.div 
          className="fixed inset-0 bg-emerald-900 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-t-transparent border-emerald-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Constellation canvas */}
    <canvas id="contact-constellation-canvas" className="absolute inset-0 z-0"></canvas>
    
    {/* Animated background shapes */}
    <div className="parallax-shape absolute top-40 left-10 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl z-0"></div>
    <div className="parallax-shape absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl z-0"></div>
    <div className="parallax-shape absolute top-1/3 right-1/3 w-40 h-40 rounded-full bg-emerald-400/10 blur-xl z-0"></div>
    
    {/* Glass overlay */}
    <div className="absolute inset-0 backdrop-blur-[2px] z-10"></div>
    
    {/* Content container */}
    <motion.div 
      className="relative z-20 container mx-auto max-w-5xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-16">
        <div className="inline-flex items-center px-3 py-1.5 bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-700/40 mb-8">
          <motion.div 
            className="w-2 h-2 bg-amber-400 rounded-full mr-2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
          <p className="text-emerald-300 font-mono text-sm tracking-wider">
            Let's Connect
          </p>
        </div>
        
        <motion.h2 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="flex items-center gap-3 mb-8">
          <motion.div 
            className="h-[1px] w-10 bg-emerald-500/60"
            animate={{ width: [10, 60, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <p className="text-lg text-emerald-300">
            I'd love to hear from you
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Information Column */}
        <motion.div variants={itemVariants} className="space-y-8">
          <motion.p 
            className="text-emerald-100/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            I'm currently looking for new opportunities and my inbox is
            always open. Whether you have a question or just want to say
            Hi, I'll try my best to get back to you!
          </motion.p>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-emerald-100/80 hover:text-amber-300 transition-colors duration-300 group"
                whileHover={{ x: 5 }}
                aria-label={item.label}
              >
                <motion.div 
                  className="mr-4 p-3 rounded-full bg-emerald-900/30 border border-emerald-700/40 group-hover:border-amber-500/50 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.div>
                <span>{item.text}</span>
              </motion.a>
            ))}
          </div>

          <motion.div 
            className="pt-8"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-emerald-200 mb-4">Connect with me</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-emerald-900/30 backdrop-blur-sm border border-emerald-700/40 text-emerald-300 transition-all duration-300 relative overflow-hidden"
                  onMouseEnter={() => setHoveredIcon(social.label)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <motion.span className="relative z-10">
                    {social.icon}
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-amber-600/20"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: hoveredIcon === social.label ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="pt-8 opacity-80"
            variants={itemVariants}
          >
            <motion.div 
              className="p-4 border border-emerald-700/30 rounded-lg bg-emerald-900/20 backdrop-blur-sm"
              whileHover={{ y: -3 }}
            >
              <p className="text-sm leading-relaxed text-emerald-100/70">
                <span className="text-amber-400">"</span> I believe in creating meaningful digital experiences that leave a lasting impression. Let's collaborate and bring your vision to life! <span className="text-amber-400">"</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Contact Form Column */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-sm bg-emerald-900/10 border border-emerald-700/40 p-8 rounded-xl shadow-lg shadow-emerald-900/10"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.1)" }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.h3 
              className="text-xl font-bold text-emerald-100 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Send a Message
            </motion.h3>
            <motion.p 
              className="text-sm text-emerald-100/70 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Fill out this form and I'll get back to you as soon as possible.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-emerald-200"
                >
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-800/60 border border-emerald-700/40 text-emerald-100 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-3 transition-all duration-300"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-emerald-200"
                >
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                  className="bg-gray-800/60 border border-emerald-700/40 text-emerald-100 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-3 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-emerald-200"
              >
                Subject
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                name="subject"
                type="text"
                id="subject"
                className="bg-gray-800/60 border border-emerald-700/40 text-emerald-100 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-3 transition-all duration-300"
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-emerald-200"
              >
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                id="message"
                rows={4}
                className="bg-gray-800/60 border border-emerald-700/40 text-emerald-100 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-3 transition-all duration-300"
                placeholder="Your message here..."
                required
              />
            </div>

            <motion.button 
              type="submit" 
              className="w-full group relative px-6 py-3.5 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-medium shadow-lg shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={formStatus.state === "submitting"}
            >
              <span className="relative z-10 flex items-center justify-center">
                {formStatus.state === "submitting" ? 'Sending...' : 'Send Message'}
                {formStatus.state !== "submitting" && (
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                )}
                {formStatus.state === "submitting" && (
                  <motion.div 
                    className="ml-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send size={18} />
                  </motion.div>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100"></span>
            </motion.button>
            
            {/* Form submission status message */}
            <AnimatePresence>
              {formStatus.state === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-emerald-900/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm"
                >
                  {formStatus.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </motion.div>

    {/* Glowing orbs */}
    <motion.div 
      className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-emerald-500/20 blur-2xl"
      animate={{ 
        opacity: [0.2, 0.4, 0.2],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    ></motion.div>

    {/* Geometric decorations */}
    <motion.div 
      className="absolute top-40 right-10 w-20 h-20 border border-emerald-500/10 rotate-45 hidden lg:block"
      animate={{ 
        rotate: [45, 90, 45],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    ></motion.div>

    {/* Signature corner effect */}
    <motion.div
      className="absolute bottom-6 left-6 text-xs text-emerald-700/30 font-mono z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      &lt;let's collaborate /&gt;
    </motion.div>
  </div>
);
}

export default Contact;