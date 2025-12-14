import React from 'react';
import { Users, FileText, Calendar, AlertTriangle } from 'lucide-react';

const TeacherMode: React.FC = () => {
    // Mock students
    const students = [
        { id: 1, name: 'Ana Silva', level: 'B1', nextClass: 'Hoje, 19:00', status: 'needs_attention', note: 'Dificuldade com Present Perfect' },
        { id: 2, name: 'Carlos Mendes', level: 'C1', nextClass: 'Amanhã, 08:00', status: 'on_track', note: 'Preparar simulação de entrevista' },
        { id: 3, name: 'Mariana Costa', level: 'A2', nextClass: 'Amanhã, 10:00', status: 'on_track', note: 'Revisar vocabulário de família' },
    ];

  return (
    <div className="space-y-6">
       <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sala dos Professores</h2>
          <p className="text-slate-500">Gestão simplificada dos seus alunos Alle.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            + Novo Relatório de Aula
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aluno</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nível</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Próxima Aula</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Anotação Rápida</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ação</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                    {student.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-slate-900">{student.name}</div>
                                    {student.status === 'needs_attention' && (
                                        <span className="text-xs text-amber-600 flex items-center mt-0.5">
                                            <AlertTriangle size={10} className="mr-1" /> Atenção requerida
                                        </span>
                                    )}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                                {student.level}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {student.nextClass}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                           {student.note}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Planejar</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <FileText size={18} className="mr-2 text-slate-400" /> Erros Comuns da Semana
            </h3>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                <li>Confusão entre "Make" e "Do" (3 alunos)</li>
                <li>Pronúncia do "th" voiced (Geral)</li>
                <li>Uso excessivo de "very" ao invés de adjetivos fortes.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Calendar size={18} className="mr-2 text-slate-400" /> Minha Agenda
            </h3>
            <p className="text-sm text-slate-500">3 aulas restantes hoje. Próximo intervalo às 16:00.</p>
          </div>
      </div>
    </div>
  );
};

export default TeacherMode;
