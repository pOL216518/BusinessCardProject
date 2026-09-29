export type YearMonth = `${number}-${number}`;

export interface ResourceTypeSeed {
  code: string;
  name: string;
}

export interface SkillCategorySeed {
  code: string;
  name: string;
  skills: string[];
}

export interface CompanySeed {
  name: string;
  city?: string;
  website?: string;
  industry?: string;
}

export interface ProfileLinkSeed {
  resourceType: ResourceTypeSeed['code'];
  url: string;
}

export interface ExperienceSeed {
  company: CompanySeed['name'];
  position: string;
  startDate: YearMonth;
  endDate?: YearMonth;
  description?: string;
  achievements: string[];
  technologies: string[];
}

export interface ProjectSeed {
  slug: string;
  name: string;
  description?: string;
  url?: string;
  repositoryUrl?: string;
  technologies: string[];
}

export interface ProfileSeed {
  slug: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  headline: string;
  description: string;
  location?: string;
  email?: string;
  links: ProfileLinkSeed[];
  skills: string[];
  experiences: ExperienceSeed[];
  projects: ProjectSeed[];
}

export interface SeedData {
  resourceTypes: ResourceTypeSeed[];
  skillCategories: SkillCategorySeed[];
  companies: CompanySeed[];
  profile: ProfileSeed;
}