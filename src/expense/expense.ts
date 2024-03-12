import { Registry } from "../registry/registry";

export interface IExpense {
  id: number;
  category_id: number;
  name: string;
  amount: number;
  created_at: string;
}

export class Expense {
  private registry = new Registry<IExpense>("expense");

  constructor() {}

  Read(id?: number): IExpense[] {
    return this.registry.Read(id ? id : undefined);
  }

  Create(data: IExpense): void {
    this.registry.Create(data);
  }

  Update(data: IExpense): void {
    this.registry.Update(data);
  }

  Delete(data: IExpense): void {
    this.registry.Delete(data);
  }
}
