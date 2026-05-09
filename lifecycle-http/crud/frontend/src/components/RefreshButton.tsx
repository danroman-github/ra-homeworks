import React from 'react';
import styles from './RefreshButton.module.css';

interface RefreshButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick, isLoading }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={styles.button}
            title="Обновить список"
        >
            {isLoading ? (
                <div className={styles.spinner}></div>
            ) : (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 12C4 7.58172 7.58172 4 12 4"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="18 8"
                        fill="none"
                    />
                    <path
                        d="M10 2L12 4L10 6"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />

                    <path
                        d="M20 12C20 16.4183 16.4183 20 12 20"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="18 8"
                        fill="none"
                    />
                    <path
                        d="M14 22L12 20L14 18"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            )}
        </button>
    );
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default RefreshButton;