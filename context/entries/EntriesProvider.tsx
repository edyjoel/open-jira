import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import {useSnackbar} from 'notistack';
import { useRouter } from 'next/router';
export interface EntriesState {
 entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
 entries: [],
}

export const EntriesProvider:FC<any> = ({children}) => {
  const router = useRouter()
 const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

 const {enqueueSnackbar} = useSnackbar()

 const addNewEntry = async (description: string) => {
  // const newEntry: Entry = {
  //  _id: uuidv4(),
  //  description,
  //  status: 'pending',
  //  createdAt: Date.now(),
  // }
  const {data} = await entriesApi.post<Entry>('/entries', {description})

  dispatch({
   type: '[Entry] Add-Entry',
   payload: data,
  })
 }

 const updateEntry = async ({_id, description, status}: Entry, showSnackbar = false) => {

  try {

    const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})

    dispatch({
     type: '[Entry] Entry-Updated',
     payload: data,
    })
    if(showSnackbar) {
      enqueueSnackbar('Entrada actualizada', {variant: 'success', autoHideDuration: 1500, anchorOrigin: {vertical: 'top', horizontal: 'right'}})
    }
  } catch (error) {
    console.log(error)
  }

 }

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete(`/entries/${_id}`)
      dispatch({
       type: '[Entry] Entry-Deleted',
       payload: _id,
      })
      enqueueSnackbar('Entrada eliminada', {variant: 'success', autoHideDuration: 1500, anchorOrigin: {vertical: 'top', horizontal: 'right'}})
      router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

 const refreshEntries = async () => {
  const {data} = await entriesApi.get<Entry[]>('/entries')
  dispatch({type: '[Entry] Refresh-Data', payload: data})
 }

 useEffect(() => {
   refreshEntries()
 }, [])

 return (
  <EntriesContext.Provider value={{
    ...state,
    // Methods
    addNewEntry,
    updateEntry,
    deleteEntry,
  }}>
   {children}
  </EntriesContext.Provider>
 )
}