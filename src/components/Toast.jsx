import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toast } = useApp();

  if (!toast.show) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 ${
        toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white px-8 py-5 rounded-2xl shadow-2xl transform transition-all duration-400 z-[1000] max-w-[350px] font-semibold flex items-center gap-3 ${
        toast.show ? 'translate-x-0 opacity-100' : 'translate-x-[400px] opacity-0'
      }`}
    >
      <span className="text-2xl">{toast.type === 'error' ? '✕' : '✓'}</span>
      {toast.message}
    </div>
  );
};

export default Toast;

