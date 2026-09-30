import { Injectable } from '@nestjs/common';
import type { Project } from '../../generated/prisma/client.js';
import { groupBy } from '../../common/utils/group-by.js';
import { ProjectRepository } from './project.repository.js';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getByProfileIds(
    profileIds: readonly string[],
  ): Promise<Map<string, Project[]>> {
    const projects = await this.projectRepository.findByProfileIds(profileIds);
    return groupBy(projects, (project) => project.profileId);
  }
}