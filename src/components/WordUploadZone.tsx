import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  RefreshCw,
  Eye,
  FileCheck
} from 'lucide-react';

interface WordUploadZoneProps {
  label: string;
  subLabel?: string;
  value: string;
  onContentExtracted: (text: string, fileName: string) => void;
  fileName?: string;
  placeholder?: string;
}

export const WordUploadZone: React.FC<WordUploadZoneProps> = ({
  label,
  subLabel,
  value,
  onContentExtracted,
  fileName: initialFileName,
  placeholder = 'Nhấp hoặc kéo thả tệp Word (.docx) vào đây...',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string | null>(initialFileName || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    // Check extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'docx' && ext !== 'doc' && ext !== 'txt') {
      setErrorMsg('Vui lòng chọn tệp Word (.docx, .doc) hoặc tệp văn bản (.txt)');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // If it's pure txt
      if (ext === 'txt') {
        const text = await file.text();
        setCurrentFileName(file.name);
        onContentExtracted(text, file.name);
        setIsLoading(false);
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const response = await fetch('/api/parse-word-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileBase64: base64Data,
              fileName: file.name,
            }),
          });

          const data = await response.json();
          if (!response.ok || !data.success) {
            throw new Error(data.error || 'Lỗi khi đọc tệp Word');
          }

          setCurrentFileName(file.name);
          onContentExtracted(data.text, file.name);
        } catch (err: any) {
          console.error(err);
          setErrorMsg(err.message || 'Không thể trích xuất nội dung tệp Word này.');
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setErrorMsg('Lỗi khi đọc tệp từ thiết bị.');
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã có lỗi xảy ra.');
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>{label}</span>
        </label>
        {subLabel && <span className="text-[11px] text-slate-400">{subLabel}</span>}
      </div>

      {/* Upload Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-3.5 transition-all text-center cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20'
            : currentFileName
            ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/70'
            : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,.doc,.txt"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {isLoading ? (
          <div className="py-2 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-xs font-semibold text-blue-700">
              Đang giải mã và trích xuất nội dung tệp Word...
            </span>
          </div>
        ) : currentFileName ? (
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentFileName}
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Đã nạp thành công • {value.length} ký tự</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-md text-xs font-medium border border-slate-200"
                title="Xem nhanh văn bản trích xuất"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-md text-xs font-medium border border-slate-200"
                title="Thay thế bằng tệp Word khác"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentFileName(null);
                  onContentExtracted('', '');
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-md text-xs font-medium border border-slate-200"
                title="Xóa tệp"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center justify-center gap-1 text-slate-600">
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-0.5">
              <FileUp className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800">
              {placeholder}
            </div>
            <div className="text-[11px] text-slate-400">
              Hỗ trợ định dạng Microsoft Word (<b>.docx</b>, <b>.doc</b>) hoặc <b>.txt</b>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Optional Preview Drawer */}
      {showPreview && value && (
        <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 max-h-36 overflow-y-auto text-[11px] font-mono text-slate-800 whitespace-pre-wrap">
          {value}
        </div>
      )}
    </div>
  );
};
