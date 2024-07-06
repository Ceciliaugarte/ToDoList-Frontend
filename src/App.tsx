import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TaskDetails from "./pages/TaskDetails";
import CreateTaskForm from "./pages/CreateTaskForm";
import UpdateTaskForm from "./pages/UpdateTaskForm";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./Layout";

function App() {
  const location = useLocation();
  const currentPage = location.pathname;
  const excludedPaths = ["/login", "/signup"];
  const excludeComponent = !excludedPaths.includes(currentPage);

  return (
    <>
      {excludeComponent && <Navbar />}
      <div className="h-screen">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/tasks/create" element={<CreateTaskForm />} />
            <Route path="/tasks/update/:id" element={<UpdateTaskForm />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      {excludeComponent && <Footer />}
    </>
  );
}

export default App;
