export interface ID {
  id: string;
}

export class Registry<T extends ID> {
  constructor(private readonly STORAGE_KEY: string) {}

  iSet(data: T[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  Read(id?: string): T[] {
    const storage = localStorage.getItem(this.STORAGE_KEY);
    if (!storage) return [];
    const payload: T[] = JSON.parse(storage);
    if (id) {
      const item = payload.find((e) => e.id === id);
      return item ? [item] : [];
    }
    return payload;
  }

  Create(data: T): void {
    const payload = this.Read();
    payload.push(data);
    this.iSet(payload);
  }

  Update(data: T): void {
    const payload = this.Read();
    const index = payload.findIndex((e) => e.id === data.id);
    if (index !== -1) {
      payload[index] = data;
      this.iSet(payload);
    }
  }

  Delete(data: T): void {
    const payload = this.Read();
    const filteredPayload = payload.filter((e) => e.id !== data.id);
    this.iSet(filteredPayload);
  }
}
