import Image from "next/image";

export default function Intro() {
  return (
    <div className='flex flex-col items-center py-12'>
      <Image
        src={"/logo.png"}
        width={100}
        height={100}
        alt='logo'
        className='object-cover'
      />
      <p className='font-semibold mt-3 text-ketab-white'>فروشگاه کتاب</p>
      <h6 className='font-black my-2'>هزاران کتاب الکترونیک در جیب شما</h6>
      <p className='lg:w-[50%] md:w-[70%] w-full mx-auto text-center text-ketab-gray'>
        کتاب پلی است میان شما و جهانِ بی‌پایانِ داستان‌ها، اندیشه‌ها و تجربه‌ها.
        هزاران کتاب الکترونیک از نویسندگان و ناشران برتر در کتاب گرد آمده‌اند تا
        بتوانید در هر زمان و مکانی بخوانید. همین حالا به میلیون‌ها کاربر کتاب
        بپیوندید و تجربه‌ای تازه از مطالعه را آغاز کنید
      </p>
      <div className='w-full bg-ketab-green rounded-xl mx-auto flex justify-between items-center md:px-5 p-2 my-10'>
        <div className='font-semibold'>
          <p>تا 100% تخفیف</p>
          <p>داغ ترین کتاب ها در</p>
          <p>اخرهای های هفته</p>
          <button className='bg-[#4c7623] py-0.5 p-3 text-sm mt-2 rounded-xl cursor-pointer'>
            مشاهده
          </button>
        </div>
        <Image
          src={"/main/weekenImage.png"}
          width={200}
          height={200}
          alt='weekenImage.png'
          className='object-cover w-44'
        />
      </div>
    </div>
  );
}
