export type Book = {
  id: number;
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
  category: string;
};

export type User = {
  id: number;
  email: string;
}

export enum BOOKING_STATUS {
  ACTIVE =  "active",
  CANCELED = "canceled"
}

export type Booking = {
  startDate: Date;
  endDate: Date;
  status: BOOKING_STATUS;
  user: User;
  book: Book;
}
