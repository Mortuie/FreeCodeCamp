import { useEffect, useState } from "react";
import { useApi, useUser } from "../hooks";
import { Book } from "../components";
import styled from "styled-components";

type Book = {
  createdAt: string;
  description: string;
  id: number;
  image: string;
  title: string;
  userId: number;
  user: { username: string };
};

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Dashboard = () => {
  const [books, setBooks] = useState<null | Book[]>(null);
  const { user } = useUser();
  const { Books } = useApi();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const {
          data: { data },
          status,
        } = await Books.getBooks();

        if (status === 200) {
          setBooks(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getBooks();
  }, []);

  console.log(books);

  return (
    <div>
      Dashboard:
      <div>{user ? user.username : "not logged in"}</div>
      {books && (
        <BookWrapper>
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </BookWrapper>
      )}
    </div>
  );
};

export default Dashboard;
