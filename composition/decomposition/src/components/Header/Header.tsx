import { NewsList } from './NewsList';
import { Menu } from './Menu';
import { ExchangeRates } from './ExchangeRates';
import { Search } from './Search';
import { SeachSample } from './SeachSample';

export const Header = () => (
    <header className="header">
        <NewsList />
        <ExchangeRates />
        <Menu />
        <Search />
        <SeachSample />
    </header>
);