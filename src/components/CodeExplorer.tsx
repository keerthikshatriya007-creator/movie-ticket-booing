import { useState } from "react";
import { JAVA_FILES, JavaFile } from "../javaCode";
import { FileCode, Folder, Copy, Check, Info, FileText } from "lucide-react";

export default function CodeExplorer() {
  const [selectedFile, setSelectedFile] = useState<JavaFile>(JAVA_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Bespoke Java syntax highlighter to render beautiful code listings
  const highlightJava = (code: string) => {
    // Escape HTML first
    let escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Keywords
    const keywords = [
      "package", "import", "public", "private", "protected", "class", "interface", "abstract",
      "extends", "implements", "return", "new", "this", "super", "void", "int", "double", "boolean",
      "char", "float", "long", "null", "if", "else", "for", "while", "switch", "case", "break",
      "default", "throw", "throws", "try", "catch", "static", "final", "override", "synchronized",
      "volatile", "transient", "Serializable"
    ];
    
    // Replace annotations separately
    escaped = escaped.replace(/(@Override|@SuppressWarnings)/g, '<span class="text-[#D4AF37] font-semibold">$1</span>');

    // Replace keywords
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    escaped = escaped.replace(keywordRegex, '<span class="text-[#C19A2E] font-medium">$1</span>');

    // Strings
    escaped = escaped.replace(/(&quot;.*?[^\\]&quot;)/g, '<span class="text-stone-300 font-mono italic">$1</span>');
    escaped = escaped.replace(/('.*?')/g, '<span class="text-stone-300 font-mono italic">$1</span>');

    // Comments: multi-line
    escaped = escaped.replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="text-white/20 italic">$1</span>');
    // Comments: single-line
    escaped = escaped.replace(/(\/\/.*)/g, '<span class="text-white/20 italic">$1</span>');

    // Numbers
    escaped = escaped.replace(/\b(\d+(\.\d+)?f?|0x[0-9a-fA-F]+)\b/g, '<span class="text-[#D4AF37]">$1</span>');

    // Return HTML safely
    return <code dangerouslySetInnerHTML={{ __html: escaped }} />;
  };

  return (
    <div className="flex flex-col lg:flex-row border border-white/10 rounded-none bg-[#141414] shadow-2xl overflow-hidden h-[600px] w-full" id="java-code-explorer">
      {/* File Register Pane */}
      <div className="w-full lg:w-80 bg-[#0A0A0A] border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex flex-col gap-4 font-mono text-xs shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold pb-2 border-b border-white/5">
          <Folder className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>Package Structures</span>
        </div>

        <div className="flex items-center gap-2 text-white font-serif italic tracking-wide pl-1">
          <Folder className="w-4 h-4 text-[#D4AF37]" />
          <span>com.movieticket.booking</span>
        </div>

        {/* Scrollable File Node List */}
        <div className="flex flex-col gap-1.5 pl-3 mt-1 select-none">
          {JAVA_FILES.map((file) => {
            const isSel = file.name === selectedFile.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-none text-xs font-mono transition-all duration-300 cursor-pointer ${
                  isSel
                    ? "bg-[#D4AF37] text-black font-semibold border border-[#D4AF37]"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className={`w-3.5 h-3.5 ${isSel ? "text-black" : "text-[#D4AF37]"}`} />
                  <span className="truncate">{file.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="flex-1 flex flex-col bg-[#141414] overflow-hidden relative">
        {/* Code Header Bar */}
        <div className="bg-[#0A0A0A] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono text-white/60 tracking-wider">{selectedFile.path}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37]/45 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-[10px] font-mono uppercase tracking-[0.15em] rounded-none transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Blueprint Code</span>
              </>
            )}
          </button>
        </div>

        {/* Descriptive Summary Panel */}
        <div className="bg-black/90 p-4 shrink-0 flex items-start gap-3 border-b border-white/5">
          <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]">Architecture Role:</span>
            <p className="text-xs text-white/50 leading-relaxed mt-0.5">
              {selectedFile.description}
            </p>
          </div>
        </div>

        {/* Code Code Block */}
        <div className="flex-1 overflow-auto p-6 font-mono text-xs md:text-sm leading-relaxed bg-black/95 select-text">
          <pre className="text-white/80">
            {highlightJava(selectedFile.code)}
          </pre>
        </div>
      </div>
    </div>
  );
}
