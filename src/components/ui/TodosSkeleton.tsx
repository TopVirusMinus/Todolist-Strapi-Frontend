const TodosSkeleton = () => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100 animate-pulse max-w-[672px] h-[60px] bg-gray-200">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
        <div className="flex items-center justify-end w-full space-x-3">
          <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-300 rounded-md font-medium text-transparent">
            Edit
          </div>
          <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-300 rounded-md font-medium text-transparent">
            Remove
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100 animate-pulse max-w-[672px] h-[60px] bg-gray-200">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
        <div className="flex items-center justify-end w-full space-x-3">
          <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-300 rounded-md font-medium text-transparent">
            Edit
          </div>
          <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-300 rounded-md font-medium text-transparent">
            Remove
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100 animate-pulse max-w-[672px] h-[60px] bg-gray-200">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
        <div className="flex items-center justify-end w-full space-x-3">
          <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-300 rounded-md font-medium text-transparent">
            Edit
          </div>
          <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-300 rounded-md font-medium text-transparent">
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosSkeleton;
