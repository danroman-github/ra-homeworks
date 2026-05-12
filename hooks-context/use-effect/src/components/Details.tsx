import React, { useState, useEffect, useRef } from 'react';
import { DetailsProps, UserDetails } from '../types';
import '../styles/Details.css';

const DETAILS_BASE_URL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data';
const AVATAR_TIMEOUT = 15000;

const Details: React.FC<DetailsProps> = ({ info }) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [avatarLoaded, setAvatarLoaded] = useState<boolean>(false);
    const [avatarError, setAvatarError] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const avatarTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!info || !info.id) {
            setUserDetails(null);
            setError(null);
            setLoading(false);
            setAvatarLoaded(false);
            setAvatarError(false);
            if (avatarTimeoutRef.current) {
                clearTimeout(avatarTimeoutRef.current);
                avatarTimeoutRef.current = null;
            }
            return;
        }

        let isMounted = true;
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                setAvatarLoaded(false);
                setAvatarError(false);
                if (avatarTimeoutRef.current) {
                    clearTimeout(avatarTimeoutRef.current);
                    avatarTimeoutRef.current = null;
                }

                const response = await fetch(`${DETAILS_BASE_URL}/${info.id}.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data: UserDetails = await response.json();
                if (isMounted) setUserDetails(data);
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load user details');
                    setUserDetails(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchUserDetails();
        return () => {
            isMounted = false;
            if (avatarTimeoutRef.current) {
                clearTimeout(avatarTimeoutRef.current);
                avatarTimeoutRef.current = null;
            }
        };
    }, [info?.id]);

    useEffect(() => {
        if (userDetails && userDetails.avatar && !avatarLoaded && !avatarError) {
            if (avatarTimeoutRef.current) {
                clearTimeout(avatarTimeoutRef.current);
                avatarTimeoutRef.current = null;
            }

            avatarTimeoutRef.current = setTimeout(() => {
                if (!avatarLoaded && !avatarError) {
                    setAvatarError(true);
                    setAvatarLoaded(false);
                    if (imgRef.current) {
                        imgRef.current.src = '';
                    }
                }
                avatarTimeoutRef.current = null;
            }, AVATAR_TIMEOUT);

            const timer = setTimeout(() => {
                if (imgRef.current && userDetails.avatar) {
                    imgRef.current.src = userDetails.avatar;
                }
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [userDetails, avatarLoaded, avatarError]);

    const handleAvatarLoad = () => {
        if (avatarTimeoutRef.current) {
            clearTimeout(avatarTimeoutRef.current);
            avatarTimeoutRef.current = null;
        }
        setAvatarLoaded(true);
        setAvatarError(false);
    };

    const handleAvatarError = () => {
        if (avatarTimeoutRef.current) {
            clearTimeout(avatarTimeoutRef.current);
            avatarTimeoutRef.current = null;
        }
        setAvatarError(true);
        setAvatarLoaded(false);
    };

    if (loading) {
        return (
            <div className="details-loading">
                <div className="spinner"></div>
                <p>Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="details-error">
                <p>⚠️ Error loading details: {error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    Retry
                </button>
            </div>
        );
    }

    if (!info) {
        return (
            <div className="details-empty">
                <p>👈 Select a user from the list to see details</p>
            </div>
        );
    }

    if (!userDetails) {
        return (
            <div className="details-empty">
                <div className="spinner"></div>
                <p>Loading details for {info.name}...</p>
            </div>
        );
    }

    return (
        <div className="details-card">
            <div className="details-avatar">
                {!avatarLoaded && !avatarError && (
                    <div className="avatar-loading">
                        <div className="avatar-spinner"></div>
                        <p>Loading image...</p>
                    </div>
                )}

                {avatarError && (
                    <div className="avatar-error">
                        <p>⚠️ Failed to load avatar</p>
                    </div>
                )}

                {userDetails.avatar && (
                    <img
                        ref={imgRef}
                        src={userDetails.avatar}
                        alt={`${userDetails.name}'s avatar`}
                        onLoad={handleAvatarLoad}
                        onError={handleAvatarError}
                        style={{ display: avatarLoaded && !avatarError ? 'block' : 'none' }}
                    />
                )}

                {!userDetails.avatar && !avatarError && (
                    <div className="avatar-error">
                        <p>⚠️ No avatar URL provided</p>
                    </div>
                )}
            </div>

            <div className="details-info">
                <h3>{userDetails.name}</h3>
                <div className="details-field">
                    <span className="details-label">City:</span>
                    <span className="details-value">{userDetails.details.city}</span>
                </div>
                <div className="details-field">
                    <span className="details-label">Company:</span>
                    <span className="details-value">{userDetails.details.company}</span>
                </div>
                <div className="details-field">
                    <span className="details-label">Position:</span>
                    <span className="details-value">{userDetails.details.position}</span>
                </div>
            </div>
        </div>
    );
};

export default Details;