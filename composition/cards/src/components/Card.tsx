import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export interface CardImageProps {
    src: string;
    alt: string;
    position?: 'top' | 'bottom';
    className?: string;
}

export interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}

export interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
    tag?: 'h5';
}

export interface CardTextProps {
    children: React.ReactNode;
    className?: string;
}

export interface ColoredCardProps {
    color: 'primary';
    children: React.ReactNode;
    className?: string;
}

export interface CardButtonProps {
    children: React.ReactNode;
    variant?: 'outline-primary' | 'light';
    onClick?: () => void;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return <div className={`card ${className}`}>{children}</div>;
};

export const CardImage: React.FC<CardImageProps> = ({
    src,
    alt,
    position = 'top',
    className = ''
}) => {
    const positionClass = position === 'top' ? 'card-img-top' : 'card-img-bottom';
    return <img src={src} alt={alt} className={`${positionClass} ${className}`} />;
};

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
    return <div className={`card-body ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({
    children,
    className = '',
    tag: Tag = 'h5'
}) => {
    return <Tag className={`card-title ${className}`}>{children}</Tag>;
};

export const CardText: React.FC<CardTextProps> = ({ children, className = '' }) => {
    return <p className={`card-text ${className}`}>{children}</p>;
};

export const ColoredCard: React.FC<ColoredCardProps> = ({ color, children, className = '' }) => {
    return <div className={`card text-white bg-${color} ${className}`}>{children}</div>;
};

export const CardButton: React.FC<CardButtonProps> = ({
    children,
    variant = 'primary',
    onClick,
    className = ''
}) => {
    return (
        <button className={`btn btn-${variant} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};
