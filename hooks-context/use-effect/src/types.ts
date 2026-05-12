export interface User {
    id: number;
    name: string;
}

export interface UserDetails extends User {
    id: number;
    name: string;
    avatar?: string;
    details: {
        city: string;
        company: string;
        position: string;
    };
}

export interface ListProps {
    users: User[];
    selectedUserId: number | null;
    onSelectUser: (user: User) => void;
}

export interface DetailsProps {
    info: User | null;
}