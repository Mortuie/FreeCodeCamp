import styled from "styled-components";
import { useApi, useUser } from "../hooks";
import { Link, useNavigate } from "react-router-dom";

const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";

type Route = {
  type?: string;
  name: string;
  route: string;
};

type RouteType = {
  [k: string]: Route;
};

const baseRoutes: RouteType = {
  home: { name: "BOTRA", route: "/" },
  signin: { name: "Signin", route: "/auth/signin" },
  signup: { name: "Signup", route: "/auth/signup" },
  newbook: { name: "New Book", route: "/books/new" },
  profile: { type: "link", name: "My Profile", route: "" },
  logout: { type: "link", name: "Logout", route: "" },
};

const loggedInRoutes = [
  baseRoutes.home,
  baseRoutes.newbook,
  baseRoutes.profile,
  baseRoutes.logout,
];
const loggedOutRoutes = [baseRoutes.home, baseRoutes.signin, baseRoutes.signup];
const allRoutes = {
  [LOGGED_IN]: loggedInRoutes,
  [LOGGED_OUT]: loggedOutRoutes,
};

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
`;

interface NavElementProps {
  $isFirst: boolean;
}

const NavElement = styled(Link)<NavElementProps>`
  text-decoration: none;
  color: black;

  &.active {
    color: black;
    font-color: black;
  }

  ${(props) =>
    props.$isFirst &&
    `
      margin-right: auto;


    `}
`;

const NavElementLink = styled.div<NavElementProps>`
  ${(props) =>
    props.$isFirst &&
    `
  margin-right: auto
  `}
`;

const Button = styled.div`
  @media (min-width: 400px) {
    display: none;
  }
`;

const Icon = styled(Link)`
  margin-right: auto;
  text-decoration: none;
  color: black;
`;

const Route = ({
  route,
  index,
  links,
}: {
  route: Route;
  index: number;
  links: { [k: string]: () => Promise<any> | void };
}) => {
  return route.type ? (
    <NavElementLink onClick={links[route.name]} $isFirst={index === 0}>
      {route.name}
    </NavElementLink>
  ) : (
    <NavElement to={route.route} $isFirst={index === 0}>
      {route.name}
    </NavElement>
  );
};

const Navbar2 = () => {
  const { setUserDetails, user } = useUser();
  const { User } = useApi();
  const navigate = useNavigate();

  const x = {
    Logout: async () => {
      try {
        const { data, status } = await User.logout();

        console.log(data, status);
        if (status === 200) {
          setUserDetails(null);
        }
      } catch (e) {
        console.log(e);
      }
    },
    "My Profile": () => {
      console.log(user);
      navigate(`profile/${user?.id}`);
    },
  };

  const routes = allRoutes[user ? LOGGED_IN : LOGGED_OUT];

  return (
    <Wrapper>
      {routes.map((route, index) => (
        <Route key={index} route={route} index={index} links={x} />
      ))}
      <Button>BUT</Button>
    </Wrapper>
  );
};

const Navbar = () => {
  const { user, setUserDetails } = useUser();

  return (
    <Wrapper>
      <Icon to="/">BOTRA</Icon>
      {!user && (
        <>
          <Link to="/signin" />
        </>
      )}
      {user && (
        <>
          <Link to={`/profile/${user.id}`} />
        </>
      )}
      <Button>BUT</Button>
    </Wrapper>
  );
};

export default Navbar;
