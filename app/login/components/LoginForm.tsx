'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isRegister?: boolean;
  password?: string;
  confirmPassword?: string;
  onPasswordChange?: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
}

export function LoginForm({
  onSubmit,
  isRegister = false,
  password = '',
  confirmPassword = '',
  onPasswordChange = () => {},
  onConfirmPasswordChange = () => {}
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input 
        placeholder="Usuario" 
        type="text" 
        className="border-gray-300 bg-[#D9D9D9]"
      />
      
      {isRegister && (
        <Input 
          placeholder="Correo electrónico" 
          type="email" 
          className="border-gray-300 bg-[#D9D9D9]"
        />
      )}

      <Input 
        placeholder="Contraseña" 
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="border-gray-300 bg-[#D9D9D9]"
      />

      {isRegister && (
        <Input 
          placeholder="Confirma Contraseña" 
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className={`${password !== confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-[#D9D9D9]`}
        />
      )}

      <Button 
        type="submit" 
        className="w-full bg-[#514F4F] text-white hover:bg-[#3e3d3d]"
      >
        {isRegister ? 'Registrarse' : 'Ingresar'}
      </Button>
    </form>
  );
}