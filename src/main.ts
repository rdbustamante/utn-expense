import { ChartComponent } from "./component/chart/chart";
import { HeaderComponent } from "./component/header/header";
import { TableComponent } from "./component/table/table";
import { InternalEvent } from "./internal-event/internal-event";

const onInit = () => {
  const updateTableEvent = new InternalEvent("update-table");

  HeaderComponent();

  // Table
  const table = TableComponent();
  // Obtiene la vista al cargar el sitio.
  table.onTableUpdate();

  const updateTableHandler = () => {
    table.onTableUpdate();
  };

  updateTableEvent.Get(updateTableHandler);

  ChartComponent();
};

onInit();
