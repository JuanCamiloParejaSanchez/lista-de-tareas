create database listaDeTareasDB;

-- Usar la base de datos
USE listaDeTareasDB;

-- Ver todas las tareas
SELECT * FROM Task;

-- Ver tareas pendientes
SELECT * FROM Task WHERE completed = false;

-- Ver tareas completadas
SELECT * FROM Task WHERE completed = true;