import { Expense } from "../../containers/expense/expense";
export interface ITotalComponent {
  onTotalUpdate: () => void;
}

export const TotalComponent = (): ITotalComponent => {
  const expense = new Expense();

  const onTotalUpdate = (): void => {
    const expenses = expense.Read();
    const totalElement = document.getElementById("total-expense");
    if (totalElement) {
      let amount: number = 0;
      for (const exp of expenses) {
        amount += exp.amount;
      }
      totalElement.innerHTML = `Total: $ ${amount}`;
    }
  };

  onTotalUpdate();

  return { onTotalUpdate };
};
