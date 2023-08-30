import styled from 'styled-components';
import Map from './map';

interface MapBlockProps {
  coordinates?: string;
}

const MapWrapper = styled.div`
  height: 500px;
`;

const MapBlock = (props: MapBlockProps) => {
  const { coordinates } = props;

  // Match in services/wordpress/src/wp-content/plugins/gutenberg-blocks/src/block/map-block/block.php
  // doesn't work for all values, so we now use the raw coordinates and a simple split
  const latitude = coordinates ? Number(coordinates?.split(', ')[0]) : undefined;
  const longitude = coordinates ? Number(coordinates?.split(', ')[1]) : undefined;

  return (
    <MapWrapper>
      <Map latitude={latitude} longitude={longitude} />
    </MapWrapper>
  );
};

export default MapBlock;
