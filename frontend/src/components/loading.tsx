import { Droplets } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <div className={`min-h-screen flex items-center justify-center`}>
      <div className="text-center">
        <Droplets className="h-10 w-10 text-red-600 mx-auto animate-pulse" />
        <p className="mt-4">{message || "Loading article..."}</p>
      </div>
    </div>
  );
};

export default Loading;
