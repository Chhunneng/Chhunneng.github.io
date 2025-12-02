import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useSimpleFade } from '../hooks/useResponsiveAnimation';

const experienceData = [
  {
    title: 'Senior Software Engineer',
    company: 'Kirirom Digital Inc',
    location: 'Japan',
    period: 'May 2023 – Jan 2025',
    side: 'left',
  },
  {
    title: 'Senior Frontend Developer',
    company: 'Infinity Information & Apps Dev Co., Ltd',
    location: 'Cambodia',
    period: 'Jun 2022 – May 2023',
    side: 'right',
  },
  {
    title: 'Software Engineer',
    company: 'Peppermint Cambodia',
    location: 'France',
    period: 'Apr 2021 – Jun 2022',
    side: 'left',
  },
  {
    title: 'Backend Developer',
    company: 'Revorn',
    location: 'Japan',
    period: 'Oct 2020 – Apr 2021',
    side: 'right',
  },
  {
    title: 'Founder and Software Engineer',
    company: 'VKirirom Buying Agent',
    location: 'Cambodia',
    period: 'Jul 2019 – Oct 2020',
    side: 'left',
  },
];

const ExperienceItem = ({ experience, index }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mobile: simple fade, no horizontal movement
  const mobileInitial = { opacity: 0, y: 5 };
  const mobileAnimate = { opacity: 1, y: 0 };
  
  // Desktop: horizontal movement with fade
  const desktopInitial = { 
    opacity: 0, 
    x: experience.side === 'left' ? -50 : 50 
  };
  const desktopAnimate = { opacity: 1, x: 0 };

  const initial = prefersReducedMotion 
    ? { opacity: 1 } 
    : (isMobile ? mobileInitial : desktopInitial);
  const animate = prefersReducedMotion 
    ? { opacity: 1 } 
    : (isMobile ? mobileAnimate : desktopAnimate);

  const isInView = useInView(ref, { once: true, margin: isMobile ? "-100px" : "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ 
        duration: prefersReducedMotion ? 0 : (isMobile ? 0.4 : 0.6), 
        delay: prefersReducedMotion ? 0 : (index * (isMobile ? 0.02 : 0.1)),
        ease: "easeOut"
      }}
      className={`flex items-center mb-6 md:mb-20 ${
        experience.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${experience.side === 'left' ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center md:text-left`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {experience.title}
          </h3>
          <p className="text-lg text-[#028090] font-medium mb-1">
            {experience.company}
          </p>
          <p className="text-sm text-gray-500 mb-2">{experience.location}</p>
          <p className="text-sm text-[#05668d] font-medium">{experience.period}</p>
        </motion.div>
      </div>

      {/* Timeline Line & Dot - Desktop Only */}
      <div className="hidden md:flex flex-col items-center w-2/12">
        <div className="w-1 h-full bg-gradient-to-b from-[#02c39a] to-[#028090]"></div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-4 h-4 rounded-full bg-[#028090] border-4 border-white shadow-lg z-10"
        />
        <div className="w-1 h-full bg-gradient-to-b from-[#028090] to-[#02c39a]"></div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const fadeAnim = useSimpleFade();
  
  return (
    <section id="experience" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={fadeAnim.initial}
          whileInView={fadeAnim.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeAnim.transition}
          className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#02c39a] via-[#028090] to-[#02c39a]"></div>

          <div>
            {experienceData.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

