import { useState } from "react";
import { useApi, useUser } from "../hooks";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { User } = useApi();
  const { setUserDetails } = useUser();

  const signin = async () => {
    try {
      const { status, data } = await User.signin(username, password);

      console.log(status, data);

      if (status === 200) {
        setUserDetails(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      signin Component
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signin}>yeet</button>
    </div>
  );
};

export default Signin;
