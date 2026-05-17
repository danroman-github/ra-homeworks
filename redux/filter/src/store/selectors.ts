import { createSelector } from 'reselect';
import type { RootState } from './store';
import { Service } from '../types';

export const selectAllServices = (state: RootState) => state.services.items;
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;

export const selectFilteredServices = createSelector(
    [selectAllServices, selectSearchTerm],
    (services, searchTerm) => {
        if (!searchTerm.trim()) {
            return services;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        return services.filter((service: Service) =>
            service.name.toLowerCase().includes(lowerSearchTerm)
        );
    }
);

export const selectFilterStats = createSelector(
    [selectFilteredServices, selectAllServices],
    (filteredServices, allServices) => ({
        found: filteredServices.length,
        total: allServices.length,
    })
);