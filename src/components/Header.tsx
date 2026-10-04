import React from 'react';
import { 
  Sparkles, 
  Printer, 
  FileText, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  PlayCircle,
  RotateCcw
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'interactive' | 'paper' | 'preview_text' | 'json' | 'test_mode';
  setActiveTab: (tab: 'interactive' | 'paper' | 'preview_text' | 'json' | 'test_mode') => void;
  onOpenGenerator: () => void;
  onExportWord: () => void;
  onExportJson: () => void;
  onResetToDefault: () => void;
  examTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenGenerator,
  onExportWord,
  onExportJson,
  onResetToDefault,
  examTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px]">
              Chương trình GDPT 2018
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-200 font-medium hidden sm:inline">
              Định dạng cấu trúc đề thi Tốt nghiệp THPT & Kiểm tra định kỳ 2025
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="hidden md:inline text-slate-400">LaTeX / MathType Standard</span>
            <span className="bg-indigo-500/30 px-2 py-0.5 rounded text-[11px] font-mono text-indigo-200">
              Gemini AI Powered
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Chuyên Gia Thiết Kế Đề Thi Toán Cấp 3
                </h1>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-md font-semibold">
                  Ma Trận & Đề Mẫu
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-md">
                {examTitle || 'Bộ đề thi chuẩn Bộ Giáo dục & Đào tạo với công thức LaTeX và lời giải'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenGenerator}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-2 rounded-lg font-semibold text-xs shadow-md shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Tạo Đề Mới (AI)</span>
            </button>

            <button
              onClick={onOpenGenerator}
              className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
              title="Tải lên tệp Word Ma trận và Form đề (.docx / .doc)"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Nạp File Word Ma Trận & Đề</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('test_mode');
              }}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Làm Bài Thi</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <button
              onClick={onExportWord}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-medium text-xs border border-slate-300 transition-colors cursor-pointer"
              title="Xuất tệp Word (.doc) tương thích MathType"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Xuất Word</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('paper');
                setTimeout(() => window.print(), 250);
              }}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-medium text-xs border border-slate-300 transition-colors cursor-pointer"
              title="In hoặc lưu dạng PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">In / PDF</span>
            </button>

            <button
              onClick={onResetToDefault}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Tải lại đề thi mẫu chuẩn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 mt-3 border-t border-slate-100 pt-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'interactive'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            📋 Chi Tiết & Lời Giải
          </button>

          <button
            onClick={() => setActiveTab('paper')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'paper'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            📄 Bản In Chuẩn Bộ GD&ĐT
          </button>

          <button
            onClick={() => setActiveTab('preview_text')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'preview_text'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            👁️ Bản Xem Trước (preview_text)
          </button>

          <button
            onClick={() => setActiveTab('test_mode')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'test_mode'
                ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🎯 Chế Độ Thi Thử (Phiếu OMR)
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Dữ Liệu JSON Chuẩn</span>
          </button>
        </div>
      </div>
    </header>
  );
};
