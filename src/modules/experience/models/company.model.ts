import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Company')
export class CompanyModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  city: string | null;

  @Field(() => String, { nullable: true })
  website: string | null;

  @Field(() => String, { nullable: true })
  industry: string | null;
}