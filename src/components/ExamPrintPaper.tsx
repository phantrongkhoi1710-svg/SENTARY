import React, { useState } from 'react';
import { Question } from '../types/exam';
import MathText from '../utils/mathRenderer';
import { Printer, Download, Eye, EyeOff } from 'lucide-react';

interface ExamPrintPaperProps {
  examTitle: string;
  questions: Question[];
  onExportWord: () => void;
}

export const ExamPrintPaper: React.FC<ExamPrintPaperProps> = ({
  examTitle,
  questions,
  onExportWord,
}) => {
  const [includeSolutions, setIncludeSolutions] = useState<boolean>(false);

  const part1Questions = questions.filter(q => q.part === 1);
  const part2Questions = questions.filter(q => q.part === 2);
  const part3Questions = questions.filter(q => q.part === 3);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Print Controls (Hidden during print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span>In kèm Bảng Đáp Án & Lời Giải Chi Tiết ở cuối đề</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportWord}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Tải Tệp Word (.doc)</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In Đề Thi (A4) / Lưu PDF</span>
          </button>
        </div>
      </div>

      {/* Official Exam Sheet Container (Formatted for A4) */}
      <div className="exam-page-container bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto math-font text-slate-900 leading-normal text-[14px]">
        
        {/* National Exam Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center font-bold text-xs uppercase tracking-tight">
              <p>BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
              <p className="mt-0.5 text-blue-900 font-extrabold">ĐỀ THI THAM KHẢO CHUẨN</p>
              <p className="font-normal italic normal-case text-[11px] text-slate-600 mt-1">
                (Đề thi có {questions.length} câu)
              </p>
            </div>

            <div className="text-center text-xs">
              <p className="font-extrabold uppercase text-slate-900">
                KỲ THI TỐT NGHIỆP TRUNG HỌC PHỔ THÔNG TỪ NĂM 2025
              </p>
              <p className="font-bold text-slate-900 mt-0.5">
                Bài thi: TOÁN HỌC
              </p>
              <p className="italic text-[11px] text-slate-700 mt-0.5">
                Thời gian làm bài: 90 phút, không kể thời gian phát đề
              </p>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="mt-4 pt-3 border-t border-dashed border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="sm:col-span-2">
              <span className="font-bold">Họ và tên thí sinh:</span> ..........................................................................
            </div>
            <div>
              <span className="font-bold">Số báo danh:</span> .........................
            </div>
            <div className="sm:col-span-3 flex justify-between items-center text-[11px] text-slate-500 pt-1">
              <span>Mã đề thi: <b>101</b></span>
              <span>Chương trình GDPT 2018</span>
            </div>
          </div>
        </div>

        {/* Exam Title */}
        <div className="text-center mb-6">
          <h2 className="font-bold text-base uppercase text-slate-900 tracking-wide">
            {examTitle || 'ĐỀ THI MÔN TOÁN'}
          </h2>
        </div>

        {/* PART 1 */}
        {part1Questions.length > 0 && (
          <div className="mb-8">
            <div className="font-bold text-sm uppercase text-slate-900 mb-3 pb-1 border-b border-slate-400">
              PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn.
            </div>
            <p className="italic text-xs text-slate-700 mb-4">
              Thí sinh trả lời từ câu 1 đến câu {part1Questions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.
            </p>

            <div className="space-y-4">
              {part1Questions.map((q) => (
                <div key={q.id} className="exam-question-item text-justify">
                  <p className="leading-relaxed">
                    <span className="font-bold">Câu {q.id}. </span>
                    <MathText text={q.question_text} />
                  </p>

                  {q.options && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 ml-4">
                      {(['A', 'B', 'C', 'D'] as const).map((key) => {
                        const val = q.options?.[key];
                        if (!val) return null;
                        return (
                          <div key={key} className="flex items-start gap-1">
                            <span className="font-bold">{key}.</span>
                            <span><MathText text={val} /></span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PART 2 */}
        {part2Questions.length > 0 && (
          <div className="mb-8">
            <div className="font-bold text-sm uppercase text-slate-900 mb-3 pb-1 border-b border-slate-400">
              PHẦN II. Câu trắc nghiệm đúng sai.
            </div>
            <p className="italic text-xs text-slate-700 mb-4">
              Thí sinh trả lời từ câu {part1Questions.length + 1} đến câu {part1Questions.length + part2Questions.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.
            </p>

            <div className="space-y-5">
              {part2Questions.map((q) => (
                <div key={q.id} className="exam-question-item text-justify">
                  <p className="leading-relaxed">
                    <span className="font-bold">Câu {q.id}. </span>
                    <MathText text={q.question_text} />
                  </p>

                  <div className="mt-2 space-y-1.5 ml-4">
                    {q.sub_items && q.sub_items.length > 0 ? (
                      q.sub_items.map((sub) => (
                        <div key={sub.label} className="flex items-start gap-2">
                          <span className="font-bold">{sub.label})</span>
                          <span><MathText text={sub.text} /></span>
                        </div>
                      ))
                    ) : (
                      q.options && Object.entries(q.options).map(([k, v]) => (
                        <div key={k} className="flex items-start gap-2">
                          <span className="font-bold">{k.toLowerCase()})</span>
                          <span><MathText text={v || ''} /></span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PART 3 */}
        {part3Questions.length > 0 && (
          <div className="mb-8">
            <div className="font-bold text-sm uppercase text-slate-900 mb-3 pb-1 border-b border-slate-400">
              PHẦN III. Câu trắc nghiệm trả lời ngắn.
            </div>
            <p className="italic text-xs text-slate-700 mb-4">
              Thí sinh trả lời từ câu {part1Questions.length + part2Questions.length + 1} đến câu {questions.length}. Thí sinh điền kết quả vào ô tương ứng trên phiếu trả lời.
            </p>

            <div className="space-y-5">
              {part3Questions.map((q) => (
                <div key={q.id} className="exam-question-item text-justify">
                  <p className="leading-relaxed">
                    <span className="font-bold">Câu {q.id}. </span>
                    <MathText text={q.question_text} />
                  </p>
                  <p className="italic text-slate-500 text-xs mt-1 ml-4">
                    Trả lời: ......................................................
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center font-bold text-xs uppercase tracking-wider border-t border-slate-300 pt-4 mt-8">
          ---------- HẾT ----------
        </div>

        {/* OPTIONAL SOLUTIONS APPENDIX */}
        {includeSolutions && (
          <div className="page-break mt-12 pt-8 border-t-2 border-slate-800">
            <div className="text-center mb-6">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                ĐÁP ÁN & HƯỚNG DẪN GIẢI CHI TIẾT
              </h3>
              <p className="text-xs text-slate-600 italic">
                (Tài liệu dành cho giáo viên và thí sinh tự đối soát)
              </p>
            </div>

            {/* Quick Answer Key Table */}
            <div className="mb-8">
              <div className="font-bold text-xs uppercase text-slate-800 mb-2">
                1. BẢNG ĐÁP ÁN NHANH:
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 text-center text-xs">
                {questions.map((q) => (
                  <div key={q.id} className="border border-slate-300 rounded p-1">
                    <div className="font-bold text-slate-600 bg-slate-100 py-0.5 text-[10px]">
                      Câu {q.id}
                    </div>
                    <div className="font-bold text-red-700 py-0.5 truncate text-[11px]">
                      {q.part === 1 ? q.correct_answer : q.part === 3 ? q.correct_answer : 'Xem dưới'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Explanations */}
            <div className="space-y-5">
              <div className="font-bold text-xs uppercase text-slate-800 mb-2">
                2. LỜI GIẢI CHI TIẾT TỪNG CÂU:
              </div>
              {questions.map((q) => (
                <div key={q.id} className="exam-question-item text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                    <span>Câu {q.id} ({q.level} - {q.topic})</span>
                    <span className="text-red-700 font-mono">Đáp án: {q.correct_answer}</span>
                  </div>
                  <div className="text-slate-800 leading-relaxed font-sans">
                    <MathText text={q.explanation} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
