import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import TodosSkeleton from "../components/ui/TodosSkeleton";
import useQueryCustom from "../hooks/useQueryCustom";

interface ITodo {
  id: number;
  attributes: { Title: string };
}

const TodosPage = () => {
  const userLocalStorage = localStorage.getItem("loggedInUserInfo");
  const userInfo = userLocalStorage && JSON.parse(userLocalStorage);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  const { isLoading, error, data } = useQueryCustom({
    queryKey: ["todosPagination", `${currPage}`],
    url: `/todos?pagination[page]=${currPage}&pagination[pageSize]=${pageSize}`,
    config: {
      headers: {
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    },
  });

  console.log(data);
  console.log(currPage);

  const handleNextClick = () => {
    setCurrPage((prev) => prev + 1);
  };
  const handlePreviousClick = () => {
    setCurrPage((prev) => prev - 1);
  };

  return (
    <section className="mx-auto max-w-2xl ">
      {isLoading && <TodosSkeleton />}
      {data && (
        <>
          {data.data.map(({ id, attributes }: ITodo) => (
            <div
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
              key={id}
            >
              <p className="font-semibold ">
                {id} - {attributes.Title}
              </p>
            </div>
          ))}
          <span>
            <strong>{25 * (currPage - 1) + data.data.length}</strong> out of{" "}
            {data.meta.pagination.total} records
          </span>
          <Pagination
            pageNumber={currPage}
            pageCount={data.meta.pagination.pageCount}
            isLoading={isLoading}
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
          />
        </>
      )}
    </section>
  );
};

export default TodosPage;
