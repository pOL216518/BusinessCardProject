import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import type { Profile, Project, Skill } from '../../generated/prisma/client.js';
import type { Loaders } from '../../graphql/dataloader/dataloader.factory.js';
import type { Duration } from '../experience/domain/period.js';
import { ExperienceService } from '../experience/experience.service.js';
import type { ExperienceWithCompany } from '../experience/experience.repository.js';
import { DurationModel } from '../experience/models/duration.model.js';
import { ExperienceModel } from '../experience/models/experience.model.js';
import { ProjectModel } from '../project/models/project.model.js';
import { SkillModel } from '../skill/models/skill.model.js';
import { ProfileLinkModel } from './models/profile-link.model.js';
import { ProfileModel } from './models/profile.model.js';
import type { ProfileLinkWithType } from './profile.repository.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly experienceService: ExperienceService,
  ) {}

  @Query(() => ProfileModel, {
    nullable: true,
    description: 'Профиль по slug; без аргумента — профиль владельца визитки',
  })
  profile(
    @Args('slug', { type: () => String, nullable: true }) slug?: string | null,
  ): Promise<Profile | null> {
    return this.profileService.getBySlug(slug);
  }

  @ResolveField('name', () => String)
  name(@Parent() profile: Profile): string {
    return this.profileService.getDisplayName(profile);
  }

  @ResolveField('links', () => [ProfileLinkModel])
  links(
    @Parent() profile: Profile,
    @Context('loaders') loaders: Loaders,
  ): Promise<ProfileLinkWithType[]> {
    return loaders.linksByProfileId.load(profile.id);
  }

  @ResolveField('skills', () => [SkillModel])
  skills(
    @Parent() profile: Profile,
    @Context('loaders') loaders: Loaders,
  ): Promise<Skill[]> {
    return loaders.skillsByProfileId.load(profile.id);
  }

  @ResolveField('experience', () => [ExperienceModel])
  experience(
    @Parent() profile: Profile,
    @Context('loaders') loaders: Loaders,
  ): Promise<ExperienceWithCompany[]> {
    return loaders.experiencesByProfileId.load(profile.id);
  }

  @ResolveField('totalExperience', () => DurationModel)
  async totalExperience(
    @Parent() profile: Profile,
    @Context('loaders') loaders: Loaders,
  ): Promise<Duration> {
    const experiences = await loaders.experiencesByProfileId.load(profile.id);
    return this.experienceService.getTotalDuration(experiences);
  }

  @ResolveField('projects', () => [ProjectModel])
  projects(
    @Parent() profile: Profile,
    @Context('loaders') loaders: Loaders,
  ): Promise<Project[]> {
    return loaders.projectsByProfileId.load(profile.id);
  }
}