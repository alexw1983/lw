import { Books } from "../data/books";
import { IAdventure } from "../redux/types";

export const getBookTitle = (bookNumber: number) => {
  return Books.find((b) => b.bookNumber === bookNumber).title;
};

export const getBooks = (adventures: IAdventure[]) => {
  return Books.filter(
    (x) => !adventures.map((ad) => +ad.bookNumber).includes(x.bookNumber)
  ).sort((s, t) => s.bookNumber - t.bookNumber);
};
