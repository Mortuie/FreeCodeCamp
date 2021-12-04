import styled from "styled-components";
import { useUser } from "../hooks";
import { Link } from "react-router-dom";

interface RouteType {
  [k: string]: {
    type?: string;
    name: string;
    route?: string;
  };
}

const baseRoutes: RouteType = {
  home: { name: "Home", route: "/" },
  signin: { name: "Signin", route: "/auth/signin" },
  signup: { name: "Signup", route: "/auth/signup" },
  logout: { type: "link", name: "Logout" },
};

const Wrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
`;

interface NavElementProps {
  $isFirst: boolean;
}

const NavElement = styled(Link)<NavElementProps>`
  ${(props) =>
    props.$isFirst &&
    `
      margin-right: auto;
    `}
`;

const NavElementLink = styled.div<NavElementProps>`
  ${(props) => props.$isFirst && `margin-right: auto`}
`;

const Navbar = () => {
  const { isLoggedIn } = useUser();

  const loggedInRoutes = [baseRoutes.home];
  const loggedOutRoutes = [
    baseRoutes.home,
    baseRoutes.signin,
    baseRoutes.signup,
  ];
  const obj = { loggedIn: loggedInRoutes, loggedOut: loggedOutRoutes };

  return (
    <Wrapper>
      {obj[isLoggedIn ? "loggedIn" : "loggedOut"].map((route, index) => {
        return (
          <NavElement key={route.route} to={route.route} $isFirst={index === 0}>
            {route.name}
          </NavElement>
        );
      })}
    </Wrapper>
  );
};

export default Navbar;
