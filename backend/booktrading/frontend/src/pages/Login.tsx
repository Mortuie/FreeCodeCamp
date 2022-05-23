import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../components";
import { useUser } from "../hooks";
import { Container } from "../layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const _login = () => login(username, password);

  return (
    <Container>
      <div className="flex flex-col m-auto">
        <div className="text-2xl text-center mb-3">Login</div>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          <Button buttonText="Login" secondary onClick={_login} />

          <div className="text-gray-500 text-center">
            Don't have an account{" "}
            <Link className="underline" to="/register">
              register here
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
