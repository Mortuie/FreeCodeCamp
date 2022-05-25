import { useUser } from "../hooks";
import { asyncUseEffect } from "../utils";

const Logout = () => {
  const { logout } = useUser();

  asyncUseEffect(async () => {
    await logout();
  });

  return <div>LOGGING OUT BABY</div>;
};

export default Logout;
