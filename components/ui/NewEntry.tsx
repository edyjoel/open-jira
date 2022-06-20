import { Box, Button, TextField } from "@mui/material"
import SaveOutLinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { ChangeEvent, useContext, useState } from "react"
import { EntriesContext } from '../../context/entries';
import { UIContext } from "../../context/ui";

export const NewEntry = () => {

  const {addNewEntry} = useContext(EntriesContext)
  const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)

  // const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if(inputValue.length === 0) return;
    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }


  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>

      {
        isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{marginBottom: 1, marginTop: 2}}
              placeholder="Nueva entrada"
              autoFocus
              multiline
              label="Nueva entrada"
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChanged}
              onBlur={() => setTouched(true)}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant="text"
                onClick={() => setIsAddingEntry(false)}
              >Cancelar</Button>
              <Button
                variant="outlined"
                color = "secondary"
                endIcon = {<SaveOutLinedIcon />}
                onClick={onSave}
              >Guardar</Button>
            </Box>
          </>
        )
        : (
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar tarea
          </Button>
        )
      }
    </Box>
  )
}
