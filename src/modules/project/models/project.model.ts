import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillModel } from '../../skill/models/skill.model.js';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на работающий проект',
  })
  url: string | null;

  @Field(() => String, { nullable: true, description: 'Ссылка на репозиторий' })
  repositoryUrl: string | null;

  @Field(() => [SkillModel], { description: 'Стек проекта' })
  technologies: SkillModel[];
}