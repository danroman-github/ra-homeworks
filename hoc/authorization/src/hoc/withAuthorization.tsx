import React, { ComponentType, memo } from 'react';
import { CurrentUser } from '../types';
import AccessDenied from '../components/AccessDenied';

/**
 * HOC для ограничения доступа на основе роли
 */
function withAuthorization<P extends object>(
    WrappedComponent: ComponentType<P>,
    allowedRoles: string[],
    CustomAccessDeniedComponent?: ComponentType
) {
    type HocProps = P & {
        currentUser?: CurrentUser | null;
    };

    const WithAuthorizationComponent: React.FC<HocProps> = (props) => {
        const { currentUser, ...componentProps } = props;

        const hasAccess = (): boolean => {
            if (!currentUser || !currentUser.roles) {
                return false;
            }

            return allowedRoles.some(role => currentUser.roles.includes(role));
        };

        if (hasAccess()) {
            return <WrappedComponent {...(componentProps as P)} />;
        }

        if (CustomAccessDeniedComponent) {
            return <CustomAccessDeniedComponent />;
        }

        return <AccessDenied />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithAuthorizationComponent.displayName = `withAuthorization(${displayName})`;

    return memo(WithAuthorizationComponent);
}

export default withAuthorization;