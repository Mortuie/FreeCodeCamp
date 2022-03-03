import { useEffect, useState } from "react";
import { useApi, useUser } from "../hooks";
import { BookGrid } from "../components";
import styled from "styled-components";
import { ApiBookTypeWithUser } from "../types";

const Dashboard = () => {
  const [books, setBooks] = useState<ApiBookTypeWithUser[]>();
  const { user } = useUser();
  const { Books } = useApi();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const obj = user ? { doesNotContainUserId: user.id } : {};
        const { data, status } = await Books.getBooks(obj);

        if (status === 200) {
          setBooks(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getBooks();
  }, [user]);

  return (
    <div>
      Dashboard:
      <div>{user ? user.username : "not logged in"}</div>
      <BookGrid books={books} />
    </div>
  );
};

export default Dashboard;
