import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'PATCH') {
    try {
      const { title, completed } = req.body;
      
      // Validar que al menos un campo se esté actualizando
      if (title === undefined && completed === undefined) {
        return res.status(400).json({ error: 'Se debe proporcionar al menos un campo para actualizar' });
      }

      // Validar el título si se está actualizando
      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({ error: 'El título no puede estar vacío' });
        }
        if (title.length < 3) {
          return res.status(400).json({ error: 'El título debe tener al menos 3 caracteres' });
        }
      }

      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (completed !== undefined) updateData.completed = completed;

      const task = await prisma.task.update({
        where: { id: Number(id) },
        data: updateData,
      });
      
      return res.status(200).json(task);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  res.setHeader('Allow', ['PATCH', 'DELETE']);
  res.status(405).end(`Método ${req.method} no permitido`);
} 