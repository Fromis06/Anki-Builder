export default function ExportModal({ isOpen, onClose, htmlCode, cssCode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-[700px] max-h-[80vh] flex flex-col p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-blue-400">🎉 Code Anki HTML/CSS</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center">✕</button>
        </div>
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          <div className="flex flex-col flex-1">
            <span className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">HTML (Dán vào Back/Front Template)</span>
            <textarea readOnly value={htmlCode} className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xs text-emerald-400 resize-none min-h-[120px]" />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">CSS Styling (Dán vào mục Styling)</span>
            <textarea readOnly value={cssCode} className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xs text-amber-400 resize-none min-h-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
}