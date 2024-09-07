import { useLocation } from 'react-router-dom';

function PaymentSuccess() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

  return (
    <div>PaymentSuccess {sessionId}</div>
  )
}

export default PaymentSuccess