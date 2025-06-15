import { Loader } from "lucide-react";
interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
}

const Loading = ({ message, fullscreen = true }: LoadingProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? "h-screen" : "py-10"
      }`}
    >
      <div className="flex flex-col items-center space-y-3">
        <Loader className="size-7 text-white-600 animate-spin" />
        {message && (
          <p className="text-gray-700 dark:text-gray-200 text-sm font-medium text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
