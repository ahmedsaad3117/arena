import { EnvTypes } from './env.enum';

export const getCurrentEnv = () => {
  const availableEnvs: EnvTypes[] = [
    EnvTypes.DEVELOPMENT,
    EnvTypes.TEST,
    EnvTypes.PRODUCTION,
  ];
  let currentEnv = process.env.NODE_ENV as EnvTypes;
  if (!availableEnvs.includes(currentEnv)) currentEnv = EnvTypes.DEVELOPMENT;

  return currentEnv;
};
