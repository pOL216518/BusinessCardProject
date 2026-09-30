import Joi from 'joi';

export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL: string;
  DEFAULT_PROFILE_SLUG: string;
}

const schema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .required(),
  DEFAULT_PROFILE_SLUG: Joi.string().default('evgeny-ershov'),
});

/** Проверка на нужную конфигурацию */
export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const { error, value } = schema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error(`Некорректная конфигурация окружения: ${error.message}`);
  }

  return value;
}