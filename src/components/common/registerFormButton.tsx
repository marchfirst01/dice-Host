import { FieldValues, SubmitHandler } from 'react-hook-form';

interface RegisterFormButtonComponentProps<T extends FieldValues> {
  handleSubmit: (onSubmit: SubmitHandler<T>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}
export default function RegisterFormButtonComponent<T extends FieldValues>({
  handleSubmit,
  onSubmit,
  children,
}: RegisterFormButtonComponentProps<T>) {
  return (
    <button
      onClick={handleSubmit(onSubmit)}
      className="text-btn1 h-[52px] w-full rounded-lg bg-black p-4 font-BTN1 leading-BTN1 text-white"
    >
      {children}
    </button>
  );
}
