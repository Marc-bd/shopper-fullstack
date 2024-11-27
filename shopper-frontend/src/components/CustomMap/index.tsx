
import { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useApp } from '@/hook/useApp';



export default function CustomMap() {

const {estimateRide} = useApp();

  const {googleKey} = useApp()

  return (
    <div className="h-96">
    <APIProvider apiKey={googleKey!}>
      <Map
        defaultZoom={9}
        defaultCenter={{ lat: estimateRide!.origin.latitude, lng: estimateRide!.origin.longitude }}
        fullscreenControl={false}

        mapTypeControl={false}
        cameraControl={false}
        streetViewControl={false}
        zoomControl={false}
      >
        <Directions destination={estimateRide!.destination} origin={estimateRide!.origin} />
      </Map>
    </APIProvider>
    </div>
  );
}

type DirectionsProps = {
  origin: {
    latitude: number;
    longitude: number;
  },
  destination: {
    latitude: number;
    longitude: number;
  }
}

function Directions({origin, destination}: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();


  useEffect(() => {

    if (!routesLibrary || !map) return;

    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));

  }, [routesLibrary, map]);


  useEffect(() => {

    if (!directionService || !directionRenderer) return;

    directionService.route({
      origin: {
        lat: origin.latitude, lng: origin.longitude
      },
      destination: {
        lat: destination.latitude,
        lng: destination.longitude,
      },
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: false,

    }).then((response) => {
      directionRenderer.setDirections(response);

    })


  }, [directionService, directionRenderer]);

  return null;
}