import { Env, loadConfig } from '@config/config';

process.env.TZ = 'UTC';
loadConfig((process.env.NODE_ENV?.trim() ?? 'dev') as Env);
