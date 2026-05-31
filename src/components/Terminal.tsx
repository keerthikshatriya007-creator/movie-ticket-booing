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
        return "text-rose-600 font-medium font-mono";
      case "input":
        return "text-[#B88E2F] font-bold before:content-['>_'] font-mono hover:underline";
      case "system":
        return "text-black/40 italic font-mono";
      default:
        return "text-[#2A2A28] font-mono font-medium";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px] w-full" id="java-terminal-simulator">
      {/* Terminal Viewport */}
      <div className="flex-1 flex flex-col bg-white border border-black/10 rounded-none overflow-hidden shadow-sm relative">
        {/* Title bar */}
        <div className="bg-[#FAF9F5] border-b border-black/10 px-5 py-4 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90 block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 block"></span>
            </div>
            <span className="text-xs text-black/60 font-mono flex items-center gap-2 ml-3">
              <TermIcon className="w-3.5 h-3.5 text-[#B88E2F]" />
              com.movieticket.booking.Main
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="px-2.5 py-1 text-xs text-black/60 hover:text-[#B88E2F] hover:bg-black/5 border border-black/5 font-mono transition-all uppercase tracking-wider cursor-pointer"
              title="Clear Terminal outputs"
            >
              Clear Screen
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-black/60 hover:text-red-600 hover:bg-black/5 border border-black/5 transition-all cursor-pointer"
              title="Reset Simulated Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable console space */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs md:text-sm leading-relaxed max-h-[500px] min-h-[400px] bg-[#FCFCFA] select-text">
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
        <form onSubmit={handleSubmit} className="bg-white border-t border-black/10 p-4 flex gap-2 items-center">
          <label htmlFor="terminal-cli-input" className="text-[#B88E2F] font-bold font-mono pl-1 text-sm md:text-base animate-pulse">
            &gt;
          </label>
          <input
            id="terminal-cli-input"
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type menu index or parameters and press Enter..."
            className="flex-1 bg-transparent text-black font-mono text-xs md:text-sm border-none focus:outline-none placeholder-black/30 outline-none caret-[#B88E2F]"
            autoFocus
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[#B88E2F] hover:bg-[#9E7415] text-white rounded-none px-3 py-1.5 transition-all flex items-center justify-center cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </form>
      </div>

      {/* Preset Side Guides Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Info Box */}
        <div className="bg-white border border-black/10 p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#B88E2F] flex items-center gap-2 border-b border-black/5 pb-2">
            <Sparkles className="w-4 h-4 text-[#B88E2F]" />
            Simulation Console guides
          </h3>
          <p className="text-xs text-black/60 leading-relaxed">
            This terminal fully emulates the compilation of your Core Java <code className="text-[#B88E2F] font-mono select-all font-semibold">Main.java</code>. Use the preset parameters below to trigger pre-configured cinema checkout mock-ups.
          </p>

          <div className="border-t border-black/5 my-1"></div>

          {/* Preset Buttons Grid */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-black/40 block mb-2">
                Flow 1: Quick Customer Booking
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePresetClick("1")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [1] Customer Menu
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("user")}
                  className="px-2 py-1 bg-[#B88E2F]/10 hover:bg-[#B88E2F]/20 border border-[#B88E2F]/30 text-[#B88E2F] rounded-none text-[10px] transition-colors font-mono cursor-pointer font-medium"
                >
                  uname: &quot;user&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("user123")}
                  className="px-2 py-1 bg-[#B88E2F]/10 hover:bg-[#B88E2F]/20 border border-[#B88E2F]/30 text-[#B88E2F] rounded-none text-[10px] transition-colors font-mono cursor-pointer font-medium"
                >
                  pass: &quot;user123&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("3")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [3] Book Ticket
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("1")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [1] Choose Show
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("2")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Tickets count: 2
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("C3")}
                  className="px-2 py-1 bg-[#B88E2F]/10 hover:bg-[#B88E2F]/20 border border-[#B88E2F]/30 text-[#B88E2F] rounded-none text-[10px] transition-colors font-mono cursor-pointer font-medium"
                >
                  Seat C3
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("C4")}
                  className="px-2 py-1 bg-[#B88E2F]/10 hover:bg-[#B88E2F]/20 border border-[#B88E2F]/30 text-[#B88E2F] rounded-none text-[10px] transition-colors font-mono cursor-pointer font-medium"
                >
                  Seat C4
                </button>
              </div>
            </div>

            <div className="border-t border-black/5 my-1"></div>

            <div>
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-black/40 block mb-2">
                Flow 2: Admin Operations
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePresetClick("3")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [3] Admin Login
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("admin")}
                  className="px-2 py-1 bg-[#B88E2F]/10 hover:bg-[#B88E2F]/20 border border-[#B88E2F]/30 text-[#B88E2F] rounded-none text-[10px] transition-colors font-mono cursor-pointer font-medium"
                >
                  uname: &quot;admin&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("admin123")}
                  className="px-2 py-1 bg-[#B88E2F]/10 hover:bg-[#B88E2F]/20 border border-[#B88E2F]/30 text-[#B88E2F] rounded-none text-[10px] transition-colors font-mono cursor-pointer font-medium"
                >
                  pass: &quot;admin123&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("2")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  [2] Create Movie
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("M04")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  &quot;M04&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("Gladiator II")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  &quot;Gladiator II&quot;
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("Action / Epic")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Genre
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("148")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Mins
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("8.2")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Rating
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("N")}
                  className="px-2 py-1 bg-black/5 hover:bg-black/10 border border-black/10 text-black/80 rounded-none text-[10px] transition-colors font-mono cursor-pointer"
                >
                  Save [N]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials reminder */}
        <div className="bg-white border border-black/10 p-5 flex flex-col shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-4 h-4 text-[#B88E2F]" />
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#B88E2F] font-bold">Standard Accounts info</h4>
          </div>
          <div className="text-[11px] text-black/60 font-mono space-y-1.5 animate-fadeIn">
            <div className="flex justify-between border-b border-black/5 pb-1">
              <span>👤 Customer:</span>
              <span className="text-[#B88E2F] font-bold">user / user123</span>
            </div>
            <div className="flex justify-between">
              <span>🔑 Administrator:</span>
              <span className="text-[#B88E2F] font-bold">admin / admin123</span>
            </div>
          </div>
        </div>

        {/* Console info code feedback */}
        <div className="bg-white border border-black/10 p-5 flex flex-col shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-mono">Persistence Mode active</h4>
          </div>
          <p className="text-[11px] text-black/50 leading-relaxed font-mono">
            Logging out backs up active reservation states into database file block <code className="text-[#B88E2F] font-mono text-[10px] font-bold underline select-all">booking_system_data.ser</code> successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
