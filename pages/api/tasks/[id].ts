import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'PATCH') {
    // Marcar como completada
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { completed: true },
    });
    return res.status(200).json(task);
  }
  if (req.method === 'DELETE') {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    return res.status(204).end();
  }
  res.setHeader('Allow', ['PATCH', 'DELETE']);
  res.status(405).end(`Método ${req.method} no permitido`);
} 