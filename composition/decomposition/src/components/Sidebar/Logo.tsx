import { sampleNews } from '../../data/sampleNews';
import { CardImage } from './CardImage';

export const Logo = () => (
    <div className="logo">
        {sampleNews.map(news => <CardImage src={news.props.src} />)}
        <div className="search-brand">
            <span className="brand-red">Я</span>ндекс
        </div>
    </div>
);
