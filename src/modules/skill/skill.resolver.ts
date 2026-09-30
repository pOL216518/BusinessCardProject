import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import type { Skill, SkillCategory } from '../../generated/prisma/client.js';
import type { Loaders } from '../../graphql/dataloader/dataloader.factory.js';
import { SkillCategoryModel } from './models/skill-category.model.js';
import { SkillModel } from './models/skill.model.js';

@Resolver(() => SkillModel)
export class SkillResolver {
  @ResolveField('category', () => SkillCategoryModel)
  async category(
    @Parent() skill: Skill,
    @Context('loaders') loaders: Loaders,
  ): Promise<SkillCategory> {
    const category = await loaders.skillCategoryById.load(skill.categoryId);
    if (!category) {
      throw new Error(
        `Category ${skill.categoryId} of skill ${skill.id} not found`,
      );
    }
    return category;
  }
}