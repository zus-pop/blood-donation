import SummaryCards from "@/components/dashboard/SummaryCards";
import TotalDonations from "@/components/dashboard/TotalDonations";
import TotalRequests from "@/components/dashboard/TotalRequests";

import InventoryChart from "@/components/dashboard/InventoryChart";
import PieBloodTypeChart from "@/components/dashboard/PieBloodTypeChart";
import LineDonationTrendChart from "@/components/dashboard/LineDonationTrendChart";
import AreaRequestTrendChart from "@/components/dashboard/AreaRequestTrendChart";

const DashboardHome = () => (
  <div className="@container/main flex flex-1 flex-col gap-8 p-4 md:p-10 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
    {/* Header Section */}
    <div className="mb-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 mb-4">

      </div>
      <div className="h-px bg-gradient-to-r from-red-200 via-red-300 to-transparent"></div>
    </div>

    {/* Summary Cards Section */}
    <section className="animate-in slide-in-from-bottom-4 duration-700 delay-100">
      <SummaryCards />
    </section>

    {/* Key Metrics Section */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-700 delay-200">
      <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-white/50 hover:scale-[1.02] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider">Total Donations</h3>
          </div>
          <TotalDonations />
        </div>
      </div>

      <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-white/50 hover:scale-[1.02] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Total Requests</h3>
          </div>
          <TotalRequests />
        </div>
      </div>
    </section>

    {/* Analytics Section */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-700 delay-300">
      <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-white/50 hover:scale-[1.01] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <div className="w-5 h-5 bg-white rounded-sm opacity-90"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Inventory Overview</h2>
          </div>
          <InventoryChart />
        </div>
      </div>

      <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-white/50 hover:scale-[1.01] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <div className="w-5 h-5 bg-white rounded-full opacity-90"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Blood Type Distribution</h2>
          </div>
          <PieBloodTypeChart />
        </div>
      </div>
    </section>

    {/* Trend Analysis Section */}
    <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-400">
      <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-white/50 hover:scale-[1.005] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <div className="w-5 h-1 bg-white rounded-full opacity-90"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Donation Trends</h2>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                Live Data
              </span>
            </div>
          </div>
          <LineDonationTrendChart />
        </div>
      </div>

      <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-white/50 hover:scale-[1.005] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg">
              <div className="w-5 h-3 bg-white rounded opacity-90"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Blood Requests</h2>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 text-cyan-700 text-sm font-medium rounded-full">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                Live Data
              </span>
            </div>
          </div>
          <AreaRequestTrendChart />
        </div>
      </div>
    </section>

    {/* Footer Spacer */}
    <div className="h-8"></div>
  </div>
);

export default DashboardHome;