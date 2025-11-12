import { useState, useEffect, useCallback } from 'react';
import useApi from './useApi';
import { Note } from '@/types/note';

const useNotes = (categoryName?: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const api = useApi();

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = categoryName ? `/notes/?category=${categoryName}` : '/notes/';
      const data = await api(endpoint);
      setNotes(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [api, categoryName]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes };
};

export default useNotes;
