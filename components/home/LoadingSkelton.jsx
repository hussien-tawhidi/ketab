
export default function LoadingSkelton() {
  return (
    <div className='overflow-hidden rounded-2xl relative px-2 animate-pulse'>
      {/* Image Skeleton */}
      <div className='h-[200px] w-[200px] bg-gray-700 rounded-2xl' />

      {/* Text Skeleton */}
      <div className='flex flex-col gap-2 p-2 text-right'>
        <div className='h-4 bg-gray-700 rounded w-3/4' />
        <div className='h-3 bg-gray-700 rounded w-1/2' />
        <div className='h-5 bg-gray-700 rounded w-2/3' />
      </div>
    </div>
  );
}
