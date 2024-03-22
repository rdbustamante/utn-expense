import { Category } from "../../containers/category/category";
import { Expense, IExpense } from "../../containers/expense/expense";
import { generateUniqueId } from "../../helper/helper";
import { InternalEvent } from "../../containers/internal-event/internal-event";

export interface ISidebarComponent {
  onCreateCategoryForm: () => void;
  onDeleteCategoryForm: () => void;
  onCreateExpenseForm: () => void;
  onUpdateExpenseForm: (expense: IExpense) => void;
}

export const SidebarComponent = (): ISidebarComponent => {
  const category = new Category();
  const expense = new Expense();
  const updateFilterEvent = new InternalEvent("update-filter-event");
  const updateChartEvent = new InternalEvent("update-chart-event");
  const updateTotalEvent = new InternalEvent("update-total-event");

  const sidebar = document.getElementById("container-sidebar") as HTMLElement;
  const sidebarOverlay = document.getElementById(
    "container-sidebar-overlay"
  ) as HTMLElement;
  const createCategoryForm = document.getElementById(
    "create-category-form"
  ) as HTMLElement;
  const deleteCategoryForm = document.getElementById(
    "delete-category-form"
  ) as HTMLElement;
  const createExpenseForm = document.getElementById(
    "create-expense-form"
  ) as HTMLElement;
  const updateExpenseForm = document.getElementById(
    "update-expense-form"
  ) as HTMLElement;

  const iUpdateComponents = (): void => {
    updateFilterEvent.Set();
    updateChartEvent.Set();
    updateTotalEvent.Set();
  };

  const iOpenSidebar = (): void => {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
  };

  const iCloseSidebar = (): void => {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  };

  const iClickOutside = (e: Event): void => {
    console.log("iClickOutside");
    if (!sidebar.contains(e.target as Node)) {
      iCloseSidebar();
      createCategoryForm.classList.remove("visible");
      deleteCategoryForm.classList.remove("visible");
      createExpenseForm.classList.remove("visible");
      updateExpenseForm.classList.remove("visible");
    }
  };

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", iClickOutside);
  }

  const iCreateCategoryForm = (e: Event): void => {
    console.log("iCreateCategoryForm");
    e.preventDefault();
    const data = new FormData(createCategoryForm as HTMLFormElement);
    const payload = Object.fromEntries(data);
    category.Create({
      id: generateUniqueId(),
      name: String(payload.name),
    });
    iUpdateComponents();
    iCloseSidebar();
  };

  const onCreateCategoryForm = (): void => {
    iOpenSidebar();
    createCategoryForm.classList.add("visible");
    createCategoryForm.addEventListener("submit", iCreateCategoryForm);
  };

  const iDeleteCategoryForm = (e: Event): void => {
    console.log("iDeleteCategoryForm");
    e.preventDefault();
    const data = new FormData(deleteCategoryForm as HTMLFormElement);
    const payload = Object.fromEntries(data);
    const associatedExpenses = expense
      .Read()
      .filter((e) => e.category_id === payload.id);
    associatedExpenses.forEach((e) => expense.Delete(e.id));
    category.Delete(String(payload.id));
    iUpdateComponents();
    iCloseSidebar();
  };

  const onDeleteCategoryForm = (): void => {
    const categoryId = document.getElementById(
      "delete-category-id"
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
    iOpenSidebar();
    deleteCategoryForm.classList.add("visible");
    deleteCategoryForm.addEventListener("submit", iDeleteCategoryForm);
  };

  const iCreateExpenseForm = (e: Event): void => {
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
    iUpdateComponents();
    iCloseSidebar();
  };

  const onCreateExpenseForm = (): void => {
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

  const iUpdateExpenseForm = (e: Event): void => {
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
    iUpdateComponents();
    iCloseSidebar();
  };

  const onUpdateExpenseForm = (expense: IExpense): void => {
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
    onDeleteCategoryForm,
    onCreateExpenseForm,
    onUpdateExpenseForm,
  };
};
