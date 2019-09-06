import g from 'global';
import { Logger } from './logger';

export function createLogger<T = IDefaultStructure>(
  primaryKey = 'Unique primary key used by @hackforplay/log'
) {
  if (primaryKey in g) {
    return g[primaryKey] as Logger<T>;
  }

  const logger = new Logger<T>();
  g[primaryKey] = logger;
  return logger;
}

export interface IDefaultStructure {
  payload: string;
}
