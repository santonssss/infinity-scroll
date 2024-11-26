export interface TranslationSchema {
  book_list: string;
  initial_value: string;
  avg_likes: string;
  avg_reviews: string;
  loading: string;
  table: {
    number: string;
    isbn: string;
    title: string;
    authors: string;
    publisher: string;
    likes: string;
    reviews: string;
  };
}
