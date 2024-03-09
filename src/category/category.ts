import { Registry } from "../registry/registry";

export interface ICategory {
  id: number;
  name: string;
}

export class Category {
  private registry = new Registry<ICategory>("category");

  constructor() {}

  Read(id?: number): ICategory[] {
    return this.registry.Read(id ? id : undefined);
  }

  Create(data: ICategory): void {
    this.registry.Create(data);
  }

  Update(data: ICategory): void {
    this.registry.Update(data);
  }

  Delete(data: ICategory): void {
    this.registry.Delete(data);
  }
}
