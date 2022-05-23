import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Input } from "../components";
import { useApi, useUser } from "../hooks";
import { Container } from "../layout";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useUser();

  const _register = () => register(username, password);

  return (
    <Container>
      <div className="flex flex-col m-auto">
        <div className="text-2xl text-center mb-3">Register</div>

        <div className="flex flex-col m-auto w-64 rounded-lg shadow-2xl bg-white p-3">
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

          <Button buttonText="Register" secondary onClick={_register} />

          <div className="text-gray-500 text-center">
            Have an account already{" "}
            <Link className="underline" to="/login">
              login here
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
