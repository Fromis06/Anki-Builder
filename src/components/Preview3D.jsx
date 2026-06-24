import { useState } from "react";
import { compileHTML, compileCSS } from "../utils/compiler";

export default function Preview3D({ frontLayoutTree, backLayoutTree }) {
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const formatPreviewData = (html) => html.replace(/{{([^}]+)}}/g, "<span class='text-blue-500 font-bold opacity-80'>[$1]</span>");

    const frontHTML = formatPreviewData(compileHTML(frontLayoutTree));
    const backHTML = formatPreviewData(compileHTML(backLayoutTree));

    const cssCode = `
    .anki-preview-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; }
    .anki-container { display: grid; flex: 1; min-height: 0; min-width: 0; }
    .anki-block { flex: 1; overflow-y: auto; }
    .anki-field { width: 100%; }
    ${compileCSS(frontLayoutTree)}
    ${compileCSS(backLayoutTree)}
  `;

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 p-6 w-full font-sans select-none">
            <style>{cssCode}</style>
            <div className="relative w-[850px] h-[520px] shadow-[0_30px_70px_rgba(0,0,0,0.6)] rounded-xl border border-slate-700/80 flex flex-col overflow-hidden bg-[#2f2f2f]">
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col">
                    {!isShowAnswer ? (
                        <div className="w-full h-full anki-preview-wrapper" dangerouslySetInnerHTML={{ __html: frontHTML }} />
                    ) : (
                        <div className="w-full h-full anki-preview-wrapper" dangerouslySetInnerHTML={{ __html: backHTML }} />
                    )}
                </div>
                <div className="h-14 bg-[#242424] border-t border-[#1a1a1a] flex items-center justify-between px-4 text-[11px] text-slate-300 flex-shrink-0">
                    <span className="px-3 py-1 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">Edit</span>
                    {!isShowAnswer ? (
                        <div className="flex flex-col items-center justify-center gap-1 flex-1">
                            <span className="text-[10px] font-mono text-slate-500">0 + 0 + 16</span>
                            <button
                                onClick={() => setIsShowAnswer(true)}
                                className="px-8 py-1.5 rounded bg-[#383838] border border-slate-700 font-medium text-slate-200 shadow-sm hover:bg-[#444444] hover:text-white active:scale-95 transition-all duration-150 min-w-[120px]"
                            >
                                Show Answer
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 justify-center flex-1">
                            {[
                                { label: "Again", time: "<1m", color: "text-red-400", hoverBg: "hover:bg-red-500/10" },
                                { label: "Hard", time: "10m", color: "text-amber-400", hoverBg: "hover:bg-amber-500/10" },
                                { label: "Good", time: "1d", color: "text-emerald-400", hoverBg: "hover:bg-emerald-500/10" },
                                { label: "Easy", time: "4d", color: "text-blue-400", hoverBg: "hover:bg-blue-500/10" }
                            ].map((btn) => (
                                <div key={btn.label} className="flex flex-col items-center">
                                    <span className={`text-[9px] font-mono mb-0.5 ${btn.color}`}>{btn.time}</span>
                                    <button
                                        onClick={() => setIsShowAnswer(false)}
                                        className={`px-5 py-1 rounded bg-[#383838] border border-slate-700 font-medium ${btn.color} ${btn.hoverBg} active:scale-95 transition-all min-w-[65px]`}
                                    >
                                        {btn.label}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <span className="px-3 py-1 rounded bg-[#383838] border border-slate-700 cursor-not-allowed">More ▼</span>
                </div>

            </div>
        </div>
    );
}