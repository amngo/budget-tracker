import CategoryItem from "components/CategoryItem";
import React from "react";
import {
  FaCar,
  FaHeart,
  FaPlane,
  FaShoppingBag,
  FaShoppingCart,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

const CATEGORIES = [
  {
    name: "Travel",
    icon: <FaPlane className="w-5 h-5" />,
    color: "text-blue-500",
    transactionCount: 4,
    totalCost: 450,
    budget: 600,
  },
  {
    name: "Food",
    icon: <MdFastfood className="w-5 h-5" />,
    color: "text-yellow-400",
    transactionCount: 12,
    totalCost: 100,
    budget: 200,
  },
  {
    name: "Transportation",
    icon: <FaCar className="w-5 h-5" />,
    color: "text-white",
    transactionCount: 5,
    totalCost: 8,
    budget: 40,
  },
  {
    name: "Health",
    icon: <FaHeart className="w-5 h-5" />,
    color: "text-emerald-400",
    transactionCount: 4,
    totalCost: 30,
    budget: 50,
  },
  {
    name: "Shopping",
    icon: <FaShoppingBag className="w-5 h-5" />,
    color: "text-violet-400",
    transactionCount: 3,
    totalCost: 100,
    budget: 200,
  },
  {
    name: "Groceries",
    icon: <FaShoppingCart className="w-5 h-5" />,
    color: "text-stone-500",
    transactionCount: 7,
    totalCost: 130,
    budget: 200,
  },
];

function CategoryList() {
  return (
    <div className="w-[500px] bg-base-300 p-6 space-y-6 rounded-lg">
      <h1 className="text-xl">Categories</h1>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <h2 className="text-sm text-base-content/60">Expenses</h2>
          <div>$1448</div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-sm text-base-content/60">Budget</h2>
          <div>$2600</div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-sm text-base-content/60">Remaining</h2>
          <div>$1300</div>
        </div>
      </div>
      <div>
        {CATEGORIES.map((category) => (
          <CategoryItem
            key={category.name}
            name={category.name}
            icon={category.icon}
            color={category.color}
            transactionCount={category.transactionCount}
            totalCost={category.totalCost}
            budget={category.budget}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
