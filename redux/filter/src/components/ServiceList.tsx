import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredServices, selectSearchTerm } from '../store/selectors';
import ServiceItem from './ServiceItem';
import SearchFilter from './SearchFilter';
import FilterStats from './FilterStats';
import JsonActions from './JsonActions';

const ServiceList: React.FC = () => {
    const filteredServices = useSelector(selectFilteredServices);
    const searchTerm = useSelector(selectSearchTerm);

    return (
        <div className="service-list">
            <div className="service-list-header">
                <h2>Список услуг</h2>
                <JsonActions />
                <div className="search-section">
                    <SearchFilter />
                    <FilterStats />
                </div>
            </div>

            {filteredServices.length === 0 ? (
                <div className="empty-state">
                    {searchTerm ? (
                        <>
                            🔍 Услуги по запросу "<strong>{searchTerm}</strong>" не найдены
                            <div className="empty-hint">Попробуйте изменить поисковый запрос</div>
                        </>
                    ) : (
                        <>📭 Нет добавленных услуг. Создайте первую услугу!</>
                    )}
                </div>
            ) : (
                <div className="services-list">
                    {filteredServices.map(service => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceList;