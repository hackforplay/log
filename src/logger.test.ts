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

test('Restrict logging in subscriber', t => {
  const logger = new Logger();
  t.throws(
    () => {
      logger.subscribe(() => {
        logger.log('log and log and... it causes infinite loop!');
      });
      logger.log('This is first log of the endless loop.');
    },
    null,
    'log and log and... it causes infinite loop!'
  );
});
