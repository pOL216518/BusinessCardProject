import { Module } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository.js';
import { ExperienceService } from './experience.service.js';

@Module({
  providers: [ExperienceRepository, ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}