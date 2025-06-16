import ReactPaginate from 'react-paginate';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (selected: number) => void;
  search: string;
}

export default function Pagination({
  currentPage,
  onPageChange,
  search,
}: PaginationProps) {
  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, search],
    queryFn: () => fetchNotes({ page: currentPage, perPage: 12, search }),
    placeholderData: keepPreviousData,
  });

  if (!data || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={data.totalPages}
      previousLabel="<"
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
