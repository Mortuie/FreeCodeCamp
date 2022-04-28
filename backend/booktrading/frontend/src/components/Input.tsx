import { ChangeEvent, FC } from "react";

interface Props {
  placeholder?: string;
  type?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: FC<Props> = ({
  placeholder = "",
  type = "text",
  className = "",
  onChange = undefined,
  value = undefined,
}) => {
  return (
    <input
      className={`p-3 rounded border-2 border-gray-300 hover:border-gray-400 ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
