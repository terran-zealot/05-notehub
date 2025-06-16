import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, perPage: 12 }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}

      {totalPages > 1 && (
        <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      )}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
