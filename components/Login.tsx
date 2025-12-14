import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, perform validation here
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-brand-petrol tracking-tight mb-2">Alle<span className="text-brand-green">.</span></h1>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Fluência Real</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-2">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-petrol focus:ring-1 focus:ring-brand-petrol outline-none transition-all bg-slate-50 focus:bg-white"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-2">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-petrol focus:ring-1 focus:ring-brand-petrol outline-none transition-all bg-slate-50 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-petrol text-white font-semibold py-4 rounded-xl hover:bg-[#0A3A50] transition-transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-brand-petrol/20"
          >
            Entrar <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          <a href="#" className="hover:text-brand-petrol transition-colors">Esqueceu a senha?</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-brand-petrol transition-colors">Criar conta</a>
        </div>
      </div>
    </div>
  );
};

export default Login;