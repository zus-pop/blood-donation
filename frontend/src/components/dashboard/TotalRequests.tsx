import { useEffect, useState } from "react";
import { getBloodRequests } from "@/apis/bloodrequest.api";


const TotalRequests = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getBloodRequests({}).then((data) => setCount(data.length));
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mb-6 flex flex-col items-center justify-center min-h-[120px]">
      <div className="font-semibold mb-2 text-xl text-gray-700">Total Requests</div>
      <span className="text-4xl font-extrabold text-blue-600">{count}</span>
    </div>
  );
};

export default TotalRequests;
