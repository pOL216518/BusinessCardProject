import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import type { Project, Skill } from '../../generated/prisma/client.js';
import type { Loaders } from '../../graphql/dataloader/dataloader.factory.js';
import { SkillModel } from '../skill/models/skill.model.js';
import { ProjectModel } from './models/project.model.js';

@Resolver(() => ProjectModel)
export class ProjectResolver {
  @ResolveField('technologies', () => [SkillModel])
  technologies(
    @Parent() project: Project,
    @Context('loaders') loaders: Loaders,
  ): Promise<Skill[]> {
    return loaders.skillsByProjectId.load(project.id);
  }
}