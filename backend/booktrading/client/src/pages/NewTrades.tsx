import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi, useUser } from "../hooks";
import { ApiBookType } from "../types";

const NewTrades = () => {
  const [toBook, setToBook] = useState<ApiBookType | null>();
  const [fromBook, setFromBook] = useState();
  const { user } = useUser();
  const { toBookId, toUserId } = useParams();
  const { Books } = useApi();

  useEffect(() => {
    (async () => {
      if (toBookId && toUserId) {
        const { data } = await Books.getBook(toBookId);

        setToBook(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await Books.getBooks({ byUserId: user.id });

        console.log(data);
      }
    })();
  }, []);

  return <div>New Trade</div>;
};

export default NewTrades;
