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
import { useSelector } from "react-redux";
import { AppRootState } from "./Redux/storeConfig";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastConfig from "./components/Toasts/ToastConfig";

function App() {
  const location = useLocation();
  const currentPage = location.pathname;
  const excludedPaths = ["/login", "/signup"];
  const excludeComponent = !excludedPaths.includes(currentPage);

  const user = useSelector((state: AppRootState) => state.user);

  return (
    <div className="flex flex-col min-h-screen">
      {excludeComponent && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
              <Route path="/tasks/create" element={<CreateTaskForm />} />
              <Route path="/tasks/update/:id" element={<UpdateTaskForm />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      {excludeComponent && <Footer />}
      <ToastConfig />
    </div>
  );
}

export default App;
