import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Task from "../components/Task";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppRootState } from "../Redux/storeConfig";

const Home: React.FC = () => {
  const user = useSelector((state: AppRootState) => state.user);

  return (
    <div className="flex flex-col justify-center px-auto py-10">
      <div className="py-10 px-20 grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <Link to={"/tasks/create"}>
            <i className="fa-solid fa-circle-plus ml-2 text-4xl"></i>
          </Link>
        </div>
        <div className="col-span-7 flex items-center">
          <h1 className="text-4xl font-mono font-bold align-middle text-center">
            YOUR TASKS
          </h1>
        </div>
      </div>
      <div className="py-20 px-20 flex justify-center">
        {user.tasks && user.tasks.length > 0 ? (
          <div className="px-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {user.tasks.map((task) => (
              <Task key={task.id} user={user} task={task} />
            ))}
          </div>
        ) : (
          <div>No tasks yet!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
