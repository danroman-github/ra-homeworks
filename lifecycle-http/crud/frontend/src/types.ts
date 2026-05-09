export interface Note {
    id: number;
    content: string;
}

export interface ApiError {
    message: string;
    status?: number;
    originalError?: unknown;
}