import { IconButton } from '@mui/joy'
import React, { useState, useEffect } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Addon } from '../../context/AddonsContext.ts';

type Props = {
  data: Addon[];
  itemsPerPage: number;
  setData: (data: Addon) => void[];
}

function Pagination({ data, itemsPerPage, setData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData([...data.slice(startIndex, endIndex)]);
  }, [currentPage]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
      }}
    >
      <IconButton
        aria-label="previous page"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        aria-label="next page"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </div>
  )
}

export default Pagination