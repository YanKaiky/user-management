import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { useAuthContext } from '../../contexts';

interface ILoginProps {
  children: ReactNode;
}

export const Login: FC<ILoginProps> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, login } = useAuthContext();

  if (isAuthenticated) return (<>{children}</>);

  const encode = Buffer.from(`${email}:${password}`).toString('base64');

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>Login</Typography>

            <form>
              <TextField
                fullWidth
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 3 }}
              />

              <TextField
                fullWidth
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </Box>
        </CardContent>

        <CardActions>
          <Box width='100%' margin={1} display='flex' justifyContent='center' >
            <Button fullWidth variant='contained' onClick={() => login(encode)}>Login</Button>
          </Box>
        </CardActions>
      </Card>
    </Box >
  );
};
