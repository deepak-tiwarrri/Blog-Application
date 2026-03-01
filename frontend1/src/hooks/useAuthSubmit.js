/**
 * Custom Hook: useAuthSubmit
 * Consolidates authentication submit logic (login/signup)
 * Eliminates code duplication between Login and Signup components
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '@/store';
import { handleAuthToasts, showSuccessToast } from '@/utils/toast';

export const useAuthSubmit = (type = 'login') => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const input = useSelector((state) => state.auth?.input);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  // Handle toast notifications on status change
  useEffect(() => {
    handleAuthToasts(type, status, error);
  }, [status, error, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(sendRequest({ type, input }));
    
    if (result.meta.requestStatus === 'fulfilled') {
      const message = type === 'signup' ? 'Signup successful!' : 'Login successful!';
      showSuccessToast(message);
      
      // Delay navigation to allow toast to be seen
      setTimeout(() => {
        navigate('/blogs');
      }, 1500);
    }
  };

  return { handleSubmit, status, error };
};

/**
 * Hook to redirect if already logged in
 */
export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/blogs', { replace: true });
    }
  }, [isLoggedIn, navigate]);
};
