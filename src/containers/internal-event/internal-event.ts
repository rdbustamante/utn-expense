export class InternalEvent<T> {
  private handlerFunction: (e: CustomEvent) => void;

  constructor(private readonly EVENT_KEY: string) {
    this.handlerFunction = () => {};
  }

  public Get(handler: (e: CustomEvent<T>) => void): void {
    this.handlerFunction = handler;
    window.addEventListener(
      this.EVENT_KEY,
      this.handlerFunction as EventListener
    );
  }

  public Set(e?: T): void {
    const event = new CustomEvent(this.EVENT_KEY, { detail: e });
    window.dispatchEvent(event);
  }
}
