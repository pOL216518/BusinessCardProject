import { Injectable } from '@nestjs/common';
import { ExperienceService } from '../../modules/experience/experience.service.js';
import { ProfileService } from '../../modules/profile/profile.service.js';
import { ProjectService } from '../../modules/project/project.service.js';
import { SkillService } from '../../modules/skill/skill.service.js';
import { byIdLoader, oneToManyLoader } from './loader-builders.js';

export type Loaders = ReturnType<DataLoaderFactory['create']>;

@Injectable()
export class DataLoaderFactory {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillService: SkillService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
  ) {}

  create() {
    return {
      linksByProfileId: oneToManyLoader((ids) =>
        this.profileService.getLinksByProfileIds(ids),
      ),
      skillsByProfileId: oneToManyLoader((ids) =>
        this.skillService.getByProfileIds(ids),
      ),
      skillsByExperienceId: oneToManyLoader((ids) =>
        this.skillService.getByExperienceIds(ids),
      ),
      skillsByProjectId: oneToManyLoader((ids) =>
        this.skillService.getByProjectIds(ids),
      ),
      skillCategoryById: byIdLoader((ids) =>
        this.skillService.getCategoriesByIds(ids),
      ),
      experiencesByProfileId: oneToManyLoader((ids) =>
        this.experienceService.getByProfileIds(ids),
      ),
      achievementsByExperienceId: oneToManyLoader((ids) =>
        this.experienceService.getAchievementsByExperienceIds(ids),
      ),
      projectsByProfileId: oneToManyLoader((ids) =>
        this.projectService.getByProfileIds(ids),
      ),
    };
  }
}