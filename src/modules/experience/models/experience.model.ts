import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillModel } from '../../skill/models/skill.model.js';
import { CompanyModel } from './company.model.js';
import { PeriodModel } from './period.model.js';

@ObjectType('Experience', { description: 'Место работы' })
export class ExperienceModel {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Название компании' })
  company: string;

  @Field(() => CompanyModel, { description: 'Подробная информация о компании' })
  companyInfo: CompanyModel;

  @Field()
  position: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => PeriodModel)
  period: PeriodModel;

  @Field(() => [String])
  achievements: string[];

  @Field(() => [SkillModel], {
    description: 'Технологии, использованные на этом месте работы',
  })
  technologies: SkillModel[];
}