import g from 'global';
import { Logger } from './logger';

export function createLogger(
  primaryKey = 'Unique primary key used by @hackforplay/log'
) {
  if (primaryKey in g) {
    return g[primaryKey] as Logger;
  }

  const logger = new Logger();
  g[primaryKey] = logger;
  return logger;
}

export function log(...args: string[]) {
  createLogger().log(...args);
}

export * from './logger';
