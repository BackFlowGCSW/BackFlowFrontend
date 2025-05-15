// app/organizaciones/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Organizacion {
  uid: string;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  creado_por: string;
}

export default function OrganizacionesPage() {
  // State dinámico
  const router = useRouter();
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [errorOrgs, setErrorOrgs] = useState<string | null>(null);

  // Estados del modal y formulario de creación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevaOrganizacion, setNuevaOrganizacion] = useState({ nombre: '', descripcion: '' });

  // Datos estáticos (mantén si los necesitas)
  const miembrosEquipo = [ /* ... igual que antes ... */ ];
  const invitacionesPendientes = [ /* ... igual que antes ... */ ];

  // Fetch de organizaciones al montar
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch('http://161.132.45.35:8003/organizaciones/');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Organizacion[] = await res.json();
        setOrganizaciones(data);
      } catch (err: any) {
        setErrorOrgs(err.message);
      } finally {
        setLoadingOrgs(false);
      }
    };
    fetchOrgs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaOrganizacion(prev => ({ ...prev, [name]: value }));
  };

const handleCrearOrganizacion = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Usuario no autenticado");
    return;
  }

  try {
    const response = await fetch("http://161.132.45.35:8003/organizaciones/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // ✅ IMPORTANTE
      },
      body: JSON.stringify({
        nombre: nuevaOrganizacion.nombre,
        descripcion: nuevaOrganizacion.descripcion
        // ❌ NO incluir creado_por
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al crear organización: ${response.status}`);
    }

    const result = await response.json();
    console.log("Organización creada:", result);
    // Puedes recargar la lista aquí si quieres
  } catch (error) {
    console.error(error);
    alert("No se pudo crear la organización.");
  } finally {
    setIsModalOpen(false);
    setNuevaOrganizacion({ nombre: "", descripcion: "" });
  }
};


  return (
    <div className="flex flex-col h-screen">
      {/* Barra superior */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center mr-4">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">U</div>
            <span>VER PERFIL</span>
          </div>
          <span className="mr-auto">✉️</span>
          <div className="ml-auto mr-auto">
            <Image src="/backflow-logo.svg" alt="BackFlow Logo" width={100} height={30} />
          </div>
          <Link href="/logout" className="ml-auto">🚪</Link>
        </div>
      </div>

      {/* Modal de creación */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva organización</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="nombre" className="text-right">Nombre:</label>
              <Input
                id="nombre"
                name="nombre"
                value={nuevaOrganizacion.nombre}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Nombre de la org"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="descripcion" className="text-right">Descripción:</label>
              <Input
                id="descripcion"
                name="descripcion"
                value={nuevaOrganizacion.descripcion}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Descripción breve"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleCrearOrganizacion}>Crear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="organizaciones">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="organizaciones">Organizaciones</TabsTrigger>
            <TabsTrigger value="miembros">Miembros</TabsTrigger>
          </TabsList>
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <TabsContent value="organizaciones">
            {loadingOrgs ? (
              <p>Cargando organizaciones…</p>
            ) : errorOrgs ? (
              <p className="text-red-500">Error: {errorOrgs}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizaciones.map(org => (
                  <div
                    key={org.uid}
                    className="cursor-pointer"
                    onClick={() => router.push(`/proyectos?org=${org.uid}`)}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{org.nombre}</CardTitle>
                        <CardDescription>{org.descripcion}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2 bg-gray-300" />
                      </CardContent>
                    </Card>
                  </div>
                ))}

                {/* Tarjeta para crear organización */}
                <Card className="flex flex-col items-center justify-center p-6">
                  <CardTitle className="text-center mb-4">Crear organización</CardTitle>
                  <Button onClick={() => setIsModalOpen(true)}>Agregar</Button>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="miembros">
            {/* … aquí va tu código de miembros e invitaciones igual que antes … */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
