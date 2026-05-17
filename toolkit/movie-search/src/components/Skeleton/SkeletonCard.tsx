import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard: React.FC = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonPoster}></div>
            <div className={styles.skeletonInfo}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonDetails}></div>
            </div>
        </div>
    );
};

export default SkeletonCard;