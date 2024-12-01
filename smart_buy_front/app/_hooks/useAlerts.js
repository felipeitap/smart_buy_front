import { useEffect, useState } from "react";
import { getAlert, getAlerts } from "../_actions/alerts";

export function useAlerts(id) {
  const [alerts, setAlerts] = useState([]);
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const alertsData = await getAlerts();

        setAlerts(alertsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAlert = async () => {
      try {
        setLoading(true);
        const alertData = await getAlert(id);

        setAlert(alertData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlert();
    } else {
      fetchAlerts();
    }
  }, [refreshKey]);

  const refreshAlerts = () => setRefreshKey((prev) => prev + 1);

  return { alerts, alert, loading, error, refreshAlerts };
}
