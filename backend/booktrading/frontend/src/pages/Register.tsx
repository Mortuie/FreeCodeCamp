import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Input } from "../components";
import { useUser } from "../hooks";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RegisterResponse {
  username: string;
  id: number;
  createdAt: string;
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${BASE_URL}/api/v1/users/register`,
        {
          username,
          password,
        }
      );

      console.log(data);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const {
          response: { data, status },
        } = e;
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="flex w-full h-full bg-slate-300">
      <div className="flex flex-col m-auto w-64 rounded-lg shadow-2xl bg-white p-3">
        <div className="uppercase font-semibold text-2xl text-center">
          Register
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
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button buttonText="register" secondary onClick={register} />

        <div className="text-gray-500 text-center">
          Have an account already{" "}
          <Link className="underline" to="/login">
            login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
