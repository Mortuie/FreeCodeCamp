import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";

const BASE_API_PATH = "http://localhost:9000";

type Book = {
  id: Number;
  title: String;
  description: String;
  userId: Number;
  createdAt: String;
  image: String;
};

type Props = {
  books: Book[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios.get<{ data: Book[] }>(
    `${BASE_API_PATH}/api/v1/books`
  );

  return {
    props: { books: data.data },
  };
};

const Home: NextPage<Props> = ({ books }) => {
  console.log(books);

  // return <div>{books && books.map((book) => <div>{book.title}</div>)}</div>;
  return <div>homepage...</div>;
};

export default Home;
