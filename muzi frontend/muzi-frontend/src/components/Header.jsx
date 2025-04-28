import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Muzi - Music Collaboration</h1>
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
};

export default Header;
