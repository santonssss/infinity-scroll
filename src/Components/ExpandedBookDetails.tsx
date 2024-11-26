import React from "react";
import { faker } from "@faker-js/faker";
import BookCover from "./BookCover";

interface Book {
  index: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  likes: string;
  reviews: string;
}

const ExpandedBookDetails: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="p-3 border bg-light">
      <div className="row">
        <div className="col-md-4">
          <BookCover title={book.title} />
        </div>
        <div className="col-md-8">
          <h5>Подробности книги</h5>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Название:</strong> {book.title}
          </p>
          <p>
            <strong>Автор(ы):</strong> {book.authors}
          </p>
          <p>
            <strong>Издатель:</strong> {book.publisher}
          </p>
          <p>
            <strong>Лайки:</strong> {book.likes}
          </p>
          <p>
            <strong>Отзывы:</strong> {book.reviews}
          </p>
          <p>
            <strong>Текст рецензии:</strong> {faker.lorem.sentences(3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpandedBookDetails;
