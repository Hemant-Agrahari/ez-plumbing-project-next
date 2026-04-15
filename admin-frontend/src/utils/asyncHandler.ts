import { toast } from "react-toastify";

export const asyncHandler = (fn: Function) => async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('An error occurred');
    }
  };