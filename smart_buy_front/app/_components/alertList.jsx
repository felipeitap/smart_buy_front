import { formatDate, handleStatus } from "../_utils";
import AlertCard from "./alertCard";

export default function AlertList({ alerts, handleClick }) {
  return alerts.map((alert, key) => (
    <AlertCard
      title={alert.product_name}
      onClick={() => handleClick(alert.alert_id)}
      key={key}
    >
      <ul>
        <li>Quantidade: {alert.quantity_needed}</li>
        <li>Prazo da negociação: {formatDate(alert.negotiation_deadline)}</li>
        <li className="capitalize">Status: {handleStatus(alert.status)}</li>
      </ul>
    </AlertCard>
  ));
}
