import { Books } from "../data/books";

export const getBookTitle = (bookNumber: number) => {
  return Books.find((b) => b.bookNumber === bookNumber).title;
};
