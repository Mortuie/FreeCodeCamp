import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className="flex w-full h-full bg-slate-300">{children}</div>;
};

export default Container;
