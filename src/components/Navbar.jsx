import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [activeSection, setActiveSection] = useState('home');
const [isMobile, setIsMobile] = useState(false);

// Check screen size and handle resize events
useEffect(() => {
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  // Initial check
  checkScreenSize();
  
  // Listen for resize events
  window.addEventListener('resize', checkScreenSize);
  
  return () => {
    window.removeEventListener('resize', checkScreenSize);
  };
}, []);

// Handle scroll events to change navbar appearance
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  // Track active section based on scroll position
  const handleSectionTracking = () => {
    const sections = ['home', 'about', 'skills', 'project', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleSectionTracking);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', handleSectionTracking);
  };
}, []);

// Close mobile menu on screen resize to desktop
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768 && isOpen) {
      setIsOpen(false);
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [isOpen]);

// Handle body scroll lock when mobile menu is open
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isOpen]);

const navItems = [
  { name: 'Home', href: '#homepage' },
  { name: 'About', href: '#aboutpage' },
  { name: 'Skills', href: '#skillspage'},
  { name: 'Project', href: '#projectpage'},
  { name: 'Contact', href: '#contactpage'}
];

return (
  <motion.nav 
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg shadow-emerald-900/10' : 'bg-transparent'
    }`}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <motion.a 
            href="#home"
            className="flex items-center relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="text-emerald-500 font-bold text-3xl sm:text-4xl"
              animate={{ 
                textShadow: ['0 0 5px rgba(16, 185, 129, 0)', '0 0 15px rgba(16, 185, 129, 0.5)', '0 0 5px rgba(16, 185, 129, 0)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              A
            </motion.span>
            <motion.span 
              className="text-amber-500 font-bold text-3xl sm:text-4xl"
              animate={{ 
                textShadow: ['0 0 5px rgba(245, 158, 11, 0)', '0 0 10px rgba(245, 158, 11, 0.5)', '0 0 5px rgba(245, 158, 11, 0)']
              }}
              transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
            >
              V.
            </motion.span>
          </motion.a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`relative font-medium text-xs lg:text-lg whitespace-nowrap ${
                activeSection === item.href.substring(1) 
                  ? 'text-amber-400' 
                  : 'text-emerald-200/80 hover:text-emerald-300'
              } transition-colors duration-300`}
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {/* <span className="text-emerald-500 mr-1 text-xs lg:text-sm opacity-70">{(index + 1).toString().padStart(2, '0')}.</span>  */}
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-amber-500"
                  layoutId="navbar-active-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}
          
          {/* Resume button */}
          <motion.a
            href="\src\assets\Anurag Verma Resume.pdf" 
            className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-md bg-emerald-900/40 backdrop-blur-sm border border-emerald-700/40 text-emerald-300 hover:bg-emerald-800/40 hover:border-emerald-600/50 transition-all duration-300 text-xs lg:text-sm whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            target="_blank"
          >
            Resume
          </motion.a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-900/30 backdrop-blur-sm border border-emerald-700/40 text-emerald-300 hover:text-amber-300 focus:outline-none transition-all duration-300"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <Menu size={20} />
            ) : (
              <X size={20} />
            )}
          </motion.button>
        </div>
      </div>
    </div>

    {/* Mobile menu */}
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-md z-40"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col justify-center h-full px-4 py-5 space-y-6">
            {navItems.map((item, index) => (
              <motion.a 
                key={index}
                href={item.href}
                className={`block py-4 px-3 text-center text-lg font-medium rounded-lg ${
                  activeSection === item.href.substring(1) 
                    ? 'bg-emerald-900/30 text-amber-400' 
                    : 'text-emerald-200 hover:bg-emerald-900/20'
                } transition-all duration-300`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <span className="text-emerald-500 mr-2 font-mono text-sm">{(index + 1).toString().padStart(2, '0')}.</span>
                {item.name}
              </motion.a>
            ))}

            {/* Mobile resume button */}
            <motion.a
              href="#resume" 
              className="block py-3.5 px-3 mx-auto w-2/3 text-center rounded-md bg-emerald-900/40 backdrop-blur-sm border border-emerald-700/40 text-emerald-300 hover:bg-emerald-800/40 hover:border-emerald-600/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Resume
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Subtle gradient line at the bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
  </motion.nav>
);
};

export default Navbar;