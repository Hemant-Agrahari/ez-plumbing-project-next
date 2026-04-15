import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styles from './Pagination.module.css';  

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
