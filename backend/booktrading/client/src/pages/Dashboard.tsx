import { useEffect, useState } from "react";
import { useApi, useUser } from "../hooks";
import { BookGrid } from "../components";
import styled from "styled-components";
import { BookWithUser } from "../types";

const Dashboard = () => {
  const [books, setBooks] = useState<null | BookWithUser[]>(null);
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
      <BookGrid books={books} />
    </div>
  );
};

export default Dashboard;