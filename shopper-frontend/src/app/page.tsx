'use client';

import Image from 'next/image';
import HERO_IMAGE from './../../public/hero.svg';
import { useEffect, useState } from 'react';
import RideMap from '@/components/RideMap';
import TravelHistory from '@/components/TravelHistory';
import { useApp } from '@/hook/useApp';
import { getInitialData } from '@/services/initialService';
import { toast } from 'react-hot-toast';
import { EnumState } from '@/interfaces/IAppState';
import Loading from '@/components/Loading';

export default function Home() {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const {addDriverList, addCustomerList, estimateRide, addGoogleKey, googleKey, appState, changeAppState} = useApp()

  const [state, setState] = useState<string>("");



  useEffect(() => {
    const fetchData = async () => {

      changeAppState({
        text: "Carregando o sistema!",
        state: EnumState.INIT,
      })

      if(apiKey){
          addGoogleKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!)
      try {
        const data = await getInitialData();
        if (data) {
          addDriverList(data.drivers);
          addCustomerList(data.customers);
        }
      } catch {
        toast.error("Erro ao conectar com o servidor")
      }
      } else {
        toast.error('Erro ao buscar Google API Key');
      }

      changeAppState({
        text: undefined,
        state: EnumState.INIT,
      })
    };

    fetchData();
  }, []);


  useEffect(() => {
    setState(appState.state)

  }, [appState, googleKey, estimateRide]);



  return (
    <div className=" h-full flex flex-col justify-center items-center align-middle">

      {
        state === EnumState.LOADING && (
          <Loading text={appState.text}/>
        )
      }

      {
        state === EnumState.INIT && !googleKey && (
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <h4 className={"font-bold text-2xl text-red-600"}>Não foi possível buscar GOOGLE_API_KEY</h4>
            <p className={"font-bold text-xl text-red-600"}>Verifique se o arquivo .env foi criado na raiz do projeto!</p>
          </div>
        )
      }

      {
        !estimateRide && state === EnumState.INIT && googleKey && (
          <div className="h-full flex flex-col items-center justify-center ">
            <Image src={HERO_IMAGE} alt={'logo home'} priority={true} />
          </div>
        )
      }

      {
        googleKey && estimateRide && state === EnumState.ESTIMATE &&
        (
          <RideMap />
        )
      }

      {
        !estimateRide && state === EnumState.HISTORY && (
          <TravelHistory />
        )
      }
    </div>
  );
}
