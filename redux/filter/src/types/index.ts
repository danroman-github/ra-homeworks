export interface Service {
    id: string;
    name: string;
    price: number;
}

export interface ServicesExport {
    services: Service[];
    lastUpdated?: string;
    totalCount?: number;
}

export interface FormErrors {
    name?: string;
    price?: string;
}

export interface FormState {
    name: string;
    price: string;
    editingId: string | null;
    errors: FormErrors;
}

export interface ServicesState {
    items: Service[];
}

export interface FilterState {
    searchTerm: string;
}

export interface FilterStats {
    found: number;
    total: number;
}