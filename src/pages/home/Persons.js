import Typography from "@mui/material/Typography"
import {List, ListItem, ListItemText} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';

const Persons = ({persons, deletePerson}) => {
  return (
    <>
      <Typography variant='h4' component='h2'
        sx={{ textAlign: 'center', margin: 3,}}
      >
        Number
      </Typography>
      <List>
        {persons.map(person => 
          <ListItem key={person.id}>
            <ListItemText primary={person.name} secondary={person.number} />
            <IconButton 
              edge='end'
              aria-label='delete'
              onClick={() => deletePerson(person.id, person)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        )}
      </List>
    </>
  )
}

export default Persons