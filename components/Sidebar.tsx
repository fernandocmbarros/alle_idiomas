import React from 'react';
import { LayoutDashboard, Mic, Library, Calendar, BarChart2, UserCheck, LogOut, PenTool, BookOpen, Headphones, X, User, Settings, Globe, History } from 'lucide-react';
import { SupportedLanguage, LANGUAGE_LABELS } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isTeacherMode: boolean;
  toggleTeacherMode: () => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  availableLanguages: SupportedLanguage[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isTeacherMode, 
  toggleTeacherMode, 
  isOpen, 
  onClose, 
  onLogout,
  currentLanguage,
  onLanguageChange,
  availableLanguages
}) => {
  
  const menuItems = isTeacherMode 
  ? [
      { id: 'teacher-dash', label: 'Sala dos Professores', icon: UserCheck },
      { id: 'reports', label: 'Relatórios de Alunos', icon: BarChart2 },
    ]
  : [
      { id: 'dashboard', label: 'Meu Painel', icon: LayoutDashboard },
      { id: 'history', label: 'Histórico de Atividades', icon: History }, // Moved History here
      { id: 'speaking', label: 'Speaking Trainer', icon: Mic },
      { id: 'writing', label: 'Writing Trainer', icon: PenTool },
      { id: 'listening', label: 'Listening Trainer', icon: Headphones },
      { id: 'reading', label: 'Reading Trainer', icon: BookOpen },
      { id: 'library', label: 'Biblioteca Real', icon: Library },
      { id: 'plan', label: 'Plano Vivo', icon: Calendar },
      { id: 'reports', label: 'Meus Relatórios', icon: BarChart2 },
      { id: 'settings', label: 'Configurações', icon: Settings },
    ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onClose(); 
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-brand-petrol text-white border-r border-[#0A3A50] 
        transition-transform duration-300 ease-in-out shadow-2xl flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block
      `}>
        <div className="p-8 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight">Alle<span className="text-brand-green">.</span></h1>
              <p className="text-xs text-brand-green/80 mt-1 uppercase tracking-widest font-medium">Fluência Real</p>
            </div>
            <button onClick={onClose} className="md:hidden text-white/70 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Language Selector */}
          {!isTeacherMode && (
            <div className="relative mb-2">
                <label className="text-[10px] uppercase text-white/50 font-bold mb-1 block">Idioma em Foco</label>
                <div className="flex bg-[#0A3A50] rounded-lg p-1">
                    {availableLanguages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => onLanguageChange(lang)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                                currentLanguage === lang 
                                ? 'bg-brand-green text-brand-petrol shadow-sm' 
                                : 'text-white/60 hover:text-white'
                            }`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-white text-brand-petrol font-semibold shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-brand-petrol' : 'text-white/60 group-hover:text-white'} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#0A3A50] bg-brand-petrol mt-auto">
           <div className="bg-[#0A3A50] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-brand-green">Modo</span>
                  <button 
                      onClick={toggleTeacherMode}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isTeacherMode ? 'bg-brand-green' : 'bg-slate-600'}`}
                  >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isTeacherMode ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
              </div>
              <p className="text-xs mt-2 text-white/70 font-medium">
                  {isTeacherMode ? 'Visão Professor' : 'Visão Aluno'}
              </p>
           </div>

          <button onClick={onLogout} className="flex items-center space-x-2 text-white/70 hover:text-white px-2 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;