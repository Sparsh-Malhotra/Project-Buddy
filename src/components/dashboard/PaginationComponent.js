import { Pagination } from "@nextui-org/react";

const PaginationComponent = ({ totalPages, onPageChange }) => {
  return (
    <Pagination
      total={totalPages}
      onChange={onPageChange}
      animated
      rounded
      css={{ float: "right" }}
    />
  );
};

export default PaginationComponent;