import { GetServerSideProps } from 'next'
import {capitalize, Grid, CardHeader, Card, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Layout } from "../../components/layouts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Entry, EntryStatus } from '../../interfaces';
import { FC, useContext, useMemo, useState } from 'react';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry,
}

const EntryPage:FC<Props>= ({entry}) => {
  const router = useRouter()
  const {updateEntry, deleteEntry} = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if(inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    }

    updateEntry(updatedEntry, true)
  }

  const onDelete = () => {
    deleteEntry(entry._id, true)
  }

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
      <Grid
        container
        justifyContent="center"
        sx={{marginTop: 2}}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada:`} subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`} />
            <CardContent>
              <TextField
                sx={{marginTop: 2, marginBottom: 2}}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                value={inputValue}
                onChange={onInputValueChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              {/* Radio */}
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {validStatus.map(status => (
                    <FormControlLabel
                      label={capitalize(status)}
                      key={status}
                      value={status}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >Save</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Button sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.main'
      }}
      onClick={onDelete}
      >
        <DeleteOutlinedIcon />
      </Button>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {id} = ctx.params as {id: string}

  const entry = await dbEntries.getEntryById(id)

  if(!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      entry
    }
  }
}

export default EntryPage