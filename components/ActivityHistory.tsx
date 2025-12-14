import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Tag, Briefcase, ChevronDown, CheckCircle, Calendar } from 'lucide-react';
import { Recording } from '../types';

const MOCK_HISTORY: Recording[] = [
    { id: '1', date: '2023-10-26T10:00:00', topic: 'Ordering Food', skill: 'speaking', level: 'A1.1', tags: ['Restaurant', 'Travel'], teacherFeedback: 'Ótima pronúncia do "th". Cuidado com entonação em perguntas.', teacherRating: 4, duration: 45, accuracy: 85 },
    { id: '2', date: '2023-10-25T14:30:00', topic: 'Email Formal', skill: 'writing', level: 'B1.2', tags: ['Business', 'Work'], teacherFeedback: 'Estrutura perfeita. Use "Sincerely" em vez de "Cheers" em contextos formais.', teacherRating: 5, duration: 0, accuracy: 95 },
    { id: '3', date: '2023-10-24T09:15:00', topic: 'Past Tense Stories', skill: 'speaking', level: 'A2.1', tags: ['Grammar', 'Storytelling'], teacherFeedback: 'Confundiu "went" com "goed". Vamos revisar verbos irregulares.', teacherRating: 3, duration: 60, accuracy: 70 },
    { id: '4', date: '2023-10-23T18:00:00', topic: 'Tech Support', skill: 'listening', level: 'B2.1', tags: ['Tech', 'Vocabulary'], teacherFeedback: 'Compreendeu 100% dos termos técnicos.', teacherRating: 5, duration: 120, accuracy: 100 },
    { id: '5', date: '2023-10-22T11:00:00', topic: 'Travel Plans', skill: 'speaking', level: 'A2.2', tags: ['Travel', 'Future'], teacherFeedback: 'Muito fluente! Bom uso do "going to".', teacherRating: 4, duration: 50, accuracy: 90 },
];

const ActivityHistory: React.FC = () => {
  const [filterText, setFilterText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Extract unique tags and levels for filters
  const allTags = Array.from(new Set(MOCK_HISTORY.flatMap(item => item.tags)));
  const allLevels = Array.from(new Set(MOCK_HISTORY.map(item => item.level)));

  const filteredHistory = MOCK_HISTORY.filter(item => {
      const matchesText = item.topic.toLowerCase().includes(filterText.toLowerCase());
      const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
      return matchesText && matchesTag && matchesLevel;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-brand-petrol">Histórico de Atividades</h2>
          <p className="text-slate-500 mt-2">Revise seu desempenho, feedback e evolução detalhada.</p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Buscar por assunto..." 
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-petrol"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
             <select 
                value={selectedTag} 
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-xl bg-white text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-petrol cursor-pointer"
             >
                 <option value="all">Todas as Tags</option>
                 {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
             </select>

             <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-xl bg-white text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-petrol cursor-pointer"
             >
                 <option value="all">Todos os Níveis</option>
                 {allLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
             </select>
          </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
          {filteredHistory.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  {/* Left: Info */}
                  <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase ${
                              item.skill === 'speaking' ? 'bg-brand-petrol/10 text-brand-petrol' :
                              item.skill === 'writing' ? 'bg-brand-green/10 text-brand-green' :
                              item.skill === 'listening' ? 'bg-brand-yellow/10 text-brand-yellow' : 'bg-blue-100 text-blue-600'
                          }`}>
                              {item.skill}
                          </span>
                          <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                              <Calendar size={14} /> {new Date(item.date).toLocaleDateString()}
                          </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-brand-dark mb-2">{item.topic}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                           <span className="text-xs font-bold text-white bg-slate-400 px-2 py-0.5 rounded-full">{item.level}</span>
                           {item.tags.map(tag => (
                               <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                   <Tag size={10} /> {tag}
                               </span>
                           ))}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-slate-50 border-t border-l border-slate-100 transform rotate-45"></div>
                          <p className="text-sm text-slate-600 italic">"{item.teacherFeedback}"</p>
                      </div>
                  </div>

                  {/* Right: Stats */}
                  <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:border-l md:border-slate-100 md:pl-6 min-w-[150px]">
                        <div className="text-center">
                            <div className="flex justify-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star 
                                        key={star} 
                                        size={18} 
                                        className={`${star <= (item.teacherRating || 0) ? 'text-brand-yellow fill-brand-yellow' : 'text-slate-200'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Avaliação</p>
                        </div>

                        <div className="text-center">
                            <span className={`text-2xl font-bold ${
                                (item.accuracy || 0) >= 90 ? 'text-brand-green' : 
                                (item.accuracy || 0) >= 70 ? 'text-brand-petrol' : 'text-brand-yellow'
                            }`}>
                                {item.accuracy}%
                            </span>
                            <p className="text-xs text-slate-400 font-bold uppercase">Precisão</p>
                        </div>
                  </div>
              </div>
          ))}

          {filteredHistory.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                  <p>Nenhuma atividade encontrada com os filtros atuais.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default ActivityHistory;