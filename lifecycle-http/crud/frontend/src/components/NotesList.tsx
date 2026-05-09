import React from 'react';
import { Note } from '../types';
import NoteCard from './NoteCard';
import styles from './NotesList.module.css';

interface NotesListProps {
    notes: Note[];
    onDelete: (id: number) => Promise<void>;
    isLoading: boolean;
    deletingIds: Set<number>;
}

const NotesList: React.FC<NotesListProps> = ({
    notes,
    onDelete,
    isLoading,
    deletingIds
}) => {
    if (isLoading) {
        return (
            <div className={styles.messageContainer}>
                <div className={styles.loader}></div>
                <p>Загрузка заметок...</p>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className={styles.messageContainer}>
                <p>Нет заметок. Создайте первую заметку!</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    isDeleting={deletingIds.has(note.id)}
                />
            ))}
        </div>
    );
};

export default NotesList;