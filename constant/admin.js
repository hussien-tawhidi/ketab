export const orders = [
  {
    id: "#BK5625",
    date: "۱۰ اردیبهشت ۱۴۰۳",
    product: "کتاب شازده کوچولو",
    customerName: "آنا محمدی",
    phone: "۰۹۱۵۱۲۳۴۵۶۷",
    address: "تهران، خیابان ولیعصر",
    paymentType: "کارت بانکی",
    status: "تکمیل شده",
  },
  {
    id: "#BK9652",
    date: "۶ اردیبهشت ۱۴۰۳",
    product: "کتاب ملت عشق",
    customerName: "جودیت فراهانی",
    phone: "۰۹۳۵۶۷۸۹۰۱۲",
    address: "اصفهان، میدان نقش جهان",
    paymentType: "کارت بانکی",
    status: "تکمیل شده",
  },
  {
    id: "#BK5984",
    date: "۶ اردیبهشت ۱۴۰۳",
    product: "کتاب سمفونی مردگان",
    customerName: "پیتر احمدی",
    phone: "۰۹۱۳۴۵۶۷۸۹۰",
    address: "مشهد، بلوار سجاد",
    paymentType: "پرداخت در محل",
    status: "تکمیل شده",
  },
  {
    id: "#BK3625",
    date: "۲ اردیبهشت ۱۴۰۳",
    product: "کتاب سووشون",
    customerName: "امانوئل رضایی",
    phone: "۰۹۰۱۲۳۴۵۶۷۸",
    address: "شیراز، خیابان کریم‌خان زند",
    paymentType: "پرداخت در محل",
    status: "در حال پردازش",
  },
  {
    id: "#BK8652",
    date: "۲۹ فروردین ۱۴۰۳",
    product: "کتاب بینوایان",
    customerName: "ویلیام کوهستانی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    address: "تبریز، خیابان ولیعصر",
    paymentType: "کارت بانکی",
    status: "در حال پردازش",
  },
];

export const adminOrdersOptionFilter = [
  { value: "all", label: "همه" },
  { value: "تکمیل شده", label: "تکمیل شده ها" },
  { value: "در حال پردازش", label: "در حال پردازش" },
  { value: "لغو شده", label: "لغو شده ها" },
];

export const bookListTabelHeader = [
  { key: "image", label: "تصویر" },
  { key: "title", label: "عنوان" },
  { key: "author", label: "نویسنده" },
  { key: "categories", label: "دسته‌بندی‌ها" },
  { key: "price", label: "قیمت" },
  { key: "actions", label: "عملیات" },
];

export const categoriesListTabelHeader = [
  { key: "name", label: "نام" },
  { key: "status", label: "وضعیت" },
  { key: "createdAt", label: "زمان ساخت" },
  { key: "action", label: "عملیات" },
];
