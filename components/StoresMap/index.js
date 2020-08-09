import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { getClosest } from '../../services/stores';
import { usePosition } from '../../hooks/usePosition';

const STYLE_MAP = {
  width: '100%',
  height: 'calc(100% - 136px)',
};

const LANGUAGE_MAP = 'es-AR';

const API_KEY_MAP = process.env.NEXT_PUBLIC_API_KEY_MAPS;

function LoadingContainer() {
  return <div className={`${styles.loadingMap} ${styles.shine}`} />;
}

function StoresMap({ google, showMap, t }) {
  const { latitude, longitude, error } = usePosition(true);
  const [stores, setStores] = useState([]);

  const fetchResults = async () => {
    const results = await getClosest(latitude, longitude);
    setStores(results);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const [stateMarker, setStateMarker] = useState({ showingInfoWindow: false, activeMarker: {}, selectedPlace: {} });

  const onMapClicked = () => {
    if (stateMarker.showingInfoWindow) {
      setStateMarker({ ...stateMarker, activeMarker: null, showingInfoWindow: false });
    }
  };

  const onMarkerClick = (props, marker, e) => {
    setStateMarker({ ...stateMarker, selectedPlace: props, activeMarker: marker, showingInfoWindow: true });
  };

  if (error) {
    return <p>{t('error_map')}</p>;
  }

  if (latitude && longitude) {
    return (
      <Map
        google={google}
        zoom={14}
        style={{ ...STYLE_MAP, visibility: showMap ? 'visible' : 'hidden' }}
        initialCenter={{ lat: latitude, lng: longitude }}
        onClick={onMapClicked}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
        {stores &&
          stores.map(({ name, location: { coordinates }, logo, web }, index) => (
            <Marker
              key={index}
              onClick={onMarkerClick}
              name={name}
              position={{ lat: coordinates[0], lng: coordinates[1] }}
              icon={{
                url: logo,
                anchor: new google.maps.Point(32, 32),
                scaledSize: new google.maps.Size(64, 64),
              }}
              web={web}
            />
          ))}
        <InfoWindow marker={stateMarker.activeMarker} visible={stateMarker.showingInfoWindow}>
          <article>
            <h1>
              <a href={stateMarker.selectedPlace.web}>{stateMarker.selectedPlace.name}</a>
            </h1>
          </article>
        </InfoWindow>
      </Map>
    );
  }
  return null;
}

export default GoogleApiWrapper({
  apiKey: API_KEY_MAP,
  language: LANGUAGE_MAP,
  LoadingContainer,
})(StoresMap);
