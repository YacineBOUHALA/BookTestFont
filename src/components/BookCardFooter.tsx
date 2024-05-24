import { ChevronRightCircle } from 'lucide-react';
import { Button } from '../components/ui/button'

interface BookFooterProps {
  title: string;
  description: string;
  category: string;
}

const BookCardFooter = ({ title, description, category }: BookFooterProps) => {
  return (
    <div className='border rounded-[20px] h-[232px] bg-white flex flex-col gap-[10px] px-5 py-[10px] relative'>
      <h2 className='font-inter font-bold text-2xl truncate text-left'>{title} </h2>
      <div className='flex gap-[10px] flex-wrap'>
        <div className='rounded-[10px] text-white px-1 py-[6px] text-[10px] bg-sky-600 font-inter font-light'>{category} </div>
        <div className='rounded-[10px] text-white px-1 py-[6px] text-[10px] bg-sky-600 font-inter font-light'>Romance</div>
      </div>
      <div className='font-inter font-light text-xs text-left text-black h-[50px]  w-full overflow-hidden'>
        <p className='line-clamp-2'> {description} </p>
        <span className="flex items-center  cursor-pointer gap-1 font-bold font-inter underline text-xs" >Voir plus <ChevronRightCircle stroke="white"
          fill="black" size={14} className='mt-1' /> </span>
      </div>
      <Button className='rounded-[10px] absolute bottom-[10px] left-5 right-5  bg-black text-white h-[40px]' >Louer</Button>
    </div>
  )
}

export default BookCardFooter
