import { useState, useEffect, useCallback } from 'react';
import useApi from './useApi';
import { Note } from '@/types/note';

const useNotes = (categoryId?: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const api = useApi();

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = categoryId ? `/categories/${categoryId}/notes/` : '/notes/';
      const data = await api(endpoint);
      setNotes(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [api, categoryId]);

  const createNote = async (noteData: Omit<Note, 'id' | 'last_updated' | 'category'>) => {
    const newNote = await api('/notes/', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
    setNotes(prev => [...prev, newNote]);
    return newNote;
  };

  const updateNote = async (id: string, noteData: Partial<Note>) => {
    const updatedNote = await api(`/notes/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(noteData),
    });
    setNotes(prev => prev.map(n => n.id === id ? updatedNote : n));
    return updatedNote;
  };

  const getNoteById = async (id: string): Promise<Note> => {
    return await api(`/notes/${id}/`);
  };

  const deleteNote = async (id: string) => {
    await api(`/notes/${id}/`, { method: 'DELETE' });
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes, createNote, updateNote, getNoteById, deleteNote };
};

export default useNotes;
