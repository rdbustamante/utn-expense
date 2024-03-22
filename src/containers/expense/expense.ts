import { Registry } from "../../registry/registry";

export interface IExpense {
  id: string;
  category_id: string;
  name: string;
  amount: number;
  created_at: string;
}

export class Expense {
  private registry = new Registry<IExpense>("expense");

  constructor() {}

  Read(id?: string): IExpense[] {
    return this.registry.Read(id ? id : undefined);
  }

  Create(data: IExpense): void {
    this.registry.Create(data);
  }

  Update(data: IExpense): void {
    this.registry.Update(data);
  }

  Delete(id: string): void {
    this.registry.Delete(id);
  }
}
