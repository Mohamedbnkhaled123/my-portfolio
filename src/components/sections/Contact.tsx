import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { Mail, Phone, Sparkles, ArrowUpRight, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../../utils/sounds';
import { RevealInteractive } from '../RevealInteractive';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  blank?: boolean;
  color: string;
  bgColor: string;
}

export const Contact: React.FC = () => {
  const { t, lang, alertContactPulse, fireContactPulse } = useAppStore();
  const isRtl = lang === 'ar';
  const [isGlowFlash, setIsGlowFlash] = useState(false);
  const [isLocationClicked, setIsLocationClicked] = useState(false);

  const handleGetInTouchClick = () => {
    playClickSound();
    fireContactPulse();
    setIsGlowFlash(true);
    setTimeout(() => setIsGlowFlash(false), 800);
    document.getElementById('contact-channels')?.scrollIntoView({ behavior: 'smooth' });
  };

  const contacts: ContactInfo[] = [
    {
      icon: Phone,
      label: 'contact.phone',
      value: '01024891448',
      href: 'tel:01024891448',
      color: '#22c55e',
      bgColor: 'rgba(34,197,94,0.12)',
    },
    {
      icon: Mail,
      label: 'contact.email',
      value: 'momokhaled937@gmail.com',
      href: 'mailto:momokhaled937@gmail.com',
      color: '#ef4444',
      bgColor: 'rgba(239,68,68,0.12)',
    },
    {
      icon: FaLinkedin,
      label: 'contact.linkedin',
      value: 'MohamedbnKhaled',
      href: 'https://www.linkedin.com/in/mohamedbn-khaled',
      blank: true,
      color: '#0a66c2',
      bgColor: 'rgba(10,102,194,0.12)',
    },
    {
      icon: FaGithub,
      label: 'contact.github',
      value: 'Mohamedbnkhaled123',
      href: 'https://github.com/Mohamedbnkhaled123',
      blank: true,
      color: 'var(--text-primary)',
      bgColor: 'rgba(128,128,128,0.12)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
    },
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-24">
      {/* Background Glows */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--glow)] rounded-full blur-[180px] -z-10 opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--glow-magenta)] rounded-full blur-[150px] -z-10 opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealInteractive radiusClass="rounded-full" className="inline-block light-teal-spotlight">
            <button
              onClick={handleGetInTouchClick}
              className="relative z-10 flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-transparent outline-none transition-all duration-300 group"
            >
              {/* Glow Flash Overlay */}
              <motion.div
                className="absolute inset-0 rounded-full bg-premium-gradient pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isGlowFlash ? 0.3 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <Sparkles className="w-4 h-4 text-accent relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide relative z-10">
                {t('contact.title')}
              </span>
            </button>
          </RevealInteractive>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight mt-6">
            {isRtl ? 'لنبني شيئاً ' : "Let's Build "}
            <span className="text-premium-gradient">
              {isRtl ? 'مذهلاً معاً' : 'Something Great'}
            </span>
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            {isRtl
              ? 'أنا متاح للمشاريع الجديدة والتعاون. تواصل معي عبر أي من القنوات التالية.'
              : "I'm available for new projects and collaboration. Reach out through any of the channels below."}
          </p>
        </div>

        {/* Contact Grid */}
        <motion.div
          id="contact-channels"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {contacts.map((contact, idx) => (
            <motion.a
              key={idx}
              href={contact.href}
              target={contact.blank ? '_blank' : '_self'}
              rel="noreferrer"
              className="block outline-none"
              variants={itemVariants}
            >
              {/* Pulse Wrapper — isolated from the entrance variants above */}
              <motion.div
                animate={
                  alertContactPulse
                    ? {
                        y: [0, -12, 0, -6, 0],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'loop' as const,
                          ease: 'easeInOut',
                          delay: idx * 0.2,
                        },
                      }
                    : { y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
                }
              >
              <RevealCard className="p-5 md:p-6 cursor-pointer group transition-all duration-300 hover:shadow-lg">
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  {/* Icon Container */}
                  <div
                    className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: contact.bgColor }}
                  >
                    <contact.icon className="w-6 h-6" style={{ color: contact.color }} />
                  </div>

                  {/* Text */}
                  <div className={`flex-1 min-w-0 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <p className="text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
                      {t(contact.label)}
                    </p>
                    <p
                      className="font-bold text-primary text-sm md:text-base truncate group-hover:text-accent transition-colors duration-300"
                      dir="ltr"
                    >
                      {contact.value}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={`shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isRtl ? '-scale-x-100' : ''}`}>
                    <ArrowUpRight className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </RevealCard>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom CTA — Location Button */}
        <motion.div
          className="mt-14 text-center flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <RevealInteractive radiusClass="rounded-full" className="inline-block light-teal-spotlight">
            <button
              onClick={() => {
                if (isLocationClicked) return;
                playClickSound();
                setIsLocationClicked(true);
                setTimeout(() => setIsLocationClicked(false), 500);
                window.open("https://maps.google.com/?q=Cairo,+Egypt", "_blank");
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              className="relative z-10 flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-transparent outline-none transition-all duration-300 group cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="z-10 flex items-center justify-center"
              >
                <MapPin className="w-4 h-4 text-accent transition-colors duration-300 group-hover:text-accent-cyan" />
              </motion.div>
              <span className="z-10 text-sm font-semibold text-secondary group-hover:text-accent-cyan transition-colors duration-300">{isRtl ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
              
              {/* Click Pulse Ripple */}
              <AnimatePresence>
                {isLocationClicked && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, rgba(0,251,255,0.3) 0%, transparent 70%)` }}
                    initial={{ opacity: 0.8, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </button>
          </RevealInteractive>
        </motion.div>
      </div>
    </section>
  );
};
