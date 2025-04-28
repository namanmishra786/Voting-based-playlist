import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import GroupList from "./components/GroupList";

function App() {
  const { user } = useContext(AuthContext);

  console.log("👤 Authenticated?", user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <GroupList /> : <AuthForm />} />
        <Route path="*" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
