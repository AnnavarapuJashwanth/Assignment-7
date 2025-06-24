import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConfirmationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container text-center py-5">
      <Confetti numberOfPieces={250} recycle={false} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-success text-white p-5 rounded shadow"
      >
        <h2 className="fw-bold">🎉 Booking Successful!</h2>
        <p className="mt-2">Your ticket has been confirmed.</p>
      </motion.div>
    </div>
  );
};

export default ConfirmationScreen;