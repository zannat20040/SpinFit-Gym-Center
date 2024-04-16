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

  const uniqueDatesWithCounts = subscriberData.reduce(
    (accumulator, current) => {
      const { subscribeDate } = current;
      const existingItem = accumulator.find(
        (item) => item.date === subscribeDate
      );
      if (existingItem) {
        existingItem.subscribers++;
      } else {
        accumulator.push({ date: subscribeDate, subscribers: 1 });
      }
      return accumulator;
    },
    []
  );

  const uniqueBookingDatesWithCounts = bookingData.reduce(
    (accumulator, current) => {
      const { trainingDate } = current;
      const date = new Date(trainingDate);
  
      // Extract year, month, and day from the Date object
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
  
      // Construct the formatted date string in 'YYYY-MM-DD' format
      const formattedDate = `${year}-${month}-${day}`;
  
      const existingItem = accumulator.find((item) => item.date === formattedDate);
    
      console.log("=========finish=========");
  
      if (existingItem) {
        existingItem.paidMembers++;
      } else {
        accumulator.push({ date: formattedDate, paidMembers: 1 });
      }
      return accumulator;
    },
    []
  );
  
// Initialize an empty object to store merged data
const mergedData = {};

// Merge data from uniqueDatesWithCounts array
uniqueDatesWithCounts.forEach(item => {
  mergedData[item.date] = { date: item.date, subscribers: item.subscribers, paidMembers: 0 };
});

// Merge data from uniqueBookingDatesWithCounts array
uniqueBookingDatesWithCounts.forEach(item => {
  // Check if date already exists in mergedData
  if (mergedData[item.date]) {
    mergedData[item.date].paidMembers = item.paidMembers;
  } else {
    // If date doesn't exist, add it to mergedData
    mergedData[item.date] = { date: item.date, subscribers: 0, paidMembers: item.paidMembers };
  }
});

// Convert object to array
const data = Object.values(mergedData);

console.log(data);

console.log(uniqueDatesWithCounts);


  

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
