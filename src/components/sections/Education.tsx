'use client';

import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { GraduationCap, Award } from 'lucide-react';

export const Education: React.FC = () => {
  const { t, lang } = useAppStore();

  const educationList = [
    {
      id: 'edu-nti',
      icon: Award,
      title: t('education.ntiTitle'),
      subtitle: `${t('education.ntiInstitute')} • ${t('education.ntiPeriod')}`,
    },
    {
      id: 'edu-uni',
      icon: GraduationCap,
      title: t('education.university'),
      subtitle: t('education.degree'),
    },
  ];

  return (
    <section id="education" className="py-20 bg-card/30 section-fade-edge scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-premium-gradient mb-4 relative inline-block">
            {t('education.title')}
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-premium-gradient rounded-full"></span>
          </h1>
        </div>

        <div className="space-y-6">
          {educationList.map((item) => {
            const IconComp = item.icon;
            return (
              <RevealCard
                key={item.id}
                className={`group/edu flex flex-col items-center gap-6 hover:border-accent/50 transition-colors p-8 ${
                  lang === 'ar' ? 'md:flex-row-reverse text-right' : 'md:flex-row md:items-start text-center md:text-left'
                }`}
              >
                {/* Icon with direct neon illumination via filter: drop-shadow on the SVG itself */}
                <IconComp
                  className="w-10 h-10 text-accent flex-shrink-0 cursor-pointer transition-[filter] duration-300 ease-out hover:[filter:drop-shadow(0_0_4px_#00FBFF)_drop-shadow(0_0_8px_rgba(0,251,255,0.4))]"
                />
                <div className={`${lang === 'ar' ? 'arabic-text-fix' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  {/* Added Slate-400 for structural hierarchy */}
                  <p className="text-slate-400 dark:text-slate-400 font-medium">{item.subtitle}</p>
                </div>
              </RevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
