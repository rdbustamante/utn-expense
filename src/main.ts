import { Chart } from "../node_modules/chart.js/auto/auto";
import { Category } from "./category/category";
import { Expense, IExpense } from "./expense/expense";
import { iDateHelper } from "./helper/helper";

// TEST

const category = new Category();
const expense = new Expense();

const select = document.getElementById("select-category");
category.Read().forEach((c) => {
  const option = document.createElement("option");
  option.value = c.id.toString();
  option.textContent = c.name;
  select?.appendChild(option);
});

const form = document.getElementById("add-expense");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form as HTMLFormElement);
  console.log(data);
  const payload = Object.fromEntries(data);
  console.log("payload", payload);
  expense.Create({
    id: expense.Read().length + 1,
    category_id: Number(payload.category_id),
    name: payload.name.toString(),
    amount: Number(payload.amount),
    created_at: iDateHelper(payload.created_at.toString()),
  });
  onTableUpdate();
});

export const addExpenseRow = async (expense: IExpense) => {
  const table = document.getElementById("expenses-table");
  const row = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = expense.name;
  row.appendChild(tdName);

  const tdCategoryName = document.createElement("td");
  const cate = category.Read().find((c) => c.id === expense.category_id);
  if (cate) tdCategoryName.textContent = cate.name;
  row.appendChild(tdCategoryName);

  const tdAmount = document.createElement("td");
  tdAmount.textContent = expense.amount.toString();
  row.appendChild(tdAmount);

  const tdCreatedAt = document.createElement("td");
  tdCreatedAt.textContent = expense.created_at;
  row.appendChild(tdCreatedAt);

  const tdOption = document.createElement("td");
  const editButton = document.createElement("button");
  const svgUpdateFile = await fetch("./update.svg");
  const svgUpdateText = await svgUpdateFile.text();
  console.log("txt", svgUpdateText);
  const svgUpdateIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgUpdateIcon.setAttribute("width", "20");
  svgUpdateIcon.setAttribute("height", "20");
  svgUpdateIcon.setAttribute("viewBox", "0 0 24 24");
  svgUpdateIcon.setAttribute("fill", "green");
  svgUpdateIcon.innerHTML = svgUpdateText;
  editButton.onclick = null;
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
  svgDeleteIcon.setAttribute("fill", "red");
  svgDeleteIcon.innerHTML = svgDeleteText;
  deleteButton.onclick = null;
  deleteButton.appendChild(svgDeleteIcon);

  tdOption.append(editButton, deleteButton);
  row.appendChild(tdOption);

  if (table) table.querySelector("tbody")?.appendChild(row);
};

const onTableClean = () => {
  const table = document.getElementById("expenses-table") as HTMLTableElement;
  const tbody = table.querySelector("tbody");
  if (tbody) {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
};

const onTableUpdate = () => {
  console.log("onTableUpdate");
  onTableClean();
  expense.Read().forEach((e) => {
    addExpenseRow(e);
  });
};

const onInit = () => {
  console.log("onInit");
  // category.Create({ id: 1, name: "Automotor" });
  expense.Read().forEach((e) => {
    addExpenseRow(e);
  });
};

onInit();

// Toggle sidebar
const onToggleSidebar = () => {
  console.log("toggle");
  const sidebar = document.getElementById("container-sidebar");
  if (sidebar) sidebar.classList.toggle("open");
};

const toggle = document.getElementById("toggle-sidebar");
if (toggle) toggle.onclick = onToggleSidebar;

// Chart doughnut

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const canvasDoughnut = document.getElementById(
  "canvas-doughnut"
) as HTMLCanvasElement;
if (canvasDoughnut) {
  new Chart(canvasDoughnut, {
    type: "doughnut",
    data: data,
  });
}
