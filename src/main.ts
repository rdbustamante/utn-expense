import { ChartComponent } from "./components/chart/chart";
import { FilterComponent } from "./components/filter/filter";
import { HeaderComponent } from "./components/header/header";
import { SidebarComponent } from "./components/sidebar/sidebar";
import { TableComponent } from "./components/table/table";
import { TotalComponent } from "./components/total/total";
import { Expense } from "./containers/expense/expense";
import { InternalEvent } from "./containers/internal-event/internal-event";

const onInitView = () => {
  const expense = new Expense();

  HeaderComponent();
  const filter = FilterComponent();
  const table = TableComponent();
  const chart = ChartComponent();
  const total = TotalComponent();
  const sidebar = SidebarComponent();

  const updateFilterEvent = new InternalEvent("update-filter-event");
  const onUpdateFilter = () => {
    filter.onFilterUpdate();
  };
  updateFilterEvent.Get(onUpdateFilter);

  const updateTableEvent = new InternalEvent("update-table-event");
  const onUpdateTable = () => {
    table.onTableUpdate();
  };
  updateTableEvent.Get(onUpdateTable);

  const updateChartEvent = new InternalEvent("update-chart-event");
  const onUpdateChart = () => {
    chart.onChartUpdate();
  };
  updateChartEvent.Get(onUpdateChart);

  const updateTotalEvent = new InternalEvent("update-total-event");
  const onUpdateTotal = () => {
    total.onTotalUpdate();
  };
  updateTotalEvent.Get(onUpdateTotal);

  const updateExpenseEvent = new InternalEvent("update-expense-event");
  const onUpdateExpense = (e: CustomEvent) => {
    sidebar.onUpdateExpenseForm(e.detail);
  };
  updateExpenseEvent.Get(onUpdateExpense);

  const deleteExpenseEvent = new InternalEvent("delete-expense-event");
  const onDeleteExpense = (e: CustomEvent) => {
    expense.Delete(e.detail);
    filter.onFilterUpdate();
    chart.onChartUpdate();
    total.onTotalUpdate();
  };
  deleteExpenseEvent.Get(onDeleteExpense);
};

onInitView();
