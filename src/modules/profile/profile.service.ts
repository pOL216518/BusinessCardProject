import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Profile } from '../../generated/prisma/client.js';
import { groupBy } from '../../common/utils/group-by.js';
import type { EnvironmentVariables } from '../../config/env.validation.js';
import {
  ProfileRepository,
  type ProfileLinkWithType,
} from './profile.repository.js';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly config: ConfigService<EnvironmentVariables, true>,
  ) {}

  getBySlug(slug?: string | null): Promise<Profile | null> {
    return this.profileRepository.findBySlug(
      slug ?? this.config.get('DEFAULT_PROFILE_SLUG', { infer: true }),
    );
  }

  getDisplayName(profile: Profile): string {
    return `${profile.firstName} ${profile.lastName}`;
  }

  async getLinksByProfileIds(
    profileIds: readonly string[],
  ): Promise<Map<string, ProfileLinkWithType[]>> {
    const links =
      await this.profileRepository.findLinksByProfileIds(profileIds);
    return groupBy(links, (link) => link.profileId);
  }
}