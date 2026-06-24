export default function Header({ currentTab, onTabChange }) {
  const tabs = [
    { id: "front_design", label: "Mặt Trước" },
    { id: "back_design", label: "Mặt Sau" },
    { id: "preview_flip", label: "Xem Trước" },
    { id: "export_view", label: "Xuất Code" }
  ];

  return (
    <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950 flex-shrink-0 select-none">

      {/* Logo phía bên trái */}
      <div className="flex items-center gap-2 w-1/4">
        <h1 className="text-base font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Anki Visual Builder
        </h1>
      </div>

      {/* Thanh Tab Navigation ở giữa */}
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 w-max shadow-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              currentTab === tab.id 
                ? "bg-slate-700 text-blue-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Vùng trống bên phải để cân bằng Layout */}
      <div className="w-1/4 flex justify-end">
        {currentTab !== "export_view" && (
          <span className="text-[10px] text-slate-500 font-mono italic">
            {currentTab === "front_design" ? "Đang sửa: Front Template" : currentTab === "back_design" ? "Đang sửa: Back Template" : "Chế độ xem"}
          </span>
        )}
      </div>
      
    </div>
  );
}