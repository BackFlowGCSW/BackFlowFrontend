"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns'; // Para formatear las fechas seleccionadas

// Importa los componentes de Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"; // Importa el componente Calendar
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Importa los componentes del Popover

// Importa el icono de calendario (si usas lucide-react o similar y está permitido)
// import { CalendarIcon } from 'lucide-react';

// IMPORTANTE: Si otros componentes siguen dando errores de Radix UI, elimínalos y simúlalos

export default function ProyectosPage() {
  // Datos de ejemplo para los proyectos (mantengamos esto)
  const proyectos = [
    { name: "Proyecto X", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Proyecto Y", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "Proyecto Z", description: "Description", avatar: "/placeholder-avatar.jpg" },
    { name: "LinkJob", description: "Description", avatar: "/placeholder-avatar.jpg" },
  ];

  const proyectosPendientes: any[] = [];

  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para el paso actual del modal (1 para metodología, 2 para detalles)
  const [currentStep, setCurrentStep] = useState(1);
  // Estado para los campos del formulario del modal
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: undefined as Date | undefined, // Usamos undefined como valor inicial para Date
    fechaTermino: undefined as Date | undefined,
    metodologia: ''
  });
  // Estado para controlar la apertura de los Popovers del calendario
  const [isFechaInicioPopoverOpen, setIsFechaInicioPopoverOpen] = useState(false);
  const [isFechaTerminoPopoverOpen, setIsFechaTerminoPopoverOpen] = useState(false);


  // Función para manejar el cambio en los inputs del modal (solo para nombre y descripción)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoProyecto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar la selección de metodología
  const handleSelectMetodologia = (metodologia: string) => {
    setNuevoProyecto(prevState => ({
      ...prevState,
      metodologia: metodologia
    }));
     // Mover al siguiente paso automáticamente al seleccionar metodología
     setCurrentStep(2);
  };

   // Función para manejar la selección de fecha de inicio
   const handleSelectFechaInicio = (date: Date | undefined) => {
     setNuevoProyecto(prevState => ({
       ...prevState,
       fechaInicio: date
     }));
     setIsFechaInicioPopoverOpen(false); // Cerrar el popover al seleccionar
   };

   // Función para manejar la selección de fecha de termino
   const handleSelectFechaTermino = (date: Date | undefined) => {
     setNuevoProyecto(prevState => ({
       ...prevState,
       fechaTermino: date
     }));
     setIsFechaTerminoPopoverOpen(false); // Cerrar el popover al seleccionar
   };


  // Función para ir al paso anterior del modal
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Función para manejar la creación del proyecto (en el último paso)
  const handleCrearProyecto = () => {
    console.log("Creando proyecto:", nuevoProyecto);
    // Aquí integrarías la lógica para enviar los datos
    // Después de crear, podrías actualizar la lista de proyectos y cerrar el modal
    setIsModalOpen(false); // Cerrar el modal al "crear"
    // Reiniciar el estado del formulario y del paso
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: undefined, fechaTermino: undefined, metodologia: '' });
    setCurrentStep(1);
  };

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1); // Siempre empezar por el primer paso al abrir
    // Opcional: limpiar estado al abrir si no se hace al cerrar
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: undefined, fechaTermino: undefined, metodologia: '' });
  };

  // Función para cerrar el modal y resetear el estado
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: undefined, fechaTermino: undefined, metodologia: '' });
  };

  // Clases de Tailwind para simular el botón si es necesario
  const buttonPrimaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";
  const buttonSecondaryClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2";


  function handleNextStep(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

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

      {/* Componente Dialog para el modal multipaso */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {/* Título del modal que cambia según el paso */}
            <DialogTitle>{currentStep === 1 ? 'Seleccionar metodología' : 'Detalles del Proyecto'}</DialogTitle>
             {/* Puedes añadir una descripción si es necesario */}
          </DialogHeader>

          {/* Contenido del modal que cambia según el paso */}
          <div className="grid gap-4 py-4">
            {currentStep === 1 && (
              <>
                {/* Opciones del Paso 1 (Metodología) */}
                <div className="flex gap-4 justify-center">
                  {/* Opción SCRUM */}
                  <Card
                    className={`cursor-pointer p-6 flex flex-col items-center justify-center ${nuevoProyecto.metodologia === 'SCRUM' ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => handleSelectMetodologia('SCRUM')}
                  >
                    <CardTitle>SCRUM</CardTitle>
                  </Card>
                  {/* Opción RUP */}
                  <Card
                    className={`cursor-pointer p-6 flex flex-col items-center justify-center ${nuevoProyecto.metodologia === 'RUP' ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => handleSelectMetodologia('RUP')}
                  >
                    <CardTitle>RUP</CardTitle>
                  </Card>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Campos del Paso 2 (Detalles del Proyecto) */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="nombre" className="text-right">Nombre:</label>
                  <Input id="nombre" name="nombre" value={nuevoProyecto.nombre} onChange={handleInputChange} className="col-span-3" placeholder="XXXXXX" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="descripcion" className="text-right">Descripción:</label>
                  <Input id="descripcion" name="descripcion" value={nuevoProyecto.descripcion} onChange={handleInputChange} className="col-span-3" placeholder="XXXXXX" />
                </div>

                {/* Campo Fecha inicio con Calendar */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="fechaInicio" className="text-right">Fecha inicio:</label>
                  <Popover open={isFechaInicioPopoverOpen} onOpenChange={setIsFechaInicioPopoverOpen}>
                    <PopoverTrigger asChild>
                       {/* Usamos un Button con apariencia de Input */}
                      <Button
                        variant={"outline"}
                        className={`w-[280px] justify-start text-left font-normal ${!nuevoProyecto.fechaInicio && "text-muted-foreground"}`} // Ajustar ancho si es necesario
                      >
                        {/* Icono de calendario (si está permitido) */}
                         {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                         🗓️ {/* Placeholder de icono */}
                        {nuevoProyecto.fechaInicio ? format(nuevoProyecto.fechaInicio, "PPP") : <span>Seleccionar fecha</span>} {/* Formatear la fecha */}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={nuevoProyecto.fechaInicio}
                        onSelect={handleSelectFechaInicio}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Campo Fecha termino con Calendar */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="fechaTermino" className="text-right">Fecha termino:</label>
                  <Popover open={isFechaTerminoPopoverOpen} onOpenChange={setIsFechaTerminoPopoverOpen}>
                    <PopoverTrigger asChild>
                       {/* Usamos un Button con apariencia de Input */}
                      <Button
                        variant={"outline"}
                        className={`w-[280px] justify-start text-left font-normal ${!nuevoProyecto.fechaTermino && "text-muted-foreground"}`} // Ajustar ancho si es necesario
                      >
                         {/* Icono de calendario (si está permitido) */}
                         {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                         🗓️ {/* Placeholder de icono */}
                        {nuevoProyecto.fechaTermino ? format(nuevoProyecto.fechaTermino, "PPP") : <span>Seleccionar fecha</span>} {/* Formatear la fecha */}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={nuevoProyecto.fechaTermino}
                        onSelect={handleSelectFechaTermino}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            {/* Botón Cancelar */}
             <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>

            {/* Botones de navegación/creación */}
            {currentStep === 1 && (
              // Botón Siguiente en el Paso 1 (deshabilitado si no se ha seleccionado metodología)
               <Button onClick={handleNextStep} disabled={!nuevoProyecto.metodologia}>Siguiente</Button>
            )}
            {currentStep === 2 && (
              <>
                 {/* Botón Anterior en el Paso 2 */}
                 <Button variant="outline" onClick={handlePreviousStep}>Anterior</Button>

                 {/* Botón Crear en el Paso 2 (deshabilitado si faltan campos obligatorios) */}
                 {/* Define tu lógica de validación aquí */}
                 <Button onClick={handleCrearProyecto} disabled={!nuevoProyecto.nombre || !nuevoProyecto.descripcion || !nuevoProyecto.fechaInicio || !nuevoProyecto.fechaTermino}>Crear</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Contenido Principal (sin cambios) */}
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
                <Card key={index}>
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
              ))}

              {/* Tarjeta para Agregar Proyecto (el botón abre el modal) */}
              <Card className="flex flex-col items-center justify-center p-6">
                <CardTitle className="text-center mb-4">Agregar Proyecto</CardTitle>
                {/* Botón "Agregar" que abre el modal manualmente */}
                 <Button onClick={handleOpenModal}>Agregar</Button>
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
          <Link href="/organizaciones" className="text-blue-500 hover:underline flex items-center justify-center">
            ← Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}