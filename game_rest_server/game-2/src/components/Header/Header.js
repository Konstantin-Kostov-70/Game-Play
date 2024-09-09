import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { GameContext } from "../../contexts/gameContext";

export const Header = () => {
  const { auth } = useContext(AuthContext);
  const { games } = useContext(GameContext);
  const [menuOpen, setMenuOpen] = useState(false);
  let user_id = undefined;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (Object.keys(auth).includes("user_info")) {
    user_id = auth.user_info.id;
  }

  return (
    <>
      {games && (
        <header>
          <h1 className="home">
            <Link to={"/"}>GamesPlay</Link>
          </h1>
          <nav>
            {auth.token ? (
              <div id="user">
                <Link className="user-name" to={`/profile/${user_id}`}>
                  Welcome {auth.user_info.username}
                </Link>
                <Link to={"/catalog"}>All games</Link>
                <Link to={"/create"}>Add Game</Link>
                <Link to={"/Logout"}>Logout</Link>
              </div>
            ) : (
              <div id="guest">
                 <Link to={"/catalog"}>All games</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </div>
            )}
          </nav>
          <div className="ham-menu" onClick={toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </header>
      )}

      <div id="toggle" className={menuOpen ? "open" : ""}>
        {auth.token ? (
          <div id="user">
            <Link className="user-name" to={`/profile/${user_id}`}>
              Welcome {auth.user_info.username}
            </Link>
            <Link to={"/catalog"} onClick={toggleMenu}>All games</Link>
            <Link to={"/create"} onClick={toggleMenu}>Add Game</Link>
            <Link to={"/Logout"} onClick={toggleMenu}>Logout</Link>
          </div>
        ) : (
          <div id="guest">
            <Link to={"/catalog"} onClick={toggleMenu}>All games</Link>
            <Link to={"/login"} onClick={toggleMenu}>Login</Link>
            <Link to={"/register"} onClick={toggleMenu}>Register</Link>
          </div>
        )}
      </div>
    </>
  );
};
