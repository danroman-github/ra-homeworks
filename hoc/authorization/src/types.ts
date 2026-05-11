export interface CurrentUser {
    roles: string[];
    [key: string]: any;
}

export interface BaseComponentProps {
    [key: string]: any;
}

export interface WithAuthorizationProps {
    currentUser?: CurrentUser | null;
}

export interface AccessDeniedProps {
    message?: string;
}