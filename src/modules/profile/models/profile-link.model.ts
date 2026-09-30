import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ResourceType', { description: 'Тип профессионального ресурса' })
export class ResourceTypeModel {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Например GITHUB, LINKEDIN' })
  code: string;

  @Field()
  name: string;
}

@ObjectType('ProfileLink', { description: 'Ссылка на GitHub, LinkedIn и т.п.' })
export class ProfileLinkModel {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field(() => ResourceTypeModel)
  resourceType: ResourceTypeModel;
}