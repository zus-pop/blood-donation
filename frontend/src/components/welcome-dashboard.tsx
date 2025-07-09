const WelcomeDashBoard = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-8">
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4 animate-bounce [animation-duration:3s] [animation-timing-function:ease-in-out] [animation-iteration-count:infinite]">
          🩸
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-2 animate-fade-in">
          Blood Donation Dashboard
        </h1>
        <p className="text-lg text-gray-700 max-w-lg leading-relaxed animate-pulse">
          Welcome to your blood donation management center. Save lives by
          efficiently tracking donors, managing inventory, and coordinating
          life-saving donations.
        </p>
        {/* <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center animate-slide-up">
          <div className="px-6 py-4 bg-red-100 rounded-lg text-red-700 border-l-4 border-red-400">
            <div className="text-2xl mb-2">💉</div>
            <div className="font-semibold">Lives Saved Today</div>
            <div className="text-2xl font-bold text-red-600">127</div>
          </div>
          <div className="px-6 py-4 bg-pink-100 rounded-lg text-pink-700 border-l-4 border-pink-400">
            <div className="text-2xl mb-2">🩸</div>
            <div className="font-semibold">Blood Units Available</div>
            <div className="text-2xl font-bold text-pink-600">2,843</div>
          </div>
          <div className="px-6 py-4 bg-green-100 rounded-lg text-green-700 border-l-4 border-green-400">
            <div className="text-2xl mb-2">❤️</div>
            <div className="font-semibold">Active Donors</div>
            <div className="text-2xl font-bold text-green-600">1,567</div>
          </div>
        </div> */}
        <div className="mt-6 text-sm text-gray-500 animate-pulse">
          Every donation counts • Every life matters
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashBoard;
