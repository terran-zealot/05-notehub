import ReactPaginate from 'react-paginate';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
import css from './Pagination.module.css';



interface PaginationProps {
  currentPage: number;
  onPageChange: (selected: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="<"
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
