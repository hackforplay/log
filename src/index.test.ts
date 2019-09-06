import test from 'ava';
import { createLogger } from '.';

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
