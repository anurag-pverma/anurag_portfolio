import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

function Project() {
const [isLoaded, setIsLoaded] = useState(false);
const [activeProject, setActiveProject] = useState(null);

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
  const canvas = document.getElementById('project-constellation-canvas');
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

const projects = [
  {
    title: "Email Builder Tool",
    description: "An intuitive email tool allowing users to create fully customized email templates with drag-and-drop functionality. Reduced email creation time by 30%.",
    tech: [
      "React.js", "Node.js", "MongoDB", "Express.js", "Redux", "Tailwind CSS"
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    links: {
      demo: "#",
      code: "#"
    }
  },
  {
    title: "Marketing Automation Platform",
    description: "A complete platform for email marketing with drag-and-drop functionality. Reduced email creation time by 30%.",
    tech: [
      "React.js", "Node.js", "MongoDB", "Express.js", "Redux", "Tailwind CSS"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80",
    links: {
      demo: "#",
      code: "#"
    }
  },
  {
    title: "Image Upload System",
    description: "A web platform for uploading, previewing, and managing images with optimized cloud storage.",
    tech: [
      "React.js", "Node.js", "MongoDB", "Express.js", "Redux", "Tailwind CSS"
    ],
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    links: {
      demo: "#",
      code: "#"
    }
  },
];

// Container animation
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

return (
  <div id='projectpage' className="relative min-h-screen overflow-hidden bg-gray-900 text-white py-20 px-6">
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
    <canvas id="project-constellation-canvas" className="absolute inset-0 z-0"></canvas>
    
    {/* Animated background shapes */}
    <div className="parallax-shape absolute top-40 left-10 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl z-0"></div>
    <div className="parallax-shape absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl z-0"></div>
    
    {/* Glass overlay */}
    <div className="absolute inset-0 backdrop-blur-[2px] z-10"></div>
    
    {/* 3D perspective elements */}
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div 
        className="absolute -left-20 top-1/3 w-80 h-80 border border-emerald-500/10"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        animate={{ 
          rotateX: [0, -10, 0], 
          rotateY: [0, 10, 0],
          rotateZ: [0, -5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

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
            Showcasing My Work
          </p>
        </div>
        
        <motion.h2 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          My Projects
        </motion.h2>
        
        <div className="flex items-center gap-3 mb-8">
          <motion.div 
            className="h-[1px] w-10 bg-emerald-500/60"
            animate={{ width: [10, 60, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <p className="text-lg text-emerald-300">
            Featured works and contributions
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-emerald-700/30 hover:border-emerald-600/50 transition-all duration-300 group"
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)" }}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="relative overflow-hidden h-48">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              
              <motion.div 
                className="absolute inset-0 bg-emerald-700/40"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              
              <motion.div 
                className="absolute bottom-3 right-3 flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeProject === index ? 1 : 0,
                  y: activeProject === index ? 0 : 20 
                }}
                transition={{ duration: 0.3 }}
              >
                <a 
                  href={project.links.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-900/80 p-2 rounded-full text-emerald-300 hover:text-emerald-200 hover:bg-emerald-900/80 transition-all duration-300"
                  aria-label="View live demo"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
                <a 
                  href={project.links.code} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-900/80 p-2 rounded-full text-emerald-300 hover:text-emerald-200 hover:bg-emerald-900/80 transition-all duration-300"
                  aria-label="View source code"
                >
                  <FaGithub size={14} />
                </a>
              </motion.div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-100 group-hover:text-amber-200 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-emerald-100/70 mb-4 text-sm line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 4).map((tech, i) => (
                  <span 
                    key={i} 
                    className="bg-emerald-900/30 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-700/30"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="bg-amber-900/30 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-700/30">
                    +{project.tech.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="pt-4 border-t border-emerald-700/20">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 text-center text-sm font-medium text-emerald-300 hover:text-amber-300 transition-colors duration-300 flex items-center justify-center"
                >
                  <FaCode className="mr-2" size={14} />
                  View Project Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        variants={itemVariants} 
        className="mt-16 text-center"
      >
        <motion.a 
          href="#" 
          className="relative inline-flex items-center px-8 py-3.5 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-medium shadow-lg shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all duration-300 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center">
            View More Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100"></span>
        </motion.a>
      </motion.div>
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

    {/* Code symbol */}
    <motion.div 
      className="absolute top-20 right-20 text-6xl font-mono text-emerald-700/10 hidden lg:block"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {"</>"}
    </motion.div>
    
    {/* Signature corner effect */}
    <motion.div
      className="absolute bottom-6 left-6 text-xs text-emerald-700/30 font-mono z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      &lt;built with passion /&gt;
    </motion.div>
  </div>
);
}

export default Project;