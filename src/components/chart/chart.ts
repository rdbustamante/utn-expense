import { Chart } from "../../../node_modules/chart.js/auto/auto";
import { Category } from "../../containers/category/category";
import { Expense } from "../../containers/expense/expense";

export const ChartComponent = () => {
  const category = new Category();
  const expense = new Expense();

  const onChartUpdate = () => {
    const chartBox = document.getElementById("chart-box") as HTMLDivElement;
    const categories = category.Read();
    const expenses = expense.Read();

    while (chartBox.firstChild) {
      chartBox.removeChild(chartBox.firstChild);
    }

    const canvasDoughnut = document.createElement("canvas");
    canvasDoughnut.setAttribute("id", "canvas-doughnut");
    chartBox.appendChild(canvasDoughnut);

    const categoriesMap = new Map<string, number[]>();
    const categoriesInUse = new Set<string>();

    for (const ex of expenses) {
      categoriesInUse.add(ex.category_id);
    }

    const categoriesNames = [];

    for (const id of categoriesInUse) {
      const payload = categories.find((c) => c.id === id);
      if (payload) {
        categoriesNames.push(payload.name);
      }
    }

    for (const ex of expenses) {
      let amounts = categoriesMap.get(ex.category_id) || [];
      categoriesMap.set(ex.category_id, amounts);
      amounts.push(ex.amount);
    }

    const categoriesAmounts = [];

    for (const [_, amounts] of categoriesMap) {
      categoriesAmounts.push(amounts.reduce((sum, amount) => sum + amount, 0));
    }

    if (canvasDoughnut) {
      new Chart(canvasDoughnut, {
        type: "doughnut",
        data: {
          labels: categoriesNames,
          datasets: [
            {
              label: "Total",
              data: categoriesAmounts,
              backgroundColor: [
                "#87CEEB",
                "#A9DFBF",
                "#D6E2F0",
                "#F0D8DC",
                "#F2E8C8",
                "#F7E5D4",
                "#D8C7ED",
                "#F7F6F9",
                "#F3E0F9",
              ],
              hoverBackgroundColor: "#ffd572",
              hoverOffset: 40,
              borderWidth: 4,
            },
          ],
        },
        options: {
          radius: 200,
          plugins: {
            tooltip: {
              backgroundColor: "#121212",
              displayColors: false,
            },
          },
        },
      });
    }
  };

  onChartUpdate();

  return { onChartUpdate };
};
