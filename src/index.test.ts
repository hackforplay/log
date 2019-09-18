import test from 'ava';
import { createLogger } from '.';
import g from 'global';

test('Create with same keys', t => {
  const log1 = createLogger().log;
  const log2 = createLogger().log;

  log1('Hello!');
  log2('World!');

  t.is(log1, log2);
  t.is(createLogger().stringify(), 'Hello!\nWorld!');
});

test('Create with different keys', t => {
  const logger1 = createLogger('1');
  const logger2 = createLogger('2');

  logger1.log('Hello!');
  logger2.log('World!');

  t.not(logger1, logger2);
  t.is(logger1.stringify(), 'Hello!');
  t.is(logger2.stringify(), 'World!');
});

test('Check default global var name', t => {
  const logger = createLogger();
  t.is(logger, g['Unique primary key used by @hackforplay/log']);
});
