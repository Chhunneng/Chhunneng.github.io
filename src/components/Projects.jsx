import { motion } from 'framer-motion';
import bakongImage from '../assets/projects/Bakong-KHQR.jpg';
import khmerImage from '../assets/projects/Khmer-Text-Transliteration.jpeg';
import { useResponsiveAnimation, useSimpleFade } from '../hooks/useResponsiveAnimation';

const projectsData = [
  {
    title: 'Bakong-KHQR',
    description: 'Created a Go package integrating Cambodia\'s KHQR API for interoperable EMV-QR payments, enabling cross-bank transactions and secure e-wallet settlements in Khmer Riel.',
    image: bakongImage,
    gradient: 'from-[#05668d] to-[#028090]',
  },
  {
    title: 'Khmer Text Transliteration',
    description: 'Built a Python package using transformer-based models, TensorFlow, and 28K+ training words, improving transliteration accuracy and linguistic coverage for Khmer language datasets.',
    image: khmerImage,
    gradient: 'from-[#00a896] to-[#02c39a]',
  },
];

const ProjectCard = ({ project, index }) => {
  const animConfig = useResponsiveAnimation();
  
  return (
    <motion.div
      initial={animConfig.initial}
      whileInView={animConfig.animate}
      viewport={animConfig.viewport}
      transition={{ 
        ...animConfig.transition,
        delay: index * (animConfig.staggerDelay * 5) // Projects need more delay between items
      }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const fadeAnim = useSimpleFade();
  
  return (
    <section id="projects" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={fadeAnim.initial}
          whileInView={fadeAnim.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeAnim.transition}
          className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

