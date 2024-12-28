import React, { useState } from 'react';
import { Layout } from 'antd';
import LoginScreen from './LoginScreen';
import ProductionStation from './ProductionStation';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const stationData = {
    stationName: "Ahşap Kesme İstasyonu",
    previousStationCompleted: 0,
    inputProduct: "Ham Ahşap",
    outputProducts: [
      {
        name: "Kesilmiş Ahşap 30x30",
        totalOrderQuantity: 500,
        nextStation: "Ahşap Boyama İstasyonu"
      },
      {
        name: "Kesilmiş Ahşap 40x40",
        totalOrderQuantity: 500,
        nextStation: "Zımpara İstasyonu"
      },
    ],
    currentWorkOrder: "Masa"
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ProductionStation {...stationData} />
      )}
    </Layout>
  );
};

export default App;
