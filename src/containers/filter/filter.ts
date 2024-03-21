import { Registry } from "../../services/registry/registry";
import { IExpense } from "../expense/expense";

export class Filter {
  private registry = new Registry<IExpense>("filter");

  constructor() {}

  Read(): IExpense[] {
    return this.registry.Read();
  }

  Set(data: IExpense[]): void {
    return this.registry.Set(data);
  }
}
