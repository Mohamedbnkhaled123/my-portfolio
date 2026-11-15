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
    flagshipBadge: string;
    otherProjectsTitle: string;
    shoPRO: {
      title: string;
      description: string;
      highlightsTitle: string;
      highlight1Title: string;
      highlight1Desc: string;
      highlight2Title: string;
      highlight2Desc: string;
      highlight3Title: string;
      highlight3Desc: string;
      ctaQuote: string;
      liveDemoBtn: string;
      sourceCodeBtn: string;
      frontendRepoBtn: string;
      backendRepoBtn: string;
    };
    personalPortfolio: {
      title: string;
      description: string;
    };
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
    ntiTitle: string;
    ntiInstitute: string;
    ntiPeriod: string;
  };
  contact: {
    title: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
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
      role: "Full-Stack Software Engineer | MEAN Stack & React",
      intro: "Crafting premium, high-converting UI/UX designs while maintaining top-tier performance benchmarks and implementing multi-layered security architectures across the stack.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCV: "Download CV"
    },
    about: {
      title: "About Me",
      description: `I am Mohamed Khaled, a 22-year-old Full-Stack Software Engineer and HCMIS graduate. My academic background uniquely bridged core Computer Science principles with in-depth business studies, equipping me with a solid understanding of project management, effective stakeholder communication, and commercial viability.

My technical career started in frontend engineering with React, before expanding into full-stack architecture through rigorous MEAN Stack training at the National Telecommunication Institute (NTI). Beyond core coding, this journey refined my ability to break down complex projects, gather requirements directly from clients, analyze pain points, and negotiate technical solutions effectively.

My unique selling proposition (USP) lies in crafting premium, high-converting UI/UX designs while maintaining top-tier performance benchmarks and implementing multi-layered security architectures across the stack. Currently, I continuously advance my engineering skill set by tracking industry shifts and integrating modern AI workflows into software development, aiming to deliver clean, scalable, and business-driven digital products.

Core Technical Expertise:
• Frontend Development: Angular (Signals & Standalone Components), React 19, Next.js 15 (App Router, Server Components), TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap.
• Backend & Databases: Node.js, Express.js (RESTful API Architecture), MongoDB, Mongoose ORM, Firebase (Cloud Firestore, Auth, onSnapshot Listeners).
• State Management: RxJS, Reactive Forms, Zustand, React Context API.
• Architecture & Security: Clean Architecture, Modular Systems, JWT Authentication, Bcrypt Hashing, RBAC, Soft-Delete Safeguards.
• Engineering Best Practices: Optimistic UI Patterns, Asynchronous Processing, Web Performance Tuning, SEO / GEO / AEO Optimization, Prompt Engineering & AI Workflows.`
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
      flagshipBadge: "Flagship Enterprise Project",
      otherProjectsTitle: "Other Production Projects",
      shoPRO: {
        title: "shoPRO — Enterprise Full-Stack E-Commerce Ecosystem",
        description: "A production-grade e-commerce platform engineered to maximize conversion rates and eliminate cart abandonment while providing businesses with deep operational and financial intelligence. Built from the ground up to solve real-world retail scaling challenges, it features an intelligent hybrid guest-to-cloud cart synchronization system, native bilingual localization (Arabic & English) with silky 3D view transitions, a dynamic coupon promotion engine, and an executive Business Intelligence dashboard providing real-time financial trajectory and inventory metrics.",
        highlightsTitle: "Core Highlights & Architectural Decisions",
        highlight1Title: "High-Conversion Storefront",
        highlight1Desc: "Seamless guest-to-authenticated cart migration, interactive fly-to-cart micro-interactions, multi-criteria instant filtering, and 7-stage live order tracking.",
        highlight2Title: "Executive Business Intelligence Hub",
        highlight2Desc: "Interactive analytics tracking gross and net revenue, top 10 best-selling items, category revenue share, and expandable transaction audit logs.",
        highlight3Title: "Robust Engineering Standards",
        highlight3Desc: "Powered by Angular 21 Standalone Components with Signals & RxJS, backed by a scalable Node.js & Express 5 and MongoDB REST API with JWT role-based security, password encryption, in-memory caching, and soft-delete safeguards.",
        ctaQuote: "Interested in clean architecture, type-safe reactive state management, and enterprise-grade code scalability? Explore the repository on GitHub to inspect the component decoupling, route guards, and RESTful API design.",
        liveDemoBtn: "Live Store Demo",
        sourceCodeBtn: "GitHub Code",
        frontendRepoBtn: "Frontend Code",
        backendRepoBtn: "Backend Code"
      },
      personalPortfolio: {
        title: "Personal Developer Portfolio & Brand Platform",
        description: "Built a personal portfolio embodying the core USP: pairing high-end, responsive UI/UX with strict performance benchmarks, structured JSON-LD semantic schemas for SEO/GEO/AEO indexing, and Next.js 15 Server Components."
      },
      parisClinic: {
        title: "Paris Clinic System — Patient Booking Platform",
        description: "A real-world management system for an active dental clinic to automate reservations and eliminate front-desk bottlenecks, featuring Cloud Firestore onSnapshot listeners and atomic transactions to prevent double-booking."
      },
      eShop: {
        title: "E-Shop Electronics Marketplace",
        description: "High-performance electronics marketplace built for scale with modern Next.js 15 Server Components, TypeScript, and responsive styling."
      },
      veloraBags: {
        title: "Velora Bags Store",
        description: "Premium e-commerce experience for luxury goods with real-time inventory management, search, and Zustand state synchronization."
      },
      features: "Features",
      techStack: "Tech Stack"
    },
    education: {
      title: "Education & Certifications",
      degree: "Bachelor's Degree in Management Information Systems (Graduated)",
      university: "Higher Institute for Computer Science & Management Information Systems (HICMIS)",
      ntiTitle: "MEAN Stack Software Engineering Training (Certified)",
      ntiInstitute: "National Telecommunication Institute (NTI)",
      ntiPeriod: "Certified / Completed"
    },
    contact: {
      title: "Get In Touch",
      phone: "Phone",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub"
    },
    seo: {
      homeTitle: "Mohamed Khaled | Full-Stack Engineer (MEAN Stack & React 19 / Next.js)",
      homeDesc: "Official portfolio of Mohamed Khaled AbdelSattar - Full-Stack Engineer in Cairo, Egypt. Specializing in MEAN Stack, React 19, Next.js 15, TypeScript, and high-performance Web Applications.",
      aboutTitle: "About - Mohamed Khaled",
      aboutDesc: "Learn more about Mohamed Khaled, Full-Stack Engineer specializing in MEAN Stack, React, and modern UI engineering.",
      skillsTitle: "Skills - Mohamed Khaled",
      skillsDesc: "Technical skills and expertise in Angular, React 19, Next.js 15, Node.js, Express, MongoDB, TypeScript, and web optimization.",
      experienceTitle: "Experience - Mohamed Khaled",
      experienceDesc: "Professional career history, projects, and work experience of Mohamed Khaled AbdelSattar.",
      projectsTitle: "Projects - Mohamed Khaled",
      projectsDesc: "Featured full-stack and frontend projects built with MEAN Stack, React 19, and modern web architectures.",
      educationTitle: "Education - Mohamed Khaled",
      educationDesc: "Academic background and degrees of Mohamed Khaled AbdelSattar.",
      contactTitle: "Contact - Mohamed Khaled",
      contactDesc: "Get in touch with Mohamed Khaled for freelance, full-time opportunities, or project inquiries."
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Crafted with passion & modern web technologies"
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
      role: "مهندس برمجيات فول ستاك | MEAN Stack & React",
      intro: "أبتكر واجهات مستخدم (UI/UX) استثنائية وعالية التحويل، مع الحفاظ على أعلى معايير الأداء وتطبيق معماريات أمنية قوية ومتكاملة.",
      viewProjects: "عرض المشاريع",
      contactMe: "تواصل معي",
      downloadCV: "تحميل السيرة الذاتية"
    },
    about: {
      title: "من أنا",
      description: `أنا محمد خالد، مهندس برمجيات متكامل (Full-Stack Software Engineer) وخريج نظم معلومات الحاسب وإدارة الأعمال (HCMIS). يجمع مساري الأكاديمي بين المبادئ الأساسية لعلوم الحاسب ودراسات إدارة الأعمال، مما منحني فهماً عميقاً لإدارة المشاريع، والتواصل الفعال مع أصحاب المصلحة، والجدوى التجارية للمنتجات.

بدأت مسيرتي التقنية في هندسة الواجهات الأمامية باستخدام React، قبل أن أتوسع نحو معمارية الفول ستاك الكاملة عبر تدريب مكثف في تقنيات MEAN Stack بالمعهد القومي للاتصالات (NTI). ساهمت هذه الرحلة في صقل قدرتي على تفكيك المشاريع المعقدة، وجمع متطلبات العملاء مباشرة، وتحليل نقاط الضعف، والتفاوض على أفضل الحلول التقنية الفعالة.

تكمن قيمتي الفريدة (USP) في ابتكار واجهات مستخدم (UI/UX) استثنائية وعالية التحويل، مع الحفاظ على أعلى معايير الأداء وتطبيق معماريات أمنية متعددة الطبقات عبر كامل طبقات التطبيق. أعمل باستمرار على تطوير مهاراتي الهندسية من خلال مواكبة تحولات الصناعة ودمج أدوات الذكاء الاصطناعي (AI Workflows) في دورة تطوير البرمجيات لبناء منتجات رقمية نظيفة، قابلة للتوسع، وموجهة لخدمة الأعمال.

أبرز القدرات التقنية:
• تطوير الواجهة الأمامية: تقنيات Angular (Signals & Standalone), React 19, Next.js 15, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap.
• الواجهة الخلفية وقواعد البيانات: Node.js, Express.js (REST APIs), MongoDB, Mongoose, Firebase (Firestore, Auth, onSnapshot).
• إدارة الحالة: RxJS, Reactive Forms, Zustand, React Context API.
• المعمارية والأمان: Clean Architecture, توثيق JWT, تشفير Bcrypt, صلاحيات RBAC, وضمانات Soft-Delete.
• أفضل الممارسات: أنماط Optimistic UI, معالجة غير متزامنة, تحسين محركات البحث SEO / GEO / AEO, ومسارات الذكاء الاصطناعي.`
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
      flagshipBadge: "المشروع الريادي للمؤسسات",
      otherProjectsTitle: "مشاريع برمجية أخرى",
      shoPRO: {
        title: "منصة shoPRO — نظام تجارة إلكترونية متكامل للمؤسسات",
        description: "منصة تجارة إلكترونية متكاملة صُممت لتقديم تجربة تسوق فائقة السرعة ترفع معدلات التحويل وتمنح الشركات تحكماً تشغيلياً ومالياً شاملاً. يتميز المشروع بمعمارية هجينة لإدارة سلة المشتريات تمنع فقدان طلبات الزوار، مع دعم أصيل ثنائي اللغة (العربية والإنجليزية) بحركات انتقال ثلاثية الأبعاد سلسة، ومحرك خصومات وكوبونات تفاعلي، ولوحة تحكم ذكية تقدم رسوماً بيانية وتقارير لحظية للمبيعات وصافي الأرباح.",
        highlightsTitle: "أبرز المميزات التشغيلية والتقنية",
        highlight1Title: "تجربة عميل سلسة ومحفزة للتحويل",
        highlight1Desc: "نظام سلة هجين يدمج مشتريات الزائر تلقائياً بالسحابة فور تسجيل الدخول، مع تأثير حركي مرئي لإضافة المنتجات، وتتبع حي لمراحل الشحن السبعة.",
        highlight2Title: "ذكاء أعمال وإدارة متقدمة",
        highlight2Desc: "لوحة تحكم تفاعلية متقدمة لقياس المبيعات، أفضل 10 منتجات، الأقسام الأكثر ربحية، وسجل تدقيق شامل للمعاملات المالية.",
        highlight3Title: "معمارية كود نظيفة وصارمة",
        highlight3Desc: "مبني بأحدث معايير Angular 21 بنظام المكونات المستقلة والإشارات لواجهة فائقة الاستجابة، مدعوماً بخلفية Node.js و Express 5 مع قاعدة بيانات MongoDB ونظام حماية وتوثيق مشفر بـ JWT و Bcrypt وذاكرة تخزين مؤقت لتسريع الاستجابة.",
        ctaQuote: "هل تبحث عن بنية تحتية برمجية قابلة للتوسع وتراعي أفضل الممارسات الهندسية؟ أدعوك لفحص الكود المصدري للمشروع على GitHub للتعرف على التنظيم المعماري للخدمات، إدارة الحالة التفاعلية، وتأمين المسارات الحساسة.",
        liveDemoBtn: "معاينة المتجر المباشر",
        sourceCodeBtn: "كود المشروع على GitHub",
        frontendRepoBtn: "كود الواجهة الأمامية",
        backendRepoBtn: "كود الواجهة الخلفية"
      },
      personalPortfolio: {
        title: "الموقع والمنصة الرقمية الشخصية",
        description: "منصة وبورتفوليو رقمي يجسد القيمة الفريدة: تصميم واجهات مستخدم فائقة الاستجابة مع بنية Next.js 15 Server Components فائقة السرعة وهيكلية بيانات JSON-LD متوافقة مع محركات البحث وأنظمة الذكاء الاصطناعي (SEO / GEO / AEO)."
      },
      parisClinic: {
        title: "نظام عيادة باريس — منصة حجز المرضى",
        description: "منصة طبية واقعية لإدارة عيادة أسنان وأتمتة الحجوزات مع منع التعارض والتكرار في المواعيد باستخدام Cloud Firestore onSnapshot والمعاملات الذرية."
      },
      eShop: {
        title: "إي-شوب للإلكترونيات",
        description: "سوق إلكتروني متقدم للإلكترونيات مصمم للأداء العالي باستخدام تقنيات Next.js الحديثة ومكونات الخادم."
      },
      veloraBags: {
        title: "متجر فيلورا للحقائب",
        description: "متجر إلكتروني فاخر لتسوق الحقائب مع إدارة لحظية للمخزون والطلبات ومزامنة الحالة عبر Zustand."
      },
      features: "المميزات",
      techStack: "التقنيات المستخدمة"
    },
    education: {
      title: "التعليم والشهادات",
      degree: "بكالوريوس في نظم المعلومات الإدارية (تخرج)",
      university: "المعهد العالي لعلوم الحاسب ونظم المعلومات الإدارية (HICMIS)",
      ntiTitle: "تدريب هندسة برمجيات MEAN Stack (معتمد)",
      ntiInstitute: "المعهد القومي للاتصالات (NTI)",
      ntiPeriod: "شهادة معتمدة / مكتمل"
    },
    contact: {
      title: "تواصل معي",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      linkedin: "لينكد إن",
      github: "جيت هب"
    },
    seo: {
      homeTitle: "محمد خالد | مهندس برمجيات فول ستاك (MEAN Stack & React 19 / Next.js)",
      homeDesc: "الموقع الشخصي لمحمد خالد عبدالستار، متخصص في بناء تطبيقات الويب المتقدمة باستخدام MEAN Stack و React 19 و Next.js 15.",
      aboutTitle: "من أنا - محمد خالد",
      aboutDesc: "تعرف على الخبرة والخلفية التقنية لمحمد خالد مهندس برمجيات MEAN Stack.",
      skillsTitle: "المهارات - محمد خالد",
      skillsDesc: "المهارات التقنية والخبرات في Angular, React 19, Next.js 15, Node.js, Express, MongoDB وإدارة الحالة.",
      experienceTitle: "الخبرات العملية - محمد خالد",
      experienceDesc: "سجل الخبرات والمسيرة المهنية لمحمد خالد عبدالستار.",
      projectsTitle: "المشاريع - محمد خالد",
      projectsDesc: "أبرز مشاريع وتطبيقات الويب المتكاملة المتميزة.",
      educationTitle: "التعليم - محمد خالد",
      educationDesc: "المؤهلات العلمية والأكاديمية لمحمد خالد عبدالستار.",
      contactTitle: "تواصل معي - محمد خالد",
      contactDesc: "تواصل مع محمد خالد لبدء مشاريع جديدة أو الاستفسار عن فرص العمل."
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      madeWith: "صُنع بشغف وبأحدث تقنيات الويب"
    }
  }
};