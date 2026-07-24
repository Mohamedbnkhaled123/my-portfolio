import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const SEOHead: React.FC = () => {
  const location = useLocation();
  const { lang, t } = useAppStore();

  useEffect(() => {
    let titleKey = 'seo.homeTitle';
    let descKey = 'seo.homeDesc';

    const path = location.pathname.toLowerCase();

    if (path === '/about') {
      titleKey = 'seo.aboutTitle';
      descKey = 'seo.aboutDesc';
    } else if (path === '/skills') {
      titleKey = 'seo.skillsTitle';
      descKey = 'seo.skillsDesc';
    } else if (path === '/experience') {
      titleKey = 'seo.experienceTitle';
      descKey = 'seo.experienceDesc';
    } else if (path === '/projects') {
      titleKey = 'seo.projectsTitle';
      descKey = 'seo.projectsDesc';
    } else if (path === '/education') {
      titleKey = 'seo.educationTitle';
      descKey = 'seo.educationDesc';
    } else if (path === '/contact') {
      titleKey = 'seo.contactTitle';
      descKey = 'seo.contactDesc';
    }

    const titleText = t(titleKey);
    const descText = t(descKey);

    document.title = titleText;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descText);

    // Update HTML Lang and Dir attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  }, [location.pathname, lang, t]);

  return null;
};
