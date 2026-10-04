/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorModal } from './components/GeneratorModal';
import { InteractiveQuestionsList } from './components/InteractiveQuestionsList';
import { ExamPrintPaper } from './components/ExamPrintPaper';
import { ExamTestMode } from './components/ExamTestMode';
import { RawJsonViewer } from './components/RawJsonViewer';
import { PreviewTextViewer } from './components/PreviewTextViewer';
import { EditQuestionModal } from './components/EditQuestionModal';
import { DEFAULT_EXAM_PAYLOAD } from './data/presetExams';
import { ExamResponse, Question } from './types/exam';
import { WordUploadZone } from './components/WordUploadZone';
import { 
  Sparkles, 
  BarChart3, 
  Layers, 
  CheckCircle, 
  BookOpen, 
  ShieldCheck,
  FileText,
  FileCheck,
  FileUp,
  ArrowRight,
  FolderUp
} from 'lucide-react';

export default function App() {
  const [exam, setExam] = useState<ExamResponse>(DEFAULT_EXAM_PAYLOAD);
  const [activeTab, setActiveTab] = useState<'interactive' | 'paper' | 'preview_text' | 'json' | 'test_mode'>('interactive');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Uploaded word files state
  const [matrixText, setMatrixText] = useState<string>('');
  const [sampleExamText, setSampleExamText] = useState<string>('');
  const [matrixFileName, setMatrixFileName] = useState<string>('');
  const [sampleExamFileName, setSampleExamFileName] = useState<string>('');
  const [showUploadPanel, setShowUploadPanel] = useState<boolean>(true);

  // Statistics
  const questions = exam.data?.questions || [];
  const part1Count = questions.filter(q => q.part === 1).length;
  const part2Count = questions.filter(q => q.part === 2).length;
  const part3Count = questions.filter(q => q.part === 3).length;

  const nbCount = questions.filter(q => q.level === 'Nhận biết').length;
  const thCount = questions.filter(q => q.level === 'Thông hiểu').length;
  const vdCount = questions.filter(q => q.level === 'Vận dụng').length;
  const vdcCount = questions.filter(q => q.level === 'Vận dụng cao').length;
  const total = questions.length || 1;

  // Handle updated question from interactive editor or verification
  const handleUpdateQuestion = (updated: Question) => {
    setExam(prev => {
      const updatedQuestions = prev.data.questions.map(q => q.id === updated.id ? updated : q);
      return {
        ...prev,
        data: {
          ...prev.data,
          questions: updatedQuestions,
        },
      };
    });
  };

  // Export to Microsoft Word (.doc)
  const handleExportWord = async () => {
    try {
      const response = await fetch('/api/export-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: exam.data.exam_title,
          questions: exam.data.questions,
          includeAnswers: true,
          previewText: exam.preview_text,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể tải xuống tệp Word');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `De_Thi_Toan_${exam.data.grade || '12'}_GDPT_2018.doc`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xuất tệp Word');
    }
  };

  // Export to JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(exam, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `De_Thi_Toan_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('Khôi phục đề thi mẫu chuẩn Bộ GD&ĐT 2025?')) {
      setExam(DEFAULT_EXAM_PAYLOAD);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onExportWord={handleExportWord}
        onExportJson={handleExportJson}
        onResetToDefault={handleResetToDefault}
        examTitle={exam.data?.exam_title}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        
        {/* Dedicated Word Upload Panel for Matrix & Sample Exam */}
        <div className="no-print bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-indigo-700/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <FolderUp className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold tracking-tight text-white">
                    Tải Lên File Word Ma Trận & Form Đề (.docx / .doc)
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Word Parser Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Tải lên trực tiếp 2 file Word của bạn để AI phân tích dạng bài, mức độ và sinh ra bộ đề mới tương đương.
                </p>
              </div>
            </div>

            {(matrixText || sampleExamText) && (
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>Bắt Đầu Tạo Đề Từ File Này</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2 Side-by-Side Word Upload Dropzones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Box 1: Matrix Word File */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
              <WordUploadZone
                label="1. File Word Ma Trận Đề Thi (.docx / .doc)"
                subLabel="Bảng phân phối mức độ và bài học"
                value={matrixText}
                fileName={matrixFileName}
                placeholder="Nhấp hoặc kéo thả File Word MA TRẬN (.docx)"
                onContentExtracted={(text, fName) => {
                  setMatrixText(text);
                  setMatrixFileName(fName);
                }}
              />
            </div>

            {/* Box 2: Sample Exam Word File */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
              <WordUploadZone
                label="2. File Word Đề Mẫu / Form Đề (.docx / .doc)"
                subLabel="Đề tham khảo mẫu để AI bám sát dạng câu"
                value={sampleExamText}
                fileName={sampleExamFileName}
                placeholder="Nhấp hoặc kéo thả File Word ĐỀ MẪU (.docx)"
                onContentExtracted={(text, fName) => {
                  setSampleExamText(text);
                  setSampleExamFileName(fName);
                }}
              />
            </div>
          </div>
        </div>

        {/* Exam Overview & Matrix Metrics Bar (hidden in print) */}
        <div className="no-print bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ma Trận Hiện Hành
                </span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                  Lớp {exam.data?.grade || '12'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                {exam.data?.exam_title || 'Đề Thi Môn Toán'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
                {exam.data?.matrix_summary || 'Cấu trúc định dạng mới theo Thông tư của Bộ GD&ĐT với 3 phần thi độc lập.'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200/60 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Đổi Ma Trận / Tạo Lại</span>
              </button>
            </div>
          </div>

          {/* Matrix Ratio Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2 border-t border-slate-100 text-xs">
            {/* Parts distribution */}
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">Phần I (4 lựa chọn)</div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">{part1Count} câu (3.0đ)</div>
            </div>

            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">Phần II (Đúng/Sai)</div>
              <div className="font-bold text-indigo-900 text-xs mt-0.5">{part2Count} câu (4.0đ)</div>
            </div>

            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">Phần III (Trả lời ngắn)</div>
              <div className="font-bold text-emerald-900 text-xs mt-0.5">{part3Count} câu (3.0đ)</div>
            </div>

            {/* Levels distribution */}
            <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100/60">
              <div className="text-[10px] text-blue-600 font-medium">Nhận biết</div>
              <div className="font-bold text-blue-900 text-xs mt-0.5">
                {nbCount} câu ({Math.round((nbCount / total) * 100)}%)
              </div>
            </div>

            <div className="bg-teal-50/50 p-2 rounded-lg border border-teal-100/60">
              <div className="text-[10px] text-teal-600 font-medium">Thông hiểu</div>
              <div className="font-bold text-teal-900 text-xs mt-0.5">
                {thCount} câu ({Math.round((thCount / total) * 100)}%)
              </div>
            </div>

            <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100/60">
              <div className="text-[10px] text-amber-600 font-medium">Vận dụng</div>
              <div className="font-bold text-amber-900 text-xs mt-0.5">
                {vdCount} câu ({Math.round((vdCount / total) * 100)}%)
              </div>
            </div>

            <div className="bg-rose-50/50 p-2 rounded-lg border border-rose-100/60">
              <div className="text-[10px] text-rose-600 font-medium">Vận dụng cao</div>
              <div className="font-bold text-rose-900 text-xs mt-0.5">
                {vdcCount} câu ({Math.round((vdcCount / total) * 100)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Tab View Container */}
        <div>
          {activeTab === 'interactive' && (
            <InteractiveQuestionsList
              questions={exam.data?.questions || []}
              onEditQuestion={(q) => setEditingQuestion(q)}
              onUpdateQuestion={handleUpdateQuestion}
            />
          )}

          {activeTab === 'paper' && (
            <ExamPrintPaper
              examTitle={exam.data?.exam_title}
              questions={exam.data?.questions || []}
              onExportWord={handleExportWord}
            />
          )}

          {activeTab === 'preview_text' && (
            <PreviewTextViewer previewText={exam.preview_text} />
          )}

          {activeTab === 'test_mode' && (
            <ExamTestMode
              questions={exam.data?.questions || []}
              examTitle={exam.data?.exam_title}
            />
          )}

          {activeTab === 'json' && (
            <RawJsonViewer examData={exam} />
          )}
        </div>
      </main>

      {/* Footer (hidden in print) */}
      <footer className="no-print border-t border-slate-200 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Chuyên Gia Thiết Kế Đề Thi Môn Toán</span>
            <span>• Chuẩn Cấu Trúc Bộ GD&ĐT GDPT 2018</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Định dạng công thức $LaTeX$ / MathType</span>
            <span>Gemini AI Engine</span>
          </div>
        </div>
      </footer>

      {/* Generator Modal */}
      <GeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        initialMatrixText={matrixText}
        initialSampleExamText={sampleExamText}
        initialMatrixFileName={matrixFileName}
        initialSampleExamFileName={sampleExamFileName}
        onExamGenerated={(newExam) => {
          setExam(newExam);
          setActiveTab('interactive');
        }}
      />

      {/* Question Inline Edit Modal */}
      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={handleUpdateQuestion}
        />
      )}
    </div>
  );
}
