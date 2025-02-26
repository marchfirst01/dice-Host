// src/tagify.d.ts
declare module '@yaireo/tagify' {
  interface TagifySettings {
    delimiters?: RegExp;
    trim: boolean;
    whitelist?: string[];
    maxTags?: number;
  }
  export default class Tagify {
    constructor(input: HTMLInputElement, settings?: TagifySettings);
    on(event: string, callback: (e: TagifyEvent) => void): void;
    off(event: string): void;
    destroy(): void;
    addTags(tags: string | string[]): void;
    removeAllTags(): void;
    value: { value: string }[];
  }
}
