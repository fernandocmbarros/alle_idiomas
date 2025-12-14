import React, { useState } from 'react';
import { User, SocialPost } from '../types';
import { MessageSquare, Heart, Share2, Award, TrendingUp } from 'lucide-react';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  // Mock Feed Data
  const [posts, setPosts] = useState<SocialPost[]>([
    {
        id: '1',
        author: 'Sarah Jenkins',
        authorRole: 'Professor',
        content: 'Dica do dia: Ao discordar em inglês corporativo, evite "You are wrong". Use "I see it differently" ou "I have a different perspective". #BusinessEnglish',
        likes: 24,
        comments: 5,
        timestamp: '2h atrás'
    },
    {
        id: '2',
        author: 'Carlos Mendes',
        authorRole: 'Aluno',
        content: 'Acabei de completar meu primeiro módulo B2! A diferença na confiança para falar é real. Obrigado @Alle!',
        likes: 15,
        comments: 8,
        timestamp: '5h atrás'
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
        
        {/* Left Column: User Stats */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
                <div className="w-24 h-24 bg-brand-petrol rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-brand-petrol/20">
                    {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-display font-bold text-brand-dark">{user.name}</h2>
                <p className="text-brand-petrol font-medium text-sm">{user.level} • {user.subscription}</p>
                
                <div className="mt-6 flex justify-center gap-4 text-left">
                    <div className="bg-brand-white p-3 rounded-xl flex-1">
                        <p className="text-xs text-slate-500 uppercase font-bold">Aulas</p>
                        <p className="text-xl font-bold text-brand-dark">24</p>
                    </div>
                    <div className="bg-brand-white p-3 rounded-xl flex-1">
                        <p className="text-xs text-slate-500 uppercase font-bold">Streak</p>
                        <p className="text-xl font-bold text-brand-dark flex items-center gap-1">
                             12 <span className="text-brand-yellow">🔥</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-display font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-brand-green" /> Progresso Atual
                </h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Grammar B1</span>
                            <span className="font-bold text-brand-petrol">80%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-brand-green h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Business Vocab</span>
                            <span className="font-bold text-brand-petrol">45%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-brand-yellow h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Social Feed */}
        <div className="lg:col-span-2">
            <h3 className="text-xl font-display font-bold text-brand-dark mb-6">Comunidade Alle</h3>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6 flex gap-4">
                 <div className="w-10 h-10 bg-brand-petrol rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                </div>
                <input 
                    type="text" 
                    placeholder="Compartilhe sua conquista ou dúvida..." 
                    className="flex-1 bg-brand-white rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition-all"
                />
            </div>

            <div className="space-y-6">
                {posts.map(post => (
                    <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${post.authorRole === 'Professor' ? 'bg-brand-yellow text-brand-petrol' : 'bg-slate-200 text-slate-600'}`}>
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark text-sm">{post.author}</h4>
                                    <span className="text-xs text-brand-petrol bg-brand-white px-2 py-0.5 rounded-full font-medium">{post.authorRole}</span>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">{post.timestamp}</span>
                        </div>
                        
                        <p className="text-slate-700 leading-relaxed mb-4">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors">
                                <Heart size={18} /> {post.likes}
                            </button>
                            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-petrol transition-colors">
                                <MessageSquare size={18} /> {post.comments}
                            </button>
                             <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-petrol transition-colors ml-auto">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Profile;