import { TextSearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import { Book } from "../types/Type"
import { filterApiBooks } from "../api/BookApiFunction"

interface FilterBooksProps {
  filterBooks: (data: Book[] | null) => void;
  setIsLoading: (value: boolean) => void;
}

const FilterBooks = ({ filterBooks, setIsLoading }: FilterBooksProps) => {

  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    year: "",
  })

  const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    filterApiBooks({ setBooks: filterBooks, setIsLoading: setIsLoading, title: inputs?.title, category: inputs.category, year: inputs.year })
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" >
            Recherche
            <TextSearchIcon className="ml-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none"></h4>
              <p className="text-sm text-muted-foreground">
                Faire une recherche plus présise.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="title">Titre</label>
                <Input
                  id="title" name="title"
                  onChange={handleChangeFilters}
                  placeholder="Entrer un titre"
                  value={inputs.title}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="description">Category</label>
                <Input
                  id="category" name="category"
                  placeholder="Entrer une category"
                  onChange={handleChangeFilters}
                  value={inputs.category}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="year">Année</label>
                <Input
                  id="year" name="year"
                  placeholder="Entrer l'année"
                  onChange={handleChangeFilters}
                  value={inputs.year}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid items-center mt-4 w-full">
                <Button size={"sm"} onClick={handleSubmit} className="rounded-md bg-gray-900 w-full" >Envoyer</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  )
}

export default FilterBooks
