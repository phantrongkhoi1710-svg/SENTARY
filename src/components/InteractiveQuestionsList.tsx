import React, { useState } from 'react';
import { 
  Question, 
  DifficultyLevel 
} from '../types/exam';
import MathText from '../utils/mathRenderer';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  Edit3, 
  ShieldCheck, 
  Sparkles,
  Loader2,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';

interface InteractiveQuestionsListProps {
  questions: Question[];
  onEditQuestion: (question: Question) => void;
  onUpdateQuestion: (updated: Question) => void;
}

export const InteractiveQuestionsList: React.FC<InteractiveQuestionsListProps> = ({
  questions,
  onEditQuestion,
  onUpdateQuestion,
}) => {
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(true);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  // Toggle individual solution
  const toggleSolution = (id: number) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Verify a single question using Gemini
  const handleVerifyQuestion = async (q: Question) => {
    setVerifyingId(q.id);
    try {
      const res = await fetch('/api/verify-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (data.success && data.verification) {
        const updated: Question = {
          ...q,
          verified: {
            is_valid: data.verification.is_valid,
            feedback_notes: data.verification.feedback_notes,
            verified_answer: data.verification.verified_correct_answer,
          },
          explanation: data.verification.verified_explanation || q.explanation,
        };
        onUpdateQuestion(updated);
      }
    } catch (err) {
      console.error('Verify error:', err);
    } finally {
      setVerifyingId(null);
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    if (selectedPart !== 'all' && q.part !== selectedPart) return false;
    if (selectedLevel !== 'all' && q.level !== selectedLevel) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchText = q.question_text.toLowerCase().includes(term);
      const matchTopic = q.topic.toLowerCase().includes(term);
      if (!matchText && !matchTopic) return false;
    }
    return true;
  });

  const getLevelBadgeClass = (level: DifficultyLevel) => {
    switch (level) {
      case 'Nhận biết':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Thông hiểu':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Vận dụng':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Vận dụng cao':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Control & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Lọc theo:</span>
          </div>

          {/* Part Filter */}
          <select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium"
          >
            <option value="all">Tất cả các phần (I, II, III)</option>
            <option value="1">Phần I: Trắc nghiệm 4 lựa chọn</option>
            <option value="2">Phần II: Đúng / Sai</option>
            <option value="3">Phần III: Trả lời ngắn</option>
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="Nhận biết">Nhận biết</option>
            <option value="Thông hiểu">Thông hiểu</option>
            <option value="Vận dụng">Vận dụng</option>
            <option value="Vận dụng cao">Vận dụng cao</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm chủ đề, từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 w-44 sm:w-56"
            />
          </div>
        </div>

        {/* Global Answer Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const nextState = !showAllAnswers;
              setShowAllAnswers(nextState);
              const map: Record<number, boolean> = {};
              questions.forEach(q => {
                map[q.id] = nextState;
              });
              setExpandedSolutions(map);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              showAllAnswers
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {showAllAnswers ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Ẩn tất cả lời giải</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Hiện tất cả lời giải</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Questions Count stats */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <span>Hiển thị <b>{filteredQuestions.length}</b> / {questions.length} câu hỏi</span>
        <span className="font-mono text-[11px] text-slate-400">LaTeX KaTeX Rendering Active</span>
      </div>

      {/* List of Question Cards */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedSolutions[q.id] ?? showAllAnswers;
          const isVerifying = verifyingId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-5 space-y-4"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="h-7 w-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    C{q.id}
                  </span>
                  
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {q.part === 1 ? 'Phần I: 4 Lựa chọn' : q.part === 2 ? 'Phần II: Đúng / Sai' : 'Phần III: Trả lời ngắn'}
                  </span>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getLevelBadgeClass(q.level)}`}>
                    {q.level}
                  </span>

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    <span>{q.topic}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Verified check badge if verified */}
                  {q.verified && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-medium" title={q.verified.feedback_notes}>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Đã thẩm định AI</span>
                    </span>
                  )}

                  {/* Verify button */}
                  <button
                    onClick={() => handleVerifyQuestion(q)}
                    disabled={isVerifying}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-medium border border-transparent hover:border-blue-200 transition-colors disabled:opacity-50 cursor-pointer"
                    title="Thẩm định lại logic toán và tính độc lập đáp án"
                  >
                    {isVerifying ? (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    )}
                  </button>

                  {/* Edit button */}
                  <button
                    onClick={() => onEditQuestion(q)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs font-medium border border-transparent hover:border-indigo-200 transition-colors cursor-pointer"
                    title="Chỉnh sửa câu hỏi hoặc công thức"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-slate-900 leading-relaxed text-sm">
                <MathText text={q.question_text} />
              </div>

              {/* Part 1 Options */}
              {q.part === 1 && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                    const optVal = q.options?.[optKey];
                    if (!optVal) return null;
                    const isCorrect = isExpanded && q.correct_answer?.trim().toUpperCase() === optKey;

                    return (
                      <div
                        key={optKey}
                        className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium ring-1 ring-emerald-400'
                            : 'bg-slate-50/50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-300'
                        }`}>
                          {optKey}
                        </span>
                        <div className="flex-1 pt-0.5">
                          <MathText text={optVal} />
                        </div>
                        {isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Part 2: True/False Sub-items */}
              {q.part === 2 && (
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Các khẳng định cần xét tính Đúng / Sai:
                  </div>
                  {q.sub_items && q.sub_items.length > 0 ? (
                    q.sub_items.map((sub, sIdx) => {
                      return (
                        <div
                          key={sIdx}
                          className="p-3 bg-slate-50/70 rounded-lg border border-slate-200 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="flex items-start gap-2 flex-1">
                            <span className="font-bold text-indigo-700 shrink-0">
                              {sub.label})
                            </span>
                            <div className="text-slate-800">
                              <MathText text={sub.text} />
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${
                                sub.is_true
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}>
                                {sub.is_true ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>ĐÚNG</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                    <span>SAI</span>
                                  </>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    // Fallback to options if sub_items not populated
                    q.options && Object.entries(q.options).map(([k, v]) => (
                      <div key={k} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm">
                        <MathText text={v || ''} />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Part 3: Short Answer Preview */}
              {q.part === 3 && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-500 italic">
                    (Thí sinh điền kết quả vào ô số tương ứng trên phiếu trả lời)
                  </span>
                  {isExpanded && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg">
                      <span className="font-semibold text-emerald-900 text-xs">Đáp án:</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">
                        {q.correct_answer}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Toggle Solution Button */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSolution(q.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer py-1"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span>Thu gọn lời giải chi tiết</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span>Xem đáp án & hướng dẫn giải chi tiết</span>
                    </>
                  )}
                </button>
              </div>

              {/* Solution Drawer */}
              {isExpanded && (
                <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-xl border border-blue-100 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>HƯỚNG DẪN GIẢI CHI TIẾT</span>
                    </div>
                    <div className="text-xs font-mono font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">
                      Đáp số: {q.correct_answer}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans pt-1">
                    <MathText text={q.explanation} />
                  </div>

                  {q.verified?.feedback_notes && (
                    <div className="mt-3 p-2.5 bg-white/80 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">Thẩm định sư phạm:</span> {q.verified.feedback_notes}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
