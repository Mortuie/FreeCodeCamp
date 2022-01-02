import styled from "styled-components";
import { BookWithUser } from "../types";
import Book from "./Book";

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface Props {
  books: BookWithUser[] | null;
}

const BookGrid: React.FC<Props> = ({ books }) => {
  if (!books) {
    return <div>No books</div>;
  }

  return (
    <BookWrapper>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </BookWrapper>
  );
};

export { BookGrid };
