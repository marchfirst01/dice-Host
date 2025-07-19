declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (
          lat: number,
          lng: number,
        ) => {
          getLat: () => number;
          getLng: () => number;
        };
        Map: new (
          container: HTMLElement,
          options: {
            center: unknown;
            level: number;
          },
        ) => unknown;
        Marker: new (options: { position: unknown }) => {
          setMap: (map: unknown) => void;
        };
      };
    };
  }
}

export {};
