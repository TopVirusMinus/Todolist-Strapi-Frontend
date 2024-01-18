import useQueryCustom from "../hooks/useQueryCustom";
import Button from "./ui/Button";

const TodoList = () => {
  const userLocalStorage = localStorage.getItem('loggedInUserInfo')
  const userInfo = userLocalStorage && JSON.parse(userLocalStorage);

  const { isLoading, error, data } = useQueryCustom({queryKey:['todos'], url:'/users/me/?populate=todos', config:{
    headers:{
      Authorization: `Bearer ${userInfo.jwt}`
    }
  }})
  
  console.log(data);
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (data.length === 0) return <p>No Todos</p>

  return (
    <div className="space-y-1 " >
      {data.length > 0 && data.map(todo=>(
        <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100" key={todo.id}>
          <p className="w-full font-semibold">{todo.Title}</p>
          <div className="flex items-center justify-end w-full space-x-3">
            <Button size={"sm"}>Edit</Button>
            <Button variant={"danger"} size={"sm"}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      </div>
  );
}


export default TodoList;
