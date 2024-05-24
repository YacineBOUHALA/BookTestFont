import { useEffect, useState } from 'react'
import { Book } from '../types/Type'
import { fetchBooks } from '../api/BookApiFunction'
import BookComponent from '../components/BookComponent'
import { cn } from '../../lib/utils'
import { Toaster } from 'sonner'
import FilterBooks from '../components/filterBooks'

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchBooks({ setBooks, setIsLoading });
  }, [])

  const filterBooks = (data: Book[] | null) => {
    if(data) {
      setBooks(data);
    }
  }

  return (
    <div className='container flex flex-col gap-8 justify-center items-center relative  min-h-[90vh]'>
      <section>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div>
              <div className='bg-white flex justify-end p-4 mb-4 fixed right-4 top-0 left-4 z-20 ' >
                <FilterBooks filterBooks={filterBooks} setIsLoading={setIsLoading} />
              </div>
            </div>
            <div className='flex flex-wrap gap-8 justify-center items-center mt-24 w-full'>
              {books?.map((book) =>
              (
                <BookComponent key={book.id} id={book.id} title={book.title} description={book.description}
                  category={book.category} />
              ))}
            </div>
          </>
        )}
        <Toaster />
      </section>

    </div>
  )
}

export default HomePage

export const LoadingSpinner = ({ className }: { className?: string }) =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
