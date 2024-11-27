import { fakerRU } from "@faker-js/faker";
import { fakerEN } from "@faker-js/faker";
import { fakerJA } from "@faker-js/faker";
import { useTranslation } from "react-i18next";

const generateReviewText = (numberOfReviews: number, faker: any): string => {
  let reviewsText = "";
  for (let i = 0; i < numberOfReviews; i++) {
    reviewsText += faker.lorem.sentence() + " ";
  }
  return reviewsText.trim();
};

export function generateBooks(
  startSeed: number,
  page: number,
  likes: number,
  reviews: number,
  currentLang: string
) {
  let faker;

  if (currentLang === "ru") {
    faker = fakerRU;
  } else if (currentLang === "ja") {
    faker = fakerJA;
  } else {
    faker = fakerEN;
  }

  faker.seed(startSeed + page);
  const books = [];

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Horror",
    "Biography",
    "History",
  ];

  for (let i = 0; i < 20; i++) {
    const book = {
      index: page * 20 + i + 1,
      isbn: faker.string.uuid(),
      title: faker.lorem.words(3),
      authors: `${faker.person.firstName()} ${faker.person.lastName()}`,
      publisher: faker.company.name(),
      likes: faker.number.float({ min: 0, max: likes }).toFixed(1),
      reviews: generateReviewText(reviews, faker),
      genre: genres[Math.floor(Math.random() * genres.length)],
      releaseDate: faker.date.past({ years: 20 }).toISOString().split("T")[0],
    };
    books.push(book);
  }

  return books;
}
