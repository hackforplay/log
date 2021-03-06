export interface ILogBody {
  line: string[];
  time: number;
}

export interface ISubscriber {
  (line: string[], time: number): void;
}

export class Logger {
  public logs: ILogBody[] = [];

  private subscribers: Set<ISubscriber> = new Set();
  private isDispatching = false;
  private assertDispatching(caller: string) {
    if (this.isDispatching) {
      throw new Error(
        `@hackforplay/log: You may not call ${caller} while subscriber is running.`
      );
    }
  }

  /**
   * Add a new message as single line. A line can contain few words.
   */
  public log: (...line: any[]) => void = this.add.bind(this);

  private add(...line: any[]) {
    this.assertDispatching('log()');
    try {
      this.isDispatching = true;
      const time = Date.now();
      const log: ILogBody = { line: line.map(toString), time };
      this.logs.push(log);
      for (const subscriber of this.subscribers) {
        subscriber(log.line, log.time);
      }
    } finally {
      this.isDispatching = false;
    }
  }

  /**
   * Receive all lines in this logger.
   * To stop this, you may call the function that is return value of subscribe().
   * @param subscriber function that will receive all lines of this logger.
   */
  public subscribe(subscriber: ISubscriber): () => void {
    this.assertDispatching('subscribe()');
    try {
      this.isDispatching = true;
      for (const log of this.logs) {
        subscriber(log.line, log.time);
      }
    } finally {
      this.isDispatching = false;
    }

    this.subscribers.add(subscriber);
    return () => {
      this.assertDispatching('unsubscriber');
      this.subscribers.delete(subscriber);
    };
  }

  /**
   * Get all lines separated by the specified separator string.
   * @param lineDelimiter A string used to separate one element of a line from the next in the resulting String. If omitted, the lines are separated with a \n.
   * @param wordDelimiter Separator of the words. If omitted, the lines are separated with a whitespace.
   */
  public stringify(lineDelimiter = '\n', wordDelimiter = ' ') {
    const strings = this.logs.map(log => log.line.join(wordDelimiter));
    return strings.join(lineDelimiter);
  }
}

export function toString(value: any, nest = 0): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'undefined') return 'undefined';
  if (value === null) return 'null';
  if (value.constructor !== Object && typeof value.toString === 'function')
    return value.toString(); // value is NOT plain object and it has own toString method

  if (nest > 2) return typeof value; // too deep to stringify!
  let str = '{ ';
  str += Object.keys(value)
    .slice(0, 5)
    .map(key => `${key}: ${toString(value[key], nest + 1)}`)
    .join(', ');
  return str + ' }';
}
