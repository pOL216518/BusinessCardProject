import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillCategoryModel } from './skill-category.model.js';

@ObjectType('Skill', { description: 'Навык или технология' })
export class SkillModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => SkillCategoryModel, {
    description: 'Резолвится через DataLoader',
  })
  category: SkillCategoryModel;
}