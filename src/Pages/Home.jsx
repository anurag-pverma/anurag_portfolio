import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';

function Home() {
const [isLoaded, setIsLoaded] = useState(false);
const [currentWordIndex, setCurrentWordIndex] = useState(0);
const rotatingWords = ["responsive", "scalable", "interactive", "accessible"];

// Handle page load animation sequence
useEffect(() => {
  setTimeout(() => setIsLoaded(true), 500);
}, []);

// Word rotation animation
useEffect(() => {
  const wordInterval = setInterval(() => {
    setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
  },10000);
  
  return () => clearInterval(wordInterval);
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
  const canvas = document.getElementById('constellation-canvas');
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

// Stagger children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  },
};

return (
  <div id='homepage' className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
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
    <canvas id="constellation-canvas" className="absolute inset-0 z-0"></canvas>
    
    {/* Animated background shapes */}
    <div className="parallax-shape absolute top-40 left-10 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl z-0"></div>
    <div className="parallax-shape absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl z-0"></div>
    <div className="parallax-shape absolute bottom-40 left-1/3 w-40 h-40 rounded-full bg-emerald-400/10 blur-xl z-0"></div>

    {/* 3D perspective elements */}
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div 
        className="absolute -right-20 top-20 w-80 h-80 border border-emerald-500/10"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        animate={{ 
          rotateX: [0, 10, 0], 
          rotateY: [0, -10, 0],
          rotateZ: [0, 5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div 
          className="absolute inset-0 border border-emerald-500/10"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </motion.div>
    </div>

    {/* Content container */}
    <motion.div 
      className="relative z-20 container mx-auto max-w-5xl px-6 pt-20 pb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting tag */}
      <motion.div variants={itemVariants} className="mb-1">
        <div className="inline-flex items-center px-3 py-1.5 mt-3 bg-emerald-900/30 backdrop-blur-sm rounded-full border border-emerald-700/40 mb-8">
          <motion.div 
            className="w-2 h-2 bg-amber-400 rounded-full mr-2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
          <p className="text-emerald-300 font-mono text-sm tracking-wider">
            Namaste 🙏  available for work
          </p>
        </div>
      </motion.div>

      {/* Name section */}
      <motion.div variants={itemVariants} className="mb-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-white via-amber-300 to-amber-300 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          Anurag Verma
        </motion.h1>
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="h-[1px] w-10 bg-emerald-500/60"
            animate={{ width: [10, 60, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 tracking-wide">
            Full Stack Developer
          </h2>
        </div>
      </motion.div>

      {/* Headline section */}
      <motion.div variants={itemVariants} className="mb-8">
        {/* Split text reveal animation */}
        <div className="overflow-hidden h-16 mb-6">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-white/90"
            initial={{ y: 70 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            I build things for web.
          </motion.h3>
        </div>
        
        {/* Description with word rotation */}
        <p className="text-lg text-emerald-100/80 leading-relaxed max-w-2xl mb-8">
          Specializing in crafting <span className="text-amber-400 font-medium">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {rotatingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span> web applications 
          that enhance user engagement and business efficiency. With a strong focus on frontend technologies 
          and a passion for creating seamless user experiences.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mb-16">
        {/* Work button with liquid effect */}
        <motion.button 
          className="group relative px-6 py-3.5 overflow-hidden rounded-lg bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center">
            View My Work
            <FaArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
          </span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800"
            style={{ originX: 0, originY: 0.5 }}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          ></motion.span>
        </motion.button>

        {/* Contact button with ripple effect */}
        <motion.button 
          className="group relative px-6 py-3.5 rounded-lg bg-transparent border border-emerald-500/50 text-emerald-300 font-medium transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.03, borderColor: "rgba(16, 185, 129, 0.7)" }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={(e) => {
            // Create ripple effect
            const button = e.currentTarget;
            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.position = "absolute";
            circle.style.borderRadius = "50%";
            circle.style.transform = "translate(-50%, -50%)";
            circle.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
            circle.style.zIndex = "-1";
            
            const rect = button.getBoundingClientRect();
            circle.style.left = `${e.clientX - rect.left}px`;
            circle.style.top = `${e.clientY - rect.top}px`;
            
            button.appendChild(circle);
            
            setTimeout(() => {
              circle.style.opacity = "0";
              setTimeout(() => {
                if (circle.parentNode) {
                  button.removeChild(circle);
                }
              }, 500);
            }, 500);
          }}
        >
          Contact Me
        </motion.button>
      </motion.div>

      {/* Social icons */}
      <motion.div variants={itemVariants} className="flex gap-8">
        {[
            { icon: <FaGithub size={22} />, href: "https://github.com/anurag-pverma", label: "GitHub" },
            { icon: <FaLinkedin size={22} />, href: "https://www.linkedin.com/in/anurag-verma-935bbb138/", label: "LinkedIn" },
            { icon: <FaTwitter size={22} />, href: "https://x.com/i/flow/login?redirect_after_login=%2FAnuragV01335988", label: "Email" }
        ].map((social, index) => (
          <motion.a 
            key={index}
            href={social.href} 
             target="_blank"
             rel="noreferrer"
            className="text-emerald-300/70 hover:text-amber-300 transition-all duration-300 relative"
            aria-label={`Social media link ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {social.icon}           

            <motion.div
              className="absolute -inset-4 rounded-full"
              initial={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0) 100%)" }}
              whileHover={{ 
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)"
              }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </motion.a>
        ))}
      </motion.div>

      {/* Tech stack with flip cards */}
      <motion.div
  className="absolute bottom-10 right-10 hidden lg:flex gap-3"
  variants={itemVariants}
>
  {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind'].map((tech, i) => (
    <motion.div
      key={i}
      className="relative w-28 h-10"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full transition-transform duration-500"
        whileHover={{ rotateY: 180 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full px-4 py-2 rounded-full text-xs font-medium bg-emerald-900/30 backdrop-blur-sm border border-emerald-700/40 text-emerald-200 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {tech}
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full px-4 py-2 rounded-full text-xs font-medium bg-emerald-700/40 backdrop-blur-sm border border-emerald-700 text-emerald-100 flex items-center justify-center"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          🚀
        </div>
      </motion.div>
    </motion.div>
  ))}
</motion.div>
    </motion.div>

    {/* Signature corner effect */}
    <motion.div
      className="absolute bottom-6 left-6 text-xs text-emerald-700/30 font-mono z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      &lt;coded with passion /&gt;
    </motion.div>
  </div>
);
}

export default Home;