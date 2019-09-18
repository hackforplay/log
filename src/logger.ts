export class Logger {
  private lines: string[][] = [];
  private subscribers: Set<(line: string[]) => void> = new Set();

  public log: (...line: string[]) => void = this.add.bind(this);

  private add(...line: string[]) {
    this.lines.push(line);
    this.subscribers.forEach(subscriber => {
      subscriber(line);
    });
  }

  public subscribe(subscriber: (line: string[]) => void): () => void {
    for (const log of this.lines) {
      subscriber(log);
    }

    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  public stringify(lineDelimiter = '\n', wordDelimiter = ' ') {
    const strings = this.lines.map(line => line.join(wordDelimiter));
    return strings.join(lineDelimiter);
  }
}
