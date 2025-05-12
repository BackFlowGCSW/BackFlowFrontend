'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Configuración de estilos para las columnas
  const leftColumnStyle = {
    width: '800px',
    height: '600px',
    marginLeft: '5%',
  };

  const rightColumnStyle = {
    width: '700px',
    height: '600px',
    marginRight: '5%',
    overlap: '150px'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'register' && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log(activeTab === 'login' ? 'Iniciando sesión...' : 'Registrando...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="relative w-full" style={{ minHeight: '600px' }}>

        {/* Columna izquierda - Formulario */}
        <div 
          className="absolute"
          style={{
            width: leftColumnStyle.width,
            height: leftColumnStyle.height,
            left: leftColumnStyle.marginLeft,
            zIndex: 10
          }}
        >
          <Card className={`border-none shadow-lg h-full flex flex-col ${
            activeTab === 'login' ? 'bg-[#D9D9D9]' : 'bg-[#A7A3A3]'
          }`}>
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
                  password={password}
                  confirmPassword={confirmPassword}
                  onPasswordChange={setPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha - Alternar entre login/register */}
        <div 
          className="absolute hidden md:block"
          style={{
            width: rightColumnStyle.width,
            height: rightColumnStyle.height,
            right: rightColumnStyle.marginRight,
            marginLeft: `-${rightColumnStyle.overlap}`,
            zIndex: 20
          }}
        >
          <div className={`h-full flex flex-col justify-center items-center p-8 shadow-lg rounded-3xl ${
            activeTab === 'login' ? 'bg-[#A7A3A3]' : 'bg-[#D9D9D9]'
          }`}>
            <div className="text-center space-y-4 w-full">
              {activeTab === 'login' ? (
                <>
                  <h2 className="text-2xl font-bold text-black">Empieza a gestionar tus proyectos</h2>
                  <p className="text-black">¿No tienes cuenta?</p>
                  <Button 
                    onClick={() => setActiveTab('register')}
                    className="mt-4 bg-[#514F4F] text-white hover:bg-[#3e3d3d]"
                  >
                    Registrarse
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">Inicia Sesión</h2>
                  <p className="text-gray-600">¿Ya tienes una cuenta?</p>
                  <Button 
                    onClick={() => setActiveTab('login')}
                    className="mt-4 bg-[#514F4F] text-white hover:bg-[#3e3d3d]"
                  >
                    Iniciar Sesión
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;