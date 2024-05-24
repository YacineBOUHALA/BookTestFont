import { useNavigate } from 'react-router-dom';
import BookCardFooter from './BookCardFooter'
import { Card } from './ui/card';

interface BookComponentProps {
  id: number;
  title: string;
  description: string;
  category: string;
}

const BookComponent = ({ title,
  description,
  category,id }: BookComponentProps) => {
  const navigate = useNavigate()
  const navigateDetail = () => {
    navigate(`/book-details?id=${id}`)
  }

  return (
    <Card className='flex flex-col border rounded-[20px] h-[523px] w-[327px] justify-between shadow-sm
    hover:bg-slate-200 hover:shadow-lg hover:scale-105 duration-150' onClick={navigateDetail}>
      <div className=''>
        <img src='/src/assets/backgroundImage.png' className='rounded-tl-[20px] rounded-tr-[20px]' width={327} height={420} alt={'title'} />
      </div>
      <BookCardFooter title={title} description={description}
        category={category} />
    </Card>
  )
}

export default BookComponent
