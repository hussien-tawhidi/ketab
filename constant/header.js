import {  MdOutlineLibraryBooks } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { AiOutlinePercentage } from "react-icons/ai";
import { LuClipboardList, LuUserCog } from "react-icons/lu";
import { CiCircleQuestion } from "react-icons/ci";
import {
  IoPhonePortraitOutline,
  IoBookOutline,
  IoHelpCircleOutline,
  IoDocumentTextOutline,
  IoLockClosedOutline,
  IoInformationCircleOutline,
  IoCallOutline,
  IoCloudUploadOutline,
  IoBriefcaseOutline,
  IoLogInOutline,
} from "react-icons/io5";

export const booksCategories = [
  {
    title: "ادبیات",
    subcategories: [
      "ادبیات پارسی",
      "ادبیات جهان",
      "زندگی‌نامه و خاطرات",
      "شعر پارسی",
      "نگارش و نویسندگی",
      "سفرنامه",
    ],
  },
  {
    title: "داستان و رمان",
    subcategories: ["داستان و رمان ایرانی", "داستان و رمان خارجی"],
  },
  {
    title: "اقتصاد و مدیریت",
    subcategories: [
      "بازاریابی و فروش",
      "مدیریت و رهبری",
      "کارآفرینی",
      "سرمایه‌گذاری و بورس",
      "اقتصاد",
    ],
  },
  {
    title: "روانشناسی",
    subcategories: [
      "موفقیت و خودسازی",
      "خانواده و روابط",
      "ارتباطات",
      "بزرگسال",
      "کودک و نوجوان",
    ],
  },
  {
    title: "تاریخ",
    subcategories: ["ایران", "جهان", "اسلام"],
  },
  {
    title: "کودک",
    subcategories: ["داستان", "شعر", "علمی و آموزشی", "آموزش زبان"],
  },
  {
    title: "نوجوان",
    subcategories: ["داستان و رمان", "علمی و آموزشی"],
  },
  {
    title: "آموزش زبان",
    subcategories: ["انگلیسی", "آلمانی", "چند زبانه"],
  },
  {
    title: "سلامتی و بهداشت",
    subcategories: ["تغذیه، رژیم و تناسب اندام"],
  },
  {
    title: "درسی و کمک آموزشی",
    subcategories: ["دبستان", "متوسطه اول", "متوسطه دوم", "استخدامی"],
  },
  {
    title: "کامپیوتر",
    subcategories: [],
  },
  {
    title: "حقوق",
    subcategories: [],
  },
  {
    title: "علوم",
    subcategories: [],
  },
  {
    title: "عمومی",
    subcategories: [],
  },
  {
    title: "هنری",
    subcategories: [],
  },
  {
    title: "دین و آیین",
    subcategories: [],
  },
  {
    title: "انقلاب و دفاع مقدس",
    subcategories: [],
  },
  {
    title: "فنی حرفه‌ای",
    subcategories: [],
  },
  {
    title: "کمیک",
    subcategories: [],
  },
  {
    title: "فنی و مهندسی",
    subcategories: [],
  },
  {
    title: "مجله",
    subcategories: [],
  },
];

export const searchSuggestion = [
  { id: 1, title: "خودسازی" },
  { id: 2, title: "موفقیت شخصی" },
  { id: 3, title: "مدیریت ذهن" },
  { id: 4, title: "علمی و تخیلی" },
  { id: 5, title: "راه و رسم زندگی" },
  { id: 6, title: "جنایی و معمایی" },
  { id: 7, title: "استرس" },
  { id: 8, title: "تاریخی" },
  { id: 9, title: "روابط اجتماعی" },
];

export const mobileToMenuHeader = [
  {
    label: "نصب اپلیکیشن کتابراه",
    href: "/install-app",
    icon: IoPhonePortraitOutline,
  },
  { label: "دسته‌بندی کتاب‌ها", href: "/categories", icon: IoBookOutline },
  {
    label: "راهنمایی و پشتیبانی کاربران",
    href: "/support",
    icon: IoHelpCircleOutline,
  },
  { label: "شرایط استفاده", href: "/terms", icon: IoDocumentTextOutline },
  { label: "حریم خصوصی", href: "/privacy", icon: IoLockClosedOutline },
  { label: "درباره کتابراه", href: "/about", icon: IoInformationCircleOutline },
  { label: "تماس با ما", href: "/contact", icon: IoCallOutline },
  {
    label: "نشر الکترونیک و انتشار کتاب",
    href: "/publishing",
    icon: IoCloudUploadOutline,
  },
  { label: "فرصت‌های شغلی", href: "/jobs", icon: IoBriefcaseOutline },
  { label: "ورود / ثبت نام", href: "/login", icon: IoLogInOutline },
];

export const menuItems = [
  { id: 2, title: "کتابخانه من", subtitle: "", icon: MdOutlineLibraryBooks },
  { id: 3, title: "نشان شده‌ها", subtitle: "", icon: IoBookmarksOutline },
  {
    id: 4,
    title: "کد تخفیف و امتیاز‌ها",
    subtitle: "",
    icon: AiOutlinePercentage,
  },
  { id: 5, title: "لیست تراکنش‌ها", subtitle: "", icon: LuClipboardList },
  { id: 6, title: "مدیریت دستگاه‌ها", subtitle: "", icon: FaMobileAlt },
  { id: 7, title: "ویرایش اطلاعات کاربری", subtitle: "", icon: LuUserCog },
  {
    id: 9,
    title: "راهنمایی و پشتیبانی کاربران",
    subtitle: "",
    icon: CiCircleQuestion,
  },
];
