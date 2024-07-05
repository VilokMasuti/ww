
import { Alert } from '@mui/material';

// eslint-disable-next-line react/prop-types
const ErrorAlert = ({ message }) => {
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorAlert;