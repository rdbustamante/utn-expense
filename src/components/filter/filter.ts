import { Category } from "../../containers/category/category";
import { Expense } from "../../containers/expense/expense";
import { Filter } from "../../containers/filter/filter";
import { InternalEvent } from "../../containers/internal-event/internal-event";

export const FilterComponent = (): void => {
  const category = new Category();
  const expense = new Expense();
  const filter = new Filter();
  const updateTableEvent = new InternalEvent("update-table");

  filter.Set(expense.Read());

  const filterName = document.getElementById("filter-name") as HTMLInputElement;
  const filterCategory = document.getElementById(
    "filter-category"
  ) as HTMLSelectElement;
  const filterFrom = document.getElementById("filter-from") as HTMLInputElement;
  const filterUntil = document.getElementById(
    "filter-until"
  ) as HTMLInputElement;

  const defaultOption = document.createElement("option");
  defaultOption.value = "-";
  defaultOption.textContent = "Seleccionar...";
  filterCategory.appendChild(defaultOption);

  while (
    filterCategory.firstChild &&
    filterCategory.firstChild !== defaultOption
  ) {
    filterCategory.removeChild(filterCategory.firstChild);
  }

  category.Read().forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    filterCategory.appendChild(option);
  });

  const onFilter = () => {
    const nameFilter: string = filterName.value.toLowerCase();
    const categoryFilter: string = filterCategory.value;
    const fromFilter: string = filterFrom.value;
    const untilFilter: string = filterUntil.value;

    let filteredData = expense.Read();

    if (nameFilter) {
      filteredData = filteredData.filter((e) => {
        return e.name.toLowerCase().includes(nameFilter);
      });
    }

    if (categoryFilter !== "-") {
      filteredData = filteredData.filter((e) => {
        return e.category_id === categoryFilter;
      });
    }

    if (fromFilter && untilFilter) {
      filteredData = filteredData.filter((e) => {
        const expenseDate = new Date(e.created_at);
        return (
          expenseDate >= new Date(fromFilter) &&
          expenseDate <= new Date(untilFilter)
        );
      });
    }

    filter.Set(filteredData);
    updateTableEvent.Set();
  };

  filterName.addEventListener("keyup", onFilter);
  filterCategory.addEventListener("change", onFilter);
  filterFrom.addEventListener("change", onFilter);
  filterUntil.addEventListener("change", onFilter);
};
