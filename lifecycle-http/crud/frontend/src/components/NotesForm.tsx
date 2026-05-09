import React, { useState } from 'react';
import styles from './NotesForm.module.css';

interface NotesFormProps {
    onAddNote: (content: string) => Promise<void>;
    isAdding: boolean;
}

const NotesForm: React.FC<NotesFormProps> = ({ onAddNote, isAdding }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Текст заметки не может быть пустым');
            return;
        }

        setError('');
        await onAddNote(content.trim());
        setContent('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.noteCard}>
                <div className={styles.label}>New note</div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        title="Введите текст заметки..."
                        disabled={isAdding}
                        className={styles.textarea}
                    />
                    <div className={styles.buttonContainer}>
                        <button
                            type="submit"
                            disabled={isAdding || !content.trim()}
                            className={styles.addButton}
                            title="Добавить заметку"
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 8 L28 16 L10 24 L14 16 L10 8Z"
                                    fill="black"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default NotesForm;