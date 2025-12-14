import React from 'react';
import { CheckCircle, Circle, AlertCircle, ArrowRight } from 'lucide-react';
import { StudyPlanItem } from '../types';

const StudyPlan: React.FC = () => {
  const plan: StudyPlanItem[] = [
    { id: '1', title: 'Review: Present Perfect vs. Simple Past', status: 'completed', date: '10 Out' },
    { id: '2', title: 'Speaking: Travel Scenarios', status: 'completed', date: '12 Out' },
    { id: '3', title: 'Grammar: Conditionals (Focus on Second)', status: 'changed', date: '14 Out', reasonForChange: 'Dificuldade detectada na última aula de conversação.' },
    { id: '4', title: 'Vocabulary: Office Equipment', status: 'planned', date: '17 Out' },
    { id: '5', title: 'Simulation: Job Interview', status: 'planned', date: '20 Out' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
       <header className="mb-8">
           <h2 className="text-2xl font-bold text-slate-900">Plano Vivo</h2>
           <p className="text-slate-500">Seu roteiro adapta-se à sua evolução, não o contrário.</p>
        </header>

        <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 py-2">
            {plan.map((item, index) => (
                <div key={item.id} className="relative pl-8">
                    {/* Status Dot */}
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                        item.status === 'completed' ? 'border-green-500 bg-green-500' :
                        item.status === 'changed' ? 'border-amber-500 bg-amber-50' :
                        'border-slate-300'
                    }`}>
                         {item.status === 'completed' && <CheckCircle size={12} className="text-white absolute top-0 left-0" />}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between bg-white p-5 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                                <span className="text-sm font-mono text-slate-400">{item.date}</span>
                                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                                    item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    item.status === 'changed' ? 'bg-amber-100 text-amber-700' :
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                    {item.status === 'changed' ? 'Adaptado' : item.status === 'completed' ? 'Feito' : 'Planejado'}
                                </span>
                            </div>
                            
                            <h3 className={`text-lg font-medium ${item.status === 'completed' ? 'text-slate-600 line-through decoration-slate-300' : 'text-slate-900'}`}>
                                {item.title}
                            </h3>

                            {item.status === 'changed' && item.reasonForChange && (
                                <div className="mt-3 bg-amber-50 border-l-2 border-amber-300 p-3 rounded-r text-sm text-amber-900 flex items-start">
                                    <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                                    <p><strong>Por que mudou?</strong> {item.reasonForChange}</p>
                                </div>
                            )}
                        </div>

                        {item.status === 'planned' && (
                             <button className="mt-4 sm:mt-0 sm:ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                                Preparar <ArrowRight size={14} className="ml-1" />
                             </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default StudyPlan;
