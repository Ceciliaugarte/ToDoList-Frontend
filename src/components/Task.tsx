import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import { Task as TaskType } from "../types/task";
import axios from "axios";
import { User as UserType } from "../types/user";
import { useDispatch } from "react-redux";
import { deleteTask } from "../Redux/reducers/taskReducer";

interface TaskProps {
  task: TaskType;
  user: UserType;
}

const Task: React.FC<TaskProps> = ({ task, user }) => {
  const dispatch = useDispatch();

  const manageDeletingTask = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(deleteTask(task.id));
      console.log("Task deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black bg-opacity-20 rounded-lg shadow-lg mb-4 p-4">
      <div className="flex flex-row justify-between py-2 px-2 border-b-2 border-black">
        <h3 className="font-bold">{task.title}</h3>
        <span>
          <Link to={`/tasks/update/${task.id}`}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <button type="button" onClick={() => manageDeletingTask()}>
            <i className="px-2 fa-solid fa-trash"></i>
          </button>
        </span>
      </div>
      <Link
        to={`/tasks/${task.id}`}
        className="flex flex-row justify-end px-4 pt-2 text-xs hover:underline"
      >
        Details
      </Link>
      <h4 className="py-4 px-2 font-bold">
        STATUS:{" "}
        <span
          className={`${
            task.status === "pending" ? "text-red-700" : "text-green-700"
          }`}
        >
          {task.status}
        </span>
      </h4>
      <h5 className="py-4 px-2 font-bold">
        DUE DATE: {formatDate(task.dueDate)}
      </h5>
    </div>
  );
};

export default Task;
