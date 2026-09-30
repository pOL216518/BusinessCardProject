import type { Prisma } from '../../generated/prisma/client.js';
import type {
  ExperienceSeed,
  ProfileSeed,
  ProjectSeed,
  SeedData,
  YearMonth,
} from './seed-data.types.js';

type Tx = Prisma.TransactionClient;
type IdByKey = Map<string, string>;

/** Каждая запись ищется по ключу (code, name, slug и т.д.) и создаётся или обновляется через upsert*/
export class Seeder {
  constructor(private readonly tx: Tx) {}

  async run(data: SeedData): Promise<void> {
    const resourceTypeIds = await this.seedResourceTypes(data);
    const skillIds = await this.seedSkills(data);
    const companyIds = await this.seedCompanies(data);

    const profileId = await this.seedProfile(data.profile);
    await this.seedProfileLinks(profileId, data.profile, resourceTypeIds);
    await this.seedProfileSkills(profileId, data.profile, skillIds);

    for (const experience of data.profile.experiences) {
      await this.seedExperience(profileId, experience, companyIds, skillIds);
    }

    for (const [index, project] of data.profile.projects.entries()) {
      await this.seedProject(profileId, project, index, skillIds);
    }
  }

  private async seedResourceTypes(data: SeedData): Promise<IdByKey> {
    const ids: IdByKey = new Map();
    for (const { code, name } of data.resourceTypes) {
      const { id } = await this.tx.resourceType.upsert({
        where: { code },
        create: { code, name },
        update: { name },
      });
      ids.set(code, id);
    }
    return ids;
  }

  private async seedSkills(data: SeedData): Promise<IdByKey> {
    const ids: IdByKey = new Map();
    for (const [index, category] of data.skillCategories.entries()) {
      const { id: categoryId } = await this.tx.skillCategory.upsert({
        where: { code: category.code },
        create: { code: category.code, name: category.name, sortOrder: index },
        update: { name: category.name, sortOrder: index },
      });

      for (const name of category.skills) {
        const { id } = await this.tx.skill.upsert({
          where: { name },
          create: { name, categoryId },
          update: { categoryId },
        });
        ids.set(name, id);
      }
    }
    return ids;
  }

  private async seedCompanies(data: SeedData): Promise<IdByKey> {
    const ids: IdByKey = new Map();
    for (const { name, ...details } of data.companies) {
      const { id } = await this.tx.company.upsert({
        where: { name },
        create: { name, ...details },
        update: details,
      });
      ids.set(name, id);
    }
    return ids;
  }

  private async seedProfile(profile: ProfileSeed): Promise<string> {
    const fields = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      middleName: profile.middleName,
      headline: profile.headline,
      description: profile.description,
      location: profile.location,
      email: profile.email,
    };
    const { id } = await this.tx.profile.upsert({
      where: { slug: profile.slug },
      create: { slug: profile.slug, ...fields },
      update: fields,
    });
    return id;
  }

  private async seedProfileLinks(
    profileId: string,
    profile: ProfileSeed,
    resourceTypeIds: IdByKey,
  ): Promise<void> {
    for (const [sortOrder, link] of profile.links.entries()) {
      const resourceTypeId = requireId(
        resourceTypeIds,
        link.resourceType,
        'resource type',
      );
      await this.tx.profileLink.upsert({
        where: { profileId_url: { profileId, url: link.url } },
        create: { profileId, url: link.url, resourceTypeId, sortOrder },
        update: { resourceTypeId, sortOrder },
      });
    }
  }

  private async seedProfileSkills(
    profileId: string,
    profile: ProfileSeed,
    skillIds: IdByKey,
  ): Promise<void> {
    for (const [sortOrder, name] of profile.skills.entries()) {
      const skillId = requireId(skillIds, name, 'skill');
      await this.tx.profileSkill.upsert({
        where: { profileId_skillId: { profileId, skillId } },
        create: { profileId, skillId, sortOrder },
        update: { sortOrder },
      });
    }
  }

  private async seedExperience(
    profileId: string,
    experience: ExperienceSeed,
    companyIds: IdByKey,
    skillIds: IdByKey,
  ): Promise<void> {
    const companyId = requireId(companyIds, experience.company, 'company');
    const startDate = parseYearMonth(experience.startDate);
    const fields = {
      position: experience.position,
      endDate: experience.endDate ? parseYearMonth(experience.endDate) : null,
      description: experience.description,
    };

    const { id: experienceId } = await this.tx.experience.upsert({
      where: {
        profileId_companyId_startDate: { profileId, companyId, startDate },
      },
      create: { profileId, companyId, startDate, ...fields },
      update: fields,
    });

    for (const [sortOrder, description] of experience.achievements.entries()) {
      await this.tx.experienceAchievement.upsert({
        where: { experienceId_sortOrder: { experienceId, sortOrder } },
        create: { experienceId, sortOrder, description },
        update: { description },
      });
    }

    for (const [sortOrder, name] of experience.technologies.entries()) {
      const skillId = requireId(skillIds, name, 'skill');
      await this.tx.experienceSkill.upsert({
        where: { experienceId_skillId: { experienceId, skillId } },
        create: { experienceId, skillId, sortOrder },
        update: { sortOrder },
      });
    }
  }

  private async seedProject(
    profileId: string,
    project: ProjectSeed,
    sortOrder: number,
    skillIds: IdByKey,
  ): Promise<void> {
    const fields = {
      name: project.name,
      description: project.description,
      url: project.url,
      repositoryUrl: project.repositoryUrl,
      sortOrder,
    };

    const { id: projectId } = await this.tx.project.upsert({
      where: { profileId_slug: { profileId, slug: project.slug } },
      create: { profileId, slug: project.slug, ...fields },
      update: fields,
    });

    for (const [index, name] of project.technologies.entries()) {
      const skillId = requireId(skillIds, name, 'skill');
      await this.tx.projectSkill.upsert({
        where: { projectId_skillId: { projectId, skillId } },
        create: { projectId, skillId, sortOrder: index },
        update: { sortOrder: index },
      });
    }
  }
}

/** Преобразование из '2024-06' в 2024-06-01 (UTC) */
function parseYearMonth(value: YearMonth): Date {
  const [year, month] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 1));
}

/** Ошибка в seed-data (опечатка в названии навыка и т.п.) валит сид явно */
function requireId(ids: IdByKey, key: string, entity: string): string {
  const id = ids.get(key);
  if (!id) {
    throw new Error(`Данные ссылаются на неизвестную сущность ${entity}: "${key}"`);
  }
  return id;
}