import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useAuthContext } from '../../contexts';

interface ILoginProps {
  children: ReactNode;
}

export const Login: FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) return (<>{children}</>);

  return (
    <Box>Não Logado</Box>
  );
};
