import './App.css';
import { useState } from "react";
import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Header from "./components/Header";
import ExportModal from "./components/ExportModal";


function DroppableBlock({ node, isSelected, onSelect, onSplit, onRemoveField, onDeleteBlock, style }) {
  const { isOver, setNodeRef } = useDroppable({
    id: node.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
      className={`flex-1 w-full h-full min-w-0 min-h-0 overflow-y-auto border-2 flex flex-col items-center justify-center p-4 relative group transition-all duration-150 cursor-pointer ${
        isSelected ? "border-blue-500 border-solid shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-slate-800/20" : 
        isOver ? "border-emerald-500 border-solid shadow-[0_0_15px_rgba(16,185,129,0.5)] bg-emerald-500/10" : 
        "border-slate-600 border-dashed hover:border-slate-400"
      }`}
    >
      <div className="w-full flex flex-col gap-2 justify-center mt-2 my-auto px-1">
        {node.assignedFields && node.assignedFields.length > 0 ? (
          node.assignedFields.map((field, index) => (
            <div 
              key={`${field}-${index}`} 
              className="relative w-full bg-slate-800/80 border border-slate-700/50 py-2 px-6 rounded shadow-sm group/field hover:bg-slate-700 transition-colors"
            >
              <div className="w-full break-words">
                {`{{${field}}}`}
              </div>
              
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveField(node.id, index); }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/field:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] transition-opacity duration-150 shadow-md z-30"
                title="Xóa trường này"
              >✕</button>
            </div>
          ))
        ) : (
          <span className="text-slate-500 font-sans" style={{ fontWeight: 'normal', fontStyle: 'normal' }}>Khối Trống</span>
        )}
      </div>
      
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity duration-150 bg-slate-950/80 p-1 rounded-lg backdrop-blur-sm z-20">
        <button onClick={(e) => { e.stopPropagation(); onSplit(node.id, "vertical"); }} className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">⬌ Dọc</button>
        <button onClick={(e) => { e.stopPropagation(); onDeleteBlock(node.id); }} className="bg-red-600 hover:bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded" title="Xóa khối này">🗑 Xóa</button>
        <button onClick={(e) => { e.stopPropagation(); onSplit(node.id, "horizontal"); }} className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded">⬈ Ngang</button>
      </div>
    </div>
  );
}

