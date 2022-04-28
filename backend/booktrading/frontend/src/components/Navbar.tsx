import { FC, useState } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <div>
      <nav className="container flex items-center min-w-full py-3 px-4 bg-blue-500 text-white">
        <div className="mr-auto ml-3 sm:ml-0">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </a>
        </div>
        <div className="hidden space-x-8 lg:flex uppercase text-2xl font-bold">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
        <div
          className="flex lg:hidden cursor-pointer mr-3 sm:mr-0"
          onClick={() => setHidden((prevState) => !prevState)}
        >
          {!hidden && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
          {hidden && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </nav>
      {hidden && <div>yello</div>}
    </div>
  );
};

export default Navbar;
