import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useApi } from "../hooks";

const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { User } = useApi();

  useEffect(() => {
    if (id) {
      const x = async () => {
        const { status, data } = await User.getUserById(id);

        console.log(status, data);

        if (status === 200) {
          setLoading(false);
          setUser(data);
        }
      };

      x();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{user.username}</div>;
};

export default Profile;
