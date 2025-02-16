// src/tagify.d.ts
declare module '@yaireo/tagify' {
  export default class Tagify {
    constructor(input: HTMLInputElement, settings?: any);
    on(event: string, callback: (e: any) => void): void;
    off(event: string): void;
    destroy(): void;
    addTags(tags: string | string[]): void;
    removeAllTags(): void;
    value: { value: string }[];
  }
}
