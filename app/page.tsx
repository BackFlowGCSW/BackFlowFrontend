'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRef } from 'react';
import { Users, BookOpen, GitCompare } from 'lucide-react'; 

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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


      <main className="flex-grow">
        <section className="flex flex-col items-center justify-center bg-gray-50 p-8 text-center min-h-[70vh]">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-5xl font-bold text-gray-800">
              Control de proyectos con gestión de cambio
            </h2>
            <p className="text-xl text-gray-600">
              Solución integral para la gestión y seguimiento de proyectos con control de versiones 
              y cambios. Optimiza tu flujo de trabajo y mantén todo tu equipo sincronizado.
            </p>
            
            <div className="pt-8">
              <Button 
                onClick={scrollToFeatures}
                className="bg-[#514F4F] text-white hover:bg-[#3e3d3d] px-8 py-6 text-lg"
              >
                Información
              </Button>
            </div>
          </div>
        </section>

       
        <section 
          ref={featuresRef}
          className="py-16 px-8 bg-white mt-32"
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Características Principales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Rectángulo 1 - Gestión de Equipos */}
              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Users className="w-12 h-12 text-[#514F4F]" />
                  <h4 className="text-xl font-bold text-gray-800">Gestión de Equipos</h4>
                  <p className="text-gray-600">
                    Coordina todos los miembros de tu equipo con asignaciones claras y seguimiento de progreso.
                  </p>
                </div>
              </div>
              
              {/* Rectángulo 2 - Metodologías */}
              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center space-y-4">
                  <BookOpen className="w-12 h-12 text-[#514F4F]" />
                  <h4 className="text-xl font-bold text-gray-800">Soporte Metodológico</h4>
                  <p className="text-gray-600">
                    Compatible con Scrum, RUP y metodologías tradicionales para adaptarse a tus necesidades.
                  </p>
                </div>
              </div>
              
              {/* Rectángulo 3 - Control de Cambios */}
              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center space-y-4">
                  <GitCompare className="w-12 h-12 text-[#514F4F]" />
                  <h4 className="text-xl font-bold text-gray-800">Control de Cambios</h4>
                  <p className="text-gray-600">
                    Registro detallado de versiones con historial completo y comparación de cambios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white text-sm text-gray-500 py-4 px-6 border-t text-left">
        © 2025 BackFlow. Todos los derechos reservados.
      </footer>
    </div>
  );
}