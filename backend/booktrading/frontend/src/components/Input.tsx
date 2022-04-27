import { FC } from "react";

interface Props {
  placeholder?: string;
  type?: string;
}

const Input: FC<Props> = ({ placeholder = "", type = "text" }) => {
  return (
    <input
      className="p-3 rounded border-2 border-gray-300 hover:border-gray-400"
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
