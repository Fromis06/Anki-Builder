import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Component con: Tạo hiệu ứng kéo thả mượt mà cho từng cái thẻ
function DraggableField({ field }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: field, // Lấy tên trường làm ID định danh luôn
  });

  // Tính toán tọa độ khi đang bị chuột nhấc đi
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: 50,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-slate-900 border rounded-lg p-2 text-xs text-slate-300 cursor-grab select-none shadow-sm transition-colors ${
        isDragging ? "border-blue-500 bg-slate-800 opacity-80" : "border-slate-800 hover:border-slate-700"
      }`}
    >
      ☰ {field}
    </div>
  );
}

// Component chính
export default function LeftSidebar({ fields, newFieldName, setNewFieldName, onAddField }) {
  return (
    <div className="w-60 border-r border-slate-800 bg-slate-950 p-4 flex flex-col gap-4 z-10">
      <div>
        <h2 className="font-bold text-[10px] text-slate-500 uppercase tracking-widest mb-3">
          Các Trường
        </h2>
        <form onSubmit={onAddField} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Tên trường..."
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
          />
          <button type="submit" className="bg-slate-800 px-2 rounded-lg text-xs">+</button>
        </form>
        
        <div className="flex flex-col gap-1.5 relative">
          {fields.map((f) => (
            <DraggableField key={f} field={f} />
          ))}
        </div>
      </div>
    </div>
  );
}