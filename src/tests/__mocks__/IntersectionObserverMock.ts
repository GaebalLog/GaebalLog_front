class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  takeRecords(): IntersectionObserverEntry[] {
    throw new Error("Method not implemented.");
  }

  observe(): void {
    this.callback(
      [
        {
          isIntersecting: true,
          target: document.createElement("div"),
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 0,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: {} as DOMRectReadOnly,
          time: Date.now(),
        },
      ],
      this,
    );
  }

  unobserve(): void {}

  disconnect(): void {}
}

global.IntersectionObserver = MockIntersectionObserver;
