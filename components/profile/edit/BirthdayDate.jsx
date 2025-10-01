import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
export default function BirthdayDate({ birthday, setBirthday }) {
  return (
    <div className='flex items-center gap-3'>
      <p className='text-sm text-ketab-gray'>تاریخ تولد</p>
      <DatePicker
        value={birthday}
        onChange={(date) => setBirthday(date?.toDate?.() || "")}
        calendar={persian}
        locale={persian_fa}
        calendarPosition='bottom-right'
        placeholder='تاریخ تولد'
        className='green bg-dark rmdp-mobile'
        style={{
          backgroundColor: "#282a2c",
          height: "24px",
          color: "#81828c",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          padding: "22px 10px",
        }}
        animations={[opacity(), transition({ from: 35, duration: 800 })]}
      />
    </div>
  );
}
