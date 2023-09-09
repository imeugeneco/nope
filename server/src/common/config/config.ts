import * as fs from 'fs';
import { z } from 'zod';

const Env = z.enum(['dev', 'prod']);
export type Env = z.infer<typeof Env>;

const DB = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  username: z.string(),
  password: z.string(),
});
type DB = z.infer<typeof DB>;

const Config = z.object({
  env: Env,
  db: DB,
  port: z.number(),
  apiPrefix: z.string(),

  gitHash: z.string().optional(),

  primaryDbPrismaUrl: z.string(),
});
type Config = z.infer<typeof Config>;

let config: Config;

export function loadConfig(env: Env) {
  const envFile = './env.json';
  const envJsonString = fs.readFileSync(envFile).toString();

  config = validate(
    Object.assign({}, JSON.parse(envJsonString), process.env, {
      env,
    }),
  );
}

function validate(obj: any): Config {
  return Config.parse(obj);
}

export function getConfig(): Config {
  return config!;
}
