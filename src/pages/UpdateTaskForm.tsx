import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppRootState } from "../Redux/storeConfig";
import { formatDateYYYYMMDD } from "../utils/dateUtils";
import { updateUserTask } from "../Redux/reducers/userReducer";
import { toast } from "react-toastify";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}

const UpdateTaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "completed">("pending");

  const user = useSelector((state: AppRootState) => state.user);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDueDate(response.data.dueDate);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentTask();
  }, [params.id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDueDate =
        new Date(dueDate).toISOString().split(".")[0] + ".000Z";
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/tasks/${params.id}`,
        data: {
          id: Number(params.id),
          userId: user.id,
          title,
          description,
          dueDate: formattedDueDate,
          status,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(
        updateUserTask({
          id: Number(params.id),
          userId: user.id,
          title,
          description,
          dueDate: formattedDueDate,
          status,
        })
      );
      toast.success("Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    return "updated task";
  };

  return (
    currentTask && (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-md bg-gray-100 p-8 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dueDate"
                type="date"
                value={formatDateYYYYMMDD(dueDate)}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "pending" | "completed")
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col justify-center">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Task
              </button>
              <Link
                to={"/"}
                className="py-4 text-blue-500 hover:underline hover:cursor-pointer text-center"
              >
                Back Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateTaskForm;
