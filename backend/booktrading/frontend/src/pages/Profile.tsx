import { useUser } from "../hooks";
import { Container } from "../layout";

interface Props {
  self?: boolean;
}

const Profile = ({ self }: Props) => {
  const { user } = useUser();

  console.log(user);

  return (
    <Container>
      <div>hello world {String(self)}</div>
    </Container>
  );
};

export default Profile;
