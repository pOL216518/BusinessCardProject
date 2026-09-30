# Цифровая визитка — GraphQL API

Backend-визитка Ершова Евгения Дмитриевича

**Стек:** TypeScript · Node.js 24 · NestJS 12 · GraphQL (Apollo Server 5) · Prisma 7 · PostgreSQL · Docker

## Старт

```bash
docker compose up --build
```

Откройте Apollo Sandbox: http://localhost:3000/graphql

При старте контейнер сам применяет миграции (`prisma migrate deploy`) и наполняет БД (`seed`).

## Пример запроса

```graphql
query {
  profile {
    name
    description
    links { url resourceType { name } }
    totalExperience { text }
    skills { name category { name } }
    experience {
      company
      position
      period { text duration { text } }
      achievements
      technologies { name }
    }
    projects { name repositoryUrl technologies { name } }
  }
}
```

## Архитектура

```
src/
├── config/            валидация переменных окружения (Joi)
├── database/          PrismaService, soft-delete, seed
├── graphql/           настройка Apollo + DataLoader'ы на каждый запрос
├── modules/
│   ├── profile/       resolver → service → repository
│   ├── skill/
│   ├── experience/    domain/period.ts — расчёт стажа (чистые функции + тесты)
│   └── project/
└── health/            GET /health (проверка БД)
```

- **Resolver** — только GraphQL, принимает аргументы, отдаёт поля.
- **Service** — бизнес-логика: стаж, группировка, профиль по умолчанию.
- **Repository** — единственное место с Prisma-запросами; все выборки учитывают `is_deleted`.
- **DataLoader** — вложенные поля (`skills`, `experience.technologies`, `skill.category` …) загружаются пакетно.

## База данных



| Таблица | Назначение |
|---|---|
| `profiles` | профиль |
| `resource_types` , `profile_links` | справочник типов ресурсов и ссылки профиля |
| `skill_categories` , `skills` | справочник навыков |
| `profile_skills`, `experience_skills`, `project_skills` | связи M:N с навыками |
| `companies` , `experiences` , `experience_achievements` | опыт работы |
| `projects` | проекты |

Миграции находятся — `prisma/migrations`.

## Локальная разработка

```bash
cp .env.example .env
docker compose up -d db
npm install
npm run db:migrate      
npm run db:seed:dev     
npm run start:dev
```

| Скрипт | Что делает |
|---|---|
| `npm test` | unit-тесты (Vitest) |
| `npm run lint` | линтер (oxlint) |
| `npm run db:migrate` | создать/применить миграцию в dev |
| `npm run db:setup` | миграции + seed (после `build`) |
