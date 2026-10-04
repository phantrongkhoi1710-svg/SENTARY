import React, { useState } from 'react';
import { Copy, Check, FileText, Printer } from 'lucide-react';
import MathText from '../utils/mathRenderer';

interface PreviewTextViewerProps {
  previewText: string;
}

export const PreviewTextViewer: React.FC<PreviewTextViewerProps> = ({ previewText }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(previewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Bản Xem Trước Bộ Đề Thi (preview_text)
            </h3>
            <p className="text-[11px] text-slate-500">
              Định dạng văn bản hiển thị đẹp mắt, rõ ràng từng phần 1, 2, 3 bằng Tiếng Việt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép toàn bộ văn bản</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs leading-relaxed text-slate-800 text-xs sm:text-sm font-sans whitespace-pre-wrap">
        <MathText text={previewText} />
      </div>
    </div>
  );
};
