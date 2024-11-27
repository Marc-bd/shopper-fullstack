import { UseFormRegister, FieldError, } from 'react-hook-form';
import { IrideForm } from '@/interfaces/IRideForm';

interface InputFieldProps {
  id:  keyof IrideForm;
  label: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<IrideForm>;
  errors: FieldError | undefined;
}

export default function CustomInput({
                                      id,
                                      label,
                                      placeholder,
                                      type,
                                      register,
                                      errors,
                                    }: InputFieldProps) {
  return (
    <div className="mb-4 h-28">
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
          errors ? 'border-red-500 ring-red-300' : 'focus:ring-blue-300'
        }`}
        placeholder={placeholder}
      />
      {errors && (
        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
      )}
    </div>
  );
};


