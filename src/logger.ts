export class Logger {
  private lines: string[][] = [];
  private subscribers: Set<(line: string[]) => void> = new Set();
  private isDispatching = false;
  private assertDispatching(caller: string) {
    if (this.isDispatching) {
      throw new Error(
        `@hackforplay/log: You may not call ${caller} while subscriber is running.`
      );
    }
  }

  public log: (...line: string[]) => void = this.add.bind(this);

  private add(...line: string[]) {
    this.assertDispatching('log()');
    try {
      this.isDispatching = true;
      this.lines.push(line);
      for (const subscriber of this.subscribers) {
        subscriber(line);
      }
    } finally {
      this.isDispatching = false;
    }
  }

  public subscribe(subscriber: (line: string[]) => void): () => void {
    this.assertDispatching('subscribe()');
    try {
      this.isDispatching = true;
      for (const log of this.lines) {
        subscriber(log);
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

  public stringify(lineDelimiter = '\n', wordDelimiter = ' ') {
    const strings = this.lines.map(line => line.join(wordDelimiter));
    return strings.join(lineDelimiter);
  }
}
