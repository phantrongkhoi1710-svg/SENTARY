import React, { useState, useEffect } from 'react';
import { Question, StudentAnswers } from '../types/exam';
import MathText from '../utils/mathRenderer';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  Award, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface ExamTestModeProps {
  questions: Question[];
  examTitle: string;
}

export const ExamTestMode: React.FC<ExamTestModeProps> = ({
  questions,
  examTitle,
}) => {
  // Timer state (90 minutes = 5400s)
  const [timeLeft, setTimeLeft] = useState<number>(90 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Student answers
  const [answers, setAnswers] = useState<StudentAnswers>({
    part1: {},
    part2: {},
    part3: {},
  });

  // Current active question focused
  const [activeQuestionId, setActiveQuestionId] = useState<number>(questions[0]?.id || 1);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning && !isSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(interval);
            setIsSubmitted(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isSubmitted, timeLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Set Part 1 answer
  const handleSelectPart1 = (qId: number, choice: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      part1: { ...prev.part1, [qId]: choice }
    }));
  };

  // Set Part 2 answer (a,b,c,d -> true/false)
  const handleSelectPart2 = (qId: number, label: 'a' | 'b' | 'c' | 'd', value: boolean) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      const currentQ = prev.part2[qId] || { a: null, b: null, c: null, d: null };
      return {
        ...prev,
        part2: {
          ...prev.part2,
          [qId]: { ...currentQ, [label]: value }
        }
      };
    });
  };

  // Set Part 3 answer
  const handleInputPart3 = (qId: number, value: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      part3: { ...prev.part3, [qId]: value }
    }));
  };

  // Calculation of official exam score (10.0 scale)
  const calculateScore = () => {
    let part1Score = 0;
    let part2Score = 0;
    let part3Score = 0;

    let part1CorrectCount = 0;
    let part2Details: Record<number, number> = {}; // qId -> correct sub items count
    let part3CorrectCount = 0;

    questions.forEach(q => {
      if (q.part === 1) {
        const studentChoice = answers.part1[q.id]?.toUpperCase();
        const correctChoice = q.correct_answer?.trim().toUpperCase();
        if (studentChoice && studentChoice === correctChoice) {
          part1Score += 0.25;
          part1CorrectCount += 1;
        }
      } else if (q.part === 2) {
        let correctSubCount = 0;
        const studentQ = answers.part2[q.id];
        if (studentQ && q.sub_items) {
          q.sub_items.forEach(sub => {
            const studentVal = studentQ[sub.label];
            if (studentVal !== null && studentVal === sub.is_true) {
              correctSubCount += 1;
            }
          });
        }
        part2Details[q.id] = correctSubCount;
        // Ministry 2025 rule for Part 2:
        // 1 correct: 0.1 pt
        // 2 correct: 0.25 pt
        // 3 correct: 0.50 pt
        // 4 correct: 1.00 pt
        if (correctSubCount === 1) part2Score += 0.1;
        else if (correctSubCount === 2) part2Score += 0.25;
        else if (correctSubCount === 3) part2Score += 0.50;
        else if (correctSubCount === 4) part2Score += 1.00;
      } else if (q.part === 3) {
        const studentAns = (answers.part3[q.id] || '').trim().replace(',', '.');
        const correctAns = (q.correct_answer || '').trim().replace(',', '.');
        // Check exact match or numerical close match
        const sNum = parseFloat(studentAns);
        const cNum = parseFloat(correctAns);
        if (!isNaN(sNum) && !isNaN(cNum) && Math.abs(sNum - cNum) < 0.01) {
          part3Score += 0.5;
          part3CorrectCount += 1;
        } else if (studentAns.toLowerCase() === correctAns.toLowerCase() && studentAns !== '') {
          part3Score += 0.5;
          part3CorrectCount += 1;
        }
      }
    });

    const totalScore = Math.round((part1Score + part2Score + part3Score) * 100) / 100;

    return {
      totalScore,
      part1Score,
      part2Score,
      part3Score,
      part1CorrectCount,
      part2Details,
      part3CorrectCount,
    };
  };

  const results = isSubmitted ? calculateScore() : null;

  const currentQuestion = questions.find(q => q.id === activeQuestionId) || questions[0];

  return (
    <div className="space-y-4">
      {/* Top Test Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-lg font-mono font-bold text-sm tracking-wider shadow-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={isRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục làm bài'}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-600" />}
            </button>
          )}

          <div className="text-xs text-slate-500 hidden sm:block">
            {isSubmitted ? (
              <span className="font-semibold text-emerald-600">Đã nộp bài và hoàn thành chấm điểm</span>
            ) : (
              <span>Thời gian làm bài: 90 phút • Chuẩn Bộ GD&ĐT 2025</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isSubmitted ? (
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn nộp bài thi ngay bây giờ?')) {
                  setIsSubmitted(true);
                  setIsRunning(false);
                }
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp Bài Thi & Chấm Điểm</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTimeLeft(90 * 60);
                setIsRunning(true);
                setAnswers({ part1: {}, part2: {}, part3: {} });
              }}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại Từ Đầu</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Card if Submitted */}
      {isSubmitted && results && (
        <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-indigo-700/50 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-700/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                  Kết Quả Thi Thử Trực Tuyến
                </span>
                <h3 className="text-2xl font-black tracking-tight">
                  {results.totalScore} / 10.0 Điểm
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10 text-center">
                <div className="text-slate-300">Phần I (3.0đ)</div>
                <div className="font-bold text-sm text-amber-300">{results.part1Score.toFixed(2)}đ</div>
              </div>
              <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10 text-center">
                <div className="text-slate-300">Phần II (4.0đ)</div>
                <div className="font-bold text-sm text-emerald-300">{results.part2Score.toFixed(2)}đ</div>
              </div>
              <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10 text-center">
                <div className="text-slate-300">Phần III (3.0đ)</div>
                <div className="font-bold text-sm text-cyan-300">{results.part3Score.toFixed(2)}đ</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-indigo-200 flex items-center justify-between">
            <span>
              Xếp loại: <b>{results.totalScore >= 8.0 ? 'Giỏi / Xuất sắc 🌟' : results.totalScore >= 6.5 ? 'Khá 👍' : results.totalScore >= 5.0 ? 'Đạt / Trung bình 📝' : 'Cần rèn luyện thêm 💪'}</b>
            </span>
            <span>Bạn có thể bấm vào từng câu hỏi bên dưới để xem đối chiếu đáp án và lời giải chi tiết.</span>
          </div>
        </div>
      )}

      {/* Main Split Interface: Left Question Reader + Right Digital OMR Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Active Question Reader (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {currentQuestion && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              {/* Question Meta */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                    C{currentQuestion.id}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-slate-800">
                      {currentQuestion.part === 1 ? 'Phần I: 4 Lựa chọn' : currentQuestion.part === 2 ? 'Phần II: Đúng / Sai' : 'Phần III: Trả lời ngắn'}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      Mức độ: {currentQuestion.level} • {currentQuestion.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentQuestion.id <= 1}
                    onClick={() => setActiveQuestionId(currentQuestion.id - 1)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium disabled:opacity-30 cursor-pointer"
                  >
                    Câu trước
                  </button>
                  <button
                    disabled={currentQuestion.id >= questions.length}
                    onClick={() => setActiveQuestionId(currentQuestion.id + 1)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium disabled:opacity-30 cursor-pointer"
                  >
                    Câu tiếp
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-slate-900 leading-relaxed text-sm">
                <MathText text={currentQuestion.question_text} />
              </div>

              {/* Part 1 Options Selector */}
              {currentQuestion.part === 1 && currentQuestion.options && (
                <div className="space-y-2 pt-2">
                  {(['A', 'B', 'C', 'D'] as const).map((key) => {
                    const optVal = currentQuestion.options?.[key];
                    if (!optVal) return null;
                    const isSelected = answers.part1[currentQuestion.id] === key;
                    const isCorrectAnswer = isSubmitted && currentQuestion.correct_answer === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectPart1(currentQuestion.id, key)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${
                          isCorrectAnswer
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                            : isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold ring-1 ring-blue-500'
                            : 'bg-slate-50/60 border-slate-200 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-300'
                        }`}>
                          {key}
                        </span>
                        <div className="flex-1 pt-0.5">
                          <MathText text={optVal} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Part 2 True/False Sub-items Selector */}
              {currentQuestion.part === 2 && currentQuestion.sub_items && (
                <div className="space-y-3 pt-2">
                  {currentQuestion.sub_items.map((sub) => {
                    const currentVal = answers.part2[currentQuestion.id]?.[sub.label];

                    return (
                      <div
                        key={sub.label}
                        className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-2 flex-1">
                          <span className="font-bold text-indigo-700 shrink-0">
                            {sub.label})
                          </span>
                          <div className="text-slate-800">
                            <MathText text={sub.text} />
                          </div>
                        </div>

                        {/* True/False Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleSelectPart2(currentQuestion.id, sub.label, true)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              currentVal === true
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'
                            }`}
                          >
                            Đúng
                          </button>

                          <button
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleSelectPart2(currentQuestion.id, sub.label, false)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              currentVal === false
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50'
                            }`}
                          >
                            Sai
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Part 3 Short Answer Input */}
              {currentQuestion.part === 3 && (
                <div className="pt-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nhập kết quả số của bạn:
                  </label>
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={answers.part3[currentQuestion.id] || ''}
                    onChange={(e) => handleInputPart3(currentQuestion.id, e.target.value)}
                    placeholder="Ví dụ: 3.5 hoặc -12"
                    className="w-full sm:w-64 p-2.5 font-mono text-base font-bold bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    * Ghi kết quả dưới dạng số thập phân hoặc số nguyên theo đúng yêu cầu đề bài.
                  </p>
                </div>
              )}

              {/* Explanation (Shown when submitted) */}
              {isSubmitted && (
                <div className="mt-4 p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 border-b border-blue-200 pb-1.5">
                    <span>HƯỚNG DẪN GIẢI CHI TIẾT</span>
                    <span className="font-mono">Đáp án chuẩn: {currentQuestion.correct_answer}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <MathText text={currentQuestion.explanation} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Digital OMR Answer Sheet (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Phiếu Trả Lời Trắc Nghiệm</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">22 Câu</span>
            </div>

            {/* PART I: 12 Questions Grid */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-600 uppercase">
                Phần I. Trắc nghiệm 4 lựa chọn
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {questions.filter(q => q.part === 1).map(q => {
                  const studentChoice = answers.part1[q.id];
                  const isActive = activeQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`flex items-center justify-between p-1.5 rounded-lg border cursor-pointer transition-all ${
                        isActive
                          ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-[11px] text-slate-700 w-7">
                        C{q.id}
                      </span>
                      <div className="flex items-center gap-1">
                        {(['A', 'B', 'C', 'D'] as const).map(opt => {
                          const isPicked = studentChoice === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={isSubmitted}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectPart1(q.id, opt);
                                setActiveQuestionId(q.id);
                              }}
                              className={`h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                                isPicked
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PART II: 4 Questions True/False Grid */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-600 uppercase">
                Phần II. Đúng / Sai
              </div>
              <div className="space-y-1.5 text-xs">
                {questions.filter(q => q.part === 2).map(q => {
                  const qAns = answers.part2[q.id] || { a: null, b: null, c: null, d: null };
                  const isActive = activeQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[11px] text-slate-800">Câu {q.id}</span>
                        {isSubmitted && results && (
                          <span className="text-[10px] font-semibold text-indigo-700">
                            Đúng {results.part2Details[q.id] || 0}/4 ý
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center">
                        {(['a', 'b', 'c', 'd'] as const).map(lbl => {
                          const val = qAns[lbl];
                          return (
                            <div key={lbl} className="bg-white p-1 rounded border border-slate-200 text-[10px]">
                              <span className="font-bold text-slate-600">{lbl}: </span>
                              <span className={val === true ? 'text-emerald-700 font-bold' : val === false ? 'text-rose-700 font-bold' : 'text-slate-400'}>
                                {val === true ? 'Đ' : val === false ? 'S' : '-'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PART III: 6 Short Answer Inputs */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-600 uppercase">
                Phần III. Trả lời ngắn
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {questions.filter(q => q.part === 3).map(q => {
                  const val = answers.part3[q.id] || '';
                  const isActive = activeQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`flex items-center justify-between p-1.5 rounded-lg border cursor-pointer ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-[11px] text-slate-700">C{q.id}</span>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-800 truncate max-w-[80px]">
                        {val || '___'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
