export const NewsItem = ({ title, link }: { title: string; link: string }) => (
    <div className="news-item">
        <a href={link}>{title}</a>
    </div>
);