import { FieldValues, SubmitHandler } from 'react-hook-form';

interface RegisterFormButtonComponentProps<T extends FieldValues> {
  handleSubmit: (onSubmit: SubmitHandler<T>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  disabled?: boolean;
}
export default function RegisterFormButtonComponent<T extends FieldValues>({
  handleSubmit,
  onSubmit,
  children,
  disabled = false,
}: RegisterFormButtonComponentProps<T>) {
  return (
    <button
      disabled={disabled}
      onClick={handleSubmit(onSubmit)}
      className={`text-style-BTN1 h-[52px] w-full rounded-lg p-4 text-white ${disabled ? 'bg-light_gray' : 'bg-black'}`}
    >
      {children}
    </button>
  );
}
