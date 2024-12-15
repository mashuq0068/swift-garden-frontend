import React from 'react';

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-4 text-xl text-gray-700">
          Unfortunately, your payment was not processed. If this was a mistake, you can try again.
        </p>
        <div className="mt-6">
          <a href="/" className="text-red-600 hover:underline">Return to Homepage</a>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
