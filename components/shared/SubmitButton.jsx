"use client";

export default function SubmitButton({ label, loading = false, onClick }) {
  return (
    <button
      type='submit'
      onClick={onClick}
      disabled={loading}
      className={`w-full py-2 rounded font-bold items-center justify-center transition-colors
        ${
          loading
            ? "cursor-not-allowed"
            : "border border-ketab-green text-ketab-green"
        }`}>
      {loading ? (
        <div className='flex items-center gap-2'>
          <svg
            className='animate-spin h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            />
          </svg>
          <span>در حال ارسال...</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}
