import { SidebarComponent } from "../sidebar/sidebar";

export const HeaderComponent = () => {
  const sidebar = SidebarComponent();
  const overlay = document.getElementById("dropdown-overlay") as HTMLDivElement;

  //   Expense
  const expenseTrigger = document.getElementById(
    "expense-trigger"
  ) as HTMLElement;
  const expenseDropdown = document.getElementById(
    "expense-dropdown"
  ) as HTMLElement;

  const onExpenseDropdownRemove = () => {
    expenseDropdown.classList.remove("active");
    overlay.classList.remove("active");
  };

  const onExpenseTrigger = () => {
    overlay.classList.add("active");
    const position = expenseTrigger.getBoundingClientRect();
    expenseDropdown.style.top = `${position.bottom + 8}px`;
    expenseDropdown.style.left = "auto";
    expenseDropdown.style.right = `${window.innerWidth - position.right}px`;
    expenseDropdown.classList.add("active");
    const createItem = document.getElementById(
      "create-expense-item"
    ) as HTMLElement;
    createItem.onclick = () => {
      sidebar.onCreateExpenseForm();
      onExpenseDropdownRemove();
    };
  };

  expenseTrigger.onclick = onExpenseTrigger;

  //   Category
  const categoryTrigger = document.getElementById(
    "category-trigger"
  ) as HTMLElement;
  const categoryDropdown = document.getElementById(
    "category-dropdown"
  ) as HTMLElement;

  const onCategoryDropdownRemove = () => {
    categoryDropdown.classList.remove("active");
    overlay.classList.remove("active");
  };

  const onCategoryTrigger = () => {
    overlay.classList.add("active");
    const position = categoryTrigger.getBoundingClientRect();
    categoryDropdown.style.top = `${position.bottom + 8}px`;
    categoryDropdown.style.left = "auto";
    categoryDropdown.style.right = `${window.innerWidth - position.right}px`;
    categoryDropdown.classList.add("active");
    const createItem = document.getElementById(
      "create-category-item"
    ) as HTMLElement;
    createItem.onclick = () => {
      sidebar.onCreateCategoryForm();
      onCategoryDropdownRemove();
    };
    const deleteItem = document.getElementById(
      "delete-category-item"
    ) as HTMLElement;
    deleteItem.onclick = () => {
      sidebar.onDeleteCategoryForm();
      onCategoryDropdownRemove();
    };
  };

  categoryTrigger.onclick = onCategoryTrigger;

  //   Shared
  const iClickOutside = (e: Event) => {
    if (!expenseDropdown.contains(e.target as Node)) {
      expenseDropdown.classList.remove("active");
    }
    if (!categoryDropdown.contains(e.target as Node)) {
      categoryDropdown.classList.remove("active");
    }
    overlay.classList.remove("active");
  };

  if (overlay) {
    overlay.addEventListener("click", iClickOutside);
  }
};
