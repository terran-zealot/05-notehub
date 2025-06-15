import axios, {type AxiosResponse } from 'axios';
import { type Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const BEARER_TOKEN = import.meta.env.VITE_SUPER_PASSWORD;

const headers = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
};

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

// export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
//   const response = await axios.get(BASE_URL, {
//     headers,
//     params,
//   });
//   return response.data;
// }


export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response: AxiosResponse<Note> = await axios.post(BASE_URL, note, { headers });
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return response.data;
}









export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  const response: AxiosResponse<FetchNotesResponse> = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    params,
  });

  return response.data;
}