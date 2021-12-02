import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import AuthContext from '../../Helpers/Auth';

const Alerts = () => {
  const context = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getAlerts();
  }, []);

  const getAlerts = async () => {
    const data = await context.useAuthorizedGet('/report/list');
    if (data.state === 'SUCCESS') {
      setAlerts(data.content);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getAlerts}
        />}>
      <Text>This is our alert page</Text>
      {
        alerts.length > 0 && alerts.map((alert, index) => (<Text key={index}>{alert.latitude}</Text>))
      }
    </ScrollView>
  );
};

export default Alerts;