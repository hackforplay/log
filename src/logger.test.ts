import test from 'ava';
import { Logger } from './logger';

test('Instantiate', t => {
  t.notThrows(() => {
    new Logger();
  });
});

test('Stringify', t => {
  const logger = new Logger();
  logger.log('Hello World!');
  logger.log('Good', 'Bye');
  t.is(logger.stringify(), 'Hello World!\nGood Bye');
});

test.cb('Subscribe', t => {
  const logger = new Logger();
  logger.subscribe(line => {
    t.is(line.join(''), 'Hello World!');
    t.end();
  });
  logger.log('Hello World!');
});
