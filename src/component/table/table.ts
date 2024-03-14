import { Category } from "../../category/category";
import { Expense, IExpense } from "../../expense/expense";
import { SidebarComponent } from "../sidebar/sidebar";

export const TableComponent = () => {
  const category = new Category();
  const expense = new Expense();
  const table = document.getElementById("expenses-table") as HTMLTableElement;
  const sidebar = SidebarComponent();

  const iTableClean = () => {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
  };

  const iUpdateRow = async (exp: IExpense) => {
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
      sidebar.onUpdateExpenseForm(exp);
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
      expense.Delete(exp);
      onTableUpdate();
    };
    deleteButton.appendChild(svgDeleteIcon);

    tdOption.append(editButton, deleteButton);
    row.appendChild(tdOption);

    if (table) table.querySelector("tbody")?.appendChild(row);
  };

  const onTableUpdate = () => {
    console.log("onTableUpdate");
    iTableClean();
    expense.Read().forEach((e) => {
      iUpdateRow(e);
    });
  };

  return { onTableUpdate };
};
