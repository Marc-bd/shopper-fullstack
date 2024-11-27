'use client';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '@/components/CustomInput';
import Select from '../Select';
import { IrideForm } from '@/interfaces/IRideForm';
import { useApp } from '@/hook/useApp';
import { http } from '@/services/http/http';
import { toast } from 'react-hot-toast';
import { EnumState } from '@/interfaces/IAppState';


const schema = yup.object().shape({
  customer_id: yup.string().required('O usuário é obrigatório'),
  origin: yup.string().required('O endereço de origem é obrigatório'),
  destination: yup.string() .required('O endereço de destino é obrigatório')
    .test('not-equal', 'Endereço destino não pode ser igual ao de origem', function(value) {
      const { origin } = this.parent;
      return value !== origin;
    }),
});

export default function Sidebar() {

  const {customerList, addEstimateRide, clearEstimateRide, changeAppState, addCustomer, clearCustomer, appState } = useApp()

  const { register, handleSubmit, control  ,formState: { errors }, reset } = useForm<IrideForm>({
    resolver: yupResolver(schema),
  });


  async function onSubmit(data: IrideForm) {
    try {
      changeAppState({
        text: "Estamos buscando a sua corrida!",
        state: EnumState.LOADING
      })
      addCustomer(data.customer_id)
      const response = await http.post('/ride/estimate', data)

      addEstimateRide(response.data);

      changeAppState({
        text: undefined,
        state: EnumState.ESTIMATE
      });

    } catch {
      clearCustomer()
      toast.error("Endereço Inválido");
      clearEstimateRide()
      changeAppState({
        text: undefined,
        state: EnumState.INIT
      })
    }


  }


  function handleResetForm() {
    reset();
    if(appState.state !== EnumState.INIT) {
      changeAppState({
        text: undefined,
        state: EnumState.INIT
      })
      clearEstimateRide()
    }
  }

  function handleTravelHistory() {
    changeAppState({
      text: undefined,
      state: EnumState.HISTORY
    })
    clearEstimateRide()
    clearCustomer()
  }




  return (
    <div className="rounded-3xl shadow-md  h-lvh bg-gray-100  flex w-full min-w-[22rem] max-w-[22rem] flex-col  text-gray-700">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <h1 className="text-2xl font-bold mb-12 text-gray-800 text-center">
          Shopper Viagem
        </h1>

        <Controller
          name="customer_id"
          control={control}
          render={({ field }) => (
            <Select
              id="customer_id"
              label="Usuário"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              options={customerList ? customerList : []}
              errors={errors.customer_id?.message}
            />
          )}
        />


        <CustomInput
          id="origin"
          label="Endereço de Origem"
          placeholder="Ex: Rua 10, Centro, São Paulo/SP "
          type="text"
          register={register}
          errors={errors.origin}
        />



        <CustomInput
          id="destination"
          label="Endereço de Destino"
          placeholder="Ex: Rua 10, Centro, São Paulo/SP "
          type="text"
          register={register}
          errors={errors.destination}
        />

        <div className="flex flex-col gap-10">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Estimar Viagem
          </button>

          <button
            type="reset"
            onClick={handleResetForm}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>




      <div className="flex items-end mb-8">
        <button
          onClick={handleTravelHistory}
          type="button"
          className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition m-5 duration-300"
        >
          Histórico
        </button>
      </div>
    </div>
  );
}
