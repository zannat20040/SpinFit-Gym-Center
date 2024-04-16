import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReactBarChart = () => {
  const [subscriberData, setSubscriberData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const subcriberresponse = await axios.get(
          "http://localhost:5000/subscribers"
        );
        const bookingresponse = await axios.get(
          "http://localhost:5000/bookings"
        );
        setSubscriberData(subcriberresponse.data);
        setBookingData(bookingresponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const uniqueDatesWithCounts = subscriberData.reduce((accumulator, current) => {
    const { subscribeDate } = current;
    const existingItem = accumulator.find(item => item.date === subscribeDate);
    if (existingItem) {
        
      existingItem.subscribers++;
    } else {
      accumulator.push({ date: subscribeDate, subscribers: 1 });
    }
    return accumulator;
  }, []);
  
  console.log(uniqueDatesWithCounts);

  const uniqueBookingDatesWithCounts = bookingData.reduce((accumulator, current) => {
    const { bookingDate } = current;
    const existingItem = accumulator.find(item => console.log(item));
   
    if (existingItem) {
        
      existingItem.paidMembers++;
    } else {
      accumulator.push({ date: bookingDate, paidMembers: 1 });
    }
    return accumulator;
  }, []);
  
  console.log(uniqueBookingDatesWithCounts);
  

 
  // Sample data representing newsletter subscribers and paid members for each date
  const data = [
    { date: "2022-01-01", subscribers: 1000, paidMembers: 500 },
    { date: "2022-01-02", subscribers: 1200, paidMembers: 600 },
    { date: "2022-01-03", subscribers: 800, paidMembers: 700 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="subscribers"
          name="Newsletter Subscribers"
          fill="#8884d8"
        />
        <Bar dataKey="paidMembers" name="Paid Members" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReactBarChart;
