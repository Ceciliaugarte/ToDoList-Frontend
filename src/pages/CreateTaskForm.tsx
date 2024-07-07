import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../Redux/storeConfig";
import { createUserTask } from "../Redux/reducers/userReducer";
import { toast } from "react-toastify";

const CreateTaskForm: React.FC = () => {
  const user = useSelector((state: AppRootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDueDate =
        new Date(dueDate).toISOString().split(".")[0] + "Z";
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/tasks`,
        data: {
          userId: user.id,
          title,
          description,
          dueDate: formattedDueDate,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(createUserTask(response.data));
      toast.success("Task created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setDescription("");
    setDueDate("");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md  bg-gray-100 p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create new task</h2>
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
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dueDate"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center ">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Task
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
  );
};

export default CreateTaskForm;
