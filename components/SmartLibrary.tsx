import React, { useState } from 'react';
import { Search, PlayCircle, FileText, Headphones, Tag, Bookmark } from 'lucide-react';
import { LibraryItem } from '../types';
import { suggestRealLifeApplication } from '../services/geminiService';

const SmartLibrary: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock data
  const items: LibraryItem[] = [
    { id: '1', title: 'Phrasal Verbs for Negotiation', type: 'video', realLifeApplication: 'Essencial para fechar contratos sem parecer agressivo.', tags: ['Business', 'Advanced'], isFavorite: true },
    { id: '2', title: 'Ordering Coffee like a Native', type: 'audio', realLifeApplication: 'Para não travar na Starbucks em NY.', tags: ['Travel', 'Beginner'], isFavorite: false },
    { id: '3', title: 'Writing Professional Emails', type: 'text', realLifeApplication: 'Evita soar rude em comunicações escritas.', tags: ['Work', 'Writing'], isFavorite: false },
    { id: '4', title: 'Tech Talk: describing bugs', type: 'exercise', realLifeApplication: 'Explicar problemas técnicos para times internacionais.', tags: ['Tech', 'Vocabulary'], isFavorite: true },
  ];

  const filteredItems = filter === 'all' ? items : items.filter(i => i.type === filter);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Biblioteca Inteligente</h2>
           <p className="text-slate-500">Conteúdo curado com foco em aplicação prática.</p>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Buscar por tópico ou situação..." 
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            />
        </div>
      </header>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
         {['all', 'video', 'audio', 'text', 'exercise'].map((f) => (
             <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
             >
                 {f === 'all' ? 'Todos' : f}
             </button>
         ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-3">
                    <div className={`p-2 rounded-lg ${
                        item.type === 'video' ? 'bg-red-100 text-red-600' :
                        item.type === 'audio' ? 'bg-amber-100 text-amber-600' :
                        item.type === 'text' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {item.type === 'video' && <PlayCircle size={20} />}
                        {item.type === 'audio' && <Headphones size={20} />}
                        {item.type === 'text' && <FileText size={20} />}
                        {item.type === 'exercise' && <Tag size={20} />}
                    </div>
                    <button className="text-slate-300 hover:text-indigo-500 transition-colors">
                        <Bookmark size={20} fill={item.isFavorite ? "currentColor" : "none"} className={item.isFavorite ? "text-indigo-500" : ""} />
                    </button>
                </div>
                
                <h3 className="font-semibold text-slate-900 text-lg mb-1">{item.title}</h3>
                
                {/* The "Real Life" differentiator */}
                <div className="bg-slate-50 rounded-lg p-3 mt-3 border-l-4 border-indigo-200">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Na Vida Real:</p>
                    <p className="text-sm text-slate-700 italic">"{item.realLifeApplication}"</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded font-medium">#{tag}</span>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SmartLibrary;
