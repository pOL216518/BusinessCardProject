import { Module } from '@nestjs/common';
import { ProjectRepository } from './project.repository.js';
import { ProjectService } from './project.service.js';
import { ProjectResolver } from './project.resolver.js';

@Module({
  providers: [ProjectRepository, ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}