import { motion } from 'framer-motion';
import { 
  SiPython, SiTypescript, SiJavascript,
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular,
  SiNodedotjs, SiFastapi, SiDjango, SiFlask,
  SiPostgresql, SiMongodb, SiRedis,
  SiGooglecloud, SiDocker, SiKubernetes,
  SiTensorflow, SiGit
} from 'react-icons/si';
import { FaJava, FaAws, FaMicrosoft, FaChartBar } from 'react-icons/fa';
import { useResponsiveAnimation, useSimpleFade } from '../hooks/useResponsiveAnimation';

const skillsData = [
  { name: 'Python', icon: SiPython, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'TypeScript', icon: SiTypescript, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'JavaScript', icon: SiJavascript, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Java', icon: FaJava, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'React', icon: SiReact, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Next.js', icon: SiNextdotjs, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'Vue', icon: SiVuedotjs, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Angular', icon: SiAngular, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'Node.js', icon: SiNodedotjs, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'FastAPI', icon: SiFastapi, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'Django', icon: SiDjango, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Flask', icon: SiFlask, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'PostgreSQL', icon: SiPostgresql, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'MongoDB', icon: SiMongodb, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'Redis', icon: SiRedis, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'AWS', icon: FaAws, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'GCP', icon: SiGooglecloud, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Azure', icon: FaMicrosoft, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'Docker', icon: SiDocker, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Kubernetes', icon: SiKubernetes, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'TensorFlow', icon: SiTensorflow, gradient: 'from-[#05668d] to-[#028090]' },
  { name: 'Power BI', icon: FaChartBar, gradient: 'from-[#00a896] to-[#02c39a]' },
  { name: 'Git', icon: SiGit, gradient: 'from-[#05668d] to-[#028090]' },
];

const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;
  const animConfig = useResponsiveAnimation();
  
  return (
    <motion.div
      initial={animConfig.initial}
      whileInView={animConfig.animate}
      viewport={animConfig.viewport}
      transition={{ 
        ...animConfig.transition,
        delay: index * animConfig.staggerDelay
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center group"
    >
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-sm font-medium text-gray-700 text-center">{skill.name}</h3>
    </motion.div>
  );
};

const Skills = () => {
  const fadeAnim = useSimpleFade();
  
  return (
    <section id="skills" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={fadeAnim.initial}
          whileInView={fadeAnim.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeAnim.transition}
          className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

