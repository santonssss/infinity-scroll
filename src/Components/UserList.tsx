import React, { useState, useEffect } from "react";
import { generateBooks } from "./GeneraterFakeData";
import ExpandedBookDetails from "./ExpandedBookDetails";

interface Book {
  index: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  likes: string;
  reviews: string;
}

const UserList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [startSeed, setStartSeed] = useState(12345);
  const [likes, setLikes] = useState(5);
  const [reviews, setReviews] = useState(3);
  const [expandedBookIndex, setExpandedBookIndex] = useState<number | null>(
    null
  );

  const reloadBooks = () => {
    setLoading(true);
    const newBooks = generateBooks(startSeed, 1, likes, reviews);
    setBooks(newBooks);
    setPage(2);
    setLoading(false);
  };

  const loadMoreBooks = () => {
    if (loading) return;
    setLoading(true);
    const newBooks = generateBooks(startSeed, page, likes, reviews);
    setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    reloadBooks();
  }, []);

  const handleFilterChange = (
    type: "startSeed" | "likes" | "reviews",
    value: number
  ) => {
    if (type === "startSeed") setStartSeed(value);
    if (type === "likes") setLikes(value);
    if (type === "reviews") setReviews(value);
    reloadBooks();
  };

  const handleRowClick = (index: number) => {
    setExpandedBookIndex(expandedBookIndex === index ? null : index);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Список книг</h1>

      <div className="form-group">
        <label>Начальное значение</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={startSeed}
            onChange={(e) =>
              handleFilterChange("startSeed", Number(e.target.value))
            }
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Среднее количество лайков</label>
        <div className="d-flex align-items-center">
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={likes}
            onChange={(e) =>
              handleFilterChange("likes", Number(e.target.value))
            }
            className="form-control-range"
          />
          <span className="ml-2">{likes}</span>
        </div>
      </div>

      <div className="form-group">
        <label>Среднее количество отзывов</label>
        <div className="d-flex align-items-center">
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={reviews}
            onChange={(e) =>
              handleFilterChange("reviews", Number(e.target.value))
            }
            className="form-control-range"
          />
          <span className="ml-2">{reviews}</span>
        </div>
      </div>

      <div
        className="table-responsive"
        id="book-table"
        style={{ maxHeight: "500px", overflowY: "auto" }}
        onScroll={() => {
          if (!loading) {
            const table = document.getElementById("book-table");
            if (
              table &&
              table.scrollHeight - table.scrollTop === table.clientHeight
            ) {
              loadMoreBooks();
            }
          }
        }}
      >
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>ISBN</th>
              <th>Название</th>
              <th>Автор(ы)</th>
              <th>Издатель</th>
              <th>Лайки</th>
              <th>Отзывы</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <React.Fragment key={book.isbn}>
                <tr onClick={() => handleRowClick(index)}>
                  <td>{book.index}</td>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.authors}</td>
                  <td>{book.publisher}</td>
                  <td>{book.likes}</td>
                  <td>{book.reviews}</td>
                </tr>
                {expandedBookIndex === index && (
                  <tr>
                    <td colSpan={7}>
                      <ExpandedBookDetails book={book} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {loading && <div className="text-center py-3">Загружаем...</div>}
      </div>
    </div>
  );
};
export default UserList;
