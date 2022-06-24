
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData:SeedData = {
  entries: [
    {
      description: 'Pendiente: Est et sint nulla ullamco nostrud amet ullamco Lorem ut non dolore.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En-Progreso: Est et sint nulla ullamco nostrud amet ullamco Lorem ut non dolore.',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      description: 'Terminada: Est et sint nulla ullamco nostrud amet ullamco Lorem ut non dolore.',
      status: 'finished',
      createdAt: Date.now() - 10000,
    }
  ]
}