import { ComponentType } from 'react';

export interface WithThemeProps {
    theme: 'light' | 'dark';
}

export function withTheme<P extends object>(
    WrappedComponent: ComponentType<P & WithThemeProps>
) {
    type PropsWithoutTheme = Omit<P, keyof WithThemeProps>;

    const WithThemeComponent = (props: PropsWithoutTheme & { theme: 'light' | 'dark' }) => {
        const { theme, ...restProps } = props;

        const wrappedProps = {
            ...restProps,
            theme,
        } as P & WithThemeProps;

        return <WrappedComponent {...wrappedProps} />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithThemeComponent.displayName = `withTheme(${displayName})`;

    return WithThemeComponent;
}