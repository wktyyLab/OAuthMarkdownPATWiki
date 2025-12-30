export default function LoadingCircle() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div
        title='読み込み中'
        className='size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'
      ></div>
    </div>
  );
}
