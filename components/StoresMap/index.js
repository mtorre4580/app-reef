import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { getClosest } from '../../services/stores';

const STYLE_MAP = {
  width: '100%',
  height: 'calc(100% - 86px)',
};

const LANGUAGE_MAP = 'es-AR';

const API_KEY_MAP = process.env.API_KEY_MAP;

function LoadingContainer() {
  return <div className={`${styles.loadingMap} ${styles.shine}`} />;
}

function StoresMap({ lat, lng, google }) {
  const [stores, setStores] = useState([]);
  const fetchResults = async () => {
    const results = await getClosest(lat, lng);
    setStores(results);
  };

  useEffect(() => {
    fetchResults();
  }, [lat, lng]);

  const [stateMarker, setStateMarker] = useState({ showingInfoWindow: false, activeMarker: {}, selectedPlace: {} });

  const onMapClicked = () => {
    if (stateMarker.showingInfoWindow) {
      setStateMarker({ ...stateMarker, activeMarker: null, showingInfoWindow: false });
    }
  };

  const onMarkerClick = (props, marker, e) => {
    setStateMarker({ ...stateMarker, selectedPlace: props, activeMarker: marker, showingInfoWindow: true });
  };

  return (
    <Map google={google} zoom={14} style={STYLE_MAP} initialCenter={{ lat, lng }} onClick={onMapClicked}>
      <Marker position={{ lat, lng }} />
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

export default GoogleApiWrapper({
  apiKey: API_KEY_MAP,
  language: LANGUAGE_MAP,
  LoadingContainer,
})(StoresMap);
