import { ChangeEvent, FormEvent, useState } from "react";
import useQueryCustom from "../hooks/useQueryCustom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";

interface ITodo {
  id: number;
  Title: string;
  description: string;
}
const TodoList = () => {
  const defaultTodo: ITodo = {
    id: 0,
    Title: "",
    description: "",
  };
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isRemoveModelOpen, setIsRemoveModelOpen] = useState(false);
  const [currTodo, setCurrTodo] = useState<ITodo>(defaultTodo);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState<boolean>(false);

  const userLocalStorage = localStorage.getItem("loggedInUserInfo");
  const userInfo = userLocalStorage && JSON.parse(userLocalStorage);

  const { isLoading, error, data } = useQueryCustom({
    queryKey: ["todoList", `${currTodo.id}`],
    url: "/users/me/?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    },
  });

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data.length === 0) return <p>No Todos</p>;

  const handleEdit = (todo: ITodo) => {
    console.log("TODO EDIT", todo.Title);
    toggleEditModal();
    setCurrTodo({
      Title: todo.Title,
      description: todo.description,
      id: todo.id,
    });
  };

  const handleRemove = (todo: ITodo) => {
    console.log("TODO Remove", todo.Title);
    setIsRemoveModelOpen((prev) => !prev);
    setCurrTodo({
      Title: todo.Title,
      description: todo.description,
      id: todo.id,
    });
  };

  const onCloseEditModal = () => {
    setCurrTodo(defaultTodo);
    setIsEditModelOpen(false);
  };

  const onCloseRemoveModal = () => {
    setCurrTodo(defaultTodo);
    setIsRemoveModelOpen(false);
  };

  const toggleEditModal = () => {
    setIsEditModelOpen((prev) => !prev);
  };

  const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, Title, description } = currTodo;
    try {
      setIsEditLoading(true);
      axiosInstance.put(
        `/todos/${id}`,
        { data: { Title, description } },
        {
          headers: {
            Authorization: `Bearer ${userInfo.jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditLoading(false);
    }

    onCloseEditModal();
    console.log("submitted");
  };

  const handleRemoveSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = currTodo;
    try {
      setIsRemoveLoading(true);
      axiosInstance.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoveLoading(false);
    }

    onCloseRemoveModal();
    console.log("submitted");
  };

  const handleEditTodo = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCurrTodo({
      ...currTodo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-1 ">
      {data.length > 0 &&
        data.map((todo: ITodo) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            key={todo.id}
          >
            <p className="w-full font-semibold">{todo.Title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={() => handleEdit(todo)}>
                Edit
              </Button>
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => handleRemove(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

      <Modal
        isOpen={isRemoveModelOpen}
        closeModal={onCloseRemoveModal}
        title="Are you sure you want to remove this todo item?"
      >
        {" "}
        <form className="space-x-2 mt-2" onSubmit={handleRemoveSubmit}>
          <Button variant={"cancel"} onClick={onCloseEditModal}>
            Cancel
          </Button>
          <Button variant={"danger"} isLoading={isRemoveLoading}>
            Remove
          </Button>
        </form>
      </Modal>
      <Modal
        isOpen={isEditModelOpen}
        closeModal={onCloseEditModal}
        title="Edit this todo"
      >
        <form className="space-y-2" onSubmit={handleEditSubmit}>
          <Input
            name="Title"
            value={currTodo.Title}
            onChange={handleEditTodo}
          />
          <Textarea
            name="description"
            value={currTodo.description}
            onChange={handleEditTodo}
          />
          <div className="space-x-2 mt-2">
            <Button isLoading={isEditLoading}>Update</Button>
            <Button variant={"cancel"} onClick={onCloseEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
