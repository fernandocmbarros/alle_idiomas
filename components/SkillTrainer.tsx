import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Mic, Square, Play, Pause, Sparkles, Send, ChevronRight, Briefcase, ChevronLeft, Lightbulb, PenTool, Headphones, BookOpen, Eye, Star, CheckCircle, Map, Lock, Volume2 } from 'lucide-react';
import { analyzeSpeaking } from '../services/geminiService';
import { SupportedLanguage } from '../types';

type SkillType = 'speaking' | 'writing' | 'listening' | 'reading';
type ExerciseType = 'recording' | 'text_input' | 'multiple_choice';

interface SkillTrainerProps {
  skill: SkillType;
  language: SupportedLanguage;
}

// Data Structures
interface Exercise {
  id: number;
  type: ExerciseType;
  title: string;
  level: string;
  tag: string;
  context: string;
  image: string;
  description: string;
  hints: string[]; // Always exactly 2
  options?: string[]; // For multiple choice
  correctAnswer?: string; // For auto-checking (mock)
  audioScript?: string; // For listening exercises
}

interface Block {
  id: number;
  title: string;
  isLocked: boolean;
  score?: number; 
  exercises: Exercise[];
}

interface Trail {
  id: string;
  title: string;
  description: string;
  level: string;
  blocks: Block[];
}

// --- HELPER TO GENERATE MOCK DATA ---
const generateMockExercises = (skill: SkillType, trailLevel: string, trailTheme: string, blockId: number, lang: SupportedLanguage): Exercise[] => {
    const specificExercises: Exercise[] = [];
    
    // Helper translation strings
    const t = {
        context: lang === 'en' ? 'Context' : lang === 'de' ? 'Kontext' : 'Contexto',
        fillGap: lang === 'en' ? 'Complete the sentence' : lang === 'de' ? 'Ergänzen Sie den Satz' : 'Complete a frase',
        dictation: lang === 'en' ? 'Type what you hear' : lang === 'de' ? 'Schreiben Sie, was Sie hören' : 'Digite o que você ouviu',
        slang: lang === 'en' ? 'Slang & Context' : lang === 'de' ? 'Slang & Kontext' : 'Gíria e Contexto',
        comprehension: lang === 'en' ? 'Dialogue Comprehension' : lang === 'de' ? 'Hörverständnis' : 'Compreensão de Diálogo',
        speaking: lang === 'en' ? 'Speaking Practice' : lang === 'de' ? 'Sprechübung' : 'Prática de Fala',
    };

    // Create 10 exercises per block
    for (let i = 1; i <= 10; i++) {
        let exerciseType: ExerciseType = 'text_input';
        let title = `Atividade ${i}`;
        let desc = `Exercício prático ${i} do Bloco ${blockId}.`;
        let hints = ["Dica Inicial...", "Dica Avançada..."];
        let options: string[] | undefined = undefined;
        let audioScript = "This is a simulated audio track for the exercise.";
        let image = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000";

        // --- SKILL SPECIFIC LOGIC ---
        
        if (skill === 'speaking') {
            exerciseType = 'recording';
            title = `${t.speaking} #${i}`;
            image = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000";
            desc = lang === 'en' ? "Record yourself explaining this topic." : lang === 'de' ? "Nehmen Sie sich auf und erklären Sie dieses Thema." : "Grave-se explicando este tópico.";
        } 
        else if (skill === 'writing') {
            exerciseType = 'text_input';
            image = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000";
        }
        else if (skill === 'listening') {
            // Varied Listening Activities as requested
            if (i <= 3) {
                // Type 1: Fill in the missing word (Multiple Choice)
                exerciseType = 'multiple_choice';
                title = `${t.fillGap}`;
                desc = lang === 'en' ? "Listen to the audio and choose the missing word." : lang === 'de' ? "Hören Sie zu und wählen Sie das fehlende Wort." : "Ouça o áudio e escolha a palavra que falta.";
                options = lang === 'de' ? ["Gehen", "Laufen", "Fahren", "Reisen"] : ["Go", "Walk", "Drive", "Travel"];
                audioScript = "I usually [BLANK] to work by bus.";
                image = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000";
            } else if (i <= 5) {
                // Type 2: Dictation
                exerciseType = 'text_input';
                title = `${t.dictation}`;
                desc = lang === 'en' ? "Listen carefully and type exactly what is said." : lang === 'de' ? "Hören Sie genau zu und schreiben Sie genau das, was gesagt wird." : "Ouça com atenção e digite exatamente o que foi dito.";
                image = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1000";
            } else if (i <= 7) {
                // Type 3: Dialogue Comprehension (Multiple Choice)
                exerciseType = 'multiple_choice';
                title = `${t.comprehension}`;
                desc = lang === 'en' ? "Listen to the conversation. Why is the man upset?" : lang === 'de' ? "Hören Sie das Gespräch. Warum ist der Mann verärgert?" : "Ouça a conversa. Por que o homem está chateado?";
                options = ["He lost his wallet", "The flight was delayed", "He didn't like the food", "It is raining"];
                image = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1000";
            } else {
                // Type 4: Context/Slang (Real Life Application)
                exerciseType = 'multiple_choice';
                title = `${t.slang}`;
                desc = lang === 'en' 
                    ? "In standard English 'Cheers' means a toast. In British slang, what else can it mean?" 
                    : lang === 'de' 
                        ? "Was bedeutet 'Na?' in der Umgangssprache?" 
                        : "No contexto nativo, o que essa expressão realmente significa?";
                options = lang === 'en' ? ["Goodbye", "Thank you", "Hello", "Sorry"] : lang === 'de' ? ["Wie geht's / Hallo", "Nein", "Ja", "Tschüss"] : ["Obrigado", "Desculpa", "Olá", "Tchau"];
                image = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000";
            }
        }
        else if (skill === 'reading') {
             exerciseType = 'multiple_choice';
        }

        specificExercises.push({
            id: i,
            type: exerciseType,
            title,
            level: trailLevel,
            tag: trailTheme.split(' ')[0],
            context: `${t.context} ${blockId}.${i}`,
            image,
            description: desc,
            hints: hints,
            options: options,
            audioScript: audioScript
        });
    }

    return specificExercises;
};

