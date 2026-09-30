import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import type { Company, Skill } from '../../generated/prisma/client.js';
import type { Loaders } from '../../graphql/dataloader/dataloader.factory.js';
import { SkillModel } from '../skill/models/skill.model.js';
import type { Period } from './domain/period.js';
import type { ExperienceWithCompany } from './experience.repository.js';
import { ExperienceService } from './experience.service.js';
import { CompanyModel } from './models/company.model.js';
import { ExperienceModel } from './models/experience.model.js';
import { PeriodModel } from './models/period.model.js';

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @ResolveField('company', () => String)
  company(@Parent() experience: ExperienceWithCompany): string {
    return experience.company.name;
  }

  @ResolveField('companyInfo', () => CompanyModel)
  companyInfo(@Parent() experience: ExperienceWithCompany): Company {
    return experience.company;
  }

  @ResolveField('period', () => PeriodModel)
  period(@Parent() experience: ExperienceWithCompany): Period {
    return this.experienceService.getPeriod(experience);
  }

  @ResolveField('achievements', () => [String])
  achievements(
    @Parent() experience: ExperienceWithCompany,
    @Context('loaders') loaders: Loaders,
  ): Promise<string[]> {
    return loaders.achievementsByExperienceId.load(experience.id);
  }

  @ResolveField('technologies', () => [SkillModel])
  technologies(
    @Parent() experience: ExperienceWithCompany,
    @Context('loaders') loaders: Loaders,
  ): Promise<Skill[]> {
    return loaders.skillsByExperienceId.load(experience.id);
  }
}