import styled from "styled-components";

interface Props {
  book: {
    createdAt: string;
    description: string;
    id: number;
    image: string;
    title: string;
    userId: number;
    user: { username: string };
  };
}

const Container = styled.div`
  min-width: 250px;
  min-height: 250px;

  padding 1rem;
`;

const Image = styled.img`
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
`;

const Book: React.FC<Props> = ({ book }) => {
  return (
    <Container>
      <Image src={book.image} />

      {book.title + book.user.username}
    </Container>
  );
};

export default Book;
