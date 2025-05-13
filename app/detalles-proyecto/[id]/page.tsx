"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Importa los componentes de Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Asegúrate de que este componente funciona o usa la simulación
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
// Si necesitas Tablas en la pestaña de Miembros, impórtalas:
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// IMPORTANTE: Si Avatar, Separator u otros componentes siguen dando errores de Radix UI, elimínalos y simúlalos

export default function DetalleProyectosPage() {
  const params = useParams<{ proyectoId: string }>();
  const proyectoId = params.proyectoId;

  // Datos de ejemplo para la información del proyecto (reemplazar con datos reales)
  const proyectoInfo = {
    nombre: "Nombre del Proyecto",
    estado: "Activo", // O Pendiente, Completado, etc.
    fechaInicio: "YYYY-MM-DD",
    descripcion: "Descripción del proyecto...",
    metodologia: "SCRUM", // O RUP
    fechaFin: "YYYY-MM-DD",
  };

  // Datos de ejemplo para las tareas (pestaña Fases)
  const tareas = [
    { nombre: "Tarea Ejemplo", campo1: "XXXXXX", campo2: "XXXXXX" },
    // Añade más tareas si es necesario
  ];

  // Clases de Tailwind para simular el botón (si Button de Shadcn UI falla)
  const buttonPrimaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";
  const buttonSecondaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2";


  return (
    <div className="flex flex-col h-screen">
      {/* Barra Superior (similar a las otras páginas) */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
           {/* Icono de Perfil y "Ver Perfil" (Simulado) */}
           <div className="flex items-center mr-4">
             {/* Simulación de Avatar */}
             <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">
               U
             </div>
             <span>VER PERFIL</span>
           </div>
           {/* Icono de Correo (Placeholder) */}
           <span className="mr-auto">
             ✉️
           </span>
          {/* Logo BackFlow */}
          <div className="ml-auto mr-auto">
             <Image src="/backflow-logo.svg" alt="BackFlow Logo" width={100} height={30} />
          </div>
          {/* Icono/Enlace de Salir (Placeholder) */}
          <Link href="/logout" className="ml-auto">
             🚪
          </Link>
        </div>
      </div>

      {/* Enlace Regresar */}
      <div className="p-4 pb-0"> {/* Añade padding para separar de la barra superior */}
         {/* Enlace para regresar a la página de Proyectos */}
        <Link href="/proyectos" className="text-blue-500 hover:underline flex items-center">
          ← Regresar
        </Link>
      </div>


      {/* Contenido Principal de Detalle del Proyecto */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Secciones Superiores (Información y Solicitudes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8"> {/* Grid para las dos columnas */}
          {/* Tarjeta Información Proyecto */}
          <Card>
            <CardHeader>
              <CardTitle>Información Proyecto</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300"> {/* Grid para las parejas de texto */}
              <div>
                <p className="font-semibold">Nombre:</p>
                <p>{proyectoInfo.nombre}</p>
              </div>
              <div>
                <p className="font-semibold">Descripción:</p>
                <p>{proyectoInfo.descripcion}</p>
              </div>
               <div>
                <p className="font-semibold">Estado:</p>
                <p>{proyectoInfo.estado}</p>
              </div>
               <div>
                <p className="font-semibold">Metodología:</p>
                <p>{proyectoInfo.metodologia}</p>
              </div>
               <div>
                <p className="font-semibold">Fecha Inicio:</p>
                <p>{proyectoInfo.fechaInicio}</p>
              </div>
               <div>
                <p className="font-semibold">Fecha Fin:</p>
                <p>{proyectoInfo.fechaFin}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta Solicitudes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> {/* Para alinear título y botón */}
              <CardTitle className="text-2xl font-bold">Solicitudes</CardTitle>
              {/* Botón con signo "+" (usamos Button de Shadcn UI si funciona) */}
               <Button size="icon"> {/* size="icon" hace que el botón sea cuadrado */}
                 +
               </Button>
               {/* Si Button falla, simúlalo: */}
               {/* <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10"> + </button> */}
            </CardHeader>
            <CardContent className="grid gap-4"> {/* Espacio entre los inputs */}
               {/* Input "Solicitud Ejemplo" */}
              <Input placeholder="Solicitud Ejemplo" />
              {/* Otro Input */}
              <Input placeholder="XXXXXX" />
              {/* Puedes añadir más inputs o elementos de solicitud aquí */}
            </CardContent>
          </Card>
        </div>

        {/* Sección Inferior con Pestañas */}
        <Tabs defaultValue="fases"> {/* Pestaña por defecto */}
          <TabsList className="grid w-fit grid-cols-3"> {/* 3 columnas para 3 pestañas */}
            <TabsTrigger value="fases">Fases</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="miembros">Miembros</TabsTrigger>
          </TabsList>
          {/* Simulación de Separador si es necesario */}
           <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="fases">
            {/* Contenido de la pestaña Fases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Grid para las tarjetas/campos de tareas */}
              {tareas.map((tarea, index) => (
                 <Card key={index}>
                    <CardHeader>
                       <CardTitle>{tarea.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2"> {/* Espacio entre los campos de tarea */}
                       <Input placeholder={tarea.campo1} />
                       <Input placeholder={tarea.campo2} />
                    </CardContent>
                 </Card>
              ))}

              {/* Botón Crear asociado a Fases/Tareas? (Colocado aquí para que se vea como en la imagen) */}
              <div className="flex items-end justify-center sm:justify-start"> {/* Alinear el botón al final en pantallas pequeñas */}
                  {/* Usamos el componente Button de Shadcn UI si no da error */}
                   <Button>Crear</Button>
                  {/* Si Button falla, usa este: */}
                  {/* <button className={buttonPrimaryClasses}>Crear</button> */}
               </div>

            </div>
          </TabsContent>

          <TabsContent value="cronograma">
            {/* Contenido de la pestaña Cronograma */}
            <p>Contenido del Cronograma (implementar aquí)</p>
            {/* Podrías usar el componente Calendar si es relevante y permitido */}
          </TabsContent>

          <TabsContent value="miembros">
            {/* Contenido de la pestaña Miembros */}
            <p>Lista de Miembros del Proyecto (implementar aquí)</p>
            {/* Podrías usar el componente Table aquí, similar a la pestaña Miembros en Organizaciones */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}