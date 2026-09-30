import { Module } from '@nestjs/common';
import { SkillRepository } from './skill.repository.js';
import { SkillService } from './skill.service.js';
import { SkillResolver } from './skill.resolver.js'

@Module({
  providers: [SkillRepository, SkillService, SkillResolver],
  exports: [SkillService],
})
export class SkillModule {}