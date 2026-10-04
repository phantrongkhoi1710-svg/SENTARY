import React, { useState } from 'react';
import { Question, DifficultyLevel } from '../types/exam';
import MathText from '../utils/mathRenderer';
import { X, Check, Eye } from 'lucide-react';

interface EditQuestionModalProps {
  question: Question | null;
  onClose: () => void;
  onSave: (updated: Question) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  question,
  onClose,
  onSave,
}) => {
  if (!question) return null;

  const [level, setLevel] = useState<DifficultyLevel>(question.level);
  const [topic, setTopic] = useState<string>(question.topic);
  const [questionText, setQuestionText] = useState<string>(question.question_text);
  const [options, setOptions] = useState(question.options || { A: '', B: '', C: '', D: '' });
  const [correctAnswer, setCorrectAnswer] = useState<string>(question.correct_answer);
  const [explanation, setExplanation] = useState<string>(question.explanation);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(true);

  const handleSave = () => {
    const updated: Question = {
      ...question,
      level,
      topic,
      question_text: questionText,
      options,
      correct_answer: correctAnswer,
      explanation,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <h3 className="text-sm font-bold">
              Chỉnh Sửa Câu {question.id} (Phần {question.part})
            </h3>
            <p className="text-[11px] text-slate-400">
              Công thức toán tự động cập nhật KaTeX xem trước thời gian thực
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mức Độ Tư Duy</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as DifficultyLevel)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              >
                <option value="Nhận biết">Nhận biết</option>
                <option value="Thông hiểu">Thông hiểu</option>
                <option value="Vận dụng">Vận dụng</option>
                <option value="Vận dụng cao">Vận dụng cao</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chủ Đề / Bài Học</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Nội Dung Câu Hỏi (chứa LaTeX $...$):</label>
              <button
                type="button"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="text-[11px] text-blue-600 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3 h-3" />
                <span>{showLivePreview ? 'Ẩn xem trước' : 'Xem trước KaTeX'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2.5 font-mono bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white resize-none"
            />
            {showLivePreview && (
              <div className="mt-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-slate-900">
                <div className="text-[10px] font-bold text-blue-800 uppercase mb-1">Xem trước công thức:</div>
                <MathText text={questionText} />
              </div>
            )}
          </div>

          {/* Part 1 Options */}
          {question.part === 1 && (
            <div>
              <label className="font-semibold text-slate-700 mb-1.5 block">Các Phương Án Lựa Chọn:</label>
              <div className="grid grid-cols-2 gap-2">
                {(['A', 'B', 'C', 'D'] as const).map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-4">{key}.</span>
                    <input
                      type="text"
                      value={options[key] || ''}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct Answer */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Đáp Án Đúng:</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              placeholder="Ví dụ: A (đối với phần 1) hoặc a: Đúng, b: Sai... hoặc 3.5 (phần 3)"
            />
          </div>

          {/* Explanation */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Lời Giải Chi Tiết (chứa LaTeX $...$):</label>
            <textarea
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full p-2.5 font-mono bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white resize-none"
            />
            {showLivePreview && (
              <div className="mt-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-slate-900">
                <div className="text-[10px] font-bold text-blue-800 uppercase mb-1">Xem trước lời giải:</div>
                <MathText text={explanation} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Lưu Thay Đổi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
