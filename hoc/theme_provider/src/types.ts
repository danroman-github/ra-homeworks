export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
    background: string;
    text: string;
    border: string;
}

export interface ThemeContextProps {
    theme: ThemeType;
    toggleTheme: () => void;
}

export interface WithThemeProps {
    theme: ThemeType;
}