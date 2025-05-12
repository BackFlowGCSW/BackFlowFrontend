'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">BackFlow</h1>
        </div>
        
        <div className="flex space-x-4">
          <Link href="/login?tab=login" passHref>
            <Button variant="outline" className="border-[#514F4F] text-[#514F4F] hover:bg-[#514F4F] hover:text-white">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/login?tab=register" passHref>
            <Button className="bg-[#514F4F] text-white hover:bg-[#3e3d3d]">
              Registrarse
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-5xl font-bold text-gray-800">
            Control de proyectos con gestión de cambio
          </h2>
          <p className="text-xl text-gray-600">
            Solución integral para la gestión y seguimiento de proyectos con control de versiones 
            y cambios. Optimiza tu flujo de trabajo y mantén todo tu equipo sincronizado.
          </p>
          
          <div className="pt-8">
            <Link href="/login?tab=register" passHref>
              <Button className="bg-[#514F4F] text-white hover:bg-[#3e3d3d] px-8 py-6 text-lg">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-white text-sm text-gray-500 py-4 px-6 border-t text-left">
        © 2025 BackFlow. Todos los derechos reservados.
      </footer>
    </div>
  );
}