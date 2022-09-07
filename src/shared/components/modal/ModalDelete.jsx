import { Box, Button, Modal, Typography } from '@mui/material';
import { FC } from 'react';

interface IModalDeleteProps {
  open: boolean;
  label: string,
  onClose: () => void;
  handleDelete: () => void;
}

export const ModalDelete: FC<IModalDeleteProps> = ({ open, label, onClose, handleDelete }) => {
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: 'scroll', paddingTop: '10%', paddingBottom: '10%', display: 'flex', justifyContent: 'center', }}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      }}>
        <Box display='flex' justifyContent='center' padding='3rem' textAlign='center'>
          <Typography id="modal-modal-title" variant="h6" component="h2">{label}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Button variant='outlined' color='primary' onClick={() => onClose()}>Cancelar</Button>
          <Button variant='contained' color='error' onClick={() => handleDelete()}>Deletar</Button>
        </Box>
      </Box>
    </Modal>
  );
};
