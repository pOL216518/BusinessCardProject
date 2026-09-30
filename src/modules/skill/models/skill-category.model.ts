import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Категория навыков (Backend, Frontend, ...)' })
export class SkillCategoryModel {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Код категории, например BACKEND' })
  code: string;

  @Field()
  name: string;
}