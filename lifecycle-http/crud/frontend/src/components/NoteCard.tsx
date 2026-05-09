import React from 'react';
import { Note } from '../types';
import styles from './NoteCard.module.css';

interface NoteCardProps {
    note: Note;
    onDelete: (id: number) => void;
    isDeleting?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, isDeleting }) => {
    return (
        <div className={styles.card}>
            <button
                onClick={() => onDelete(note.id)}
                disabled={isDeleting}
                className={`${styles.deleteButton} ${isDeleting ? styles.disabledButton : ''}`}
                title="Удалить заметку"
            >
                ✕
            </button>
            <p className={styles.text}>{note.content}</p>
        </div>
    );
};

export default NoteCard;