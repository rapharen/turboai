import { useState, useEffect, useCallback } from 'react';
import useApi from './useApi';
import { Category } from '@/types/category';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const api = useApi();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api('/categories/');
      setCategories(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};

export default useCategories;
