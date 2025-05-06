import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaLayerGroup, FaServer, FaTools, FaBrain } from "react-icons/fa";

function Skill() {
const [isLoaded, setIsLoaded] = useState(false);
const [highlightedSkill, setHighlightedSkill] = useState(null);

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
  const canvas = document.getElementById('skills-constellation-canvas');
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

const skillCategories = [
  {
    category: "Frontend Development",
    icon: <FaCode className="text-emerald-400" size={22} />,
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "HTML5 & CSS3", level: 90 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Chakra UI", level: 80 },
    ],
  },
  {
    category: "State Management",
    icon: <FaLayerGroup className="text-amber-400" size={22} />,
    skills: [
      { name: "Redux", level: 85 },
      { name: "Context API", level: 85 },
    ],
  },
  {
    category: "Backend Integration",
    icon: <FaServer className="text-emerald-400" size={22} />,
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 75 },
      { name: "MongoDB", level: 70 },
    ],
  },
  {
    category: "Other",
    icon: <FaTools className="text-amber-400" size={22} />,
    skills: [
      { name: "UI/UX Design", level: 75 },
      { name: "Git & Version Control", level: 85 },
      { name: "Performance Optimization", level: 70 },
      { name: "Veeva Email Development", level: 90 },
    ],
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
  <div id="skillspage" className="relative min-h-screen overflow-hidden bg-gray-900 text-white py-20 px-6">
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
    <canvas id="skills-constellation-canvas" className="absolute inset-0 z-0"></canvas>
    
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
            My Expertise
          </p>
        </div>
        
        <motion.h2 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          My Skills
        </motion.h2>
        
        <div className="flex items-center gap-3 mb-8">
          <motion.div 
            className="h-[1px] w-10 bg-emerald-500/60"
            animate={{ width: [10, 60, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <p className="text-lg text-emerald-300">Crafting digital experiences with modern technologies</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 rounded-lg bg-emerald-900/10 backdrop-blur-sm border border-emerald-700/40 hover:border-emerald-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="p-2.5 bg-gray-800/70 rounded-lg mr-4 border border-emerald-700/40"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {category.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-emerald-300">
                {category.category}
              </h3>
            </div>
            <div className="space-y-5">
              {category.skills.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  className="space-y-2"
                  onMouseEnter={() => setHighlightedSkill(`${category.category}-${skill.name}`)}
                  onMouseLeave={() => setHighlightedSkill(null)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-medium transition-colors duration-300 ${
                      highlightedSkill === `${category.category}-${skill.name}` ? 'text-amber-300' : 'text-emerald-100'
                    }`}>
                      {skill.name}
                    </span>
                    <motion.span 
                      className="text-sm text-emerald-300 font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  {/* Progress bar with animation */}
                  <div className="w-full h-2 bg-gray-800/70 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1.4, 
                        delay: 0.4 + idx * 0.1,
                        ease: "easeOut"
                      }}
                      className={`h-full rounded-full ${
                        highlightedSkill === `${category.category}-${skill.name}`
                          ? 'bg-gradient-to-r from-amber-500 to-amber-700'
                          : 'bg-gradient-to-r from-emerald-600 to-emerald-800'
                      } transition-colors duration-300`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-16"
      >
        <div className="flex items-center mb-8">
          <motion.div 
            className="p-2.5 bg-gray-800/70 rounded-lg mr-4 border border-emerald-700/40"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <FaBrain className="text-amber-400" size={20} />
          </motion.div>
          <h3 className="text-xl font-semibold text-emerald-300">
            Technologies I Work With
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS",
            "Chakra UI", "Redux", "Context API", "Node.js", "Express.js",
            "MongoDB", "Git", "Jira", "Responsive Design",
            "Performance Optimization", "SEO", "Veeva Email", "Email Marketing",
          ].map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(245, 158, 11, 0.5)'
              }}
              className="px-4 py-2 bg-emerald-900/30 backdrop-blur-sm text-emerald-200 rounded-full border border-emerald-700/40 transition-all duration-300 text-sm relative overflow-hidden group"
            >
              {tech}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/20 to-amber-600/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              ></motion.span>
            </motion.div>
          ))}
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

      {/* Code symbol */}
      <motion.div 
        className="absolute bottom-10 right-10 text-6xl font-mono text-emerald-700/10 hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.div>
    </motion.div>
    
    {/* Signature corner effect */}
    <motion.div
      className="absolute bottom-6 left-6 text-xs text-emerald-700/30 font-mono z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      &lt;skills mastered /&gt;
    </motion.div>
  </div>
);
}

export default Skill;