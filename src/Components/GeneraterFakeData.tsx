import { faker } from "@faker-js/faker";

export function generateBooks(
  startSeed: number,
  page: number,
  likes: number,
  reviews: number
) {
  faker.seed(startSeed + page);
  const books = [];

  for (let i = 0; i < 20; i++) {
    const book = {
      index: page * 20 + i + 1,
      isbn: faker.string.uuid(),
      title: faker.lorem.words(3),
      authors: `${faker.name.firstName()} ${faker.name.lastName()}`,
      publisher: faker.company.name(),
      likes: faker.number.float({ min: 0, max: likes }).toFixed(1),
      reviews: faker.number.float({ min: 0, max: reviews }).toFixed(1),
    };
    books.push(book);
  }

  return books;
}
