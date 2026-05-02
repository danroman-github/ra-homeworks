import { NewsItem } from './NewsItem';
import { sampleNews } from '../../data/sampleNews';

export const NewsList = () => (
    <div className="news-list">
        {sampleNews.map(news => <NewsItem key={news.id} title={news.title} link={news.link} />)}
    </div>
);