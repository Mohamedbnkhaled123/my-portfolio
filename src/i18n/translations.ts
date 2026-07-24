export type Language = 'en' | 'ar';

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
    downloadCV: string;
  };
  hero: {
    name: string;
    role: string;
    intro: string;
    viewProjects: string;
    contactMe: string;
    downloadCV: string;
  };
  about: {
    title: string;
    description: string;
  };
  skills: {
    title: string;
    languages: string;
    frameworks: string;
    stateManager: string;
    backend: string;
    specialized: string;
  };
  experience: {
    title: string;
    subtitle: string;
    placeholderNotice: string;
  };
  projects: {
    title: string;
    parisClinic: {
      title: string;
      description: string;
    };
    veloraBags: {
      title: string;
      description: string;
    };
    eShop: {
      title: string;
      description: string;
    };
    features: string;
    techStack: string;
  };
  education: {
    title: string;
    degree: string;
    university: string;
  };
  contact: {
    title: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  pagination: {
    previous: string;
    next: string;
    page: string;
    of: string;
  };
  seo: {
    homeTitle: string;
    homeDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    skillsTitle: string;
    skillsDesc: string;
    experienceTitle: string;
    experienceDesc: string;
    projectsTitle: string;
    projectsDesc: string;
    educationTitle: string;
    educationDesc: string;
    contactTitle: string;
    contactDesc: string;
  };
  footer: {
    rights: string;
    madeWith: string;
  };
};

