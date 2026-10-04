import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  Sliders, 
  HelpCircle, 
  Loader2, 
  Check, 
  AlertCircle,
  FileCheck2,
  Cpu,
  FileUp,
  FileText
} from 'lucide-react';
import { EXAM_PRESETS } from '../data/presetExams';
import { ExamResponse } from '../types/exam';
import { WordUploadZone } from './WordUploadZone';

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExamGenerated: (exam: ExamResponse) => void;
  initialMatrixText?: string;
  initialSampleExamText?: string;
  initialMatrixFileName?: string;
  initialSampleExamFileName?: string;
}

export const GeneratorModal: React.FC<GeneratorModalProps> = ({
  isOpen,
  onClose,
  onExamGenerated,
  initialMatrixText,
  initialSampleExamText,
  initialMatrixFileName,
  initialSampleExamFileName,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('thpt-2025');
  const [inputMode, setInputMode] = useState<'upload_word' | 'preset' | 'manual'>('upload_word');
  const [grade, setGrade] = useState<'12' | '11' | '10'>('12');
  const [examType, setExamType] = useState<string>('thpt_quoc_gia');
  
  const [matrixText, setMatrixText] = useState<string>(initialMatrixText || EXAM_PRESETS[0].matrixText);
  const [sampleExamText, setSampleExamText] = useState<string>(initialSampleExamText || EXAM_PRESETS[0].sampleExamText);
  const [matrixFileName, setMatrixFileName] = useState<string | undefined>(initialMatrixFileName);
  const [sampleExamFileName, setSampleExamFileName] = useState<string | undefined>(initialSampleExamFileName);

  const [part1Count, setPart1Count] = useState<number>(12);
  const [part2Count, setPart2Count] = useState<number>(4);
  const [part3Count, setPart3Count] = useState<number>(6);
  const [variationStyle, setVariationStyle] = useState<'identical_structure' | 'practical_context' | 'enhanced_differentiation'>('identical_structure');
  const [customInstructions, setCustomInstructions] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = EXAM_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setGrade(preset.grade);
      setMatrixText(preset.matrixText);
      setSampleExamText(preset.sampleExamText);
      setMatrixFileName(undefined);
      setSampleExamFileName(undefined);
      setPart1Count(preset.part1Count);
      setPart2Count(preset.part2Count);
      setPart3Count(preset.part3Count);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setLoadingStep('Đang phân tích cấu trúc ma trận và đề mẫu từ tệp Word...');

    try {
      setTimeout(() => {
        setLoadingStep('Đang đổi mới ngữ cảnh, biến đổi số liệu & hàm số tương đương...');
      }, 2000);

      setTimeout(() => {
        setLoadingStep('Đang thẩm định tính chính xác 100% của đáp án và lời giải...');
      }, 4800);

      setTimeout(() => {
        setLoadingStep('Đang chuẩn hóa cú pháp LaTeX và đóng gói JSON...');
      }, 7800);

      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matrix: matrixText,
          sampleExam: sampleExamText,
          grade,
          examType,
          questionCounts: {
            part1: part1Count,
            part2: part2Count,
            part3: part3Count,
          },
          variationStyle,
          customInstructions,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Không thể tạo đề thi từ Gemini AI');
      }

      onExamGenerated(data.result);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Lỗi khi gọi API tạo đề thi. Vui lòng kiểm tra lại.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                Thiết Kế Đề Thi Mới Từ Ma Trận & Đề Mẫu (Gemini AI)
              </h2>
              <p className="text-xs text-slate-300">
                Hỗ trợ tải lên tệp Microsoft Word (.docx / .doc) • Phân tích & sáng tạo đề tương đương
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <p className="font-semibold text-xs">Đã xảy ra lỗi khi tạo đề:</p>
                <p className="text-xs mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>1. Phương Thức Cung Cấp Ma Trận & Đề Mẫu:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setInputMode('upload_word')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                  inputMode === 'upload_word'
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${inputMode === 'upload_word' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <FileUp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold">Tải Tệp Word (.docx)</div>
                  <div className="text-[11px] text-slate-500 font-normal">File Ma trận & Form đề</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('preset')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                  inputMode === 'preset'
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${inputMode === 'preset' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold">Ma Trận Chuẩn Bộ GD&ĐT</div>
                  <div className="text-[11px] text-slate-500 font-normal">4 mẫu đề định dạng 2025</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('manual')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                  inputMode === 'manual'
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${inputMode === 'manual' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold">Nhập Tay / Dán Văn Bản</div>
                  <div className="text-[11px] text-slate-500 font-normal">Soạn thảo trực tiếp</div>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION A: WORD UPLOAD MODE */}
          {inputMode === 'upload_word' && (
            <div className="space-y-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File 1: Matrix Word File */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <WordUploadZone
                    label="Tệp 1: File Word Ma Trận Đề Thi (.docx / .doc)"
                    subLabel="Bảng tỉ lệ các mức độ nhận thức"
                    value={matrixText}
                    fileName={matrixFileName}
                    placeholder="Kéo thả hoặc nhấp để tải File Word MA TRẬN (.docx)"
                    onContentExtracted={(text, fName) => {
                      setMatrixText(text);
                      setMatrixFileName(fName);
                    }}
                  />
                  <div className="pt-2">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Nội dung ma trận trích xuất từ Word (có thể chỉnh sửa):
                    </label>
                    <textarea
                      rows={5}
                      value={matrixText}
                      onChange={(e) => setMatrixText(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 resize-none"
                      placeholder="Nội dung file ma trận sẽ tự động xuất hiện ở đây sau khi tải lên..."
                    />
                  </div>
                </div>

                {/* File 2: Sample Exam Word File */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <WordUploadZone
                    label="Tệp 2: File Word Đề Mẫu / Form Đề (.docx / .doc)"
                    subLabel="Đề thi mẫu để AI bám sát dạng toán"
                    value={sampleExamText}
                    fileName={sampleExamFileName}
                    placeholder="Kéo thả hoặc nhấp để tải File Word ĐỀ MẪU (.docx)"
                    onContentExtracted={(text, fName) => {
                      setSampleExamText(text);
                      setSampleExamFileName(fName);
                    }}
                  />
                  <div className="pt-2">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Nội dung đề mẫu trích xuất từ Word (có thể chỉnh sửa):
                    </label>
                    <textarea
                      rows={5}
                      value={sampleExamText}
                      onChange={(e) => setSampleExamText(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 resize-none"
                      placeholder="Nội dung file đề mẫu sẽ tự động xuất hiện ở đây sau khi tải lên..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION B: PRESETS SELECTOR */}
          {inputMode === 'preset' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXAM_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">
                          {preset.title}
                        </span>
                        {isSelected && (
                          <span className="h-4 w-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {preset.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-600">
                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                          Lớp {preset.grade}
                        </span>
                        <span>
                          P1: {preset.part1Count}c | P2: {preset.part2Count}c | P3: {preset.part3Count}c
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION C: MANUAL TEXTAREA INPUT */}
          {inputMode === 'manual' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-800 mb-1.5 block">
                  Ma Trận Đề Thi (Dán văn bản)
                </label>
                <textarea
                  value={matrixText}
                  onChange={(e) => setMatrixText(e.target.value)}
                  rows={8}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Dán nội dung ma trận đề thi vào đây..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 mb-1.5 block">
                  Đề Mẫu Tương Ứng (Dán văn bản)
                </label>
                <textarea
                  value={sampleExamText}
                  onChange={(e) => setSampleExamText(e.target.value)}
                  rows={8}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Dán các câu hỏi đề mẫu tham khảo..."
                />
              </div>
            </div>
          )}

          {/* Settings Grid */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>2. Cấu Hình Đề Thi & Phong Cách Biến Đổi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Grade */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Khối Lớp</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                >
                  <option value="12">Lớp 12 (Trọng tâm tốt nghiệp)</option>
                  <option value="11">Lớp 11 (GDPT 2018)</option>
                  <option value="10">Lớp 10 (GDPT 2018)</option>
                </select>
              </div>

              {/* Variation Style */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Định Hướng Sáng Tạo Đề Tương Đương</label>
                <select
                  value={variationStyle}
                  onChange={(e) => setVariationStyle(e.target.value as any)}
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                >
                  <option value="identical_structure">
                    Chuẩn Cấu Trúc: Giữ nguyên mức độ, biến đổi hàm số/hình học & số liệu
                  </option>
                  <option value="practical_context">
                    Ứng Dụng Thực Tế: Tăng cường bài toán mô hình thực tiễn (Kinh tế, Sinh học, Vật lý)
                  </option>
                  <option value="enhanced_differentiation">
                    Phân Hóa Sâu: Bẫy trắc nghiệm tinh tế, đòi hỏi tư duy bản chất toán học
                  </option>
                </select>
              </div>
            </div>

            {/* Question counts */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Số Lượng Câu Hỏi Các Phần (Chuẩn Bộ: 12 + 4 + 6 = 22 câu):
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-medium">Phần I (4 lựa chọn)</div>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={part1Count}
                    onChange={(e) => setPart1Count(parseInt(e.target.value) || 12)}
                    className="w-16 mx-auto text-center font-bold text-sm text-blue-600 border border-slate-200 rounded py-0.5 mt-1"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">0.25đ / câu</div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-medium">Phần II (Đúng/Sai)</div>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={part2Count}
                    onChange={(e) => setPart2Count(parseInt(e.target.value) || 4)}
                    className="w-16 mx-auto text-center font-bold text-sm text-indigo-600 border border-slate-200 rounded py-0.5 mt-1"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">Tối đa 1.0đ / câu</div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 font-medium">Phần III (Trả lời ngắn)</div>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={part3Count}
                    onChange={(e) => setPart3Count(parseInt(e.target.value) || 6)}
                    className="w-16 mx-auto text-center font-bold text-sm text-emerald-600 border border-slate-200 rounded py-0.5 mt-1"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">0.5đ / câu</div>
                </div>
              </div>
            </div>

            {/* Custom Teacher Instructions */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Ghi Chú & Yêu Cầu Riêng Của Giáo Viên (Tùy chọn):
              </label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Ví dụ: Tập trung bài toán tối ưu chi phí, bài toán Oxyz tọa độ hóa không gian..."
                className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Đảm bảo 100% công thức $LaTeX$, bảng biến thiên và lời giải chi tiết.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 sm:flex-none px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-60 cursor-pointer min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingStep || 'Đang biên soạn đề...'}</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4 text-amber-300" />
                  <span>Phân Tích & Tạo Đề Thi Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
