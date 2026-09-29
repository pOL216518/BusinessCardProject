import type { SeedData } from './seed-data.types.js';

const GITHUB_URL = 'https://github.com/pOL216518';

export const seedData: SeedData = {
  resourceTypes: [
    { code: 'GITHUB', name: 'GitHub' },
    { code: 'LINKEDIN', name: 'LinkedIn' },
    { code: 'HEADHUNTER', name: 'HeadHunter' },
    { code: 'TELEGRAM', name: 'Telegram' },
    { code: 'EMAIL', name: 'E-mail' },
  ],

  skillCategories: [
    {
      code: 'LANGUAGES',
      name: 'Языки программирования',
      skills: ['TypeScript', 'JavaScript', 'C#', 'Java', 'Python', 'SQL'],
    },
    {
      code: 'BACKEND',
      name: 'Backend',
      skills: [
        'Node.js',
        'NestJS',
        'GraphQL',
        'REST API',
        'Prisma',
        '.NET',
        'WCF',
        'Nancy',
        'LINQ',
        'Spring Boot',
      ],
    },
    {
      code: 'FRONTEND',
      name: 'Frontend',
      skills: ['Angular', 'React', 'Next.js', 'Webpack', 'VK Mini Apps'],
    },
    {
      code: 'DESKTOP',
      name: 'Desktop',
      skills: ['Avalonia UI', 'WPF'],
    },
    {
      code: 'DATABASES',
      name: 'Базы данных',
      skills: ['PostgreSQL', 'Budibase'],
    },
    {
      code: 'DEVOPS',
      name: 'Инструменты и DevOps',
      skills: ['Git', 'GitHub', 'Docker', 'Vercel'],
    },
    {
      code: 'PRACTICES',
      name: 'Подходы и практики',
      skills: [
        'SOLID',
        'MVVM',
        'MVC',
        'UML',
        'Code review',
        'Работа с legacy-кодом',
        'Кроссплатформенная сборка',
        'Интеграция с оборудованием (DeviceNet)',
      ],
    },
  ],

  companies: [
    {
      name: 'РБ-Софт',
      city: 'Улан-Удэ',
      website: 'https://www.rb-soft.ru',
      industry:
        'Системная интеграция, автоматизация бизнес-процессов, ИТ-консалтинг',
    },
    {
      name: 'СибДиджитал',
      city: 'Улан-Удэ',
    },
  ],

  profile: {
    slug: 'evgeny-ershov',
    firstName: 'Евгений',
    lastName: 'Ершов',
    middleName: 'Дмитриевич',
    headline: 'Fullstack-разработчик',
    description:
      'Full-stack разработчик с опытом коммерческой веб-разработки более 2 лет, ' +
      'до этого около 3 лет разрабатывал desktop-приложения на .NET / C#. ' +
      'Уверенно работаю с frontend и backend: TypeScript, JavaScript, C#, Java, Python; ' +
      'Next.js, Angular, Node.js, Spring. Опыт интеграций с оборудованием, модернизации ' +
      'legacy-кода и кроссплатформенной сборки под macOS и Linux. Ориентирован на результат, ' +
      'имею опыт код-ревью и совместной работы над архитектурными решениями.',
    location: 'Москва',
    email: 'evgen6538655@gmail.com',
    links: [
      { resourceType: 'GITHUB', url: GITHUB_URL },
      { resourceType: 'EMAIL', url: 'mailto:evgen6538655@gmail.com' },
    ],
    skills: [
      'TypeScript',
      'JavaScript',
      'Node.js',
      'NestJS',
      'GraphQL',
      'Prisma',
      'REST API',
      'React',
      'Next.js',
      'Angular',
      'C#',
      '.NET',
      'Avalonia UI',
      'WPF',
      'WCF',
      'Nancy',
      'LINQ',
      'Java',
      'Spring Boot',
      'Python',
      'SQL',
      'PostgreSQL',
      'Git',
      'GitHub',
      'Docker',
      'Webpack',
      'SOLID',
      'MVVM',
      'MVC',
      'UML',
      'Code review',
      'Работа с legacy-кодом',
    ],
    experiences: [
      {
        company: 'РБ-Софт',
        position: 'Инженер-программист',
        startDate: '2026-07',
        description:
          'Разработка на C# и .NET: desktop-приложения, сервисная часть, интеграции с оборудованием, ' +
          'а также frontend-задачи на TypeScript.',
        achievements: [
          'Разрабатываю desktop-приложения на Avalonia UI и сервисную часть на WCF, веб-сервисы на Nancy.',
          'Реализую интеграции с оборудованием на базе DeviceNet с учётом специфики взаимодействия с устройствами.',
          'Разбираю legacy-проекты без документации: восстанавливаю бизнес-логику и поэтапно модернизирую архитектуру без нарушения работоспособности системы.',
          'Настроил сборку и адаптировал проекты под macOS и Linux, устранив проблемы кроссплатформенной совместимости.',
          'Настраиваю и отлаживаю сборочные pipeline frontend-проектов, разрабатываю на Next.js + React.',
        ],
        technologies: [
          'C#',
          '.NET',
          'Avalonia UI',
          'WCF',
          'Nancy',
          'Интеграция с оборудованием (DeviceNet)',
          'TypeScript',
          'Next.js',
          'React',
          'Webpack',
          'Работа с legacy-кодом',
          'Кроссплатформенная сборка',
        ],
      },
      {
        company: 'СибДиджитал',
        position: 'Инженер-программист',
        startDate: '2024-06',
        endDate: '2026-07',
        description:
          'Full-stack разработка веб-приложения в рамках платформы VK Mini Apps.',
        achievements: [
          'Разрабатывал frontend на Angular и TypeScript и backend на Java Spring Boot.',
          'Спроектировал и реализовал REST API приложения.',
          'Работал с базой данных PostgreSQL, использовал Budibase для удобной работы с данными.',
          'Участвовал в доведении продукта от идеи до работающего решения в составе команды.',
        ],
        technologies: [
          'Angular',
          'TypeScript',
          'Java',
          'Spring Boot',
          'REST API',
          'PostgreSQL',
          'Budibase',
          'VK Mini Apps',
        ],
      },
    ],
    projects: [
      {
        slug: 'cv-graphql-api',
        name: 'Цифровая визитка (GraphQL API)',
        description:
          'Этот сервис: backend-визитка на NestJS + GraphQL + Prisma с автоматической миграцией и наполнением БД при запуске.',
        repositoryUrl: `${GITHUB_URL}/cv-graphql-api`,
        technologies: [
          'TypeScript',
          'Node.js',
          'NestJS',
          'GraphQL',
          'Prisma',
          'PostgreSQL',
          'Docker',
          'Vercel',
        ],
      },
      {
        slug: 'vk-mini-app',
        name: 'Full-stack приложение VK Mini Apps',
        description:
          'Веб-приложение на платформе VK Mini Apps (СибДиджитал): Angular на клиенте, Spring Boot и PostgreSQL на сервере.',
        technologies: [
          'Angular',
          'TypeScript',
          'Spring Boot',
          'PostgreSQL',
          'VK Mini Apps',
        ],
      },
      {
        slug: 'web-studio',
        name: 'Заказные проекты веб-студии',
        description:
          'Вместе с другом вёл небольшую веб-студию: принимали заказы, вели проекты от согласования требований до сдачи готового решения.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Node.js'],
      },
    ],
  },
};