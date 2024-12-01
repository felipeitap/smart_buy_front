import { useEffect, useState } from "react";
import { getAllBids, getConfirmedBids } from "../_actions/bid";

export function useBids(id) {
  const [bids, setBids] = useState([]);
  const [loadingBids, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        const bidData = await getConfirmedBids();

        setBids(bidData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllBids = async () => {
      try {
        setLoading(true);
        const bidData = await getAllBids(id);

        setBids(bidData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllBids(id);
    } else {
      fetchBids();
    }
  }, [refreshKey]);

  const refreshBids = () => setRefreshKey((prev) => prev + 1);

  return { bids, loadingBids, error, refreshBids };
}
