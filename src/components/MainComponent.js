import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SalesRepList from './SalesRepList'; // Import the SalesRepList component

const MainComponent = () => {
  const [showSalesRepList, setShowSalesRepList] = useState(false);

  const handleViewSalesRepList = () => {
    setShowSalesRepList(true);
  };

  return (
    <Router>
      <div className="main-container">
        <nav>
          <Link to="/sales-rep-list" onClick={handleViewSalesRepList}>
            View Sales Rep List
          </Link>
        </nav>

        <Switch>
          <Route path="/sales-rep-list">
            <SalesRepList />
          </Route>
          {/* Add other routes as necessary */}
        </Switch>
      </div>
    </Router>
  );
};

export default MainComponent;
