import { Droplets } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
  inline?: boolean;
}

const Loading = ({ message, fullscreen = true, inline = false }: LoadingProps) => {
  if (inline) {
    return (
      <div className="flex items-center gap-2">
        <Droplets className="h-4 w-4 text-current animate-pulse" />
        <span>{message || "Loading..."}</span>
      </div>
    );
  }

  return (
    <div className={`${fullscreen ? 'min-h-screen' : ''} flex items-center justify-center`}>
      <div className="text-center">
        <Droplets className="h-10 w-10 text-red-600 mx-auto animate-pulse" />
        <p className="mt-4">{message || "Loading..."}</p>
      </div>
    </div>
  );
};

export default Loading;
