import { Category } from "../../containers/category/category";
import { Expense } from "../../containers/expense/expense";
import { Filter } from "../../containers/filter/filter";
import { InternalEvent } from "../../containers/internal-event/internal-event";

export interface IFilterComponent {
  onFilterUpdate: () => void;
  onFilterCategorySelectUpdate: () => void;
}

export const FilterComponent = (): IFilterComponent => {
  const category = new Category();
  const expense = new Expense();
  const filter = new Filter();
  const updateTableEvent = new InternalEvent("update-table-event");

  const filterName = document.getElementById("filter-name") as HTMLInputElement;
  const filterCategory = document.getElementById(
    "filter-category"
  ) as HTMLSelectElement;
  const filterFrom = document.getElementById("filter-from") as HTMLInputElement;
  const filterUntil = document.getElementById(
    "filter-until"
  ) as HTMLInputElement;

  const onFilterCategorySelectUpdate = (): void => {
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
  };

  const onFilterUpdate = (): void => {
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
    console.log("onFilterUpdate");
  };

  filterName.addEventListener("keyup", onFilterUpdate);
  filterCategory.addEventListener("change", onFilterUpdate);
  filterFrom.addEventListener("change", onFilterUpdate);
  filterUntil.addEventListener("change", onFilterUpdate);
  onFilterCategorySelectUpdate();
  onFilterUpdate();

  return { onFilterUpdate, onFilterCategorySelectUpdate };
};
