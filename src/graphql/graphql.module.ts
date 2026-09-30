import { join } from 'node:path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import type { Request } from 'express';
import type { EnvironmentVariables } from '../config/env.validation.js';
import { DataLoaderFactory } from './dataloader/dataloader.factory.js';
import { DataLoaderModule } from './dataloader/dataloader.module.js';

@Module({
  imports: [
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      inject: [ConfigService, DataLoaderFactory],
      useFactory: (
        config: ConfigService<EnvironmentVariables, true>,
        dataLoaderFactory: DataLoaderFactory,
      ) => {
        const isProduction =
          config.get('NODE_ENV', { infer: true }) === 'production';

        return {
          // В деве пишем схему в файл — удобно глянуть в ревью
          // В проде — только в память, иначе Vercel ругнётся, ФС там readonly.
          autoSchemaFile: isProduction
            ? true
            : join(process.cwd(), 'schema.gql'),
          sortSchema: true,
          playground: false,
          introspection: true,
          plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
          context: ({ req }: { req: Request }) => ({
            req,
            loaders: dataLoaderFactory.create(),
          }),
        };
      },
    }),
  ],
})
export class GraphQLModule {}