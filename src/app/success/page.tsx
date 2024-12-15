import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          {/* Success Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-semibold text-gray-900">Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your purchase. Your order is being processed and will be shipped soon.
        </p>
        <div className="mt-8">
          <a href="/" className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg text-lg hover:bg-green-500 transition duration-300">
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
