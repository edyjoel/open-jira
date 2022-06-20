import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
 entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
 entries: [
  {
    _id: uuidv4(),
    description: 'Pendiente: Est et sint nulla ullamco nostrud amet ullamco Lorem ut non dolore.',
    status: 'pending',
    createdAt: Date.now(),
  },
  {
    _id: uuidv4(),
    description: 'En-Progreso: Est et sint nulla ullamco nostrud amet ullamco Lorem ut non dolore.',
    status: 'in-progress',
    createdAt: Date.now() - 100000,
  },
  {
    _id: uuidv4(),
    description: 'Terminada: Est et sint nulla ullamco nostrud amet ullamco Lorem ut non dolore.',
    status: 'finished',
    createdAt: Date.now() - 10000,
  }
 ],
}

export const EntriesProvider:FC<any> = ({children}) => {

 const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

 const addNewEntry = (description: string) => {
  const newEntry: Entry = {
   _id: uuidv4(),
   description,
   status: 'pending',
   createdAt: Date.now(),
  }

  dispatch({
   type: '[Entry] Add-Entry',
   payload: newEntry,
  })
 }

 const updateEntry = (entry: Entry) => {
  dispatch({
   type: '[Entry] Entry-Updated',
   payload: entry,
  })
 }

 return (
  <EntriesContext.Provider value={{
    ...state,
    // Methods
    addNewEntry,
    updateEntry,
  }}>
   {children}
  </EntriesContext.Provider>
 )
}