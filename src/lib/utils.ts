import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BOOKING_STATUS, Booking } from "../types/Type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToISO = (date: Date | undefined): string => {
  const pad = (n: number) => (n < 10 ? "0" + n : n);

  const year = date?.getUTCFullYear();
  const month = pad(date!.getUTCMonth() + 1);
  const day = pad(date!.getUTCDate());
  const hours = pad(date!.getUTCHours());
  const minutes = pad(date!.getUTCMinutes());
  const seconds = pad(date!.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const DEFAULT_BOOKONG_VALUES: Booking = {
  startDate: new Date(),
  endDate: new Date(),
  status: BOOKING_STATUS.ACTIVE,
  user: {
    id: 0,
    email: "",
  },
  book: {
    id: 0,
    author: "",
    category: "",
    description: "",
    title: "",
    publishedAt: new Date(),
  },
};

// export const fromApi2Form = (data) => {
//   if (!data) {
//     return DEFAULT_BOOKONG_VALUES;
//   }
//   return {
//     startDate: data?.startDate,
//     endDate: data?.endDate,
//     status: data?.status,
//     user: {
//       id: data?.user?.id,
//       email: data?.user?.email,
//     },
//     book: {
//       id: data?.book?.id,
//       author: data?.book?.author,
//       category: data?.book?.category,
//       description: data?.book?.description,
//       title: data?.book?.title,
//       publishedAt: data?.book?.publishedAt,
//     },
//   };
// };
