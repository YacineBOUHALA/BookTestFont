import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import DatePicker from "./DatePicker"
import { BookingRequestBody, bookingBook } from "../api/BookApiFunction"
import { Toaster } from "./ui/toaster"
import { formatDateToISO } from "../lib/utils"
import { useSearchParams } from "react-router-dom"

interface BookingBookProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function DialogBookingBook({ open, setOpen }: BookingBookProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id')
  const onCloseModal = () => {
    setDate({
      from: undefined,
      to: undefined
    })
    setOpen(false)
  }

  const handleRent = () => {
    const requestBody: BookingRequestBody = {
      user_id: 4,
      book_id: parseInt(id ?? ''),
      start_date: formatDateToISO(date?.from),
      end_date: formatDateToISO(date?.to),
    }
    bookingBook({ requestBody: requestBody, openModal: setOpen, setDate })
  }

  return (
    <Dialog open={open} onOpenChange={onCloseModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Louer le livre</DialogTitle>
          <DialogDescription className="text-left">
            veuillez renseigner la date de début et de fin de la location
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DatePicker handleDate={setDate} />
        </div>
        <DialogFooter>
          <div className=" w-full flex justify-between">
            <Button variant={'outline'} onClick={handleRent} disabled={!date?.to} >Confirmer</Button>
            <Button variant={"destructive"} onClick={onCloseModal} >Annuler</Button>
          </div>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  )
}
