import { useEffect } from "react";
import { useUser } from "../hooks";

const asyncUseEffect = (fn: any) => {
  return useEffect(() => {
    (async () => {
      await fn();
    })();
  }, []);
};

const Logout = () => {
  const { logout } = useUser();

  asyncUseEffect(async () => {
    await logout();
  });

  return <div>LOGGING OUT BABY</div>;
};

export default Logout;
