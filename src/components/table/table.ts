import { Category } from "../../containers/category/category";
import { IExpense } from "../../containers/expense/expense";
import { Filter } from "../../containers/filter/filter";
import { InternalEvent } from "../../containers/internal-event/internal-event";

export interface ITableComponent {
  onTableUpdate: () => void;
}

export const TableComponent = (): ITableComponent => {
  const category = new Category();
  const filter = new Filter();
  const table = document.getElementById("expenses-table") as HTMLTableElement;

  const iTableClean = (): void => {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
  };

  const iUpdateRow = async (exp: IExpense): Promise<void> => {
    const row = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.textContent = exp.name;
    row.appendChild(tdName);

    const tdCategoryName = document.createElement("td");
    const cate = category.Read().find((c) => c.id === exp.category_id);
    if (cate) tdCategoryName.textContent = cate.name;
    row.appendChild(tdCategoryName);

    const tdAmount = document.createElement("td");
    tdAmount.textContent = exp.amount.toString();
    row.appendChild(tdAmount);

    const tdCreatedAt = document.createElement("td");
    tdCreatedAt.textContent = exp.created_at;
    row.appendChild(tdCreatedAt);

    const tdOption = document.createElement("td");
    const editButton = document.createElement("button");
    const svgUpdateFile = await fetch("./update.svg");
    const svgUpdateText = await svgUpdateFile.text();
    const svgUpdateIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgUpdateIcon.setAttribute("width", "20");
    svgUpdateIcon.setAttribute("height", "20");
    svgUpdateIcon.setAttribute("viewBox", "0 0 24 24");
    svgUpdateIcon.setAttribute("fill", "#90EE90");
    svgUpdateIcon.innerHTML = svgUpdateText;
    editButton.onclick = function () {
      const updateExpenseEvent = new InternalEvent("update-expense-event");
      updateExpenseEvent.Set(exp);
    };
    editButton.appendChild(svgUpdateIcon);

    const deleteButton = document.createElement("button");
    const svgDeleteFile = await fetch("./delete.svg");
    const svgDeleteText = await svgDeleteFile.text();
    const svgDeleteIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgDeleteIcon.setAttribute("width", "20");
    svgDeleteIcon.setAttribute("height", "20");
    svgDeleteIcon.setAttribute("viewBox", "0 0 24 24");
    svgDeleteIcon.setAttribute("fill", "#E86464");
    svgDeleteIcon.innerHTML = svgDeleteText;
    deleteButton.onclick = function () {
      const deleteExpenseEvent = new InternalEvent("delete-expense-event");
      deleteExpenseEvent.Set(exp);
    };
    deleteButton.appendChild(svgDeleteIcon);

    tdOption.append(editButton, deleteButton);
    row.appendChild(tdOption);

    if (table) table.querySelector("tbody")?.appendChild(row);
  };

  const onTableUpdate = (): void => {
    iTableClean();
    filter.Read().forEach((e) => {
      iUpdateRow(e);
    });
    console.log("onTableUpdate");
  };

  onTableUpdate();

  return { onTableUpdate };
};
