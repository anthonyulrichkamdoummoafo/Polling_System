import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Create_Poll from "./components/Create_Poll";
import Vote from "./components/Vote/Vote";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/home" exact element={<Home />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/create-poll" exact element={<Create_Poll />} />
      <Route path="/" exact element={<Navigate replace to="/home" />} />
      <Route path="/vote/:id" element={<Vote/>} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
export default App;
