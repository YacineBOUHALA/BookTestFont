import { DateRange } from "react-day-picker";
import { Book } from "../types/Type";
import { toast } from "sonner";

type FetchBooksProps = {
  setBooks: (books: Book[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

interface FetchBookProps {
  id: string | null;
  setBook: (book: Book) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface BookingBookProps {
  requestBody: BookingRequestBody;
  setBook?: (book: Book) => void;
  setIsLoading?: (isLoading: boolean) => void;
  openModal: (close: boolean) => void;
  setDate: (value: DateRange | undefined) => void;
}

export const fetchBooks = async ({
  setBooks,
  setIsLoading,
}: FetchBooksProps) => {
  try {
    setIsLoading(true);
    const books = await fetch("http://localhost:8000/api/books", {
      method: "GET",
    });
    const result = await books.json();
    if (!result) {
      toast.error("Error: error occurred when fetching books");
    }
    setBooks(result);
    setIsLoading(false);
    toast.success("Successfully fetched",  { style: { backgroundColor: "#00b894", color: "white" } });
  } catch (error) {
    console.log("in errorrrrr");
    if (error instanceof Error) {
      toast.error("An Error occured when fetching data",  { style: { backgroundColor: "#EF4444", color: "white" } });
    }
  } finally {
    setIsLoading(false);
  }
};

export const fetchBook = async ({
  id,
  setBook,
  setIsLoading,
}: FetchBookProps) => {
  try {
    setIsLoading(true);
    const book = await fetch(`http://localhost:8000/api/books/${id}`, {
      method: "GET",
    });
    const result = await book.json();
    if (!result) {
      toast.error("Error: error occurred when fetching book");
    }
    toast.success("Successfully fetched");
    setBook(result);
    setIsLoading(false);
  } catch (error) {
    console.log("in errorrrrr");
    if (error instanceof Error) {
      toast.error("An Error occured when fetching data");
    }
  } finally {
    setIsLoading(false);
  }
};
export interface BookingRequestBody {
  user_id: number;
  book_id: number;
  start_date: string;
  end_date: string;
}

export const bookingBook = ({
  requestBody,
  openModal,
  setDate,
}: BookingBookProps) => {
  fetch("http://localhost:8000/api/booking/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.booking) {
        toast.error(
          data?.message,
          { style: { backgroundColor: "#EF4444", color: "white" } }
        );
        openModal(false);
        setDate({ from: undefined, to: undefined });
      } else {
        toast.success(data?.message, {
          style: { backgroundColor: "#00b894", color: "white" },
        });
        openModal(false);
        setDate({ from: undefined, to: undefined });
      }
    })
    .catch((error) => {
      console.log("in errorrrrr", error);
      if (error instanceof Error) {
        toast.error("An Error occured when fetching data", {});
      }
    })
};


interface FilterBookProps {
  title?: string;
  category?: string;
  year?: string;
  setBooks: (books: Book[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const filterApiBooks = ({
  setIsLoading,
  setBooks,
  title,
  category,
  year,
}: FilterBookProps) => {
  const baseUrl = "http://localhost:8000/api/books";
  const url = `${baseUrl}?title=${title}&category=${category}&publication_year=${year}`;

  setIsLoading(true);
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setBooks(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("in errorrrrr", error);
      if (error instanceof Error) {
        toast.error("An Error occured when fetching data", {});
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};
