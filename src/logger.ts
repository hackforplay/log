export type S<Structure> = (log: Structure) => void;

export class Logger<Structure> {
  private logs: Structure[] = [];
  private subscribers: Set<S<Structure>> = new Set();

  append(log: Structure) {
    this.logs.push(log);
    this.subscribers.forEach(subscriber => {
      subscriber(log);
    });
  }

  subscribe(subscriber: (log: Structure) => void): () => void {
    for (const log of this.logs) {
      subscriber(log);
    }

    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }
}
