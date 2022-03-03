import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useApi, useUser } from "../hooks";
import { ApiBookTypeWithUser } from "../types";
import { ApiUserWithBooksType } from "../types/user.interface";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePicture = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const ChoiceContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  & > div {
    cursor: pointer;
    padding: 5px 10px;
  }
`;

enum Types {
  BOOKS,
  YOUR_TRADES,
  INCOMING_TRADES,
}

const BookGrid = () => {
  return <div>yessir</div>;
};
const YourTradesGrid = () => {
  return <div>your</div>;
};
const IncTradesGrid = () => {
  return <div>inc</div>;
};

const ProfileSwitch = ({ state, ...rest }: { state: Types }) => {
  switch (state) {
    case Types.BOOKS:
      return <BookGrid {...rest} />;
    case Types.YOUR_TRADES:
      return <YourTradesGrid {...rest} />;
    case Types.INCOMING_TRADES:
      return <IncTradesGrid {...rest} />;
  }
};

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<null | ApiUserWithBooksType>(null);
  const [state, setState] = useState(Types.BOOKS);
  const { User, Books } = useApi();
  const [books, setBooks] = useState<ApiBookTypeWithUser[]>();
  const { user: loggedInUser } = useUser();

  useEffect(() => {
    if (id) {
      const x = async () => {
        const { status, data } = await User.getUserById(id);

        console.log(status, data);

        if (status === 200) {
          setUser(data);
        }
      };

      x();
    }
  }, [id]);

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await Books.getBooks({ byUserId: user.id });

        setBooks(data);
      }
    })();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div style={{ paddingTop: "1rem", height: 20 }} />
      <ProfilePicture src={user.image} />
      <div>{user.username}</div>

      <ChoiceContainer>
        <div onClick={() => setState(Types.BOOKS)}>Books</div>
        {loggedInUser && (
          <div onClick={() => setState(Types.YOUR_TRADES)}>Your Trades</div>
        )}
        {loggedInUser && (
          <div onClick={() => setState(Types.INCOMING_TRADES)}>
            Incoming Trades
          </div>
        )}
      </ChoiceContainer>

      {ProfileSwitch({ state })}
    </Container>
  );
};

export default Profile;
