import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <article className="article">
            <h1 className="article__title">404</h1>
            <p className="article__paragraph">
                Страница не найдена
            </p>
            <Link to="/" className="not-found-link">На главную</Link>
        </article>
    );
};

export default NotFound;