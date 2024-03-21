import { Expense } from "../../containers/expense/expense";

export const TotalComponent = () => {
  const expense = new Expense();

  const onTotalUpdate = () => {
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
