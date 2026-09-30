import { Injectable } from '@nestjs/common';
import type { Skill, SkillCategory } from '../../generated/prisma/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { NOT_DELETED } from '../../database/soft-delete.js';

export interface OwnedSkill {
  ownerId: string;
  skill: Skill;
}

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly string[]): Promise<OwnedSkill[]> {
    const rows = await this.prisma.profileSkill.findMany({
      where: {
        profileId: { in: [...profileIds] },
        ...NOT_DELETED,
        skill: NOT_DELETED,
      },
      include: { skill: true },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(({ profileId, skill }) => ({ ownerId: profileId, skill }));
  }

  async findByExperienceIds(
    experienceIds: readonly string[],
  ): Promise<OwnedSkill[]> {
    const rows = await this.prisma.experienceSkill.findMany({
      where: {
        experienceId: { in: [...experienceIds] },
        ...NOT_DELETED,
        skill: NOT_DELETED,
      },
      include: { skill: true },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(({ experienceId, skill }) => ({
      ownerId: experienceId,
      skill,
    }));
  }

  async findByProjectIds(projectIds: readonly string[]): Promise<OwnedSkill[]> {
    const rows = await this.prisma.projectSkill.findMany({
      where: {
        projectId: { in: [...projectIds] },
        ...NOT_DELETED,
        skill: NOT_DELETED,
      },
      include: { skill: true },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(({ projectId, skill }) => ({ ownerId: projectId, skill }));
  }

  findCategoriesByIds(ids: readonly string[]): Promise<SkillCategory[]> {
    return this.prisma.skillCategory.findMany({
      where: { id: { in: [...ids] }, ...NOT_DELETED },
    });
  }
}