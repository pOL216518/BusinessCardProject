import { Module } from '@nestjs/common';
import { ProfileRepository } from './profile.repository.js';
import { ProfileService } from './profile.service.js';
import { ExperienceModule } from '../experience/experience.module.js';
import { ProfileResolver } from './profile.resolver.js';

@Module({
  imports: [ExperienceModule],
  providers: [ProfileRepository, ProfileService, ProfileResolver],
  exports: [ProfileService],
})
export class ProfileModule {}