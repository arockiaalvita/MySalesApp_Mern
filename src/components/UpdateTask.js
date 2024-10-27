import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateTask = () => {
  const { id } = useParams(); // Get the sales rep ID from the URL
  const [salesRep, setSalesRep] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchSalesRep = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/salesreps/${id}`);
        setSalesRep(response.data);
        setTasks(response.data.tasks || []); // Ensure tasks is an array
      } catch (error) {
        console.error('Error fetching sales rep:', error);
        setSalesRep(null); // Handle error case
      } finally {
        setLoading(false); // Set loading to false regardless of the result
      }
    };

    fetchSalesRep();
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show loading message

  // Handle the case where salesRep is null
  if (!salesRep) return <p>Sales Rep not found or an error occurred.</p>;

  return (
    <div>
      <h2>Update Tasks for {salesRep.name}</h2>
      <form>
        {tasks.map((task, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                // Handle task completion change
              />
              {task.name}
            </label>
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateTask;
