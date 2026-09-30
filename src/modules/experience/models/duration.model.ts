import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Duration', {
  description: 'Продолжительность с точностью до месяца',
})
export class DurationModel {
  @Field(() => Int)
  years: number;

  @Field(() => Int, { description: 'Остаток месяцев сверх полных лет' })
  months: number;

  @Field(() => Int)
  totalMonths: number;

  @Field({ description: 'Человекочитаемо, например «2 года 4 месяца»' })
  text: string;
}