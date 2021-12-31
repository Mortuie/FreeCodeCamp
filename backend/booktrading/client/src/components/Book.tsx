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
  min-width: 130px;
  min-height: 160px;

  padding 1rem;
  margin: 0.5rem;

  display: flex;
  flex-direction: column;

  border: 1.5px solid #888888;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #888888;

`;

const Image = styled.img`
  min-width: 100%;
  min-height: 100px;
  max-height: 100px;
`;

const Title = styled.div``;

const Username = styled.div`
  text-align: right;
`;

const Book: React.FC<Props> = ({ book }) => {
  return (
    <Container>
      <Image src={book.image} />

      <Title>{book.title}</Title>
      <Username>{book.user.username}</Username>
    </Container>
  );
};

export default Book;
