import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

const PersonForm = ({ name, handleNameChange, number, handleNumberChange, onSubmit }) => {
  return (
    <>
      <Typography variant='h4' component='h2' 
        sx={{ textAlign: 'center', margin: 3,}}
      >
        Add a new person
      </Typography>
      
        <form onSubmit={onSubmit}>
          <Stack
            direction='row'
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={2}>
              <TextField
                size='small'
                label='Name'
                value={name}
                onChange={handleNameChange}
                required />
              <TextField
                size='small'
                label='Number'
                value={number}
                onChange={handleNumberChange}
                required />
            </Stack>
            <Button variant='contained' type='submit'>Add</Button>
          </Stack>
        </form>
    </>
  )
}

export default PersonForm