// --- APP CHÍNH ---
function App() {
  const [fields, setFields] = useState(["Front", "Back", "Notes"]);
  const [newFieldName, setNewFieldName] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const [layoutTree, setLayoutTree] = useState({
    id: "root",
    type: "holder",
    background: "#1e293b",
    borderRadius: "12",
    fontSize: "14",
    assignedFields: [], 
    color: "#ffffff",
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "normal",
    fontStyle: "normal"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [generatedCSS, setGeneratedCSS] = useState("");

  const handleAddField = (e) => {
    e.preventDefault();
    if (!newFieldName.trim() || fields.includes(newFieldName.trim())) return;
    setFields([...fields, newFieldName.trim()]);
    setNewFieldName("");
  };

  const updateBlockProperty = (node, targetId, key, value) => {
    if (node.id === targetId) return { ...node, [key]: value };
    if (node.type === "container") {
      return { ...node, children: node.children.map((child) => updateBlockProperty(child, targetId, key, value)) };
    }
    return node;
  };

  const addFieldToBlock = (node, targetId, fieldName) => {
    if (node.id === targetId) {
      const currentFields = node.assignedFields || [];
      if (!currentFields.includes(fieldName)) return { ...node, assignedFields: [...currentFields, fieldName] };
      return node;
    }
    if (node.type === "container") return { ...node, children: node.children.map(child => addFieldToBlock(child, targetId, fieldName)) };
    return node;
  };

  const removeFieldFromBlock = (node, targetId, fieldIndex) => {
    if (node.id === targetId) {
      const newFields = [...(node.assignedFields || [])];
      newFields.splice(fieldIndex, 1);
      return { ...node, assignedFields: newFields };
    }
    if (node.type === "container") return { ...node, children: node.children.map(child => removeFieldFromBlock(child, targetId, fieldIndex)) };
    return node;
  };

  const findBlockById = (node, targetId) => {
    if (node.id === targetId) return node;
    if (node.type === "container") {
      for (let child of node.children) {
        const found = findBlockById(child, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedBlock = selectedBlockId ? findBlockById(layoutTree, selectedBlockId) : null;

  const handlePropertyChange = (key, value) => {
    if (!selectedBlockId) return;
    setLayoutTree(updateBlockProperty(layoutTree, selectedBlockId, key, value));
  };

  const splitBlockInTree = (node, targetId, direction) => {
    if (node.id === targetId) {
      return {
        id: node.id,
        type: "container",
        direction: direction,
        children: [
          { id: `${node.id}-child1`, type: "holder", background: node.background, borderRadius: node.borderRadius || "12", fontSize: node.fontSize || "14", assignedFields: [...(node.assignedFields || [])], color: node.color, fontFamily: node.fontFamily, textAlign: node.textAlign, fontWeight: node.fontWeight, fontStyle: node.fontStyle },
          { id: `${node.id}-child2`, type: "holder", background: "#334155", borderRadius: "12", fontSize: "14", assignedFields: [], color: "#ffffff", fontFamily: "sans-serif", textAlign: "center", fontWeight: "normal", fontStyle: "normal" },
        ],
      };
    }
    if (node.type === "container") return { ...node, children: node.children.map((child) => splitBlockInTree(child, targetId, direction)) };
    return node;
  };

  const removeBlockFromTree = (node, targetId) => {
    if (node.id === targetId && node.id === "root") return { id: "root", type: "holder", background: "#1e293b", borderRadius: "12", fontSize: "14", assignedFields: [], color: "#ffffff", fontFamily: "sans-serif", textAlign: "center", fontWeight: "normal", fontStyle: "normal" };
    if (node.type === "container") {
      const targetIndex = node.children.findIndex(c => c.id === targetId);
      if (targetIndex !== -1) return node.children[targetIndex === 0 ? 1 : 0];
      return { ...node, children: node.children.map(child => removeBlockFromTree(child, targetId)) };
    }
    return node;
  };

  const handleSplit = (blockId, direction) => setLayoutTree(prevTree => splitBlockInTree(prevTree, blockId, direction));
  const handleRemoveField = (blockId, fieldIndex) => setLayoutTree(prevTree => removeFieldFromBlock(prevTree, blockId, fieldIndex));
  
  const handleDeleteBlock = (blockId) => {
    if (selectedBlockId === blockId) setSelectedBlockId(null);
    setLayoutTree(prevTree => removeBlockFromTree(prevTree, blockId));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id) setLayoutTree(prevTree => addFieldToBlock(prevTree, over.id, active.id));
  };

  const renderLayout = (node) => {
    if (node.type === "holder") {
      return (
        <DroppableBlock 
          key={node.id} 
          node={node} 
          isSelected={selectedBlockId === node.id} 
          onSelect={setSelectedBlockId} 
          onSplit={handleSplit} 
          onRemoveField={handleRemoveField} 
          onDeleteBlock={handleDeleteBlock} 
          style={{
            backgroundColor: node.background,
            borderRadius: `${node.borderRadius || 12}px`,
            fontSize: `${node.fontSize || 14}px`,
            color: node.color || "#ffffff",
            fontFamily: node.fontFamily || "sans-serif",
            textAlign: node.textAlign || "center",
            fontWeight: node.fontWeight || "normal",
            fontStyle: node.fontStyle || "normal"
          }}
        />
      );
    }
    const gridClass = node.direction === "vertical" ? "grid-rows-2 grid-cols-1" : "grid-cols-2 grid-rows-1";
    return (
      <div key={node.id} className={`grid flex-1 w-full h-full gap-2 min-w-0 min-h-0 ${gridClass}`}>
        {node.children.map((child) => renderLayout(child))}
      </div>
    );
  };

  const compileHTML = (node) => {
    if (node.type === "holder") {
      const fields = node.assignedFields || [];
      const fieldsHTML = fields.map(f => `  <div class="anki-field">{{${f}}}</div>`).join("\n");
      return `<div id="${node.id}" class="anki-block">\n${fieldsHTML}\n</div>`;
    }
    return `<div id="${node.id}" class="anki-container direction-${node.direction}">\n${node.children.map(child => compileHTML(child)).join("\n")}\n</div>`;
  };

  const compileCSS = (node) => {
    let styles = "";
    if (node.type === "holder") {
      styles += `#${node.id} {\n  background-color: ${node.background};\n  border-radius: ${node.borderRadius || 12}px;\n  font-size: ${node.fontSize || 14}px;\n  color: ${node.color || '#ffffff'};\n  font-family: ${node.fontFamily || 'sans-serif'};\n  text-align: ${node.textAlign || 'center'};\n  font-weight: ${node.fontWeight || 'normal'};\n  font-style: ${node.fontStyle || 'normal'};\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-content: center;\n  gap: 8px;\n  min-height: 0;\n  min-width: 0;\n}\n\n`;
    } else if (node.type === "container") {
      const gridTemplate = node.direction === "vertical" 
        ? "grid-template-rows: repeat(2, minmax(0, 1fr));\n  grid-template-columns: minmax(0, 1fr);"
        : "grid-template-columns: repeat(2, minmax(0, 1fr));\n  grid-template-rows: minmax(0, 1fr);";
      
      styles += `#${node.id} {\n  display: grid;\n  ${gridTemplate}\n  flex: 1;\n  gap: 8px;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  min-width: 0;\n}\n\n`;
      node.children.forEach(child => { styles += compileCSS(child); });
    }
    return styles;
  };

  const handleExport = () => {
    const defaultCSS = `/* Cấu hình bởi Anki Visual Builder */\n.anki-container { display: grid; flex: 1; }\n.anki-block { flex: 1; }\n.anki-field { width: 100%; }\n\n`;
    setGeneratedHTML(compileHTML(layoutTree));
    setGeneratedCSS(defaultCSS + compileCSS(layoutTree));
    setIsModalOpen(true);
  };

  return (
    <div className="w-screen h-screen bg-slate-900 text-slate-100 flex flex-col overflow-hidden font-sans select-none">
      <Header onExport={handleExport} />
      
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex-1 flex overflow-hidden">
          <LeftSidebar fields={fields} newFieldName={newFieldName} setNewFieldName={setNewFieldName} onAddField={handleAddField} />

          <div 
            className="flex-1 bg-slate-900 p-4 flex flex-col items-center justify-start overflow-auto w-full h-full" 
            onClick={() => setSelectedBlockId(null)}
          >
            <div className="w-full flex-1 min-h-[550px] bg-[#2f2f2f] rounded-xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden relative select-none">
              
              <div className="h-10 bg-[#242424] border-b border-[#1a1a1a] flex items-center justify-center gap-1.5 px-4 text-[11px] text-slate-300 flex-shrink-0">
                <span className="px-2.5 py-0.5 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">Decks</span>
                <span className="px-2.5 py-0.5 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">Add</span>
                <span className="px-2.5 py-0.5 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">Browse</span>
                <span className="px-2.5 py-0.5 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">Stats</span>
                <span className="px-2.5 py-0.5 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">Sync</span>
              </div>

              <div className="flex-1 p-6 flex flex-col items-center justify-center bg-[#2f2f2f] w-full h-full overflow-hidden">
                <div className="w-full h-full flex flex-col">
                  {renderLayout(layoutTree)}
                </div>
              </div>

              <div className="h-12 bg-[#242424] border-t border-[#1a1a1a] flex items-center justify-between px-4 text-[11px] flex-shrink-0">
                <span className="px-3 py-1 rounded bg-[#383838] border border-slate-700 text-slate-300 cursor-not-allowed">Edit</span>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-[10px] font-mono text-slate-500">0 + 0 + 16</span>
                  <span className="px-5 py-1 rounded bg-[#383838] border border-slate-700 font-medium text-slate-200 cursor-not-allowed shadow-sm">Show Answer</span>
                </div>
                <span className="px-3 py-1 rounded bg-[#383838] border border-slate-700 text-slate-300 cursor-not-allowed">More ▼</span>
              </div>
            </div>
          </div>

          <RightSidebar selectedBlock={selectedBlock} onPropertyChange={handlePropertyChange} />
        </div>
      </DndContext>

      <ExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} htmlCode={generatedHTML} cssCode={generatedCSS} />
    </div>
  );
}

export default App;