# @hackforplay/log

[![Actions Status](https://github.com/hackforplay/log/workflows/Release%20package/badge.svg)](https://github.com/hackforplay/log/actions)
[![npm latest version](https://img.shields.io/npm/v/@hackforplay/log/latest.svg)](https://www.npmjs.com/package/@hackforplay/log)

This is a simple logger written in TypeScript. Created for [@hackforplay/sandbox](https://github.com/hackforplay/sandbox) and [@hackforplay/common](https://github.com/hackforplay/common).

Type definition is ready to import! d.ts is included in this package.

## Install

`npm install @hackforplay/log`

## How to use

```javascript
import { createLogger } from '@hackforplay/log';

const logger = createLogger();

// Show all logs
logger.subscribe(console.info);

// Add a new line
const log = logger.log;
log('Hello World!');
```

## Sharing loggers between independent libraries

As you use `createLogger()`, **the shared reference will be injected in global.** e.g. `window` in browsers or `self` in the Node.js.

```javascript
import { createLogger } from '@hackforplay/log';

const loggerA = createLogger();
const loggerB = createLogger();
console.log(loggerA === loggerB); // true

const loggerC = createLogger('You can use different reference with key string');
console.log(loggerA === loggerC); // false

// Yes, This is global injection :P
console.log(
  loggerC === window['You can use different reference with key string']
); // true
```

If you hate this way, you can use constructor. This way **DO NOT** global injection.

```javascript
import { Logger } from '@hackforplay/log';

const logger = new Logger();

// Show all logs
logger.subscribe(console.info);

// Add a new line
const log = logger.log;
log('Hello World!');
```
