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
    const loadDelayRef = useRef<number | null>(null);

    const getUniqueAvatarUrl = (avatarUrl: string): string => {
        const timestamp = Date.now();
        const separator = avatarUrl.includes('?') ? '&' : '?';
        return `${avatarUrl}${separator}_nocache=${timestamp}`;
    };

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
            if (loadDelayRef.current) {
                clearTimeout(loadDelayRef.current);
                loadDelayRef.current = null;
            }
            if (imgRef.current) {
                imgRef.current.src = '';
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
                if (loadDelayRef.current) {
                    clearTimeout(loadDelayRef.current);
                    loadDelayRef.current = null;
                }
                if (imgRef.current) {
                    imgRef.current.src = '';
                }

                const response = await fetch(`${DETAILS_BASE_URL}/${info.id}.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data: UserDetails = await response.json();
                if (isMounted) {
                    setUserDetails(data);

                    if (data.avatar) {
                        loadDelayRef.current = window.setTimeout(() => {
                            if (isMounted && imgRef.current && data.avatar) {
                                const uniqueAvatarUrl = getUniqueAvatarUrl(data.avatar);
                                imgRef.current.src = uniqueAvatarUrl;
                            }
                            loadDelayRef.current = null;
                        }, 2000);
                    }
                }
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
            if (loadDelayRef.current) {
                clearTimeout(loadDelayRef.current);
                loadDelayRef.current = null;
            }
        };
    }, [info?.id]);

    useEffect(() => {
        if (!avatarLoaded && !avatarError && userDetails?.avatar) {
            avatarTimeoutRef.current = window.setTimeout(() => {
                if (!avatarLoaded && !avatarError) {
                    setAvatarError(true);
                    setAvatarLoaded(false);
                    if (imgRef.current) {
                        imgRef.current.src = '';
                    }
                }
                avatarTimeoutRef.current = null;
            }, AVATAR_TIMEOUT);
        }

        return () => {
            if (avatarTimeoutRef.current) {
                clearTimeout(avatarTimeoutRef.current);
                avatarTimeoutRef.current = null;
            }
        };
    }, [userDetails?.avatar, avatarLoaded, avatarError]);

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