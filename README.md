# @hackforplay/log

This is a logger used by [@hackforplay/sandbox](https://github.com/hackforplay/sandbox) and [@hackforplay/common](https://github.com/hackforplay/common).

## How to use

```javascript
import { createLogger } from '@hackforplay/log';

const logger = createLogger();

// Show all logs
logger.subscribe(console.info);

// Append new log to the last
logger.append({
    payload: 'Hello World!'
});
`
```
