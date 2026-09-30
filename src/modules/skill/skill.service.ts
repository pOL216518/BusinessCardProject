import { Injectable } from '@nestjs/common';
import type { Skill, SkillCategory } from '../../generated/prisma/client.js';
import { groupBy } from '../../common/utils/group-by.js';
import { SkillRepository, type OwnedSkill } from './skill.repository.js';

type SkillsByOwnerId = Map<string, Skill[]>;

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  async getByProfileIds(
    profileIds: readonly string[],
  ): Promise<SkillsByOwnerId> {
    return groupByOwner(
      await this.skillRepository.findByProfileIds(profileIds),
    );
  }

  async getByExperienceIds(
    experienceIds: readonly string[],
  ): Promise<SkillsByOwnerId> {
    return groupByOwner(
      await this.skillRepository.findByExperienceIds(experienceIds),
    );
  }

  async getByProjectIds(
    projectIds: readonly string[],
  ): Promise<SkillsByOwnerId> {
    return groupByOwner(
      await this.skillRepository.findByProjectIds(projectIds),
    );
  }

  getCategoriesByIds(ids: readonly string[]): Promise<SkillCategory[]> {
    return this.skillRepository.findCategoriesByIds(ids);
  }
}

function groupByOwner(rows: OwnedSkill[]): SkillsByOwnerId {
  return groupBy(
    rows,
    (row) => row.ownerId,
    (row) => row.skill,
  );
}