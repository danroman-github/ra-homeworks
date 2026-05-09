import React, { useState, useEffect } from 'react';
import { Note, ApiError } from './types';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import RefreshButton from './components/RefreshButton';
import styles from './App.module.css';

const API_URL = 'http://localhost:7070/notes';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<ApiError | null>(null);

  const handleFetchError = async (response: Response): Promise<ApiError> => {
    let errorMessage = `Ошибка HTTP: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {

    }

    return {
      message: errorMessage,
      status: response.status
    };
  };

  const loadNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        const apiError = await handleFetchError(response);
        throw apiError;
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      let apiError: ApiError;

      if (err && typeof err === 'object' && 'message' in err) {
        apiError = err as ApiError;
      } else {
        apiError = {
          message: err instanceof Error ? err.message : 'Неизвестная ошибка',
          originalError: err
        };
      }

      setError(apiError);
      console.error('Error loading notes:', apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (content: string) => {
    setIsAdding(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          content: content,
        }),
      });

      if (!response.ok) {
        const apiError = await handleFetchError(response);
        throw apiError;
      }

      await loadNotes();
    } catch (err) {
      let apiError: ApiError;

      if (err && typeof err === 'object' && 'message' in err) {
        apiError = err as ApiError;
      } else {
        apiError = {
          message: err instanceof Error ? err.message : 'Не удалось добавить заметку',
          originalError: err
        };
      }

      setError(apiError);
      console.error('Error adding note:', apiError);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteNote = async (id: number) => {
    setDeletingIds(prev => new Set(prev).add(id));
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const apiError = await handleFetchError(response);
        throw apiError;
      }

      await loadNotes();
    } catch (err) {
      let apiError: ApiError;

      if (err && typeof err === 'object' && 'message' in err) {
        apiError = err as ApiError;
      } else {
        apiError = {
          message: err instanceof Error ? err.message : `Не удалось удалить заметку с id ${id}`,
          originalError: err,
          status: undefined
        };
      }

      setError(apiError);
      console.error('Error deleting note:', apiError);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Notes</h1>
          <RefreshButton onClick={loadNotes} isLoading={isLoading} />
        </div>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <div>
            <strong>⚠️ Ошибка {error.status && `(${error.status})`}</strong>
            <p style={{ marginTop: '4px' }}>{error.message}</p>
          </div>
          <button onClick={() => setError(null)} className={styles.closeError}>
            ✕
          </button>
        </div>
      )}

      <NotesList
        notes={notes}
        onDelete={deleteNote}
        isLoading={isLoading}
        deletingIds={deletingIds}
      />
      <div className={styles.newNote}>
        <NotesForm onAddNote={addNote} isAdding={isAdding} />
      </div>

    </div>
  );
};

export default App;