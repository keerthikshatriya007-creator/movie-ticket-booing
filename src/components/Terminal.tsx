import { useState, useRef, useEffect, FormEvent } from "react";
import { TerminalSimulator, ConsoleLine } from "../terminalSimulator";
import { Play, RotateCcw, AlertTriangle, Key, Terminal as TermIcon, Sparkles } from "lucide-react";

export default function Terminal() {
  const [simulator] = useState(() => new TerminalSimulator());
  const [history, setHistory] = useState<ConsoleLine[]>(() => [...simulator.getHistory()]);
  const [inputText, setInputText] = useState("");
  
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on updates
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Handle Input Submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const cmd = inputText;
    setInputText("");
    
    // Process in simulator
    simulator.processInput(cmd);
    setHistory([...simulator.getHistory()]);
    
    // Refocus
    setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
  };

  // Preset workflow clicker
  const handlePresetClick = (val: string) => {
    simulator.processInput(val);
    setHistory([...simulator.getHistory()]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
  };

  const handleReset = () => {
    // Re-instantiate
    const newSim = new TerminalSimulator();
    // Clear history and restart
    setHistory([...newSim.getHistory()]);
    // Replace simulator state
    Object.assign(simulator, newSim);
    setInputText("");
  };

  const handleClear = () => {
    simulator.clearHistory();
    setHistory([...simulator.getHistory()]);
  };

  // Color mapper
  const getLineClass = (type: string) => {
    switch (type) {
      case "stderr":
        return "text-rose-400 font-medium font-mono";
      case "input":
        return "text-[#D4AF37] font-semibold before:content-['>_'] font-mono hover:underline";
      case "system":
        return "text-white/40 italic font-mono";
      default:
        return "text-[#F5F5F5] font-mono";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px] w-full" id="java-terminal-simulator">
      {/* Terminal Viewport */}
      <div className="flex-1 flex flex-col bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden shadow-2xl relative">
        {/* Title bar */}
        <div className="bg-[#141414] border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600/85 block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-600/85 block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/85 block"></span>
            </div>
            <span className="text-xs text-white/50 font-mono flex items-center gap-2 ml-3">
              <TermIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              com.movieticket.booking.Main
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="px-2.5 py-1 text-xs text-white/45 hover:text-[#D4AF37] hover:bg-white/5 border border-white/5 font-mono transition-all uppercase tracking-wider cursor-pointer"
              title="Clear Terminal outputs"
            >
              Clear Screen
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-white/45 hover:text-red-400 hover:bg-white/5 border border-white/5 transition-all cursor-pointer"
              title="Reset Simulated Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable console space */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs md:text-sm leading-relaxed max-h-[500px] min-h-[400px] bg-black select-text">
          <div className="space-y-1.5">
            {history.map((line, idx) => (
              <div key={idx} className={`whitespace-pre-wrap ${getLineClass(line.type)}`}>
                {line.text}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="bg-[#141414] border-t border-white/10 p-4 flex gap-2 items-center">
          <label htmlFor="terminal-cli-input" className="text-[#D4AF37] font-bold font-mono pl-1 text-sm md:text-base animate-pulse">
            &gt;
          </label>
          <input
            id="terminal-cli-input"
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type menu index or parameters and press Enter..."
            className="flex-1 bg-transparent text-[#F5F5F5] font-mono text-xs md:text-sm border-none focus:outline-none placeholder-white/20 outline-none caret-[#D4AF37]"
            autoFocus
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[#D4AF37] hover:bg-[#C19A2E] text-black rounded-none px-3 py-1.5 transition-all flex items-center justify-center cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </form>
      </div>

      {/* Preset Side Guides Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Info Box */}
        <div className="bg-[#141414] border border-white/10 p-5 flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] flex items-center gap-2 border-b border-white/5 pb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Simulation Console guides
          </h3>
          <p className="text-xs text-white/50 leading-relaxed">
            This terminal fully emulates the compilation of your Core Java <code className="text-[#D4AF37] font-mono select-all">Main.java</code>. Use the preset parameters below to trigger pre-configured cinema checkout mock-ups.
          </p>

          <div className="border-t border-white/5 my-1"></div>

          {/* Preset Buttons Grid */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-white/40 block mb-2">
                Flow 1: Quick Customer Booking
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePresetClick("1")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [1] Customer Menu
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("user")}
                  className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  uname: &quot;user&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("user123")}
                  className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  pass: &quot;user123&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("3")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [3] Book Ticket
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("1")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [1] Choose Show
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("2")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Tickets count: 2
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("C3")}
                  className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Seat C3
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("C4")}
                  className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Seat C4
                </button>
              </div>
            </div>

            <div className="border-t border-white/5 my-1"></div>

            <div>
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-white/40 block mb-2">
                Flow 2: Admin Operations
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePresetClick("3")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [3] Admin Login
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("admin")}
                  className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  uname: &quot;admin&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("admin123")}
                  className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  pass: &quot;admin123&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("2")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [2] Create Movie
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("M04")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  &quot;M04&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("Gladiator II")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  &quot;Gladiator II&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("Action / Epic")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Genre
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("148")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Mins
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("8.2")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Rating
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("N")}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Save [N]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials reminder */}
        <div className="bg-black border border-white/10 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Standard Accounts info</h4>
          </div>
          <div className="text-[11px] text-white/60 font-mono space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>👤 Customer:</span>
              <span className="text-[#D4AF37] font-bold">user / user123</span>
            </div>
            <div className="flex justify-between">
              <span>🔑 Administrator:</span>
              <span className="text-[#D4AF37] font-bold">admin / admin123</span>
            </div>
          </div>
        </div>

        {/* Console info code feedback */}
        <div className="bg-[#141414] border border-[#D4AF37]/35 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-mono">Admin Terminal v2.5</h4>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed font-mono">
            Logging out backs up active reservation states into database file block <code className="text-[#D4AF37] font-mono text-[10px] underline select-all">booking_system_data.ser</code> successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
