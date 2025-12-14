import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { SkillTrainer } from './components/SkillTrainer';
import SmartLibrary from './components/SmartLibrary';
import StudyPlan from './components/StudyPlan';
import Reports from './components/Reports';
import TeacherMode from './components/TeacherMode';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ActivityHistory from './components/ActivityHistory';
import { User, UserLevel, UserGoal, SubscriptionType, SupportedLanguage } from './types';

// Mock current user
const mockUser: User = {
  id: 'u1',
  name: 'Eduardo Santos',
  email: 'eduardo@example.com',
  currentLanguage: 'en',
  enrolledLanguages: ['en', 'es', 'de'], // Added German here
  level: UserLevel.B1,
  goal: UserGoal.WORK,
  nextClass: '2023-10-25T19:00:00',
  focusSkill: 'Speaking & Confidence',
  subscription: SubscriptionType.VIP,
  avatarUrl: undefined
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for current language context (default to user's primary)
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(mockUser.currentLanguage);

  const toggleTeacherMode = () => {
    setIsTeacherMode(!isTeacherMode);
    setActiveTab(isTeacherMode ? 'dashboard' : 'teacher-dash'); 
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (isTeacherMode) {
        if (activeTab === 'teacher-dash') return <TeacherMode />;
        if (activeTab === 'reports') return <div className="p-10 text-center text-slate-400">Relatórios globais de alunos (Em desenvolvimento)</div>;
        return <TeacherMode />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={{...mockUser, currentLanguage}} />;
      case 'history':
        return <ActivityHistory />;
      case 'profile':
        return <Profile user={{...mockUser, currentLanguage}} />;
      case 'settings':
        return <Settings user={{...mockUser, currentLanguage}} />;
      case 'speaking':
        return <SkillTrainer skill="speaking" language={currentLanguage} />;
      case 'writing':
        return <SkillTrainer skill="writing" language={currentLanguage} />;
      case 'listening':
        return <SkillTrainer skill="listening" language={currentLanguage} />;
      case 'reading':
        return <SkillTrainer skill="reading" language={currentLanguage} />;
      case 'library':
        return <SmartLibrary />;
      case 'plan':
        return <StudyPlan />;
      case 'reports':
        return <Reports user={{...mockUser, currentLanguage}} />;
      default:
        return <Dashboard user={{...mockUser, currentLanguage}} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-brand-white text-brand-dark font-sans overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isTeacherMode={isTeacherMode}
        toggleTeacherMode={toggleTeacherMode}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        availableLanguages={mockUser.enrolledLanguages}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 relative">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0">
            <div className="flex items-center">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -ml-2 text-brand-petrol hover:bg-slate-50 rounded-lg"
                >
                  <Menu size={24} />
                </button>
                <span className="ml-2 font-display font-bold text-lg text-brand-petrol">Alle.</span>
            </div>
            <div className="w-8 h-8 bg-brand-petrol rounded-full text-white flex items-center justify-center font-bold text-sm">
                {mockUser.name.charAt(0)}
            </div>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
             <div className="max-w-[1600px] mx-auto h-full">
                 {renderContent()}
             </div>
        </div>
      </main>
    </div>
  );
};

export default App;