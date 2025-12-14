import React from 'react';
import { User, SubscriptionType } from '../types';
import { CreditCard, User as UserIcon, Shield, Bell } from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-display font-bold text-brand-petrol">Configurações</h2>
        <p className="text-slate-500 mt-2">Gerencie seus dados e assinatura.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-display font-semibold text-brand-dark mb-6 flex items-center gap-2">
                    <UserIcon size={20} className="text-brand-green" /> Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Nome Completo</label>
                        <input type="text" value={user.name} disabled className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">E-mail</label>
                        <input type="email" value={user.email} disabled className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700" />
                    </div>
                </div>
            </section>

             <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-display font-semibold text-brand-dark mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-brand-yellow" /> Preferências
                </h3>
                <div className="space-y-4">
                     <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-brand-petrol rounded focus:ring-brand-green" />
                        <span className="text-slate-700">Receber lembretes de aula por e-mail</span>
                     </label>
                     <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-brand-petrol rounded focus:ring-brand-green" />
                        <span className="text-slate-700">Receber feedback diário do professor</span>
                     </label>
                </div>
            </section>
        </div>

        {/* Subscription Card */}
        <div className="md:col-span-1">
             <section className="bg-brand-petrol text-white rounded-2xl p-8 shadow-lg relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="text-brand-green" size={24} />
                        <h3 className="text-xl font-display font-semibold">Assinatura</h3>
                    </div>

                    <div className="mb-8">
                        <p className="text-brand-green text-sm font-bold uppercase tracking-wider mb-1">Plano Atual</p>
                        <h2 className="text-3xl font-bold">{user.subscription}</h2>
                        <p className="text-slate-300 text-sm mt-2">
                            {user.subscription === SubscriptionType.VIP ? 'Acesso ilimitado a mentoria individual.' : 
                             user.subscription === SubscriptionType.TURMA ? 'Aulas em grupo e plataforma completa.' : 
                             'Conteúdo gratuito limitado.'}
                        </p>
                    </div>

                    <div className="mt-auto space-y-3">
                        <button className="w-full py-3 px-4 bg-brand-yellow text-brand-petrol font-bold rounded-xl hover:bg-yellow-300 transition-colors">
                            Gerenciar Plano
                        </button>
                        <button className="w-full py-3 px-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                            <CreditCard size={18} /> Histórico
                        </button>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;