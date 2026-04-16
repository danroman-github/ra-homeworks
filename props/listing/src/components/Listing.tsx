import React from 'react';
import { ListingProps, ListingItem } from '../types';

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
    const formatTitle = (title: string): string => {
        if (title.length > 50) {
            return title.slice(0, 50) + '…';
        }
        return title;
    };

    const formatPrice = (price: string, currencyCode: string): string => {
        const numericPrice = parseFloat(price);
        const formattedPrice = numericPrice.toFixed(2);

        switch (currencyCode) {
            case 'USD':
                return `$${formattedPrice}`;
            case 'EUR':
                return `€${formattedPrice}`;
            case 'GBP':
                return `£${formattedPrice}`;
            default:
                return `${currencyCode} ${formattedPrice}`;
        }
    };

    const getStockClass = (quantity: number): string => {
        if (quantity <= 10) return 'stock-low';
        if (quantity <= 20) return 'stock-medium';
        return 'stock-high';
    };

    const activeItems = items.filter(item => item.state === 'active');

    if (!activeItems || activeItems.length === 0) {
        return <div>No active items available</div>;
    }

    return (
        <>
            {activeItems.map((item: ListingItem) => (
                <div key={item.listing_id} className="product-card">
                    {item.MainImage?.url_570xN && (
                        <img
                            src={item.MainImage.url_570xN}
                            alt={formatTitle(item.title || '')}
                            className="product-image"
                        />
                    )}
                    <div className="product-info">
                        <h3 className="product-title">{formatTitle(item.title || '')}</h3>
                        <div className="price-container">
                            <div className="product-price">
                                {formatPrice(item.price || '0', item.currency_code || 'USD')}
                            </div>
                            <span className={`stock-badge ${getStockClass(item.quantity || 0)}`}>
                                {item.quantity || 0} left
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Listing;