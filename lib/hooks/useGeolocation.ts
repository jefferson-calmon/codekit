import { useCallback, useEffect, useState } from 'react';

export interface GeoLocationSensorState {
    loading: boolean;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
    timestamp: number | null;
    error?: Error | GeolocationPositionError;
}

export interface GeolocationPositionError {
    readonly code: number;
    readonly message: string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}

export type UseGeolocationReturn = GeoLocationSensorState;

export function useGeolocation(options?: PositionOptions) {
    // States
    const [state, setState] = useState<GeoLocationSensorState>({
        loading: true,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: Date.now(),
    });

    // Common vars
    let mounted = true;
    let watchId: any;

    // Callbacks
    const onEvent = useCallback((event: any) => {
        if (!mounted) return;

        setState({
            loading: false,
            accuracy: event.coords.accuracy,
            altitude: event.coords.altitude,
            altitudeAccuracy: event.coords.altitudeAccuracy,
            heading: event.coords.heading,
            latitude: event.coords.latitude,
            longitude: event.coords.longitude,
            speed: event.coords.speed,
            timestamp: event.timestamp,
        });
    }, []);

    const onEventError = useCallback((error: GeolocationPositionError) => {
        if (!mounted) return;

        setState(oldState => ({ ...oldState, loading: false, error }));
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            onEvent,
            onEventError,
            options,
        );

        watchId = navigator.geolocation.watchPosition(
            onEvent,
            onEventError,
            options,
        );

        return () => {
            mounted = false;
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return state;
}
