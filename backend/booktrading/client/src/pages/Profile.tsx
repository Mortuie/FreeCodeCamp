import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useApi } from "../hooks";
import { BookWithoutUser } from "../types";

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

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<null | {
    username: string;
    image: string;
    books: BookWithoutUser[];
  }>(null);
  const { User } = useApi();

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div style={{ paddingTop: "1rem", height: 20 }} />
      <ProfilePicture src={user.image} />
      <div>{user.username}</div>
    </Container>
  );
};

export default Profile;
