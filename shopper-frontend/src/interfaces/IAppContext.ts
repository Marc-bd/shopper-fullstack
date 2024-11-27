import { ICustomer } from '@/interfaces/ICustomer';
import { IDriver } from '@/interfaces/IDriver';
import { ReactNode } from 'react';
import { IRideEstimate } from '@/interfaces/IRideEstimate';
import { AppState } from '@/interfaces/IAppState';

export interface IAppContext {

  addCustomerList: (data: ICustomer[]) => void;
  clearCustomerList: () => void;
  customerList: ICustomer[] | undefined;

  addCustomer: (value: string) => void;
  clearCustomer: () => void;
  selectedCustomer: string | undefined;

  addDriverList: (data: IDriver[]) => void;
  clearDriverList: () => void;
  driverList: IDriver[] | undefined;

  addDriver: (data: IDriver) => void;
  clearDriver: () => void;
  selectedDriver: IDriver | undefined;

  addEstimateRide: (data: IRideEstimate) => void;
  estimateRide: IRideEstimate | undefined;
  clearEstimateRide: () => void;

  addGoogleKey: (key: string) => void;
  googleKey: string | undefined;
  clearGoogleKey: () => void;

  appState: AppState;
  changeAppState: (state: AppState) => void;

}

export interface IAppContextProvider {
  children: ReactNode;
}
