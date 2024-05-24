import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchBook } from "../api/BookApiFunction"
import { Book } from "../types/Type"
import { LoadingSpinner } from "./HomePage"
import { CalendarCheck, } from "lucide-react"
import { Button } from "../components/ui/button"
import { DialogBookingBook } from "../components/BookingBook"
import { Toaster } from "sonner"

const DetailPage = () => {
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setIsOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  useEffect(() => {
    fetchBook({ id, setBook, setIsLoading })
  }, [])

  return (
    <div className="container flex justify-center items-center h-screen">
      {
        isLoading ?
          <LoadingSpinner />
          : (
            <div className="w-[800px] h-[80vh] flex rounded-2xl border shadow-md" >
              <div className="flex flex-col p-5 gap-4 bg-sky-300 min-w-[250px]" >
                <h2 className="font-bold text-2xl" >{book?.title} </h2>
                <p className="font-semibold text-xl">{book?.author} </p>
                <div className='rounded-[10px] text-white px-2 py-[6px] text-[15px] bg-sky-600 font-inter font-light w-fit'>{book?.category} </div>
                <p>Publication:</p>
                <p className="flex gap-1" ><CalendarCheck size={"20"} /> {new Date(book?.publishedAt || "").toLocaleString() ?? ""} </p>
              </div>
              <div className="relative ">
                <p className="text-inter font-semibold max-h-[230px] overflow-y-auto text-gray-600 text-xl px-4 py-6" >{book?.description} </p>
                <div className="bottom-[10px] left-5 right-5 absolute flex justify-around">
                  <Button variant={"default"} className="bg-green-600" onClick={() => setIsOpen(true)}>Louer</Button>
                  <Button className='rounded-[10px]  bg-black text-white h-[40px] '  >Annuler</Button>
                  <DialogBookingBook open={open} setOpen={setIsOpen} />
                </div>
              </div>
            </div>
          )
      }
      <Toaster />
    </div>
  )
}

export default DetailPage
