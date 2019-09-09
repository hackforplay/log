import test from 'ava';
import { createLogger } from '.';
import g from 'global';

test('Create with same keys', t => {
  const logger1 = createLogger();
  const logger2 = createLogger();

  t.is(logger1, logger2);
});

test('Create with different keys', t => {
  const logger1 = createLogger('1');
  const logger2 = createLogger('2');

  t.not(logger1, logger2);
});

test('Check default global var name', t => {
  const logger = createLogger();
  t.is(logger, g['Unique primary key used by @hackforplay/log']);
});
