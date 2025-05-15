import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Importa los componentes de Shadcn UI que vamos a utilizar
// Intentamos usar Button nuevamente, si da error, tendremos que simularlo.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

// IMPORTANTE: Eliminamos Avatar y Separator si siguen dando errores de Radix UI
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

export default function OrganizacionesPage() {
  // Datos de ejemplo para las organizaciones (mantengamos esto por si volvemos a la vista de organizaciones)
  const organizaciones = [
    { name: "Organización X", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Organización Y", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Organización Z", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Manguito's Devs", description: "Description", avatar: "/placeholder-avatar.jpg" },
  ];

  // Datos de ejemplo para las tablas de Miembros e Invitaciones
  const miembrosEquipo = [
    { miembro: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
    { miembro: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
    { miembro: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
    { miembro: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
  ];

  const invitacionesPendientes = [
    { nombre: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
    { nombre: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
    { nombre: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
    { nombre: "XXXXX", correo: "XXXXX", proyecto: "XXXXX", rol: "XXX", acciones: { check: true, cross: true } },
  ];

  // Clases de Tailwind para simular el botón (si Button de Shadcn UI falla)
  const buttonPrimaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";
   // Clases para el botón "Guardar" (probablemente secundario o similar)
   const buttonSecondaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2";


  return (
    <div className="flex flex-col h-screen">
      {/* Barra Superior */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* Icono de Perfil y "Ver Perfil" */}
          {/* Si Avatar de Shadcn UI sigue dando error, simúlalo */}
           <div className="flex items-center mr-4">
             {/* Simulación de Avatar */}
             <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">
               U {/* Placeholder de inicial */}
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

      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="organizaciones">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="organizaciones">Organizaciones</TabsTrigger>
            <TabsTrigger value="miembros">Miembros</TabsTrigger>
          </TabsList>
          {/* Simulación de Separador si es necesario */}
           <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="organizaciones">
            {/* Contenido de la pestaña Organizaciones (el código anterior) */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {organizaciones.map((org, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{org.name}</CardTitle>
                    <CardDescription>{org.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    {/* Simulación de Avatar */}
                    <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={org.avatar}
                        alt={org.name}
                        width={32}
                        height={32}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {/* Tarjeta para Crear Organización */}
              <Card className="flex flex-col items-center justify-center p-6">
                <CardTitle className="text-center mb-4">Crear organización</CardTitle>
                {/* Usamos el componente Button de Shadcn UI si no da error */}
                <Button>Agregar</Button>
                {/* Si el Button de Shadcn UI da error, usa este: */}
                {/* <button className={buttonPrimaryClasses}>Agregar</button> */}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="miembros">
            {/* Contenido para la pestaña de Miembros */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-grow"> {/* flex-grow para que el input ocupe el espacio disponible */}
                <Input placeholder="Buscar" className="pr-8" /> {/* pr-8 para dejar espacio al botón de borrar */}
                 {/* Botón de borrar búsqueda (simulado con un div/span) */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                  ❌ {/* Placeholder de icono de cerrar */}
                </div>
              </div>

              {/* Botón Agregar (usamos el componente Button de Shadcn UI si no da error) */}
              <Button>Agregar</Button>
               {/* Si el Button de Shadcn UI da error, usa este: */}
               {/* <button className={buttonPrimaryClasses}>Agregar</button> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> {/* Grid para las dos tablas */}
              {/* Tabla de Miembros del Equipo */}
              <Card>
                <CardHeader>
                  <CardTitle>Miembros del Equipo</CardTitle>
                </CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Miembro</TableHead>
                      <TableHead>Correo</TableHead>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {miembrosEquipo.map((miembro, index) => (
                      <TableRow key={index}>
                        <TableCell>{miembro.miembro}</TableCell>
                        <TableCell>{miembro.correo}</TableCell>
                        <TableCell>{miembro.proyecto}</TableCell>
                        <TableCell>{miembro.rol}</TableCell>
                        <TableCell className="flex items-center gap-2">
                           {miembro.acciones.check && <span>✔️</span>} {/* Placeholder de icono de check */}
                           {miembro.acciones.cross && <span>❌</span>} {/* Placeholder de icono de cross */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Tabla de Invitaciones Pendientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Invitaciones Pendientes</CardTitle>
                </CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Correo</TableHead>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invitacionesPendientes.map((invitacion, index) => (
                      <TableRow key={index}>
                        <TableCell>{invitacion.nombre}</TableCell>
                        <TableCell>{invitacion.correo}</TableCell>
                        <TableCell>{invitacion.proyecto}</TableCell>
                        <TableCell>{invitacion.rol}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {invitacion.acciones.check && <span>✔️</span>} {/* Placeholder de icono de check */}
                          {invitacion.acciones.cross && <span>❌</span>} {/* Placeholder de icono de cross */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-center mt-4">
              {/* Usamos el componente Button de Shadcn UI si no da error */}
              <Button>Guardar</Button>
               {/* Si el Button de Shadcn UI da error, usa este: */}
               {/* <button className={buttonPrimaryClasses}>Guardar</button> */}
            </div>

            {/* Enlace Previous */}
            <div className="mt-4 text-center">
              <Link href="#" className="text-blue-500 hover:underline">
                ← Previous
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}