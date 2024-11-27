'use client';
import React, { useEffect, useState } from 'react';
import { useApp } from '@/hook/useApp';
import { OptionDriver } from '@/interfaces/IRideEstimate';
import { http } from '@/services/http/http';
import { toast } from 'react-hot-toast';
import { IConfirmRide, IRideDriver } from '@/interfaces/IRideForm';
import { EnumState } from '@/interfaces/IAppState';


export default function DriverList() {

  const {estimateRide, selectedCustomer, changeAppState, clearEstimateRide} = useApp()


  const [data, setData] = useState<OptionDriver[] | undefined>([]);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const isAsc = orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");

    const sortedData = [...data!].sort((a, b) => {
      if (a.value < b.value) return isAsc ? -1 : 1;
      if (a.value > b.value) return isAsc ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };


  async function confirmRide({id, name, value}: IRideDriver){

    changeAppState({
      text: "Confirmando a corrida!",
      state: EnumState.LOADING
    })

    try {

      if(estimateRide){
      const data: IConfirmRide = {
        customer_id: selectedCustomer!,
        origin: estimateRide?.routeResponse.routes[0].legs[0].start_address,
        destination: estimateRide?.routeResponse.routes[0].legs[0].end_address,
        distance: estimateRide?.distance,
        duration: estimateRide?.duration,
        driver: {
          id: id,
          name: name,
        },
        value: value
      }
        const res = await http.patch('/ride/confirm', data);


        if (res.status === 200) {
          toast.success(`Corrida Confirmada`);

          clearEstimateRide()
          changeAppState({
            text: undefined,
            state: EnumState.HISTORY
          })
        }

      }
    } catch {
      changeAppState({
        text: undefined,
        state: EnumState.INIT
      })
      toast.error('Erro ao confirmar a corrida');
    }


  }

  useEffect(() => {
    if(estimateRide && estimateRide.options.length > 0) {
      setData(estimateRide.options);
    } else {
      setData([]);
    }
  }, [estimateRide]);



  return (
    <div className="relative flex flex-col w-full h-full bg-white shadow-md rounded-lg">

        <h2 className={"text-xl text-center mb-5 font-bold text-green-600"}>Lista de Motoristas Disponíveis</h2>
      <div className="overflow-auto max-h-[70vh]">
        <table className="w-full text-left table-auto">
          <thead>
          <tr>
            {[
              { key: "name", label: "Nome", width: "w-[150px]" },
              { key: "description", label: "Descrição", width: "w-[250px]" },
              { key: "vehicle", label: "Veículo", width: "w-[200px]" },
              { key: "review", label: "Avaliação", width: "w-[200px]" },
              { key: "value", label: "Valor", width: "w-[100px]" },
              { key: "actions", label: "", width: "w-[120px]" },
            ].map(({ key, label, width }) => (
              <th
                key={key}
                className={`font-bold p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100 ${width}`}
                onClick={() => key === "value" && handleSort()}
              >
                <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                  {label}
                  {key === "value" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className={`w-4 h-4 transform ${
                        orderDirection === "asc" ? "rotate-180" : ""
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
          {data!.map((person, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="p-4 border-b border-slate-200 w-[150px]">
                {person.name}
              </td>
              <td className="p-4 border-b border-slate-200 w-[250px]">
                {person.description}
              </td>
              <td className="p-4 border-b border-slate-200 w-[200px]">
                {person.vehicle}
              </td>
              <td className="p-4 border-b border-slate-200 w-[200px]">
                {person.review.rating} {person.review.comment}
              </td>
              <td className="p-4 border-b border-slate-200 w-[100px]">
                {`R$ ${person.value.toFixed(2)}`}
              </td>
              <td className="p-4 border-b border-slate-200 w-[120px]">
                <button
                  onClick={() => confirmRide({id: person.id, name: person.name, value: person.value})}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                  Escolher
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




