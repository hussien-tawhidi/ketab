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

export const general = [
  {
    name: "محصولات",
    icon: BiCube,
    subMenu: [
      { name: "لیست محصولات", icon: BiListUl, link: "/admin/products" },
      { name: "ایجاد محصول", icon: BiPlus, link: "/admin/products/create" },
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
    subMenu: [
      { name: "گزارش انبار", icon: BiBox, link: "/admin/inventory" },
      {
        name: "سفارشات دریافت شده",
        icon: BiListUl,
        link: "/admin/inventory/received-orders",
      },
    ],
  },
  {
    name: "سفارشات",
    icon: BiShoppingBag,
    subMenu: [{ name: "همه سفارش ها", icon: BiPlus, link: "/admin/orders" }],
  },
  {
    name: "برگشتی ها",
    icon: FiPackage,
    subMenu: [
      {
        name: "درخواستی ها",
        icon: TbArrowsExchange,
        link: "/admin/refund-request",
      },
      {
        name: "درخواست های جاری",
        icon: RiRefund2Fill,
        link: "/admin/refund-processing",
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
      { name: "لیست نقش‌ها", icon: BiListUl, link: "/roles" },
      { name: "ایجاد نقش جدید", icon: BiPlus, link: "/roles/create" },
    ],
  },
  {
    name: "دسترسی‌ها",
    icon: BiKey,
    subMenu: [
      { name: "مجوزهای سیستم", icon: BiListUl, link: "/permissions" },
      { name: "تخصیص دسترسی", icon: BiKey, link: "/permissions/assign" },
    ],
  },
  {
    name: "مشتریان",
    icon: BiUser,
    subMenu: [{ name: "لیست مشتریان", icon: BiListUl, link: "/customers" }],
  },
];
