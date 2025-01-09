import { Routes, Route } from "react-router";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import BrainDumpPage from "./pages/BrainDumpPage";
import CalendarPage from "./pages/CalendarPage";
import TodoPage from "./pages/TodoPage";
import Welcome from "./pages/Welcome";
import Nav from "./components/Nav";
import "./App.css";
import { getUser } from "./utilities/users-services";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      {user ? (
        <>
          <Nav />
          <div> Hi! {user.name} </div>
          <h1>Calendar App!</h1>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/braindump" element={<BrainDumpPage />} />
            <Route path="/todos" element={<TodoPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
