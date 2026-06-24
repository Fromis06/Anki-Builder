// src/utils/compiler.js

export const compileHTML = (node) => {
  if (node.type === "holder") {
    const fields = node.assignedFields || [];
    const fieldsHTML = fields.map(f => `  <div class="anki-field">{{${f}}}</div>`).join("\n");
    return `<div id="${node.id}" class="anki-block">\n${fieldsHTML}\n</div>`;
  }
  return `<div id="${node.id}" class="anki-container direction-${node.direction}">\n${node.children.map(child => compileHTML(child)).join("\n")}\n</div>`;
};

export const compileCSS = (node) => {
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