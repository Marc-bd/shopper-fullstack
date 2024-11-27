import React, { createContext, useState } from 'react';
import { IAppContext, IAppContextProvider } from '@/interfaces/IAppContext';
import { ICustomer } from '@/interfaces/ICustomer';
import { IDriver } from '@/interfaces/IDriver';
import { IRideEstimate } from '@/interfaces/IRideEstimate';
import { AppState, EnumState } from '@/interfaces/IAppState';

export const AppContext = createContext<IAppContext>({} as IAppContext)

export const AppProvider = ({ children }: IAppContextProvider) => {

  const [customerList, setCustomerList] = useState<ICustomer[] | undefined>(undefined);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);

  const [driverList, setDriverList] = useState<IDriver[] | undefined>(undefined);
  const [selectedDriver, setSelectedDriver] = useState<IDriver | undefined>(undefined);

  const [estimateRide, setEstimateRide] = useState<IRideEstimate | undefined>(
    undefined
  );

  const [googleKey, setGoogleKey] = useState<string | undefined>(undefined);

  const [appState, setAppState] = useState<AppState>({
    state: EnumState.INIT,
    text: " "
  });


  function addCustomerList(data: ICustomer[]) {
    setCustomerList(data)
  }

  function clearCustomerList() {
    setCustomerList(undefined)
  }

  function addCustomer(data: string) {
    setSelectedCustomer(data)
  }

  function clearCustomer(){
    setSelectedCustomer(undefined)
  }

  function addDriverList(data: IDriver[]) {
    setDriverList(data)
  }

  function clearDriverList() {
    setDriverList(undefined)
  }

  function addDriver(data: IDriver) {
    setSelectedDriver(data)
  }

  function clearDriver(){
    setSelectedDriver(undefined)
  }

  function addEstimateRide (data: IRideEstimate) {
      setEstimateRide(data)
  }

  function clearEstimateRide () {
    setEstimateRide(undefined)
  }

  function addGoogleKey (key: string) {
    setGoogleKey(key)
  }

  function clearGoogleKey (){
    setGoogleKey(undefined)
  }

  function changeAppState(state: AppState) {
    setAppState(state)
  }



  return (
    <AppContext.Provider value={{
     addCustomerList,
      clearCustomerList,
      customerList,
      addCustomer,
      clearCustomer,
      selectedCustomer,
      addDriverList,
      clearDriverList,
      driverList,
      addDriver,
      selectedDriver,
      clearDriver,
      addEstimateRide,
      clearEstimateRide,
      estimateRide,
      clearGoogleKey,
      googleKey,
      addGoogleKey,
      appState,
      changeAppState
    }}>
      {children}
    </AppContext.Provider>
  );
};