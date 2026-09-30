import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DurationModel } from '../../experience/models/duration.model.js';
import { ExperienceModel } from '../../experience/models/experience.model.js';
import { ProjectModel } from '../../project/models/project.model.js';
import { SkillModel } from '../../skill/models/skill.model.js';
import { ProfileLinkModel } from './profile-link.model.js';

@ObjectType('Profile', { description: 'Профиль специалиста' })
export class ProfileModel {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field({ description: 'Имя и фамилия' })
  name: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => String, { nullable: true })
  middleName: string | null;

  @Field({
    description: 'Желаемая должность, например «Fullstack-разработчик»',
  })
  headline: string;

  @Field({ description: 'Краткое описание' })
  description: string;

  @Field(() => String, { nullable: true })
  location: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => [ProfileLinkModel])
  links: ProfileLinkModel[];

  @Field(() => [SkillModel])
  skills: SkillModel[];

  @Field(() => [ExperienceModel], {
    description: 'Опыт работы, от нового к старому',
  })
  experience: ExperienceModel[];

  @Field(() => DurationModel, {
    description: 'Общий стаж без учёта пересечений',
  })
  totalExperience: DurationModel;

  @Field(() => [ProjectModel])
  projects: ProjectModel[];
}