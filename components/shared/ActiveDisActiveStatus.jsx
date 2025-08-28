"use client";

export default function ActiveDisActiveStatus({
  options,
  selected,
  setSelected,
}) {
  return (
    <div className='relative flex flex-col pl-2 text-ketab-gray w-full'>
      {/* Glider container */}
      <div className='absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-ketab-light to-transparent'>
        <div
          className='relative h-[calc(100%/2)] w-full transition-transform duration-500 ease-[cubic-bezier(0.37,1.95,0.66,0.56)]
          bg-gradient-to-b from-transparent via-ketab-green to-transparent'
          style={{
            transform: `translateY(${options.indexOf(selected) * 100}%)`,
          }}>
          {/* glow */}
          <span className='absolute left-0 top-1/2 h-[60%] w-[300%] -translate-y-1/2 bg-ketab-green blur-md' />
          {/* right trail */}
          <span className='absolute left-0 top-0 h-full w-[150px] bg-gradient-to-r from-[#f7e4791c] to-transparent' />
        </div>
      </div>

      {/* Radio Options */}
      {options.map((opt) => (
        <label
          key={opt}
          className={`relative cursor-pointer p-4 transition-colors duration-300 ${
            selected === opt ? "text-ketab-green" : "text-ketab-gray"
          }`}>
          <input
            type='radio'
            name='status-radio'
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            className='hidden'
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
