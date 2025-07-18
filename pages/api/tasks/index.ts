import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Listar tareas, pendientes arriba, completadas abajo
    const tasks = await prisma.task.findMany({
      orderBy: [
        { completed: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    return res.status(200).json(tasks);
  }
  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'El título es obligatorio y debe tener al menos 3 caracteres.' });
    }
    const task = await prisma.task.create({
      data: { title },
    });
    return res.status(201).json(task);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Método ${req.method} no permitido`);
} 