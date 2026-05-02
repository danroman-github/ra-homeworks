export interface CardImageProps {
    src: string;
    className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
    src,
    className = ''
}) => {
    return (
        <div className="image-logo">
            <img src={src} className={`${className}`} />
        </div>
    );
};