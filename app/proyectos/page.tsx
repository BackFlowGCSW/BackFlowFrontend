"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Importa Link para la redirección

// Importa los componentes de Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Asegúrate de que este componente funciona o usa la simulación
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Importa los componentes del Dialog (si necesitas el modal de agregar proyecto)

// IMPORTANTE: Si Avatar, Separator u otros componentes siguen dando errores de Radix UI, elimínalos y simúlalos

export default function ProyectosPage() {
  // Datos de ejemplo para los proyectos
  // *** Asegúrate de que cada proyecto tenga una propiedad 'id' única ***
  const proyectos = [
    { id: 'proyecto-x', name: "Proyecto X", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { id: 'proyecto-y', name: "Proyecto Y", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { id: 'proyecto-z', name: "Proyecto Z", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { id: 'linkjob', name: "LinkJob", description: "Description", avatar: "/placeholder-avatar.jpg" },
  ];

  const proyectosPendientes: any[] = []; // Datos de ejemplo para proyectos pendientes

  // *** Estado y funciones para el modal de agregar proyecto (si lo mantienes) ***
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaTermino: '',
    metodologia: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoProyecto(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectMetodologia = (metodologia: string) => {
    setNuevoProyecto(prevState => ({ ...prevState, metodologia: metodologia }));
  };

  const handleNextStep = () => { setCurrentStep(currentStep + 1); };
  const handlePreviousStep = () => { setCurrentStep(currentStep - 1); };

  const handleCrearProyecto = () => {
    console.log("Creando proyecto:", nuevoProyecto);
    setIsModalOpen(false);
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', metodologia: '' });
    setCurrentStep(1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: '', fechaTermino: '', metodologia: '' });
  };
   // *** Fin del estado y funciones del modal ***


  // Clases de Tailwind para simular el botón si es necesario
  const buttonPrimaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";


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

      {/* **MODAL DE AGREGAR PROYECTO (si lo mantienes)** */}
       <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentStep === 1 ? 'Crear nuevo proyecto' : 'Seleccionar metodología'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="nombre" className="text-right">Nombre:</label>
                  <Input id="nombre" name="nombre" value={nuevoProyecto.nombre} onChange={handleInputChange} className="col-span-3" placeholder="XXXXXX" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="descripcion" className="text-right">Descripción:</label>
                  <Input id="descripcion" name="descripcion" value={nuevoProyecto.descripcion} onChange={handleInputChange} className="col-span-3" placeholder="XXXXXX" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="fechaInicio" className="text-right">Fecha inicio:</label>
                  <Input id="fechaInicio" name="fechaInicio" value={nuevoProyecto.fechaInicio} onChange={handleInputChange} className="col-span-3" placeholder="XXXXXX" type="text" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="fechaTermino" className="text-right">Fecha termino:</label>
                  <Input id="fechaTermino" name="fechaTermino" value={nuevoProyecto.fechaTermino} onChange={handleInputChange} className="col-span-3" placeholder="XXXXXX" type="text" />
                </div>
              </>
            )}
            {currentStep === 2 && (
              <div className="flex gap-4 justify-center">
                <Card
                  className={`cursor-pointer p-6 flex flex-col items-center justify-center ${nuevoProyecto.metodologia === 'SCRUM' ? 'border-blue-500 border-2' : ''}`}
                  onClick={() => handleSelectMetodologia('SCRUM')}
                >
                  <CardTitle>SCRUM</CardTitle>
                </Card>
                <Card
                  className={`cursor-pointer p-6 flex flex-col items-center justify-center ${nuevoProyecto.metodologia === 'RUP' ? 'border-blue-500 border-2' : ''}`}
                  onClick={() => handleSelectMetodologia('RUP')}
                >
                  <CardTitle>RUP</CardTitle>
                </Card>
              </div>
            )}
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
            {currentStep === 1 && (
               <Button onClick={handleNextStep}>Siguiente</Button>
            )}
            {currentStep === 2 && (
              <>
                 <Button variant="outline" onClick={handlePreviousStep}>Anterior</Button>
                 <Button onClick={handleCrearProyecto} disabled={!nuevoProyecto.metodologia}>Crear</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* **FIN DEL MODAL DE AGREGAR PROYECTO** */}


      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="proyectos">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          </TabsList>
           <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="proyectos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {proyectos.map((proyecto, index) => (
                // *** ENVUELVE LA CARD CON LINK Y USA EL ID DEL PROYECTO ***
                <Link key={proyecto.id} href={`/detalles-proyecto/${proyecto.id}`}>
                  {/* Añade cursor-pointer y un efecto visual al hacer hover */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{proyecto.name}</CardTitle>
                      <CardDescription>{proyecto.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      {/* Simulación de Avatar */}
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={proyecto.avatar}
                          alt={proyecto.name}
                          width={32}
                          height={32}
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                // *** FIN DE LA ENVOLTURA CON LINK ***
              ))}

              {/* Tarjeta para Agregar Proyecto (el botón abre el modal) */}
              <Card className="flex flex-col items-center justify-center p-6">
                <CardTitle className="text-center mb-4">Agregar Proyecto</CardTitle>
                {/* Botón "Agregar" que abre el modal manualmente */}
                 <Button onClick={handleOpenModal}>Agregar</Button>
                 {/* Si el Button de Shadcn UI da error, usa este: */}
                 {/* <button className={buttonPrimaryClasses} onClick={handleOpenModal}>Agregar</button> */}
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="pendientes">
            {proyectosPendientes.length > 0 ? (
              <p>Lista de proyectos pendientes (implementar aquí)</p>
            ) : (
              <p>No hay proyectos pendientes.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Enlace Regresar */}
        <div className="mt-8 text-center">
           {/* Enlace para regresar a la página anterior (podría ser la página de organizaciones) */}
          <Link href="/organizaciones" className="text-blue-500 hover:underline flex items-center justify-center">
            ← Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}