import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppRootState } from "../Redux/storeConfig";
import { Task } from "../types/task";
import { formatDate } from "../utils/dateUtils";

const TaskDetails: React.FC = () => {
  const user = useSelector((state: AppRootState) => state.user);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentTask = async () => {
      if (!user) {
        navigate("*");
        return;
      }
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/tasks/${params.id}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCurrentTask(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentTask();
  }, [params.id, user]);

  return (
    <div className="flex flex-col min-h-screen py-8 px-4">
      <div className="flex justify-center items-center ">
        {!currentTask ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full px-32">
            <span className="flex justify-end pb-8">
              <Link to={`/tasks/update/${currentTask.id}`}>
                <i className="fa-solid fa-pen-to-square text-2xl"></i>
              </Link>
              <i className="ps-4 fa-solid fa-trash text-2xl"></i>
            </span>
            <div className="bg-black bg-opacity-20 rounded-lg shadow-lg p-4">
              <div className="py-2 px-4 border-b-2 border-black">
                <h3 className="font-bold">{currentTask.title}</h3>
              </div>
              <div className="py-4 px-4 font-bold">
                {currentTask.description}
              </div>
              <h4 className="py-4 px-4 font-bold">
                <span
                  className={`${
                    currentTask.status === "pending"
                      ? "text-red-700"
                      : "text-green-700"
                  }`}
                >
                  {currentTask.status}
                </span>
              </h4>
              <h5 className="py-4 px-4 font-bold">
                {formatDate(currentTask.dueDate)}
              </h5>
            </div>
          </div>
        )}
      </div>
      <Link
        to={"/"}
        className="py-4 text-blue-500 hover:underline hover:cursor-pointer text-center"
      >
        Back Home
      </Link>
    </div>
  );
};

export default TaskDetails;
