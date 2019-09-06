import test from 'ava';
import { Logger } from './logger';

test('Instantiate', t => {
  t.notThrows(() => {
    new Logger();
  });
});
