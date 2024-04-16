import React, { useEffect, useState } from "react";
import axios from 'axios'
import ReactBarChart from "../../Component/AdminDashboard/ReactBarChart";
import PaymentTable from "../../Component/AdminDashboard/PaymentTable";

const Balance = () => {

    const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch total remaining balance from backend
    axios.get("http://localhost:5000/balance")
      .then(response => {
        setBalance(response.data);
      })
      .catch(error => {
        console.error("Error fetching total remaining balance:", error);
      });
  }, []);

  return (
    <div>
      {/* balance */}
      <div className="font-oswald grid grid-cols-3 gap-5 justify-between items-center mb-10">
      <div className="card text-primary-content bg-slate-800 rounded ">
        <div className="card-body">
          <h2 className="card-title font-light text-white ">Total Booking Payment</h2>
          <p className="text-[#dde244] text-4xl ">${balance.totalBookingPayments}</p>
        </div>
      </div>
      <div className="card text-primary-content bg-slate-800 rounded ">
        <div className="card-body">
          <h2 className="card-title font-light text-white ">Total Trainer Payment</h2>
          <p className="text-[#dde244] text-4xl ">${balance.totalTrainerPayments}</p>
        </div>
      </div>
      <div className="card text-primary-content bg-slate-800 rounded ">
        <div className="card-body">
          <h2 className="card-title font-light text-white ">Total Remaining Balance</h2>
          <p className="text-[#dde244] text-4xl ">${balance.totalRemainingBalance}</p>
        </div>
      </div>
      </div>
      <div>
        <ReactBarChart />
        <PaymentTable />
      </div>
    </div>
  );
};

export default Balance;
