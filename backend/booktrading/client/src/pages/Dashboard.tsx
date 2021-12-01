import { Link } from "react-router-dom";
import { useUser } from "../hooks";

const Home = () => {
  const { user, toggleUser } = useUser();

  return (
    <div>
      Dashboard: {user.toString()}
      <button onClick={toggleUser}>click me</button>
      <Link to="/private">PRIVATE PAGE</Link>
    </div>
  );
};

export default Home;
