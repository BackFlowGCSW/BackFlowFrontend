"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Importa los componentes de Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Asegúrate de que este componente funciona o usa la simulación
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Importa los componentes del Dialog (sin DialogTrigger)

// IMPORTANTE: Si Avatar, Separator u otros componentes siguen dando errores de Radix UI, elimínalos y simúlalos

export default function OrganizacionesPage() {
  // Datos de ejemplo (mantengamos esto)
  const organizaciones = [
    { name: "Organización X", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Organización Y", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Organización Z", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Manguito's Devs", description: "Description", avatar: "/placeholder-avatar.jpg" },
  ];

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

  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para los campos del formulario del modal
  const [nuevaOrganizacion, setNuevaOrganizacion] = useState({ nombre: '', descripcion: '' });

  // Función para manejar el cambio en los inputs del modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevaOrganizacion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar la creación de la organización (simulada)
  const handleCrearOrganizacion = () => {
    console.log("Creando organización:", nuevaOrganizacion);
    // Aquí integrarías la lógica para enviar los datos (por ejemplo, a una API)
    // Después de crear, podrías actualizar la lista de organizaciones y cerrar el modal
    setIsModalOpen(false); // Cerrar el modal al "crear"
    setNuevaOrganizacion({ nombre: '', descripcion: '' }); // Limpiar el formulario
  };

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Clases de Tailwind para simular el botón si es necesario
  const buttonPrimaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";
  const buttonSecondaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2";


  return (
    <div className="flex flex-col h-screen">
      {/* Barra Superior (sin cambios) */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
           <div className="flex items-center mr-4">
             <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">
               U
             </div>
             <span>VER PERFIL</span>
           </div>
           <span className="mr-auto">
             ✉️
           </span>
          <div className="ml-auto mr-auto">
             <Image src="/backflow-logo.svg" alt="BackFlow Logo" width={100} height={30} />
          </div>
          <Link href="/logout" className="ml-auto">
             🚪
          </Link>
        </div>
      </div>

      {/* Componente Dialog para el modal (permanece fuera de las Tabs) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva organización</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="nombre" className="text-right">
                Nombre:
              </label>
              <Input
                id="nombre"
                name="nombre"
                value={nuevaOrganizacion.nombre}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="XXXXXX"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="descripcion" className="text-right">
                Descripción:
              </label>
              <Input
                 id="descripcion"
                 name="descripcion"
                 value={nuevaOrganizacion.descripcion}
                 onChange={handleInputChange}
                 className="col-span-3"
                 placeholder="XXXXXX"
              />
            </div>
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
             <Button onClick={handleCrearOrganizacion}>Crear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="organizaciones">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="organizaciones">Organizaciones</TabsTrigger>
            <TabsTrigger value="miembros">Miembros</TabsTrigger>
          </TabsList>
           <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="organizaciones">
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
                {/* Botón "Agregar" que abre el modal manualmente */}
                {/* Usamos el componente Button de Shadcn UI si no da error */}
                <Button onClick={handleOpenModal}>Agregar</Button>
                 {/* Si el Button de Shadcn UI da error, usa este: */}
                 {/* <button className={buttonPrimaryClasses} onClick={handleOpenModal}>Agregar</button> */}
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="miembros">
            {/* Contenido de la pestaña Miembros (sin cambios mayores) */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-grow">
                <Input placeholder="Buscar" className="pr-8" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                  ❌
                </div>
              </div>
              <Button>Agregar</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                           {miembro.acciones.check && <span>✔️</span>}
                           {miembro.acciones.cross && <span>❌</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
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
                          {invitacion.acciones.check && <span>✔️</span>}
                          {invitacion.acciones.cross && <span>❌</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
            <div className="flex justify-center mt-4">
               <Button>Guardar</Button>
            </div>
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