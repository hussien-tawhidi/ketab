import { CgShoppingCart } from "react-icons/cg";
import { FiPackage } from "react-icons/fi";
import { TbArrowsExchange } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {
  BiCube,
  BiTag,
  BiArchiveIn,
  BiShoppingBag,
  BiShield,
  BiKey,
  BiUser,
  BiListUl,
  BiPlus,
  BiCategory,
  BiBox,
} from "react-icons/bi";
import { CiViewList } from "react-icons/ci";

export const general = [
  {
    name: "کتاب ها",
    icon: BiCube,
    subMenu: [
      { name: "لیست کتاب ها", icon: BiListUl, link: "/admin/books" },
      { name: "افزودن کتاب", icon: BiPlus, link: "/admin/books/create" },
    ],
  },
  {
    name: "دسته‌بندی",
    icon: BiTag,
    subMenu: [
      { name: "همه دسته‌ها", icon: BiCategory, link: "/admin/categories" },
      { name: "دسته جدید", icon: BiPlus, link: "/admin/categories/create" },
    ],
  },
  {
    name: "انبار",
    icon: BiArchiveIn,
    subMenu: [{ name: "گزارش انبار", icon: BiBox, link: "/admin/inventory" }],
  },
  {
    name: "سفارشات",
    icon: BiShoppingBag,
    subMenu: [
      { name: "همه سفارش ها", icon: CiViewList, link: "/admin/orders" },
      {
        name: "درخواستی ها",
        icon: TbArrowsExchange,
        link: "/admin/orders/refund-request",
      },
      {
        name: "درخواست های جاری",
        icon: RiRefund2Fill,
        link: "/admin/orders/refund-processing",
      },
    ],
  },
  {
    name: "خریدها",
    icon: CgShoppingCart,
    subMenu: [
      { name: "لیست ها", icon: BiListUl, link: "/admin/purchases-lists" },
    ],
  },
  {
    name: "فاکتورها",
    icon: LiaFileInvoiceDollarSolid,
    subMenu: [
      { name: "فاکتورهای صادر شده", icon: BiListUl, link: "/admin/invoices" },
    ],
  },
];

export const userProfile = [
  {
    name: "نقش‌ها",
    icon: BiShield,
    subMenu: [
      { name: "لیست نقش‌ها", icon: BiListUl, link: "/admin/roles" },
      { name: "ایجاد نقش جدید", icon: BiPlus, link: "/admin/roles/create" },
    ],
  },
  {
    name: "دسترسی‌ها",
    icon: BiKey,
    subMenu: [
      { name: "مجوزهای سیستم", icon: BiListUl, link: "/admin/permissions" },
      { name: "تخصیص دسترسی", icon: BiKey, link: "/admin/permissions/assign" },
    ],
  },
  {
    name: "مشتریان",
    icon: BiUser,
    subMenu: [
      { name: "لیست مشتریان", icon: BiListUl, link: "/admin/customers" },
    ],
  },
];
