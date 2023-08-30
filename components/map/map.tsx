import MapView, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { goboat } from '../../styles/Theme';
import NoMap from './no-map';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const zoom = 13;

interface MapProps {
  latitude?: number;
  longitude?: number;
}

const Map = (props: MapProps) => {
  const { latitude, longitude } = props;

  if (!latitude || !longitude) return <NoMap>No latitude or longitude</NoMap>;

  return (
    <MapView
      mapboxAccessToken={TOKEN}
      mapStyle="mapbox://styles/nikolajnyboe/cl95jjs10001817la9ub2isll"
      initialViewState={{
        latitude,
        longitude,
        zoom,
      }}
    >
      <Marker
        latitude={latitude}
        longitude={longitude}
        color={goboat.colorButtonBackgroundPrimary}
      />
    </MapView>
  );
};

export default Map;
