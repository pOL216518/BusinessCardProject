import { Injectable } from '@nestjs/common';
import type { Project } from '../../generated/prisma/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { NOT_DELETED } from '../../database/soft-delete.js';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileIds(profileIds: readonly string[]): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { profileId: { in: [...profileIds] }, ...NOT_DELETED },
      orderBy: { sortOrder: 'asc' },
    });
  }
}