import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { GraduationCap, Award, Calendar, Building2 } from 'lucide-react';

export const Education: React.FC = () => {
  const { t, lang } = useAppStore();
  const isRtl = lang === 'ar';

  const educationItems = [
    {
      id: 'edu-nti',
      icon: Award,
      title: t('education.ntiTitle'),
      subtitle: t('education.ntiInstitute'),
      period: t('education.ntiPeriod'),
      badgeColor: 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan',
    },
    {
      id: 'edu-uni',
      icon: GraduationCap,
      title: t('education.university'),
      subtitle: t('education.degree'),
      period: isRtl ? 'مؤهل عالي' : 'Higher Education',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section id="education" className="py-20 bg-card/30 section-fade-edge scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 relative inline-block">
            {t('education.title')}
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-premium-gradient rounded-full"></span>
          </h2>
        </div>

        <div className="space-y-6">
          {educationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <RevealCard 
                key={item.id}
                className={`group/edu flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-accent-cyan/40 transition-all duration-300 p-6 md:p-8 ${
                  isRtl ? 'text-right' : 'text-left'
                }`}
              >
                <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan group-hover/edu:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                      <Building2 className="w-4 h-4 text-accent-cyan shrink-0" />
                      <span>{item.subtitle}</span>
                    </div>
                  </div>
                </div>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 ${item.badgeColor}`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </RevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
