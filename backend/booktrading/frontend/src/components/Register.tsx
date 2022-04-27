import { Link } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";

const Register = () => {
  return (
    <div className="flex w-full h-full bg-slate-300">
      <div className="flex flex-col m-auto w-64 rounded-lg shadow-2xl bg-white p-3">
        <div className="uppercase font-semibold text-2xl text-center">
          Register
        </div>

        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />

        <Button buttonText="register" secondary />

        <div className="text-gray-500">
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
