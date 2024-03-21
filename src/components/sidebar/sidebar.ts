import { Category, ICategory } from "../../containers/category/category";
import { Expense, IExpense } from "../../containers/expense/expense";
import { generateUniqueId } from "../../helper/helper";
import { InternalEvent } from "../../containers/internal-event/internal-event";

export const SidebarComponent = () => {
  const category = new Category();
  const expense = new Expense();
  const updateTableEvent = new InternalEvent("update-table");
  const sidebar = document.getElementById("container-sidebar") as HTMLElement;
  const sidebarOverlay = document.getElementById(
    "container-sidebar-overlay"
  ) as HTMLElement;
  const createCategoryForm = document.getElementById(
    "create-category-form"
  ) as HTMLElement;
  const updateCategoryForm = document.getElementById(
    "update-category-form"
  ) as HTMLElement;
  const createExpenseForm = document.getElementById(
    "create-expense-form"
  ) as HTMLElement;
  const updateExpenseForm = document.getElementById(
    "update-expense-form"
  ) as HTMLElement;

  //   Shared
  const iOpenSidebar = () => {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
  };

  const iCloseSidebar = () => {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  };

  const iClickOutside = (e: Event) => {
    console.log("iClickOutside");
    if (!sidebar.contains(e.target as Node)) {
      iCloseSidebar();
      createCategoryForm.classList.remove("visible");
      updateCategoryForm.classList.remove("visible");
      createExpenseForm.classList.remove("visible");
      updateExpenseForm.classList.remove("visible");
    }
  };

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", iClickOutside);
  }

  //   Category
  const iCreateCategoryForm = (e: Event) => {
    console.log("iCreateCategoryForm");
    e.preventDefault();
    const data = new FormData(createCategoryForm as HTMLFormElement);
    const payload = Object.fromEntries(data);
    category.Create({
      id: generateUniqueId(),
      name: String(payload.name),
    });
    iCloseSidebar();
  };

  const onCreateCategoryForm = () => {
    iOpenSidebar();
    createCategoryForm.classList.add("visible");
    createCategoryForm.addEventListener("submit", iCreateCategoryForm);
  };

  const iUpdateCategoryForm = (e: Event) => {
    console.log("iUpdateCategoryForm");
    e.preventDefault();
    const data = new FormData(createCategoryForm as HTMLFormElement);
    const payload = Object.fromEntries(data);
    category.Create({
      id: String(payload.id),
      name: String(payload.name),
    });
    iCloseSidebar();
  };

  const onUpdateCategoryForm = (category: ICategory) => {
    const name = document.getElementById("name") as HTMLInputElement;
    name.value = category.name;
    iOpenSidebar();
    updateCategoryForm.classList.add("visible");
    updateCategoryForm.addEventListener("submit", iUpdateCategoryForm);
  };

  //   Expense
  const iCreateExpenseForm = (e: Event) => {
    console.log("iCreateExpenseForm");
    e.preventDefault();
    const data = new FormData(createExpenseForm as HTMLFormElement);
    const payload = Object.fromEntries(data);
    expense.Create({
      id: generateUniqueId(),
      category_id: String(payload.category_id),
      name: payload.name.toString(),
      amount: Number(payload.amount),
      created_at: payload.created_at.toString(),
    });
    iCloseSidebar();
    updateTableEvent.Set();
  };

  const onCreateExpenseForm = () => {
    const categoryId = document.getElementById(
      "create-expense-category-id"
    ) as HTMLSelectElement;
    while (categoryId.firstChild) {
      categoryId.removeChild(categoryId.firstChild);
    }
    category.Read().forEach((c) => {
      const option = document.createElement("option");
      option.value = c.id.toString();
      option.textContent = c.name;
      categoryId.appendChild(option);
    });
    iOpenSidebar();
    createExpenseForm.classList.add("visible");
    createExpenseForm.addEventListener("submit", iCreateExpenseForm);
  };

  const iUpdateExpenseForm = (e: Event) => {
    console.log("iUpdateExpenseForm");
    e.preventDefault();
    const data = new FormData(updateExpenseForm as HTMLFormElement);
    const payload = Object.fromEntries(data);
    expense.Update({
      id: String(payload.id),
      category_id: String(payload.category_id),
      name: String(payload.name),
      amount: Number(payload.amount),
      created_at: String(payload.created_at),
    });
    iCloseSidebar();
    updateTableEvent.Set();
  };

  const onUpdateExpenseForm = (expense: IExpense) => {
    const categoryId = document.getElementById(
      "update-expense-category-id"
    ) as HTMLSelectElement;
    while (categoryId.firstChild) {
      categoryId.removeChild(categoryId.firstChild);
    }
    category.Read().forEach((c) => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.name;
      categoryId.appendChild(option);
    });
    const cate = category.Read().find((c) => c.id === expense.category_id);
    if (cate) {
      categoryId.value = cate.id;
    }
    const id = document.getElementById("update-expense-id") as HTMLInputElement;
    id.value = expense.id;
    const name = document.getElementById(
      "update-expense-name"
    ) as HTMLInputElement;
    name.value = expense.name;
    const amount = document.getElementById(
      "update-expense-amount"
    ) as HTMLInputElement;
    amount.value = expense.amount.toString();
    const createdAt = document.getElementById(
      "update-expense-created-at"
    ) as HTMLInputElement;
    createdAt.value = expense.created_at;
    iOpenSidebar();
    updateExpenseForm.classList.add("visible");
    updateExpenseForm.addEventListener("submit", iUpdateExpenseForm);
  };

  return {
    onCreateCategoryForm,
    onUpdateCategoryForm,
    onCreateExpenseForm,
    onUpdateExpenseForm,
  };
};
