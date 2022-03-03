import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../components";
import { useApi, useUser } from "../hooks";
import { ApiBookTypeWithUser } from "../types";

const NewTrades = () => {
  const [toBook, setToBook] = useState<ApiBookTypeWithUser | null>();
  const [fromBook, setFromBook] = useState<ApiBookTypeWithUser[]>([]);
  const { user } = useUser();
  const { toBookId, toUserId } = useParams();
  const { Books, Trades } = useApi();

  useEffect(() => {
    (async () => {
      if (toBookId && toUserId) {
        const { data } = await Books.getBook(toBookId);

        setToBook(data);
        console.log(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await Books.getBooks({
          byUserId: user.id,
          availableBooksOnly: true,
        });

        setFromBook(data);
      }
    })();
  }, []);

  const createTrade = async () => {
    const selectedBook = fromBook[0];
    if (toBook) {
      const { data, status } = await Trades.createNewTrade({
        fromBookId: selectedBook.id,
        toBookId: toBook.id,
        toUserId: toBook.userId,
      });

      console.log(data, status);
    }
  };

  if (fromBook.length === 0) {
    return <div>You have no books to trade</div>;
  }

  if (!toBook) {
    return <div>The book you requested to trade doesn't exist</div>;
  }

  if (toBook.userId === user?.id) {
    return <div>You cannot try to trade your own book</div>;
  }

  return (
    <div>
      <div>New Trade</div>

      <div>Their book</div>
      <Book book={toBook} />
      <div>Your books</div>

      <button onClick={createTrade}>Create Trade</button>
    </div>
  );
};

export default NewTrades;
