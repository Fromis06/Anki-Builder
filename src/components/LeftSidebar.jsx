import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableField({ field, onDeleteField }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: field,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: 50,
  } : undefined;

  return (
    <div className="relative group/field-item w-full">
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`bg-slate-900 border rounded-lg p-2 pr-8 text-xs text-slate-300 cursor-grab select-none shadow-sm transition-colors w-full ${
          isDragging ? "border-blue-500 bg-slate-800 opacity-80" : "border-slate-800 hover:border-slate-700"
        }`}
      >
        ☰ {field}
      </div>

      {/* Nút Xóa Trường nằm bên phải, chỉ xuất hiện khi hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteField(field);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/field-item:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] transition-opacity duration-150 shadow-md z-10"
        title="Xóa trường này khỏi danh sách"
      >
        ✕
      </button>
    </div>
  );
}

export default function LeftSidebar({ fields, newFieldName, setNewFieldName, onAddField, onDeleteField }) {
  return (
    <div className="w-60 border-r border-slate-800 bg-slate-950 p-4 flex flex-col gap-4 z-10 select-none">
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
          <button type="submit" className="bg-slate-800 px-2 rounded-lg text-xs hover:bg-slate-700 transition-colors">+</button>
        </form>
        
        <div className="flex flex-col gap-1.5 relative">
          {fields.map((f) => (
            <DraggableField key={f} field={f} onDeleteField={onDeleteField} />
          ))}
        </div>
      </div>
    </div>
  );
}