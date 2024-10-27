import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Notification from './Notification'; // Import the Notification component
import './SalesRepHome.css'; // Import the CSS file for styles

const SalesRepHome = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sample tasks for demonstration
    const sampleTasks = [
      {
        _id: '1',
        title: 'Follow up with clients',
        completed: false,
        subTasks: [
          { title: 'Email John Doe', completed: false },
          { title: 'Call Jane Smith', completed: false },
        ],
      },
      {
        _id: '2',
        title: 'Prepare monthly sales report',
        completed: false,
        subTasks: [
          { title: 'Gather sales data', completed: false },
          { title: 'Create presentation slides', completed: false },
        ],
      },
      {
        _id: '3',
        title: 'Attend team meeting',
        completed: false,
        subTasks: [],
      },
    ];

    // Simulate fetching tasks
    setTasks(sampleTasks);
  }, []);

  const handleTaskUpdate = async (taskId, completed, subTaskIndex) => {
    try {
      // Instead of making an API call, simulate a successful update
      const response = { data: { message: 'Work updated successfully in DB' } };

      // Update the local state to reflect the new task status
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id === taskId) {
            if (subTaskIndex !== undefined) {
              task.subTasks[subTaskIndex].completed = completed;
            } else {
              task.completed = completed;
            }
          }
          return task;
        })
      );

      // Set the success message
      setMessage(response.data.message);
      setNotificationVisible(true); // Show the notification

      // Set a timeout for showing the "New tasks will be updated soon" message
      setTimeout(() => {
        setMessage('New tasks will be updated soon');
        setNotificationVisible(true); // Show the notification
      }, 2000); // Show after 2 seconds
    } catch (error) {
      console.error('Failed to update task:', error);
      setMessage('Failed to update work');
      setNotificationVisible(true); // Show notification for failure
    }
  };

  const closeNotification = () => {
    setNotificationVisible(false);
    setMessage(''); // Clear the message when closing
  };

  return (
    <div className="home-container">
      <Sidebar isAdmin={false} />
      <div className="main-content">
        <h2>Sales Rep Home</h2>
        <p>Welcome to your dashboard! Here you can manage your tasks and client details.</p>

        {notificationVisible && (
          <Notification message={message} onClose={closeNotification} />
        )}
        
        <h3>Your Tasks</h3>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Sub-tasks</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskUpdate(task._id, !task.completed)} // Update task status
                    />
                    {task.title}
                  </label>
                </td>
                <td>{task.completed ? 'Completed' : 'Pending'}</td>
                <td>
                  <ul>
                    {task.subTasks.map((subTask, subIndex) => (
                      <li key={subIndex}>
                        <label>
                          <input
                            type="checkbox"
                            checked={subTask.completed}
                            onChange={() =>
                              handleTaskUpdate(task._id, !subTask.completed, subIndex)
                            }
                          />
                          {subTask.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesRepHome;
