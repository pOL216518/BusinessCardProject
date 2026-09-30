import { Injectable } from '@nestjs/common';
import type {
  Company,
  Experience,
  ExperienceAchievement,
} from '../../generated/prisma/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { NOT_DELETED } from '../../database/soft-delete.js';

export type ExperienceWithCompany = Experience & { company: Company };

@Injectable()
export class ExperienceRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileIds(
    profileIds: readonly string[],
  ): Promise<ExperienceWithCompany[]> {
    return this.prisma.experience.findMany({
      where: {
        profileId: { in: [...profileIds] },
        ...NOT_DELETED,
        company: NOT_DELETED,
      },
      include: { company: true },
      orderBy: { startDate: 'desc' },
    });
  }

  findAchievementsByExperienceIds(
    experienceIds: readonly string[],
  ): Promise<ExperienceAchievement[]> {
    return this.prisma.experienceAchievement.findMany({
      where: { experienceId: { in: [...experienceIds] }, ...NOT_DELETED },
      orderBy: { sortOrder: 'asc' },
    });
  }
}