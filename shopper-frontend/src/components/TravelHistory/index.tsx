'use client';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from '@/components/Select';
import React, { useEffect, useState } from 'react';
import { http } from '@/services/http/http';
import { useApp } from '@/hook/useApp';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/utils/date';
import { convertDistance } from '@/utils/meters';


type Travel = {
  id: number;
  date: string;
  time: string;
  driver: {
    id: string,
    name: string,
  }
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
};

const schema = yup.object().shape({
  userId: yup.string().required('O Usuário é obrigatório!'),
  driverId: yup.string(),
});


export default function TravelHistory() {

  const {selectedCustomer, selectedDriver, customerList, driverList} = useApp()

  const [sortedTrips, setSortedTrips] = useState<Travel[]>([]);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Travel>('date');

  const handleSort = (key: keyof Travel) => {
    const isAsc = orderBy === key && orderDirection === 'asc';
    const direction = isAsc ? 'desc' : 'asc';
    setOrderDirection(direction);
    setOrderBy(key);

    const sorted = [...sortedTrips].sort((a, b) => {
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      }
      return 0;
    });
    setSortedTrips(sorted);
  };




  const {  handleSubmit, control  ,formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });


  async function onSubmit(data: any) {

    try {
      const res = await http.get(`/ride/${data.userId}${data.driverId ? `?driver_id=${data.driverId}` : ''}`)
      if (res.status === 200) {
        setSortedTrips(res.data.rides)
      }
    } catch {
      toast.error("Erro ao buscar o histórico!")
    }

  }

  useEffect(( ) => {

    const fetchHistory = async (customerId: string) => {
      try {
        const res = await http.get(`/ride/${customerId}`);
        if (res.status === 200) {
          setSortedTrips(res.data.rides);
        }
      } catch  {
        toast.error("Erro ao buscar o histórico!");
      }
    };

    if(selectedCustomer) {
        setValue('userId', selectedCustomer);

      if(sortedTrips.length === 0) {
        fetchHistory(selectedCustomer);
      }

      }

    if(selectedDriver) {
      setValue('driverId', selectedDriver.id);
    }

  }, [selectedCustomer, selectedCustomer])




  return (
    <div className=" h-lvh flex flex-col w-full">
      <div>
        <h3 className={"font-bold text-2xl text-center text-green-600 p-5"}>Histórico de Viagens</h3>
        <div className={"p-10"}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex flex-row gap-10 '}>
            <div className={'w-1/2'}>
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <Select
                    id="userId"
                    label="Usuário"
                    value={field.value || selectedCustomer || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    options={customerList ? customerList : []}
                    errors={errors.userId?.message}
                  />
                )}
              />
            </div>
            <div className={'w-1/2'}>
              <Controller
                name="driverId"
                control={control}
                render={({ field }) => (
                  <Select
                    id="driverId"
                    label="Motorista"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    options={driverList ? driverList : []}
                    errors={errors.driverId?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className={"flex flex-col "}>
            <button
              type={"submit"}
              className=" w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 max-w-80">
              Buscar
            </button>
          </div>
          </form>
        </div>
      </div>

      {
        sortedTrips.length > 0 ?
          (

      <div className="overflow-auto max-h-[70vh] pr-5 pl-5 ">
        <table className="w-full text-left table-auto">
          <thead>
          <tr>
            {[
              { key: 'date', label: 'Data', width: 'w-[150px]' },
              { key: 'time', label: 'Hora', width: 'w-[100px]' },
              { key: 'driver', label: 'Motorista', width: 'w-[200px]' },
              { key: 'origin', label: 'Origem', width: 'w-[250px]' },
              { key: 'destination', label: 'Destino', width: 'w-[250px]' },
              { key: 'distance', label: 'Distância', width: 'w-[150px]' },
              { key: 'duration', label: 'Tempo', width: 'w-[150px]' },
              { key: 'value', label: 'Valor', width: 'w-[150px]' },
            ].map(({ key, label, width }) => (
              <th
                key={key}
                className={`font-bold p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100 ${width}`}
                onClick={() => handleSort(key as keyof Travel)}
              >
                <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                  {label}
                  {orderBy === key && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className={`w-4 h-4 transform ${
                        orderDirection === 'asc' ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  )}
                </p>
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {sortedTrips.map((trip, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="p-4 border-b border-slate-200 w-[150px]">{formatDate(trip.date)}</td>
              <td className="p-4 border-b border-slate-200 w-[100px]">{trip.time}</td>
              <td className="p-4 border-b border-slate-200 w-[200px]">{trip.driver.name}</td>
              <td className="p-4 border-b border-slate-200 w-[250px]">{trip.origin}</td>
              <td className="p-4 border-b border-slate-200 w-[250px]">{trip.destination}</td>
              <td className="p-4 border-b border-slate-200 w-[150px]">{convertDistance(trip.distance)}</td>
              <td className="p-4 border-b border-slate-200 w-[150px]">{trip.duration}</td>
              <td className="p-4 border-b border-slate-200 w-[150px]">R$ {trip.value.toFixed(2)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
          )

          :
          (
            <div className="bg-gray-100 mr-5 ml-5 border-2 border-green-700 rounded-md flex flex-col justify-center gap-5 p-8">
              <h3 className={"font-bold text-xl text-center text-green-900"}>Nenhuma viagem encontrada!</h3>
              <div className="flex flex-col">
              <p className={"font-bold text-lg text-center text-green-900"}>Verifique se o usuário foi selecionado.</p>
              <p className={"font-bold text-lg text-center text-green-900"}>Se não, selecione um para buscar o histórico.</p>
              </div>
            </div>
          )
      }

    </div>
  )
}