export default function Header({ onExport }) {
  return (
    <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950">
      <div className="flex items-center gap-2">
        <span className="text-xl"></span>
        <h1 className="text-base font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Anki Visual Builder
        </h1>
      </div>
      <button 
        onClick={onExport}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-colors"
      >
        Xuất HTML/CSS
      </button>
    </div>
  );
}