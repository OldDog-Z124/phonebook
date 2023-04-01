import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function AlertLine({message, setMessage, setIsAlert}) {

  return (
    <Box sx={{ width: '100%' }}>
      <Alert
        severity={message.type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setMessage({})
              setIsAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message.text}
      </Alert>
    </Box>
  )
}