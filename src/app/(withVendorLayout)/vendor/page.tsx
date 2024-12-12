 /* eslint-disable react/no-unescaped-entities */
// pages/index.tsx
"use client"
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

export default function VendorDashboard() {
  return (
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening.</p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card */}
        <div className="p-4 bg-white shadow rounded-lg lg:overflow-x-visible overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700">Users</h2>
          <p className="text-2xl font-bold text-green-500">25,000</p>
          <LineChart width={250} height={100} data={data}>
            <Line type="monotone" dataKey="value" stroke="#4ade80" />
          </LineChart>
        </div>

        <div className="p-4 bg-white shadow rounded-lg lg:overflow-x-visible overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
          <p className="text-2xl font-bold text-green-500">$88,000</p>
          <BarChart width={250} height={100} data={data}>
            <Bar dataKey="value" fill="#4ade80" />
          </BarChart>
        </div>

        {/* More Cards */}
        <div className="p-4 bg-white shadow rounded-lg lg:overflow-x-visible overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700">Bank Accounts</h2>
          <p className="text-2xl font-bold text-green-500">$40,000</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg lg:overflow-x-visible overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700">Drivers</h2>
          <p className="text-2xl font-bold text-green-500">10,000</p>
        </div>
      </div>

      {/* Extra Section */}
      <div className="p-4 bg-white shadow rounded-lg lg:overflow-x-visible overflow-x-auto mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Tracking Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4ade80" />
          </LineChart>

          {/* Bar Chart */}
          <BarChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4ade80" />
          </BarChart>
        </div>
      </div>

      {/* Process Section */}
      <div className="p-4 bg-white shadow rounded-lg lg:overflow-x-visible overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700">
          Processes in the System
        </h2>
        <div className="space-y-4 mt-4">
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">John Charlie</h3>
              <p className="text-sm text-gray-500">Saigon ➡ Victoria</p>
            </div>
            <p className="font-semibold text-green-500">$30</p>
          </div>
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Charmie</h3>
              <p className="text-sm text-gray-500">Glen ➡ Saigon</p>
            </div>
            <p className="font-semibold text-green-500">$45</p>
          </div>
        </div>
      </div>
    </div>
  );
}