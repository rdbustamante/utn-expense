import { Category } from "./category/category";
import { Expense } from "./expense/expense";

// TEST

const category = new Category();
category.Create({ id: 1, name: "categoria" });

const expense = new Expense();
expense.Create({
  id: 1,
  category_id: 1,
  name: "gasto uno",
  value: 1000,
  created_at: "null",
});

console.log("Test: ", category.Read(), expense.Read());
