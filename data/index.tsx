import {
  FaCar,
  FaCarrot,
  FaEllipsisH,
  FaGift,
  FaHouseUser,
  FaTheaterMasks,
} from "react-icons/fa";
import { GiClothes, GiHealthNormal } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";

export const expenseCategories: string[] = [
  "Food & Drinks",
  "Transportation",
  "Household",
  "Entertainment",
  "Health & Wellness",
  "Fashion & Apparel",
  "Grocery",
  "Gift",
  "Other",
];

export const colors: string[] = [
  "rgb(155, 93, 229)",
  "rgb(241, 91, 181)",
  "rgb(254, 228, 64)",
  "rgb(0, 187, 249)",
  "rgb(0, 245, 212)",
  "rgb(94, 160, 230)",
  "rgb(255, 64, 76)",
  "rgb(0, 250, 79)",
  "rgb(106, 17, 208)",
];

export const expenseCategoryIcons: { [key: string]: JSX.Element } = {
  "Food & Drinks": <MdFastfood className="w-5 h-5" />,
  Transportation: <FaCar className="w-5 h-5" />,
  Household: <FaHouseUser className="w-5 h-5" />,
  Entertainment: <FaTheaterMasks className="w-5 h-5" />,
  "Health & Wellness": <GiHealthNormal className="w-5 h-5" />,
  "Fashion & Apparel": <GiClothes className="w-5 h-5" />,
  Grocery: <FaCarrot className="w-5 h-5" />,
  Gift: <FaGift className="w-5 h-5" />,
  Other: <FaEllipsisH className="w-5 h-5" />,
};

export const incomeCategories: string[] = [
  "Allowance",
  "Salary",
  "Tips",
  "Gift",
  "Other",
];
