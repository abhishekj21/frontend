import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch, FaBars } from "react-icons/bs";
import Menu from "./Menu";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct path

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blogosphere</Link>
        </h1>
        {path === "/" && (
          <div
            onChange={(e) => setPrompt(e.target.value)}
            className="flex justify-center items-center space-x-0"
          >
            <input
              className="outline-none rounded-l-xl px-3 text-black bg-white"
              placeholder="search a pst"
              type="text"
            />
            <p
              onClick={() =>
                navigate(prompt ? "?search" + prompt : navigate("/"))
              }
              className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3>
              <Link to="/write">write</Link>
            </h3>
          ) : (
            <h3>
              {/* <Link to="/register">Register</Link> */}
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer relative"></p>
              <FaBars />
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
