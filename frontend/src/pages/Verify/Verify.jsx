import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log("🌐 Sending verify request to:", `${url}/api/order/verify`);
      console.log("✅ Payload:", { success, orderId });

      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      console.log("✅ Verify response:", response.data);

      if (response.data.success) {
        navigate('/myorders');
      } else {
        console.warn("❌ Verification failed:", response.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error("❌ Error verifying payment:", error.response?.data || error.message);
      alert("Something went wrong. Redirecting to home.");
      navigate('/');
    }
  };

  useEffect(() => {
    console.log("🔄 Verify page loaded");
    console.log("Params → success:", success, "orderId:", orderId);
    console.log("Context url:", url);

    if (success === "true" && orderId && url) {
      verifyPayment();
    } else {
      console.warn("❌ Missing or invalid success/orderId/url");
      navigate('/');
    }
  }, [success, orderId, url]);

  return (
    <div className='verify'>
      <h2>Verifying your payment...</h2>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
