import { ChartComponent } from "./components/chart/chart";
import { FilterComponent } from "./components/filter/filter";
import { HeaderComponent } from "./components/header/header";
import { SidebarComponent } from "./components/sidebar/sidebar";
import { TableComponent } from "./components/table/table";
import { TotalComponent } from "./components/total/total";
import { Expense, IExpense } from "./containers/expense/expense";
import { InternalEvent } from "./containers/internal-event/internal-event";

const onInitView = (): void => {
  const expense = new Expense();

  HeaderComponent();
  const filter = FilterComponent();
  const table = TableComponent();
  const chart = ChartComponent();
  const total = TotalComponent();
  const sidebar = SidebarComponent();

  const updateFilterEvent = new InternalEvent("update-filter-event");
  const onUpdateFilter = (): void => {
    filter.onFilterUpdate();
  };
  updateFilterEvent.Get(onUpdateFilter);

  const updateFilterSelectEvent = new InternalEvent(
    "update-filter-select-event"
  );
  const onUpdateFilterSelect = (): void => {
    filter.onFilterCategorySelectUpdate();
  };
  updateFilterSelectEvent.Get(onUpdateFilterSelect);

  const updateTableEvent = new InternalEvent("update-table-event");
  const onUpdateTable = (): void => {
    table.onTableUpdate();
  };
  updateTableEvent.Get(onUpdateTable);

  const updateChartEvent = new InternalEvent("update-chart-event");
  const onUpdateChart = (): void => {
    chart.onChartUpdate();
  };
  updateChartEvent.Get(onUpdateChart);

  const updateTotalEvent = new InternalEvent("update-total-event");
  const onUpdateTotal = (): void => {
    total.onTotalUpdate();
  };
  updateTotalEvent.Get(onUpdateTotal);

  const updateExpenseEvent = new InternalEvent<IExpense>(
    "update-expense-event"
  );
  const onUpdateExpense = (e: CustomEvent<IExpense>): void => {
    sidebar.onUpdateExpenseForm(e.detail);
  };
  updateExpenseEvent.Get(onUpdateExpense);

  const deleteExpenseEvent = new InternalEvent<IExpense>(
    "delete-expense-event"
  );
  const onDeleteExpense = (e: CustomEvent<IExpense>): void => {
    expense.Delete(e.detail.id);
    filter.onFilterUpdate();
    chart.onChartUpdate();
    total.onTotalUpdate();
  };
  deleteExpenseEvent.Get(onDeleteExpense);
};

onInitView();
