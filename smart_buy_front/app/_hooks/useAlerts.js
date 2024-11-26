import { useEffect, useState } from "react";
import { getAlerts } from "../_actions/alerts";

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const productData = await getAlerts();

        setAlerts(productData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [refreshKey]);

  const refreshAlerts = () => setRefreshKey((prev) => prev + 1);

  return { alerts, loading, error, refreshAlerts };
}
