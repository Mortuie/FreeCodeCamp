import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";
import { useApi, useUser } from "../hooks";
import { Container } from "../layout";
import { Books } from "../types";
import { asyncUseEffect } from "../utils";

const useBooks = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | {}>(null);
  const { BooksV1 } = useApi();

  asyncUseEffect(async () => {
    try {
      setLoading(true);
      const { data } = await BooksV1.getBooks();

      setBooks(data);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        toast.error(e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  });

  return { books, loading, error };
};

const Dashboard = () => {
  const { user } = useUser();
  const { books, loading, error } = useBooks();

  if (loading) {
    return (
      <Container>
        <SpinnerCircular color="rgb(59 130 246 / 1)" className="mx-auto" />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex-col m-auto mt-10 bg-white w-3/5">
        {books.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;
