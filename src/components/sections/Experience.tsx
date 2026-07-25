'use client';

import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { Calendar, Building2 } from 'lucide-react';

interface ExperienceItem {
  id: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  periodEn: string;
  periodAr: string;
  descriptionEn: string;
  descriptionAr: string;
  skills: string[];
}

export const Experience: React.FC = () => {
  const { t, lang } = useAppStore();

  const experienceList: ExperienceItem[] = [
    {
      id: 'exp-1',
      roleEn: 'MEAN Stack Training',
      roleAr: 'تدريب MEAN Stack',
      companyEn: 'NTI (National Telecommunication Institute)',
      companyAr: 'المعهد القومي للاتصالات (NTI)',
      periodEn: 'Completed',
      periodAr: 'تدريب مكتمل',
      descriptionEn: `• Completed intensive hands-on software engineering training focused on full-stack web development using the MEAN Stack (MongoDB, Express.js, Angular, Node.js).
• Engineered a production-ready Real E-Commerce Platform from scratch using Angular and Node.js, featuring secure JWT authentication, dynamic cataloging, cart management, and optimized RESTful APIs.
• Implemented robust backend services, custom Express middlewares, and Mongoose data modeling adhering to Clean Architecture and DRY principles.
• Created dynamic, highly responsive, and high-performance frontend interfaces utilizing Angular, RxJS, Reactive Forms, and Tailwind CSS.
• Applied sharp problem-solving skills to optimize asynchronous data handling, state management, and application performance.
• Collaborated in an agile-like environment, managing codebases via Git/GitHub, writing modular code, and practicing modern engineering workflows.`,
      descriptionAr: `• إتمام تدريب عملي مكثف في هندسة البرمجيات مع التركيز على تطوير الويب الشامل باستخدام تقنيات MEAN Stack (MongoDB, Express.js, Angular, Node.js).
• بناء منصة تجارة إلكترونية متكاملة من الصفر باستخدام Angular و Node.js، تتضمن مصادقة آمنة عبر JWT، إدارة ديناميكية للكتالوج وعربة التسوق، مع بناء واجهات برمجة تطبيقات (RESTful APIs) محسّنة.
• تنفيذ خدمات خلفية قوية (Backend Services)، وبرمجيات وسيطة مخصصة (Middlewares)، ونمذجة بيانات عبر Mongoose مع الالتزام بهندسة البرمجيات النظيفة (Clean Architecture) ومبادئ (DRY).
• إنشاء واجهات أمامية تفاعلية وديناميكية عالية الأداء باستخدام Angular، RxJS، النماذج التفاعلية، و Tailwind CSS.
• توظيف مهارات متقدمة في حل المشكلات لتحسين معالجة البيانات غير المتزامنة، وإدارة الحالة، ورفع أداء التطبيق.
• العمل والتنسيق في بيئة مرنة (Agile-like)، وإدارة الكود البرمجي عبر Git/GitHub، مع تطبيق أساليب هندسة البرمجيات الحديثة.`,
      skills: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JavaScript']
    }
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-card/30 section-fade-edge scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-6 relative inline-block pb-3">
            {isRtl ? 'مسيرتي ' : 'My '}
            <span className="text-premium-gradient">{t('experience.title')}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-accent-cyan/20 dark:border-white/10 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {experienceList.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1 w-6 h-6 rounded-full bg-background border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_12px_rgba(0,251,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
              </div>

              {/* Card Container */}
              <RevealCard className="p-6 md:p-8 hover:border-accent-cyan/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-slate-200 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
                      <span>{lang === 'ar' ? item.roleAr : item.roleEn}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                      <Building2 className="w-4 h-4 text-accent-cyan" />
                      <span>{lang === 'ar' ? item.companyAr : item.companyEn}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold self-start md:self-auto border border-slate-200 dark:border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>{lang === 'ar' ? item.periodAr : item.periodEn}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
                  {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-md bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </RevealCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