// --- DATA GENERATION ---
const getTrails = (skill: SkillType, completedBlocks: Record<string, number>, lang: SupportedLanguage): Trail[] => {
    const levels = [
        { code: 'A1.1', title: 'A1.1: Start' },
        { code: 'A1.2', title: 'A1.2: Basics' },
        { code: 'A2.1', title: 'A2.1: Routine' },
        { code: 'A2.2', title: 'A2.2: Connections' },
        { code: 'B1.1', title: 'B1.1: Independence' },
        { code: 'B1.2', title: 'B1.2: Stories' },
        { code: 'B1.3', title: 'B1.3: Intermediate' },
        { code: 'B2.1', title: 'B2.1: Professional' },
        { code: 'B2.2', title: 'B2.2: Nuances' },
        { code: 'C1.1', title: 'C1.1: Academic' },
        { code: 'C1.2', title: 'C1.2: Rhetoric' },
        { code: 'C1.3', title: 'C1.3: Proficiency' },
        { code: 'BUS', title: 'Business Elite' },
        { code: 'TRV', title: 'Travel Master' },
        { code: 'EXM', title: 'Exam Prep' }
    ];

    return levels.map((lvl, index) => ({
        id: `t-${index}`,
        title: lvl.title,
        level: lvl.code,
        description: `${lang === 'en' ? 'Trail for' : lang === 'de' ? 'Weg für' : 'Trilha de'} ${skill} - ${lvl.code}.`,
        blocks: Array.from({ length: 10 }, (_, i) => {
            const blockId = i + 1;
            const uniqueBlockId = `t-${index}-b-${blockId}`;
            // Logic: Block 1 unlocked. Subsequent unlock if previous is done.
            const isFirst = i === 0;
            const prevBlockId = `t-${index}-b-${i}`;
            const isPrevDone = completedBlocks[prevBlockId] !== undefined;
            const isUnlocked = isFirst || isPrevDone;
            const score = completedBlocks[uniqueBlockId];
            
            return {
                id: blockId,
                title: `Block ${blockId}`,
                isLocked: !isUnlocked, 
                score: score,
                exercises: generateMockExercises(skill, lvl.code, lvl.title, blockId, lang)
            };
        })
    }));
};


