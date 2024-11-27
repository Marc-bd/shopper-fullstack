export interface IRideEstimate {

  distance: number;
  duration: string;

  origin: {
    latitude: number;
    longitude: number;
  }

  destination: {
    latitude: number;
    longitude: number;
  }
  options:OptionDriver[]
  routeResponse: any;

}


export interface OptionDriver {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  review: {
    comment: string;
    rating: string;
  }
  value: number;
}