import { AppEnv } from '../constants/appEnvs';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: AppEnv;
      JWT_SECRET: string;
      PORT?: string;
    }
  }
}

// This empty export statement is crucial. It turns this file into a module,
// which is required for augmenting the global namespace.
export {};