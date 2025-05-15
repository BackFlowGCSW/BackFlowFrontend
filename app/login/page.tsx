'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoginForm } from "./components/LoginForm";
import { jwtDecode } from 'jwt-decode';


export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    searchParams.get('tab') === 'register' ? 'register' : 'login'
  );

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'register') {
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/usuarios/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, correo, password }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.detail || data.mensaje || 'Error desconocido');

        alert(data.mensaje);
        setNombre('');
        setCorreo('');
        setPassword('');
        setConfirmPassword('');
        setActiveTab('login');
      } catch (err: any) {
        alert('Error de registro: ' + err.message);
      }

    } else {
      try {
        const form = new URLSearchParams();
        form.append('username', correo);
        form.append('password', password);

        const res = await fetch('http://localhost:8000/usuarios/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString(),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Credenciales inválidas');

        // Guardar token
        localStorage.setItem('token', data.access_token);

        // Decodificar token y guardar UID
        const decoded: any = jwtDecode(data.access_token);
        console.log("Usuario autenticado:", decoded);
        localStorage.setItem('usuario_uid', decoded.uid || decoded.sub);

        alert('¡Login exitoso!');
        router.push('/organizaciones');
      } catch (err: any) {
        alert('Error de login: ' + err.message);
      }
    }
  };

  const leftCol = { width: '1000px', height: '700px', marginLeft: '5%' };
  const rightCol = { width: '900px', height: '700px', marginRight: '5%', overlap: '100px' };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="relative w-full" style={{ minHeight: '600px' }}>
        <div className="absolute" style={{ ...leftCol, zIndex: 10 }}>
          <Card className={`border-none shadow-lg h-full flex flex-col ${activeTab === 'login' ? 'bg-[#D9D9D9]' : 'bg-[#A7A3A3]'}`}>
            <CardContent className="flex-grow flex items-center justify-center">
              <div style={{ width: '100%', maxWidth: '640px', paddingRight: '160px' }} className="space-y-4 px-8">
                <CardHeader>
                  <CardTitle className="text-center text-black text-3xl">
                    {activeTab === 'login' ? 'Iniciar Sesión' : 'Registro'}
                  </CardTitle>
                </CardHeader>

                <LoginForm
                  onSubmit={handleSubmit}
                  isRegister={activeTab === 'register'}
                  nombre={nombre}
                  onNombreChange={setNombre}
                  correoValue={correo}
                  onCorreoChange={setCorreo}
                  password={password}
                  onPasswordChange={setPassword}
                  confirmPassword={confirmPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          className="absolute hidden md:block"
          style={{
            width: rightCol.width,
            height: rightCol.height,
            right: rightCol.marginRight,
            marginLeft: `-${rightCol.overlap}`,
            zIndex: 20
          }}
        >
          <div className={`h-full flex flex-col justify-center items-center p-8 shadow-lg rounded-3xl ${activeTab === 'login' ? 'bg-[#A7A3A3]' : 'bg-[#D9D9D9]'}`}>
            {activeTab === 'login' ? (
              <>
                <h2 className="text-2xl font-bold text-black">Empieza a gestionar tus proyectos</h2>
                <p className="text-black">¿No tienes cuenta?</p>
                <Button onClick={() => setActiveTab('register')} className="mt-4 bg-[#514F4F] text-white hover:bg-[#3e3d3d]">
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">Inicia Sesión</h2>
                <p className="text-gray-600">¿Ya tienes una cuenta?</p>
                <Button onClick={() => setActiveTab('login')} className="mt-4 bg-[#514F4F] text-white hover:bg-[#3e3d3d]">
                  Iniciar Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
