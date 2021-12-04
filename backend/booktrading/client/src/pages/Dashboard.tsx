import { Link } from "react-router-dom";
import { useUser } from "../hooks";

const Home = () => {
  const { isLoggedIn, toggleUser } = useUser();

  return (
    <div>
      Dashboard: {isLoggedIn.toString()}
      <button onClick={toggleUser}>click me</button>
      <Link to="/private">PRIVATE PAGE</Link>
      <Link to="/auth/signin">in PAGE</Link>
      <Link to="/auth/signup">up PAGE</Link>
    </div>
  );
};

export default Home;
