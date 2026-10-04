import React, { useState } from 'react';
import { Copy, Check, Download, Code2 } from 'lucide-react';
import { ExamResponse } from '../types/exam';

interface RawJsonViewerProps {
  examData: ExamResponse;
}

export const RawJsonViewer: React.FC<RawJsonViewerProps> = ({ examData }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const jsonString = JSON.stringify(examData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `De_Thi_Toan_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Dữ Liệu JSON Chuẩn Đầu Ra (Theo Schema)
            </h3>
            <p className="text-[11px] text-slate-500">
              Định dạng JSON hợp lệ duy nhất bao gồm preview_text và data.questions
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
                <span>Sao chép JSON</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải tệp .json</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-800">
        <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
          {jsonString}
        </pre>
      </div>
    </div>
  );
};
