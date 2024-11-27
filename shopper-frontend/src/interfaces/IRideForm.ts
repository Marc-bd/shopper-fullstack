export interface IrideForm {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface IRideDriver {
  id: string;
  name: string;
  value: number;
}

export interface IConfirmRide {

  customer_id: string,
  origin: string,
  destination: string,
  distance:number,
  duration: string,
  driver: {
  id: string,
    name: string
},
  value: number

}