export const translations: Record<Language, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
      downloadCV: "Download CV"
    },
    hero: {
      name: "Mohamed Khaled AbdelSattar",
      role: "Frontend Developer | React Specialist",
      intro: "Crafting premium, scalable web applications with a focus on modern UI/UX and high-performance architecture.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCV: "Download CV"
    },
    about: {
      title: "About Me",
      description: "I am a passionate Frontend Developer specializing in React, Next.js 15, and building robust real-time applications. My expertise lies in designing scalable architectures, optimistic UI patterns, and delivering premium digital experiences."
    },
    skills: {
      title: "Technical Skills",
      languages: "Languages",
      frameworks: "Frameworks & Libraries",
      stateManager: "State Management",
      backend: "Backend & Tools",
      specialized: "Specialized Skills"
    },
    experience: {
      title: "Work Experience",
      subtitle: "Professional journey and career achievements",
      placeholderNotice: "Ready for your experience details! Provide your role, company, duration, and key accomplishments to display here."
    },
    projects: {
      title: "Featured Projects",
      parisClinic: {
        title: "Paris Clinic System",
        description: "A comprehensive medical management platform with real-time patient booking and record tracking."
      },
      veloraBags: {
        title: "Velora Bags Store",
        description: "Premium e-commerce experience for luxury goods with real-time inventory and search."
      },
      eShop: {
        title: "E-Shop Electronics",
        description: "High-performance electronics marketplace built for scale with modern Next.js architecture."
      },
      features: "Features",
      techStack: "Tech Stack"
    },
    education: {
      title: "Education",
      degree: "Student",
      university: "High Institute for Computers and Information Systems"
    },
    contact: {
      title: "Get In Touch",
      phone: "Phone",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub"
    },
    pagination: {
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of"
    },
    seo: {
      homeTitle: "Mohamed Khaled - Frontend Developer Portfolio",
      homeDesc: "Portfolio of Mohamed Khaled AbdelSattar, React Specialist & Frontend Developer building high-performance web applications.",
      aboutTitle: "About - Mohamed Khaled",
      aboutDesc: "Learn more about Mohamed Khaled, Frontend Developer specializing in React, Next.js, and modern UI engineering.",
      skillsTitle: "Skills - Mohamed Khaled",
      skillsDesc: "Technical skills and expertise in React, TypeScript, Next.js, TailwindCSS, State Management, and web optimization.",
      experienceTitle: "Experience - Mohamed Khaled",
      experienceDesc: "Professional career history, projects, and work experience of Mohamed Khaled AbdelSattar.",
      projectsTitle: "Projects - Mohamed Khaled",
      projectsDesc: "Featured frontend and full-stack projects built with React, Next.js, and modern web architectures.",
      educationTitle: "Education - Mohamed Khaled",
      educationDesc: "Academic background and degrees of Mohamed Khaled AbdelSattar.",
      contactTitle: "Contact - Mohamed Khaled",
      contactDesc: "Get in touch with Mohamed Khaled for freelance, full-time opportunities, or project inquiries."
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made with passion & React"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من أنا",
      skills: "المهارات",
      experience: "الخبرات",
      projects: "المشاريع",
      education: "التعليم",
      contact: "تواصل معي",
      downloadCV: "تحميل السيرة الذاتية"
    },
    hero: {
      name: "محمد خالد عبدالستار",
      role: "مطور واجهات أمامية | متخصص في React",
      intro: "مهتم بتطوير تطبيقات ويب عصرية، ذات جودة عالية وهندسة برمجية متقدمة.",
      viewProjects: "عرض المشاريع",
      contactMe: "تواصل معي",
      downloadCV: "تحميل السيرة الذاتية"
    },
    about: {
      title: "من أنا",
      description: "أنا مطور واجهات أمامية متخصص في React، Next.js 15، وبناء تطبيقات ديناميكية تفاعلية. أتميز بهندسة الأنظمة القابلة للتوسع وتقديم تجربة مستخدم مبهرة."
    },
    skills: {
      title: "المهارات التقنية",
      languages: "لغات البرمجة",
      frameworks: "إطارات العمل والمكتبات",
      stateManager: "إدارة الحالة",
      backend: "منظومة الخلفية والأدوات",
      specialized: "مهارات متخصصة"
    },
    experience: {
      title: "الخبرة العملية",
      subtitle: "المسيرة المهنية والإنجازات في مجال التطوير",
      placeholderNotice: "جاهز لإضافة تفاصيل خبراتك! أرسل الأدوار، الشركات، والفترات الزمنية لتضمينها هنا مباشرةً."
    },
    projects: {
      title: "أبرز المشاريع",
      parisClinic: {
        title: "نظام عيادة باريس",
        description: "منصة طبية شاملة لإدارة الحجوزات وسجلات المرضى مع مزامنة سحابية لحظية."
      },
      veloraBags: {
        title: "متجر فيلورا للحقائب",
        description: "متجر إلكتروني فاخر لتسوق الحقائب مع إدارة لحظية للمخزون والطلبات."
      },
      eShop: {
        title: "إي-شوب للإلكترونيات",
        description: "سوق إلكتروني متقدم للإلكترونيات مصمم للأداء العالي باستخدام تقنيات Next.js الحديثة."
      },
      features: "المميزات",
      techStack: "التقنيات المستخدمة"
    },
    education: {
      title: "التعليم",
      degree: "طالب",
      university: "معهد التجمع الأول للحاسبات ونظم المعلومات"
    },
    contact: {
      title: "تواصل معي",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      linkedin: "لينكد إن",
      github: "جيت هب"
    },
    pagination: {
      previous: "السابق",
      next: "التالي",
      page: "صفحة",
      of: "من"
    },
    seo: {
      homeTitle: "محمد خالد - مطور واجهات أمامية",
      homeDesc: "الموقع الشخصي لمحمد خالد عبدالستار، متخصص في بناء تطبيقات الويب المتقدمة باستخدام React و Next.js.",
      aboutTitle: "من أنا - محمد خالد",
      aboutDesc: "تعرف على الخبرة والخلفية التقنية لمحمد خالد مطور الواجهات الأمامية.",
      skillsTitle: "المهارات - محمد خالد",
      skillsDesc: "المهارات التقنية والخبرات في React, TypeScript, Next.js, TailwindCSS وإدارة الحالة.",
      experienceTitle: "الخبرات العملية - محمد خالد",
      experienceDesc: "سجل الخبرات والمسيرة المهنية لمحمد خالد عبدالستار.",
      projectsTitle: "المشاريع - محمد خالد",
      projectsDesc: "أبرز مشاريع الواجهات الأمامية والأنظمة التفاعلية المتميزة.",
      educationTitle: "التعليم - محمد خالد",
      educationDesc: "المؤهلات العلمية والأكاديمية لمحمد خالد عبدالستار.",
      contactTitle: "تواصل معي - محمد خالد",
      contactDesc: "تواصل مع محمد خالد لبدء مشاريع جديدة أو الاستفسار عن فرّص العمل."
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      madeWith: "صُنع بشغف بواسطة React"
    }
  }
};
