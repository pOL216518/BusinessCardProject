import { Injectable } from '@nestjs/common';
import type {
  Profile,
  ProfileLink,
  ResourceType,
} from '../../generated/prisma/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { NOT_DELETED } from '../../database/soft-delete.js';

export type ProfileLinkWithType = ProfileLink & { resourceType: ResourceType };

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findBySlug(slug: string): Promise<Profile | null> {
    return this.prisma.profile.findFirst({ where: { slug, ...NOT_DELETED } });
  }

  findLinksByProfileIds(
    profileIds: readonly string[],
  ): Promise<ProfileLinkWithType[]> {
    return this.prisma.profileLink.findMany({
      where: {
        profileId: { in: [...profileIds] },
        ...NOT_DELETED,
        resourceType: NOT_DELETED,
      },
      include: { resourceType: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}