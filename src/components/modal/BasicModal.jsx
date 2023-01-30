import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function BasicModal({isOpen,setIsOpen,children}) {



  return (
    <div>
     
      <Modal
        open={isOpen}
        onClose={setIsOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{height:'350px',boxShadow:24,p:5,width:'350px',border:'2px solid #000',bgcolor:'background.paper',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
        {children}
        </Box>
      </Modal>
    </div>
  );
}