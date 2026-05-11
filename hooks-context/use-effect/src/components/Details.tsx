import React, { useState, useEffect, useRef } from 'react';
import { DetailsProps, UserDetails } from '../types';
import '../styles/Details.css';

const DETAILS_BASE_URL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data';

const Details: React.FC<DetailsProps> = ({ info }) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [avatarLoaded, setAvatarLoaded] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!info || !info.id) {
            setUserDetails(null);
            setError(null);
            setLoading(false);
            setAvatarLoaded(false);
            return;
        }

        let isMounted = true;

        const fetchUserDetails = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                setAvatarLoaded(false);

                const response = await fetch(`${DETAILS_BASE_URL}/${info.id}.json`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: UserDetails = await response.json();

                console.log(data);

                if (isMounted) {
                    setUserDetails(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load user details');
                    setUserDetails(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchUserDetails();

        return () => {
            isMounted = false;
        };
    }, [info?.id]);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setAvatarLoaded(true);
        }
    }, [userDetails]);

    const handleAvatarLoad = () => {
        setAvatarLoaded(true);
    };

    const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setAvatarLoaded(true);
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=No+Avatar';
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
                {!avatarLoaded && (
                    <div className="avatar-loading">
                        <div className="avatar-spinner"></div>
                    </div>
                )}
                <img
                    ref={imgRef}
                    src={userDetails.avatar}
                    alt={`${userDetails.name}'s avatar`}
                    onLoad={handleAvatarLoad}
                    onError={handleAvatarError}
                    style={{
                        display: avatarLoaded ? 'block' : 'none',
                        opacity: avatarLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            </div>

            <div className="details-info">
                <div className="details-field">
                    <h3>{userDetails.name}</h3>
                </div>

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