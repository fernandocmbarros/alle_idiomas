import React from 'react';
import { Clock, Target, ArrowUpRight, MessageCircle } from 'lucide-react';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold text-brand-petrol">Olá, {user.name}</h2>
          <p className="text-slate-500 mt-2">Seu painel de fluência está atualizado.</p>
        </div>
        <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Próxima Aula</p>
            <div className="flex items-center space-x-2 text-brand-petrol font-semibold mt-1">
                <Clock size={18} />
                <span>Hoje, 19:00</span>
            </div>
        </div>
      </header>

      {/* Main Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Level */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-petrol/5 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Nível Atual</p>
            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-5xl font-display font-bold text-brand-petrol">{user.level}</span>
              <span className="text-sm text-brand-green font-bold flex items-center bg-brand-green/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={14} className="mr-1" /> Evoluindo
              </span>
            </div>
            <div className="mt-6 w-full bg-slate-100 rounded-full h-2">
              <div className="bg-brand-petrol h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">65% do caminho para B2</p>
          </div>
        </div>

        {/* Card Goal */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
           <div className="relative z-10">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Objetivo Principal</p>
            <div className="mt-3">
              <span className="text-2xl font-display font-bold text-brand-dark flex items-center">
                <Target className="mr-2 text-brand-green" size={24} />
                {user.goal}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">
              Foco atual em vocabulário corporativo e redução de hesitação.
            </p>
           </div>
        </div>

        {/* Card Next Skill */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Foco da Semana</p>
                <div className="mt-3">
                    <span className="text-2xl font-display font-bold text-brand-dark flex items-center">
                        <MessageCircle className="mr-2 text-brand-yellow" size={24} />
                        {user.focusSkill}
                    </span>
                </div>
                 <button className="mt-6 text-sm text-brand-petrol font-bold hover:text-[#0A3A50] transition-colors flex items-center">
                    Ir para exercício recomendado <ArrowUpRight size={14} className="ml-1" />
                </button>
            </div>
        </div>
      </div>

      {/* Teacher Note Area */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-brand-white">
            <h3 className="font-bold text-brand-petrol flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green mr-3"></span>
                Mensagem do Professor
            </h3>
            <span className="text-xs text-slate-400 font-medium uppercase">Há 2 horas</span>
        </div>
        <div className="p-8">
            <div className="flex items-start space-x-6">
                <img src="https://picsum.photos/100/100?random=1" alt="Teacher" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg" />
                <div className="bg-brand-white p-6 rounded-2xl rounded-tl-none text-brand-dark text-base leading-relaxed max-w-3xl border border-slate-100">
                    <p>Olá {user.name.split(' ')[0]}, notei uma grande melhora na sua confiança na última aula! Para a reunião de hoje, preparei um material sobre <strong>interrupções educadas</strong>. Dê uma olhada na Biblioteca antes da nossa chamada.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;