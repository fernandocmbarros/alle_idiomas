import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { User } from '../types';
import { ChevronDown, Calendar, Sparkles, Mic, PenTool, Headphones, BookOpen } from 'lucide-react';

// Data grouped by Skill AND Time
const REPORTS_DATA: Record<string, Record<string, any[]>> = {
  speaking: {
    week: [
      { name: 'Seg', planned: 20, actual: 25 }, { name: 'Ter', planned: 20, actual: 10 }, { name: 'Qua', planned: 20, actual: 20 },
      { name: 'Qui', planned: 20, actual: 30 }, { name: 'Sex', planned: 20, actual: 5 }, { name: 'Sab', planned: 30, actual: 35 }, { name: 'Dom', planned: 30, actual: 10 },
    ],
    month: [{ name: 'S1', planned: 100, actual: 110 }, { name: 'S2', planned: 100, actual: 95 }, { name: 'S3', planned: 120, actual: 80 }, { name: 'S4', planned: 120, actual: 120 }],
    quarter: [{ name: 'Ago', planned: 400, actual: 350 }, { name: 'Set', planned: 450, actual: 480 }, { name: 'Out', planned: 500, actual: 420 }],
    year: [
        { name: 'Jan', planned: 400, actual: 350 }, { name: 'Fev', planned: 400, actual: 400 }, { name: 'Mar', planned: 400, actual: 420 },
        { name: 'Abr', planned: 400, actual: 300 }, { name: 'Mai', planned: 400, actual: 380 }, { name: 'Jun', planned: 400, actual: 450 },
        { name: 'Jul', planned: 400, actual: 200 }, { name: 'Ago', planned: 400, actual: 350 }, { name: 'Set', planned: 450, actual: 480 }, 
        { name: 'Out', planned: 500, actual: 420 }, { name: 'Nov', planned: 500, actual: 0 }, { name: 'Dez', planned: 300, actual: 0 },
    ]
  },
  writing: {
     week: [
      { name: 'Seg', planned: 15, actual: 0 }, { name: 'Ter', planned: 15, actual: 30 }, { name: 'Qua', planned: 15, actual: 15 },
      { name: 'Qui', planned: 15, actual: 15 }, { name: 'Sex', planned: 15, actual: 0 }, { name: 'Sab', planned: 0, actual: 0 }, { name: 'Dom', planned: 0, actual: 0 },
    ],
    month: [{ name: 'S1', planned: 60, actual: 40 }, { name: 'S2', planned: 60, actual: 60 }, { name: 'S3', planned: 60, actual: 70 }, { name: 'S4', planned: 60, actual: 30 }],
    quarter: [{ name: 'Ago', planned: 240, actual: 200 }, { name: 'Set', planned: 240, actual: 240 }, { name: 'Out', planned: 240, actual: 180 }],
    year: [
        { name: 'Jan', planned: 200, actual: 200 }, { name: 'Fev', planned: 200, actual: 150 }, { name: 'Mar', planned: 200, actual: 180 },
        { name: 'Abr', planned: 200, actual: 220 }, { name: 'Mai', planned: 200, actual: 200 }, { name: 'Jun', planned: 200, actual: 190 },
        { name: 'Jul', planned: 200, actual: 100 }, { name: 'Ago', planned: 240, actual: 200 }, { name: 'Set', planned: 240, actual: 240 },
        { name: 'Out', planned: 240, actual: 180 }, { name: 'Nov', planned: 240, actual: 0 }, { name: 'Dez', planned: 150, actual: 0 },
    ]
  },
  listening: {
     week: [
      { name: 'Seg', planned: 30, actual: 40 }, { name: 'Ter', planned: 30, actual: 30 }, { name: 'Qua', planned: 30, actual: 30 },
      { name: 'Qui', planned: 30, actual: 45 }, { name: 'Sex', planned: 30, actual: 30 }, { name: 'Sab', planned: 45, actual: 60 }, { name: 'Dom', planned: 45, actual: 60 },
    ],
    month: [{ name: 'S1', planned: 200, actual: 250 }, { name: 'S2', planned: 200, actual: 200 }, { name: 'S3', planned: 200, actual: 180 }, { name: 'S4', planned: 200, actual: 220 }],
    quarter: [{ name: 'Ago', planned: 800, actual: 900 }, { name: 'Set', planned: 800, actual: 850 }, { name: 'Out', planned: 800, actual: 800 }],
    year: [
        { name: 'Jan', planned: 800, actual: 850 }, { name: 'Fev', planned: 800, actual: 800 }, { name: 'Mar', planned: 800, actual: 750 },
        { name: 'Abr', planned: 800, actual: 820 }, { name: 'Mai', planned: 800, actual: 900 }, { name: 'Jun', planned: 800, actual: 800 },
        { name: 'Jul', planned: 800, actual: 600 }, { name: 'Ago', planned: 800, actual: 900 }, { name: 'Set', planned: 800, actual: 850 },
        { name: 'Out', planned: 800, actual: 800 }, { name: 'Nov', planned: 800, actual: 0 }, { name: 'Dez', planned: 500, actual: 0 },
    ]
  },
  reading: {
     week: [
      { name: 'Seg', planned: 10, actual: 10 }, { name: 'Ter', planned: 10, actual: 0 }, { name: 'Qua', planned: 10, actual: 20 },
      { name: 'Qui', planned: 10, actual: 0 }, { name: 'Sex', planned: 10, actual: 10 }, { name: 'Sab', planned: 0, actual: 0 }, { name: 'Dom', planned: 0, actual: 0 },
    ],
    month: [{ name: 'S1', planned: 40, actual: 30 }, { name: 'S2', planned: 40, actual: 20 }, { name: 'S3', planned: 40, actual: 50 }, { name: 'S4', planned: 40, actual: 40 }],
    quarter: [{ name: 'Ago', planned: 160, actual: 120 }, { name: 'Set', planned: 160, actual: 140 }, { name: 'Out', planned: 160, actual: 160 }],
    year: [
        { name: 'Jan', planned: 150, actual: 150 }, { name: 'Fev', planned: 150, actual: 100 }, { name: 'Mar', planned: 150, actual: 120 },
        { name: 'Abr', planned: 150, actual: 150 }, { name: 'Mai', planned: 150, actual: 150 }, { name: 'Jun', planned: 150, actual: 150 },
        { name: 'Jul', planned: 150, actual: 50 }, { name: 'Ago', planned: 160, actual: 120 }, { name: 'Set', planned: 160, actual: 140 },
        { name: 'Out', planned: 160, actual: 160 }, { name: 'Nov', planned: 160, actual: 0 }, { name: 'Dez', planned: 100, actual: 0 },
    ]
  }
};