export const SkillTrainer: React.FC<SkillTrainerProps> = ({ skill, language }) => {
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, number>>({});
  const trailsData = useMemo(() => getTrails(skill, completedBlocks, language), [skill, completedBlocks, language]);

  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block & { uniqueId: string } | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Exercise State
  const [hintsRevealedCount, setHintsRevealedCount] = useState(0);
  const [showBlockEvaluation, setShowBlockEvaluation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Audio Player State for Listening
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<number | null>(null);

  // Reset when props change
  useEffect(() => {
      setSelectedTrail(null);
      setSelectedBlock(null);
  }, [skill, language]);

  // Timer for Recording
  useEffect(() => {
    let interval: number;
    if (isRecording) {
        interval = window.setInterval(() => setRecordingDuration(p => p + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Timer for Audio Playback Simulation
  useEffect(() => {
    let timeout: number;
    if (isPlayingAudio) {
        // Simulate 5 seconds audio
        timeout = window.setTimeout(() => setIsPlayingAudio(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [isPlayingAudio]);

  // --- ACTIONS ---

  const handleSelectTrail = (trail: Trail) => {
      // Add uniqueId hack to blocks for mapping
      const mappedBlocks = trail.blocks.map((b, i) => ({
          ...b, 
          uniqueId: `${trail.id}-b-${b.id}`
      }));
      // We need to cast or ensure types match, but for mock this is fine
      setSelectedTrail({...trail, blocks: mappedBlocks});
      setSelectedBlock(null);
  };

  const handleSelectBlock = (block: any) => {
      if (block.isLocked) return;
      setSelectedBlock(block);
      setCurrentExerciseIndex(0);
      resetExerciseState();
  };

  const handleBackToBlocks = () => {
      setSelectedBlock(null);
      setShowBlockEvaluation(false);
  };

  const resetExerciseState = () => {
      setHintsRevealedCount(0);
      setFeedback(null);
      setRating(0);
      setRecordingComplete(false);
      setRecordingDuration(0);
      setTextInput("");
      setSelectedOption(null);
      setIsRecording(false);
      setIsPlayingAudio(false);
  };

  const handleNextExercise = () => {
      if (!selectedBlock) return;
      const nextIndex = currentExerciseIndex + 1;
      if (nextIndex >= selectedBlock.exercises.length) {
          setShowBlockEvaluation(true);
      } else {
          setCurrentExerciseIndex(nextIndex);
          resetExerciseState();
      }
  };

  const handlePrevExercise = () => {
      if (currentExerciseIndex > 0) {
          setCurrentExerciseIndex(prev => prev - 1);
          resetExerciseState();
      }
  };

  const handleFinishBlock = () => {
      if (selectedBlock) {
          const mockScore = Math.min(100, Math.max(70, (rating || 3) * 20));
          setCompletedBlocks(prev => ({
              ...prev,
              [selectedBlock.uniqueId]: mockScore
          }));
      }
      setShowBlockEvaluation(false);
      setSelectedBlock(null);
  };

  const handleSendForFeedback = async () => {
      if (!selectedBlock) return;
      const currentActivity = selectedBlock.exercises[currentExerciseIndex];

      setIsLoading(true);
      const context = `${skill} Exercise. Type: ${currentActivity.type}. Title: ${currentActivity.title}.`;
      let userContent = "";

      if (currentActivity.type === 'recording') userContent = "[Audio Transcript]";
      else if (currentActivity.type === 'text_input') userContent = textInput;
      else if (currentActivity.type === 'multiple_choice') userContent = selectedOption || "";

      // Simulate AI call
      const aiFeedback = await analyzeSpeaking(userContent, context);
      const simRating = Math.floor(Math.random() * 2) + 4; // High ratings for encouragement

      setFeedback(aiFeedback);
      setRating(simRating);
      setIsLoading(false);
  };

  // Helper colors
  const accentBg = skill === 'speaking' ? 'bg-brand-petrol' : skill === 'writing' ? 'bg-brand-green' : skill === 'listening' ? 'bg-brand-yellow' : 'bg-blue-500';
  const accentText = skill === 'speaking' ? 'text-brand-petrol' : skill === 'writing' ? 'text-brand-green' : skill === 'listening' ? 'text-brand-yellow' : 'text-blue-500';

  // --- RENDER 1: TRAIL LIST ---
  if (!selectedTrail) {
      return (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
              <header>
                  <h2 className="text-3xl font-display font-bold text-brand-petrol flex items-center gap-2">
                      <span className={`p-2 rounded-lg ${accentBg} text-white`}>
                          {skill === 'speaking' && <Mic size={24} />}
                          {skill === 'writing' && <PenTool size={24} />}
                          {skill === 'listening' && <Headphones size={24} />}
                          {skill === 'reading' && <BookOpen size={24} />}
                      </span>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)} Trainer ({language.toUpperCase()})
                  </h2>
                  <p className="text-slate-500 mt-2">15 Trilhas • 150 Blocos • 1500 Atividades</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trailsData.map(trail => (
                      <button 
                        key={trail.id}
                        onClick={() => handleSelectTrail(trail)}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all text-left group flex flex-col h-full"
                      >
                          <div className="flex justify-between items-start mb-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${accentBg} text-white`}>
                                  {trail.level}
                              </span>
                              <ChevronRight className="text-slate-300 group-hover:text-brand-petrol transition-colors" />
                          </div>
                          <h3 className="text-lg font-display font-bold text-brand-dark mb-2 group-hover:text-brand-petrol">{trail.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{trail.description}</p>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-auto">
                                <div className={`h-full ${accentBg} w-[10%]`}></div>
                          </div>
                      </button>
                  ))}
              </div>
          </div>
      );
  }

  // --- RENDER 2: BLOCK MAP ---
  if (selectedTrail && !selectedBlock) {
      return (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
               <header className="flex items-center gap-4">
                  <button onClick={() => setSelectedTrail(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-brand-dark transition-colors">
                      <ChevronLeft size={24} />
                  </button>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-brand-petrol">{selectedTrail.title}</h2>
                    <p className="text-slate-500">Mapa de Blocos</p>
                  </div>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {selectedTrail.blocks.map((block: any) => {
                      const score = block.score;
                      const isCompleted = score !== undefined;
                      return (
                        <button 
                            key={block.uniqueId}
                            onClick={() => handleSelectBlock(block)}
                            disabled={block.isLocked}
                            className={`
                                relative h-40 rounded-2xl border flex flex-col items-center justify-center p-4 text-center transition-all
                                ${block.isLocked ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-brand-green/30 hover:border-brand-green shadow-sm hover:shadow-md cursor-pointer group'}
                            `}
                        >
                            {block.isLocked ? <Lock size={24} className="mb-2 opacity-50" /> : isCompleted ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-1 font-bold"><CheckCircle size={20} /></div>
                                    <span className="text-2xl font-bold text-brand-green">{score}%</span>
                                </div>
                            ) : (
                                <div className={`w-10 h-10 rounded-full ${accentBg} text-white flex items-center justify-center mb-3 font-bold shadow-md group-hover:scale-110`}>{block.id}</div>
                            )}
                            {!isCompleted && <span className={`font-bold text-sm ${block.isLocked ? 'text-slate-400' : 'text-brand-dark'}`}>{block.title}</span>}
                        </button>
                      );
                  })}
              </div>
          </div>
      );
  }

  // --- RENDER 3: EVALUATION ---
  if (showBlockEvaluation) {
      return (
          <div className="w-full h-full flex items-center justify-center p-8 animate-fade-in">
              <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-xl border border-slate-100">
                  <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} /></div>
                  <h2 className="text-3xl font-display font-bold text-brand-petrol mb-4">Bloco Finalizado!</h2>
                  <p className="text-slate-600 mb-8">Você completou 10 atividades de {skill}.</p>
                  <div className="text-center mb-8"><p className="text-4xl font-bold text-brand-dark">90%</p><p className="text-xs uppercase font-bold text-slate-400">Precisão</p></div>
                  <button onClick={handleFinishBlock} className="w-full py-4 bg-brand-petrol text-white rounded-xl font-bold hover:bg-[#0A3A50] transition-colors">Salvar Progresso</button>
              </div>
          </div>
      );
  }

  // --- RENDER 4: EXERCISE INTERFACE ---
  const currentActivity = selectedBlock.exercises[currentExerciseIndex];
  const canContinue = feedback || (currentActivity.type === 'recording' && recordingComplete) || (currentActivity.type === 'text_input' && textInput.length > 2) || (currentActivity.type === 'multiple_choice' && selectedOption);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden max-w-6xl mx-auto">
        <header className="mb-4 shrink-0 flex flex-wrap items-center gap-2 px-4 md:px-0">
            <button onClick={handleBackToBlocks} className="text-slate-400 hover:text-brand-dark text-sm flex items-center gap-1"><Map size={14} /> Mapa</button>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-medium text-brand-petrol">{selectedBlock.title}</span>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-500">Atividade {currentExerciseIndex + 1}/10</span>
        </header>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 shrink-0 overflow-hidden">
            <div className={`h-full ${accentBg} transition-all duration-500`} style={{ width: `${((currentExerciseIndex + 1) / selectedBlock.exercises.length) * 100}%` }}></div>
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
            <button onClick={handlePrevExercise} disabled={currentExerciseIndex === 0} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white text-slate-400 hover:text-brand-petrol disabled:opacity-30 transition-colors z-20 shadow-sm border border-slate-100"><ChevronLeft size={24} /></button>
            <button onClick={handleNextExercise} disabled={!canContinue} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white text-slate-400 hover:text-brand-petrol transition-colors z-20 shadow-sm border border-slate-100"><ChevronRight size={24} /></button>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 flex flex-col items-center">
                <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
                    
                    {/* Visual / Context */}
                    <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-6 relative shadow-md group">
                        <img src={currentActivity.image} alt={currentActivity.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-petrol/80 to-transparent flex items-end justify-center pb-4">
                            <span className="text-white text-sm font-semibold tracking-wider uppercase flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"><Briefcase size={14} /> {currentActivity.context}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-brand-dark mb-4 text-center">{currentActivity.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 text-center text-lg max-w-2xl">{currentActivity.description}</p>

                    {/* LISTENING PLAYER SIMULATION */}
                    {skill === 'listening' && (
                        <div className="w-full max-w-md bg-slate-50 rounded-xl p-4 border border-slate-200 mb-8 flex items-center gap-4">
                            <button 
                                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                                className={`w-12 h-12 rounded-full ${accentBg} text-white flex items-center justify-center hover:opacity-90 transition-opacity`}
                            >
                                {isPlayingAudio ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                            </button>
                            <div className="flex-1">
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full bg-brand-yellow transition-all duration-[5000ms] ease-linear ${isPlayingAudio ? 'w-full' : 'w-0'}`}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-slate-400 font-mono">
                                    <span>{isPlayingAudio ? "0:02" : "0:00"}</span>
                                    <span>0:05</span>
                                </div>
                            </div>
                            <Volume2 size={20} className="text-slate-400" />
                        </div>
                    )}

                    {/* INTERACTION AREA */}
                    <div className="w-full max-w-2xl mb-8">
                        {/* 1. RECORDING */}
                        {currentActivity.type === 'recording' && (
                            <div className="flex flex-col items-center">
                                <button onClick={() => {
                                    if (isRecording) { setIsRecording(false); setRecordingComplete(true); }
                                    else { setIsRecording(true); setRecordingComplete(false); setFeedback(null); setRecordingDuration(0); }
                                }} className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-105 active:scale-95 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-brand-petrol text-white'}`}>
                                    {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={40} />}
                                </button>
                                <div className="mt-4 font-mono text-2xl text-slate-400 font-medium tracking-widest">00:{recordingDuration.toString().padStart(2, '0')}</div>
                            </div>
                        )}

                        {/* 2. TEXT INPUT */}
                        {currentActivity.type === 'text_input' && (
                            <textarea 
                                className="w-full h-32 p-5 rounded-xl border border-slate-300 focus:border-brand-petrol focus:ring-2 focus:ring-brand-petrol/20 outline-none resize-none text-base text-slate-700 bg-white shadow-inner"
                                placeholder={language === 'en' ? "Type your answer here..." : language === 'de' ? "Schreiben Sie hier..." : "Digite sua resposta..."}
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                            ></textarea>
                        )}

                        {/* 3. MULTIPLE CHOICE */}
                        {currentActivity.type === 'multiple_choice' && currentActivity.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentActivity.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedOption(opt)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedOption === opt ? `border-${skill === 'listening' ? 'brand-yellow' : 'brand-petrol'} bg-${skill === 'listening' ? 'brand-yellow/10' : 'brand-petrol/5'}` : 'border-slate-100 hover:border-slate-300'}`}
                                    >
                                        <span className={`font-bold mr-2 ${selectedOption === opt ? accentText : 'text-slate-400'}`}>{String.fromCharCode(65 + idx)}.</span>
                                        <span className="text-slate-700 font-medium">{opt}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* HINTS (2 Progressive) */}
                    {hintsRevealedCount < 2 && !feedback && (
                        <button onClick={() => setHintsRevealedCount(p => p+1)} className={`text-sm flex items-center gap-1 font-bold ${accentText} hover:opacity-80 mb-6`}>
                            <Eye size={16} /> {language === 'en' ? 'Need a hint?' : language === 'de' ? 'Hinweis?' : 'Precisa de uma dica?'}
                        </button>
                    )}
                    
                    {hintsRevealedCount > 0 && (
                        <div className="flex flex-col items-center gap-2 mb-8 w-full max-w-lg">
                            {currentActivity.hints.slice(0, hintsRevealedCount).map((hint, idx) => (
                                <div key={idx} className="w-full text-center text-sm font-medium text-brand-petrol bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 animate-fade-in">
                                    <span className="font-bold text-xs uppercase text-slate-400 mr-2">Dica {idx + 1}:</span> {hint}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SEND BUTTON */}
                    {!feedback && canContinue && (
                        <button onClick={handleSendForFeedback} disabled={isLoading} className={`flex items-center space-x-2 px-8 py-4 ${accentBg} text-white rounded-xl hover:opacity-90 font-bold shadow-lg shadow-brand-petrol/20 transition-all disabled:opacity-70 mb-10`}>
                            {isLoading ? <span>Analyzing...</span> : <><span>{language === 'en' ? 'Submit' : language === 'de' ? 'Senden' : 'Enviar'}</span> <Send size={20} /></>}
                        </button>
                    )}

                    {/* FEEDBACK */}
                    {feedback && (
                        <div className="w-full max-w-3xl bg-brand-green/10 border border-brand-green/30 rounded-2xl p-8 mb-10 animate-fade-in">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-full text-brand-green shadow-sm"><Sparkles size={24} /></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-brand-petrol text-lg">Feedback</h4>
                                        <div className="flex gap-1">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} className={star <= rating ? "text-brand-yellow fill-brand-yellow" : "text-slate-300"} />)}</div>
                                    </div>
                                    <p className="text-brand-dark text-base leading-relaxed whitespace-pre-line">{feedback}</p>
                                    <div className="mt-6 flex justify-end">
                                        <button onClick={handleNextExercise} className="px-6 py-2 bg-brand-petrol text-white rounded-lg text-sm font-bold hover:bg-[#0A3A50]">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};