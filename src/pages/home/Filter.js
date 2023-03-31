import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

const Filter = ({ value, handleChange }) => {
  return (
    <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
      }}
    >
      <TextField
        size='small'
        label='Filer Word'
        value={value}
        onChange={handleChange} />
    </Box>
  )
}

export default Filter