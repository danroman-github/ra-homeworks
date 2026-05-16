import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import ServiceItem from './ServiceItem';

const ServiceList: React.FC = () => {
    const services = useSelector((state: RootState) => state.services.items);

    return (
        <div className="service-list">
            <div className="service-list-header">
                <h2>Список услуг</h2>
                <div className="service-count">Всего: {services.length}</div>
            </div>

            {services.length === 0 ? (
                <div className="empty-state">
                    📭 Нет добавленных услуг
                </div>
            ) : (
                <div className="services-list">
                    {services.map(service => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceList;