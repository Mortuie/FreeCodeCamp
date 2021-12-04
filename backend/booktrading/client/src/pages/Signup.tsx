import { useState } from "react";
import { useApi, useUser } from "../hooks";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { User } = useApi();
  const { setUserDetails } = useUser();

  const signup = async () => {
    try {
      const ret = await User.signup(username, password);
      console.log("ret", ret);

      if (ret.status === 200) {
        const { data } = ret;

        setUserDetails(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      signup Component
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
      <button onClick={signup}>hahah</button>
    </div>
  );
};

export default Signup;
