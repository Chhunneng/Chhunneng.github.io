import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const techEmojis = ['💻', '🚀', '⚡', '🎯', '🔧', '💡', '🌟', '🎨', '🔐', '📱', '⚙️', '🌐', '💾', '🔌', '🎮'];

const FloatingEmoji = ({ emoji, index, isMobile }) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return null;
  }

  // Better positioning - avoid edges and center area
  const startX = 10 + Math.random() * 80; // 10-90% to avoid edges
  const startY = 10 + Math.random() * 80; // 10-90% to avoid edges
  const duration = isMobile ? 12 + Math.random() * 8 : 15 + Math.random() * 10; // Faster on mobile
  const delay = Math.random() * 3;
  const size = isMobile ? 32 + Math.random() * 20 : 30 + Math.random() * 20; // Larger on mobile
  const baseOpacity = isMobile ? 0.15 : 0.1; // More visible on mobile

  return (
    <motion.div
      className="absolute pointer-events-none select-none z-0"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        fontSize: `${size}px`,
        opacity: baseOpacity + Math.random() * 0.15, // Higher base opacity
      }}
      animate={{
        y: isMobile ? [0, -20, 0, 20, 0] : [0, -30, 0, 30, 0],
        x: isMobile ? [0, 15, -15, 8, 0] : [0, 20, -20, 10, 0],
        rotate: [0, 5, -5, 0],
        opacity: isMobile 
          ? [baseOpacity, baseOpacity + 0.2, baseOpacity + 0.1, baseOpacity + 0.2, baseOpacity]
          : [0.1, 0.2, 0.15, 0.2, 0.1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
};

const HeroBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [emojisToShow, setEmojisToShow] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Show fewer emojis on mobile but still visible
      const count = mobile ? 10 : 15;
      // Randomly select emojis
      const shuffled = [...techEmojis].sort(() => 0.5 - Math.random());
      setEmojisToShow(shuffled.slice(0, count));
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05668d]/5 via-[#028090]/5 to-[#02c39a]/5"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Mesh Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(5, 102, 141, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(2, 128, 144, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(0, 168, 150, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(2, 195, 154, 0.06) 0%, transparent 50%),
            white
          `,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated Blob Shapes - Optimized for mobile */}
      <motion.div
        className={`absolute top-1/4 left-1/4 ${isMobile ? 'w-48 h-48' : 'w-96 h-96'} rounded-full blur-3xl opacity-20`}
        style={{
          background: 'linear-gradient(135deg, rgba(5, 102, 141, 0.3), rgba(2, 128, 144, 0.2))',
        }}
        animate={isMobile ? {
          scale: [1, 1.1, 0.95, 1],
        } : {
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: isMobile ? 15 : 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {!isMobile && (
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 168, 150, 0.3), rgba(2, 195, 154, 0.2))',
          }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      )}

      {/* Floating Tech Emojis */}
      {emojisToShow.map((emoji, index) => (
        <FloatingEmoji key={`${emoji}-${index}`} emoji={emoji} index={index} isMobile={isMobile} />
      ))}

      {/* Subtle Grid Pattern - Hidden on mobile for performance */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(5, 102, 141, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(5, 102, 141, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      )}
    </div>
  );
};

export default HeroBackground;

