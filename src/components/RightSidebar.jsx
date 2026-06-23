export default function RightSidebar({ selectedBlock, onPropertyChange }) {
  return (
    <div className="w-64 border-l border-slate-800 bg-slate-950 p-4 flex flex-col gap-4 overflow-y-auto">
      <h2 className="font-bold text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">
        Thuộc tính Khối
      </h2>
      
      {selectedBlock ? (
        <div className="flex flex-col gap-5">
          
          {/* Cấu hình Màu Nền */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Màu Nền Box</label>
            <div className="flex gap-2 items-center">
              <input 
                type="color" 
                value={selectedBlock.background || "#1e293b"} 
                onChange={(e) => onPropertyChange("background", e.target.value)}
                className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer flex-shrink-0"
              />
              <input 
                type="text" 
                value={selectedBlock.background || "#1e293b"} 
                onChange={(e) => onPropertyChange("background", e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Cấu hình Màu Chữ */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Màu Chữ</label>
            <div className="flex gap-2 items-center">
              <input 
                type="color" 
                value={selectedBlock.color || "#ffffff"} 
                onChange={(e) => onPropertyChange("color", e.target.value)}
                className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer flex-shrink-0"
              />
              <input 
                type="text" 
                value={selectedBlock.color || "#ffffff"} 
                onChange={(e) => onPropertyChange("color", e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          <hr className="border-slate-800 my-1" />

          {/* Cấu hình Font Chữ */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Phông Chữ</label>
            <select
              value={selectedBlock.fontFamily || "sans-serif"}
              onChange={(e) => onPropertyChange("fontFamily", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="sans-serif">Mặc định (Sans-Serif)</option>
              <option value="serif">Có chân (Serif)</option>
              <option value="monospace">Mã nguồn (Monospace)</option>
              <option value="'Helvetica Neue', Arial">Modern (Helvetica/Arial)</option>
              <option value="'Times New Roman', Times">Classic (Times New Roman)</option>
            </select>
          </div>

          {/* Cấu hình Căn Lề (Text Align) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Căn Lề Chữ</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-0.5 border border-slate-800 rounded-lg">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => onPropertyChange("textAlign", align)}
                  className={`py-1 text-xs rounded font-medium capitalize transition-colors ${
                    (selectedBlock.textAlign || "center") === align
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {align === "left" ? "Trái" : align === "center" ? "Giữa" : "Phải"}
                </button>
              ))}
            </div>
          </div>

          {/* Cấu hình Định Dạng Chữ (Đậm/Nghiêng) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Kiểu Chữ</label>
            <div className="grid grid-cols-2 gap-1 bg-slate-900 p-0.5 border border-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => onPropertyChange("fontWeight", selectedBlock.fontWeight === "bold" ? "normal" : "bold")}
                className={`py-1.5 text-xs rounded transition-colors ${
                  selectedBlock.fontWeight === "bold"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
                }`}
              >
                Đậm (B)
              </button>
              <button
                type="button"
                onClick={() => onPropertyChange("fontStyle", selectedBlock.fontStyle === "italic" ? "normal" : "italic")}
                className={`py-1.5 text-xs rounded transition-colors italic ${
                  selectedBlock.fontStyle === "italic"
                    ? "bg-blue-600 text-white font-medium shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
                }`}
              >
                Nghiêng (I)
              </button>
            </div>
          </div>

          <hr className="border-slate-800 my-1" />

          {/* Cấu hình Độ Bo Tròn */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <label>Độ Bo Tròn</label>
              <span className="font-mono text-slate-500">{selectedBlock.borderRadius || 12}px</span>
            </div>
            <input 
              type="range" min="0" max="40" 
              value={selectedBlock.borderRadius || 12} 
              onChange={(e) => onPropertyChange("borderRadius", e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Cấu hình Cỡ Chữ */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <label>Kích Thước Chữ</label>
              <span className="font-mono text-slate-500">{selectedBlock.fontSize || 14}px</span>
            </div>
            <input 
              type="range" min="12" max="48" 
              value={selectedBlock.fontSize || 14} 
              onChange={(e) => onPropertyChange("fontSize", e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>

        </div>
      ) : (
        <div className="text-xs text-slate-500 italic text-center mt-8">
          Click chọn một khối trên thẻ để cấu hình chi tiết
        </div>
      )}
    </div>
  );
}