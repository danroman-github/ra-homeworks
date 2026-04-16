import React from 'react';
import Listing from './components/Listing';
import './styles.css';
import etsyData from './data/etsy.json';
import { ListingItem } from './types';

const App: React.FC = () => {
  const items: ListingItem[] = etsyData as ListingItem[];

  return (
    <div className="container">
      <div className="product-grid">
        <Listing items={items} />
      </div>
    </div>
  );
};

export default App;
