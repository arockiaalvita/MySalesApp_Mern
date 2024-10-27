import React, { useEffect, useState } from 'react';

const SalesRepList = () => {
  const [salesReps, setSalesReps] = useState([]);

  useEffect(() => {
    // Fetch the sales rep data from your API or backend
    const fetchSalesReps = async () => {
      try {
        const response = await fetch('/api/sales-reps'); // Adjust the URL according to your API
        const data = await response.json();
        setSalesReps(data);
      } catch (error) {
        console.error('Error fetching sales reps:', error);
      }
    };

    fetchSalesReps();
  }, []);

  return (
    <div className="sales-rep-list">
      <h2>Registered Sales Representatives</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {salesReps.map((rep) => (
            <tr key={rep.id}> {/* Adjust according to your unique identifier */}
              <td>{rep.name}</td>
              <td>{rep.email}</td>
              <td>{rep.role}</td> {/* Assuming 'role' is part of the sales rep data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRepList;
