import { FC } from "react";

interface Props {
  buttonText: string;
  primary?: boolean;
  secondary?: boolean;
  onClick?: () => Promise<void>;
}

const Button: FC<Props> = ({
  buttonText,
  primary = false,
  secondary = false,
  onClick = undefined,
}) => {
  const classes = `${
    secondary ? "bg-orange-400 hover:bg-orange-300 active:bg-orange-500" : ""
  } rounded-md p-2 mb-3 font-bold`;

  return (
    <button onClick={onClick} className={classes}>
      {buttonText}
    </button>
  );
};

export default Button;
