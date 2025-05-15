'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useState, useEffect } from "react";

type Task = {
  title: string;
  description: string;
  date: string;
  progress: number;
};

const mockTasks: Task[] = [
  {
    title: "Diseñar interfaz",
    description: "Diseñar la pantalla principal del usuario",
    date: "2025-05-14",
    progress: 80,
  },
  {
    title: "Crear componente de login",
    description: "Login con validación básica",
    date: "2025-05-13",
    progress: 100,
  },
  {
    title: "Revisar documentación",
    description: "Leer requisitos del proyecto",
    date: "2025-05-12",
    progress: 60,
  },
];

export default function DemoSchedulePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simula fetch de tareas, ordena por fecha ascendente
    const sortedTasks = [...mockTasks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setTasks(sortedTasks);
  }, []);

  return (
    <div className="p-6">
      <Tabs defaultValue="intro" className="w-full max-w-3xl mx-auto">
        <TabsList>
          <TabsTrigger value="intro">Introducción</TabsTrigger>
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
        </TabsList>

        <TabsContent value="intro">
          <Card className="mt-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">Bienvenido</h2>
              <p>
                Esta es una demostración con tabs. Aquí puedes ver un mensaje de introducción. En el siguiente tab encontrarás un cronograma dinámico de tareas ordenadas por fecha.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-4 mt-4">
            {tasks.map((task, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <Badge variant={task.progress === 100 ? "default" : "outline"}>
                      {format(new Date(task.date), "dd MMM yyyy")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <Progress value={task.progress} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
