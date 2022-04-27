import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex w-full h-full bg-slate-300">
      <div className="flex flex-col m-auto w-64  rounded-lg shadow-2xl bg-white p-3">
        <div className="uppercase font-semibold text-2xl text-center">
          Login
        </div>

        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded mt-6 border-2 border-gray-300 hover:border-gray-400 mb-4"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-3 rounded border-2 border-gray-300 hover:border-gray-400"
        />

        <button className="uppercase mb-3 bg-orange-400 p-2 rounded-md hover:bg-orange-300 active:bg-orange-500 font-bold">
          submit
        </button>

        <div className="text-gray-500">
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
