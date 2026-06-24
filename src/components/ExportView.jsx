import { compileHTML, compileCSS } from "../utils/compiler";

export default function ExportView({ frontLayoutTree, backLayoutTree }) {
  const frontHTML = compileHTML(frontLayoutTree);
  const backHTML = compileHTML(backLayoutTree);
  const cssCode = `.anki-container { display: grid; flex: 1; }\n.anki-block { flex: 1; }\n.anki-field { width: 100%; }\n\n` + compileCSS(frontLayoutTree) + compileCSS(backLayoutTree);

  return (
    <div className="flex-1 flex flex-col p-8 overflow-auto bg-slate-900 items-center w-full">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Xuất File Cấu Hình</h2>
            <p className="text-xs text-slate-400 mt-0.5">Hãy copy và cho vào từng phần ở Anki</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 h-80">
          <div className="flex flex-col gap-2 h-full">
            <label className="text-xs text-blue-400 font-bold uppercase tracking-wider flex justify-between">
              <span> HTML Mặt Trước</span>
              <button className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded hover:bg-blue-600 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(frontHTML)}>Copy Code</button>
            </label>
            <textarea readOnly value={frontHTML} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-blue-300 resize-none focus:outline-none shadow-inner" />
          </div>
          <div className="flex flex-col gap-2 h-full">
            <label className="text-xs text-indigo-400 font-bold uppercase tracking-wider flex justify-between">
              <span> HTML Mặt Sau</span>
              <button className="text-[10px] bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded hover:bg-indigo-600 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(backHTML)}>Copy Code</button>
            </label>
            <textarea readOnly value={backHTML} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-indigo-300 resize-none focus:outline-none shadow-inner" />
          </div>
        </div>

        <div className="flex flex-col gap-2 h-64">
          <label className="text-xs text-amber-400 font-bold uppercase tracking-wider flex justify-between">
            <span> CSS Styling</span>
            <button className="text-[10px] bg-amber-600/20 text-amber-400 px-2 py-0.5 rounded hover:bg-amber-600 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy Code</button>
          </label>
          <textarea readOnly value={cssCode} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-amber-300 resize-none focus:outline-none shadow-inner" />
        </div>

      </div>
    </div>
  );
}