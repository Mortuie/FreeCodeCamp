import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    console.log(username, password);
  };

  return (
    <div className="flex w-full h-full bg-slate-300">
      <div className="flex flex-col m-auto w-64  rounded-lg shadow-2xl bg-white p-3">
        <div className="uppercase font-semibold text-2xl text-center">
          Login
        </div>

        <Input
          placeholder="Username"
          className="mt-6 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />

        <Button buttonText="login" secondary onClick={login} />

        <div className="text-gray-500 text-center">
          Don't have an account{" "}
          <Link className="underline" to="/register">
            register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;