interface Storage {
  get: (key: string) => string | null;
  set: (key: string, value: string, expires_in?: number) => void;
  delete: (key: string) => void;
}

export default Storage;
