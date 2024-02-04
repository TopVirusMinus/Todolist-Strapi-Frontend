import Button from "./ui/Button";

interface IProps {
  pageNumber: number;
  pageCount: number;
  isLoading: boolean;
  handleNextClick: () => void;
  handlePreviousClick: () => void;
}

const Pagination = ({
  pageNumber,
  pageCount,
  isLoading,
  handleNextClick,
  handlePreviousClick,
}: IProps) => {
  return (
    <>
      <div className="w-full flex justify-center gap-2 items-center">
        <Button
          disabled={pageNumber <= 1 || isLoading}
          onClick={handlePreviousClick}
        >
          Prev
        </Button>
        <Button
          disabled={pageNumber >= pageCount || isLoading}
          onClick={handleNextClick}
        >
          Next
        </Button>
        <span>
          Page <strong>{pageNumber}</strong>/{pageCount}
        </span>
      </div>
    </>
  );
};

export default Pagination;
