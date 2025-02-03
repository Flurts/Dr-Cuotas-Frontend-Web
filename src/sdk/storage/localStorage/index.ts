import RSStorage from '@/sdk/storage/base';

export default class LocalStorage implements RSStorage {
  private readonly localStorage: Storage | null;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (typeof window !== 'undefined' && window.localStorage) {
      this.localStorage = window.localStorage;
    } else {
      this.localStorage = null;
    }
  }

  get(key: string): string | null {
    if (this.localStorage) {
      return this.localStorage.getItem(key);
    }
    return null;
  }

  set(key: string, value: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, value);
    }
  }

  delete(key: string): void {
    if (this.localStorage) {
      this.localStorage.removeItem(key);
    }
  }
}
