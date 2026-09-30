import { Injectable } from '@nestjs/common';
import type { Experience } from '../../generated/prisma/client.js';
import { groupBy } from '../../common/utils/group-by.js';
import {
  toPeriod,
  totalDuration,
  type Duration,
  type Period,
} from './domain/period.js';
import {
  ExperienceRepository,
  type ExperienceWithCompany,
} from './experience.repository.js';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepository: ExperienceRepository) {}

  async getByProfileIds(
    profileIds: readonly string[],
  ): Promise<Map<string, ExperienceWithCompany[]>> {
    const experiences =
      await this.experienceRepository.findByProfileIds(profileIds);
    return groupBy(experiences, (experience) => experience.profileId);
  }

  async getAchievementsByExperienceIds(
    experienceIds: readonly string[],
  ): Promise<Map<string, string[]>> {
    const achievements =
      await this.experienceRepository.findAchievementsByExperienceIds(
        experienceIds,
      );
    return groupBy(
      achievements,
      (achievement) => achievement.experienceId,
      (achievement) => achievement.description,
    );
  }

  getPeriod(experience: Experience): Period {
    return toPeriod(toRange(experience), new Date());
  }

  getTotalDuration(experiences: readonly Experience[]): Duration {
    return totalDuration(experiences.map(toRange), new Date());
  }
}

function toRange({ startDate, endDate }: Experience) {
  return { start: startDate, end: endDate };
}