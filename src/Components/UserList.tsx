import React, { useState, useEffect } from "react";
import { generateBooks } from "./GeneraterFakeData";
import ExpandedBookDetails from "./ExpandedBookDetails";
import { useTranslation } from "react-i18next";

interface Book {
  index: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  likes: string;
  reviews: string;
  genre: string;
  releaseDate: string;
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

  const { t, i18n } = useTranslation();

  const reloadBooks = () => {
    setLoading(true);
    const newBooks = generateBooks(startSeed, 1, likes, reviews, i18n.language);
    setBooks(newBooks);
    setPage(2);
    setLoading(false);
  };

  const loadMoreBooks = () => {
    if (loading) return;
    setLoading(true);
    const newBooks = generateBooks(
      startSeed,
      page,
      likes,
      reviews,
      i18n.language
    );
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

  const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">{(t as any)("book_list")}</h1>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="form-group">
            <label>{(t as any)("initial_value")}</label>
            <input
              type="number"
              className="form-control"
              value={startSeed}
              onChange={(e) =>
                handleFilterChange("startSeed", Number(e.target.value))
              }
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>{(t as any)("avg_likes")}</label>
            <input
              type="range"
              className="form-control-range"
              min="0"
              max="5"
              step="0.1"
              value={likes}
              onChange={(e) =>
                handleFilterChange("likes", Number(e.target.value))
              }
            />
            <span>{likes}</span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>{(t as any)("avg_reviews")}</label>
            <input
              type="range"
              className="form-control-range"
              min="0"
              max="5"
              step="0.1"
              value={reviews}
              onChange={(e) =>
                handleFilterChange("reviews", Number(e.target.value))
              }
            />
            <span>{reviews}</span>
          </div>
        </div>
      </div>

      <div className="form-group mb-4">
        <label htmlFor="language-select">{(t as any)("SelectLanguage")}</label>
        <select
          id="language-select"
          className="form-control"
          onChange={(e) => {
            changeLanguage(e.target.value);
            reloadBooks();
          }}
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="ja">日本語</option>
        </select>
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
              <th>{(t as any)("table.number")}</th>
              <th>{(t as any)("table.isbn")}</th>
              <th>{(t as any)("table.title")}</th>
              <th>{(t as any)("table.authors")}</th>
              <th>{(t as any)("table.publisher")}</th>
              <th>{(t as any)("table.likes")}</th>
              <th>{(t as any)("table.reviews")}</th>
              <th>{(t as any)("table.genre")}</th>
              <th>{(t as any)("table.releaseDate")}</th>
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
                  <td>{book.genre}</td>
                  <td>{book.releaseDate}</td>
                </tr>
                {expandedBookIndex === index && (
                  <tr>
                    <td colSpan={9}>
                      <ExpandedBookDetails book={book} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="text-center py-3">{(t as any)("loading")}</div>
        )}
      </div>
    </div>
  );
};

export default UserList;
