import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import React, { useEffect, useState } from 'react';
const Dashboard = () => {
  const [loggedInEmail, setLoggedInEmail] = useState('');
  useEffect(() => {
    // Récupérer l'e-mail depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
      // Stocker l'e-mail dans localStorage
      localStorage.setItem('loggedInEmail', email);
    }
  }, []);
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;