const Reports: React.FC<{ user: User }> = ({ user }) => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  const [skillFilter, setSkillFilter] = useState<'speaking' | 'writing' | 'listening' | 'reading'>('speaking');
  
  const data = REPORTS_DATA[skillFilter][timeFilter];

  // Calculate totals for empathy message
  const totalPlanned = data.reduce((acc, curr) => acc + curr.planned, 0);
  const totalActual = data.reduce((acc, curr) => acc + curr.actual, 0);
  const percentage = totalPlanned > 0 ? Math.round((totalActual / totalPlanned) * 100) : 0;

  const getEmpatheticMessage = () => {
    if (percentage >= 100) {
        return {
            title: `Arrasou no ${skillFilter.charAt(0).toUpperCase() + skillFilter.slice(1)}! 🚀`,
            text: "Você superou o planejado nesta habilidade. Isso mostra uma dedicação incrível. Que tal manter esse ritmo e talvez focar um pouco mais nas áreas onde você tem menos prática?",
            color: "bg-brand-green/10 border-brand-green/30 text-brand-dark"
        };
    } else if (percentage >= 70) {
        return {
            title: "Consistência Sólida 🌱",
            text: `Seu treino de ${skillFilter} está saudável. Você está dentro da zona de evolução. Para chegar aos 100%, tente encaixar uma atividade rápida de 5 minutos no seu próximo intervalo.`,
            color: "bg-blue-50 border-blue-100 text-blue-900"
        };
    } else {
        return {
            title: "Vamos retomar? ❤️",
            text: `Parece que o ${skillFilter} ficou um pouco de lado. Sem culpa! A vida acontece. Que tal fazer apenas UM exercício do Bloco atual hoje para quebrar a inércia?`,
            color: "bg-amber-50 border-amber-100 text-amber-900"
        };
    }
  };

  const advice = getEmpatheticMessage();

  const skills = [
      { id: 'speaking', label: 'Speaking', icon: Mic },
      { id: 'writing', label: 'Writing', icon: PenTool },
      { id: 'listening', label: 'Listening', icon: Headphones },
      { id: 'reading', label: 'Reading', icon: BookOpen },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <header className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-display font-bold text-brand-petrol">Meus Relatórios</h2>
                <p className="text-slate-500">Acompanhe sua consistência real vs. planejada por habilidade.</p>
            </div>
            
            <div className="relative inline-block">
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value as any)}
                    className="appearance-none bg-white border border-slate-200 text-brand-dark py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-petrol cursor-pointer font-medium shadow-sm"
                >
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mês</option>
                    <option value="quarter">Últimos 3 Meses</option>
                    <option value="year">Último Ano</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
        </div>

        {/* Skill Tabs */}
        <div className="flex flex-wrap gap-2">
            {skills.map(s => {
                const Icon = s.icon;
                const active = skillFilter === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => setSkillFilter(s.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${active ? 'bg-brand-petrol text-white shadow-md transform scale-105' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        <Icon size={16} /> {s.label}
                    </button>
                )
            })}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-brand-dark mb-6 flex items-center capitalize">
                <Calendar size={20} className="mr-2 text-brand-petrol" /> 
                {skillFilter} - Planejado vs. Realizado (Minutos)
            </h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                        <Bar name="Planejado" dataKey="planned" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar name="Realizado" dataKey="actual" fill="#0E4B66" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Empathetic Analysis */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Stats Summary */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center py-10">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke={percentage >= 100 ? '#10b981' : percentage >= 70 ? '#0E4B66' : '#f59e0b'} strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset={351 - (351 * Math.min(percentage, 100)) / 100} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-3xl font-bold text-brand-dark">{percentage}%</span>
                </div>
                <p className="text-slate-500 font-medium mt-4">da meta de <span className="capitalize font-bold text-brand-petrol">{skillFilter}</span></p>
            </div>

            {/* AI Suggestion */}
            <div className={`p-6 rounded-3xl border flex-1 ${advice.color}`}>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={20} className="text-inherit opacity-70" />
                    <h4 className="font-bold text-lg">{advice.title}</h4>
                </div>
                <p className="text-sm leading-relaxed opacity-90">
                    {advice.text}
                </p>
                {percentage < 100 && (
                     <button className="mt-4 text-xs font-bold uppercase tracking-wide opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1">
                        Ver Plano de Recuperação &rarr;
                     </button>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default Reports;