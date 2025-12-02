import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { useResponsiveAnimation, useSimpleFade } from '../hooks/useResponsiveAnimation';

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Chhunneng', color: 'hover:text-gray-900' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/chhunneng', color: 'hover:text-blue-600' },
  { name: 'Email', icon: FaEnvelope, url: 'mailto:chanchhunnengchrea@gmail.com', color: 'hover:text-[#05668d]' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://x.com/Chanchhunneng', color: 'hover:text-sky-500' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fadeAnim = useSimpleFade();
  const animConfig = useResponsiveAnimation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('');

    const formDataToSend = new FormData(e.target);
    formDataToSend.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setResult("Success! Thank you for your message. I will get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult("Error: Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error('Error:', error);
      setResult("Error: Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={fadeAnim.initial}
          whileInView={fadeAnim.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeAnim.transition}
          className="text-4xl md:text-5xl font-semibold text-center mb-4 text-gray-900"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={fadeAnim.initial}
          whileInView={fadeAnim.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...fadeAnim.transition, delay: 0.05 }}
          className="text-center text-gray-600 mb-12 text-lg"
        >
          Let's connect and discuss how we can work together.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            initial={animConfig.initial}
            whileInView={animConfig.animate}
            viewport={animConfig.viewport}
            transition={animConfig.transition}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028090] focus:border-transparent transition-all duration-200 bg-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028090] focus:border-transparent transition-all duration-200 bg-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-200 bg-white resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#028090] to-[#02c39a] text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            {result && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-sm font-medium mt-2 ${
                  result.startsWith('Success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {result}
              </motion.p>
            )}
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={animConfig.initial}
            whileInView={animConfig.animate}
            viewport={animConfig.viewport}
            transition={animConfig.transition}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Connect with me
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={animConfig.initial}
                    whileInView={animConfig.animate}
                    viewport={animConfig.viewport}
                    transition={{ 
                      ...animConfig.transition,
                      delay: index * animConfig.staggerDelay
                    }}
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 ${social.color} text-gray-600`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

