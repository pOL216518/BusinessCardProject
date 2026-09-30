import { Field, ObjectType } from '@nestjs/graphql';
import { DurationModel } from './duration.model.js';

@ObjectType('Period', { description: 'Период работы' })
export class PeriodModel {
  @Field()
  startDate: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'null — по настоящее время',
  })
  endDate: Date | null;

  @Field()
  isCurrent: boolean;

  @Field(() => DurationModel)
  duration: DurationModel;

  @Field({ description: 'Например «июнь 2024 — июль 2026»' })
  text: string;
}