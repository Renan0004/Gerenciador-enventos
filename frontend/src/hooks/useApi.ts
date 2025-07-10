'use client';

import { useState, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface UseApiOptions {
  showGlobalError?: boolean;
}

export const useApi = (options: UseApiOptions = {}) => {
  const { dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    if (options.showGlobalError) {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
    }

    try {
      const data = await apiCall();
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      return data;
    } catch (err: unknown) {
      let errorMessage = 'Erro desconhecido';
      
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string; message?: string } } };
        errorMessage = error.response?.data?.error || 
                      error.response?.data?.message || 
                      'Erro desconhecido';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
      if (options.showGlobalError) {
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      }
      
      if (onError) {
        onError(errorMessage);
      }
      
      console.error('Erro na API:', err);
      return null;
    } finally {
      setLoading(false);
      
      if (options.showGlobalError) {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  }, [dispatch, options.showGlobalError]);

  return { execute, loading, error, setError };
}; 