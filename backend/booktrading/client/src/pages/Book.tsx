import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi, useUser } from "../hooks";
import { ApiBookType } from "../types";

const Book = () => {
  const { id } = useParams();
  const { Books, Trades } = useApi();
  const { user } = useUser();
  const [book, setBook] = useState<ApiBookType | null>();

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const { data } = await Books.getBook(id);
          setBook(data);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  if (!book) {
    return <div>No book for the id: {id}</div>;
  }

  return (
    <div>
      <div>book comp</div>
      {user && user.id !== book.userId && <button>trade</button>}
      <div></div>
    </div>
  );
};

export default Book;
