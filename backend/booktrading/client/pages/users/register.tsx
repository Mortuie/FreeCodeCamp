import axios from "axios";
import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("context", context.req.cookies);

  return {
    props: {},
  };
};

const Register: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(username, password);

  const registerButton = async () => {
    try {
      const res = await axios.post(
        `http://localhost:9000/api/v1/users/register`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>signup here</div>
      <input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerButton}>register</button>
    </div>
  );
};

export default Register;
