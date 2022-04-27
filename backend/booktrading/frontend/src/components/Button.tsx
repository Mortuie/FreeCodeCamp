import { FC } from "react";

interface Props {
  buttonText: string;
  primary?: boolean;
  secondary?: boolean;
}

const Button: FC<Props> = ({
  buttonText,
  primary = false,
  secondary = false,
}) => {
  const classes = `${
    secondary ? "bg-orange-400 hover:bg-orange-300 active:bg-orange-500" : ""
  } uppercase rounded-md p-2 mb-3 font-bold`;

  return <button className={classes}>{buttonText}</button>;
};

export default Button;
