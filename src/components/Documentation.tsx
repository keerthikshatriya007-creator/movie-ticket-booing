import { useState } from "react";
import { ShieldCheck, HelpCircle, GitCommit, Settings, Layers, Code, Play, FileCheck, CircleCheck, AlertTriangle, Cpu } from "lucide-react";

export default function Documentation() {
  const [activeTab, setActiveTab] = useState<"oop" | "classes" | "exceptions" | "structures">("oop");

  const oopPrinciples = [
    {
      title: "Encapsulation",
      summary: "Restricts direct access to some of the object's components, which is a key security measure.",
      desc: "Every model class e.g., Person, Movie, Seat has private attributes (fields) that are safe from arbitrary external mutations. Accessibility is exclusively handled using public Getter and Setter methods, ensuring safe state transitions (like validateSeat before reserving).",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Abstraction",
      summary: "Hides complex implementation details and only shows essential features of an object.",
      desc: "Demonstrated through the abstract 'Person' class. Main menu logics only deal with a standard generic Person object returned by system login, completely detaching the credentials checking mechanism from concrete implementations.",
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Inheritance",
      summary: "Models relationship linkages ('is-a') enabling code reuse across hierarchies.",
      desc: "Both 'User' and 'Admin' classes extend 'Person'. They inherit common fields (username, password, role) and behavior from Person, avoiding duplicate declarations while writing custom details specifically (bookingHistory inside User, employeeId inside Admin).",
      icon: <GitCommit className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Polymorphism",
      summary: "Processes objects differently based on their data type or class classification.",
      desc: "Represented through method overriding. The abstract 'getProfileSummary()' method in Person is implemented differently in User (returning email, phone, bookings count) and Admin (returning Employee level credentials). Invoking profile information polymorphic-ally matches runtime type automatically.",
      icon: <Settings className="w-5 h-5 text-indigo-400" />
    }
  ];

  const classExplanations = [
    { name: "Person", role: "Abstract Base (Superclass)", detail: "Defines username, password and role properties. Houses abstract method profile structures ensuring consistent client displays." },
    { name: "User", role: "Model Subclass", detail: "Extends Person. Represents typical retail customers, appending unique variables (email, phone, bookings lists)." },
    { name: "Admin", role: "Superuser Subclass", detail: "Extends Person. Custom details denoting cinema employees (Id identifiers) authorized for scheduling and inventory tasks." },
    { name: "Movie", role: "Information Model", detail: "Maintains standard attributes explaining screenplay features (title, genre, run runtime, average rating out of 10)." },
    { name: "Show", role: "Slot Controller", detail: "Maps specific movie instances to dates/times, rooms, and contains seat layouts initialized on rows-columns grid coordinates (A1 to E6)." },
    { name: "Seat", role: "Inventory Unit", detail: "Keeps tabs on physical cinema layouts. Tracks prices, rows-columns tags, and isBooked availability flags." },
    { name: "Booking", role: "Transaction Model", detail: "Saves successful transactions linking customers, show slots, seat structures, and evaluates price totals." },
    { name: "Ticket", role: "Invoice Engine", detail: "Formats physical printable receipts including fees, tax distributions (GST 10%), movie coordinates and check-out sums." },
    { name: "MovieBookingSystem", role: "Core Controller / Facade", detail: "Hosts internal indexes, validating login credentials, bookSeat allocations, registrations, and manages serialization backups saving to disk state." },
    { name: "Main", role: "Entry Point View", detail: "Console keyboard loop reading command indicators, launching menus, printing states, and filtering user runtime input exception events." }
  ];

  const exceptions = [
    { title: "InvalidLoginException", cause: "Thrown when input username does not exist or password hashes fail to match the system's databases." },
    { title: "InvalidSeatException", cause: "Occurs if customer specifies raw coordinates that lie outside theatre auditorium matrix indices (like F9 when rows only span A-E)." },
    { title: "SeatAlreadyBookedException", cause: "Thrown when users select coordinates already assigned to a booking transaction in that specific slot (denoted with status [X])." },
    { title: "InvalidInputException", cause: "Handles invalid indices or parameter exceptions (such as negative prices or numeric conversion failures)." }
  ];

  const dataStructures = [
    { name: "ArrayList", reason: "Dynamic listings", detail: "Used for Movie lists, Show calendars, and Booking records. Offers rapid O(1) random-access read sweeps since indexes remain static during operations." },
    { name: "HashMap (HashMap<String, Person>)", reason: "Lookup Dictionaries", detail: "Maps String usernames to User profiles. Provides high performance O(1) lookup speeds for authentication, duplicate checking, and registers." },
    { name: "seatGrid Map Layout", reason: "Mapping spatial coordinates", detail: "Quickly translates text tags (like E3) directly to individual Seat objects safely." }
  ];

  return (
    <div className="flex flex-col gap-6" id="java-documentation">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-white/10 pb-0.5">
        <button
          onClick={() => setActiveTab("oop")}
          className={`px-5 py-3 text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "oop"
              ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-serif italic font-bold"
              : "text-white/40 hover:text-[#D4AF37]/80 hover:bg-white/5 font-mono uppercase tracking-[0.15em]"
          }`}
        >
          OOP Architecture
        </button>
        <button
          onClick={() => setActiveTab("classes")}
          className={`px-5 py-3 text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "classes"
              ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-serif italic font-bold"
              : "text-white/40 hover:text-[#D4AF37]/80 hover:bg-white/5 font-mono uppercase tracking-[0.15em]"
          }`}
        >
          Classes & Roles
        </button>
        <button
          onClick={() => setActiveTab("exceptions")}
          className={`px-5 py-3 text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "exceptions"
              ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-serif italic font-bold"
              : "text-white/40 hover:text-[#D4AF37]/80 hover:bg-white/5 font-mono uppercase tracking-[0.15em]"
          }`}
        >
          Exception Handling
        </button>
        <button
          onClick={() => setActiveTab("structures")}
          className={`px-5 py-3 text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "structures"
              ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-serif italic font-bold"
              : "text-white/40 hover:text-[#D4AF37]/80 hover:bg-white/5 font-mono uppercase tracking-[0.15em]"
          }`}
        >
          Data Structures
        </button>
      </div>

      {/* Pane Content */}
      <div className="mt-2 min-h-[300px]">
        {/* OOP Tab */}
        {activeTab === "oop" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-white/60 text-xs md:text-sm leading-relaxed max-w-3xl font-serif italic">
              Cineplex Core Booking Engine relies on strict Object-Oriented Programming (OOP) paradigms to engineer a highly modular, secure, and easily extended software sandbox structure:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {oopPrinciples.map((op) => (
                <div key={op.title} className="bg-[#141414] border border-white/5 p-6 rounded-none hover:border-[#D4AF37]/35 transition-all duration-300 flex items-start gap-4">
                  <div className="bg-[#D4AF37]/10 p-2.5 rounded-none border border-[#D4AF37]/20 text-[#D4AF37]">
                    {op.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-serif italic text-white tracking-wide">{op.title}</h4>
                    <span className="text-[10px] text-[#D4AF37] leading-tight block mt-1 mb-2.5 font-mono uppercase tracking-wider">
                      {op.summary}
                    </span>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Classes Tab */}
        {activeTab === "classes" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-white/60 text-xs md:text-sm font-serif italic pb-2">
              The layout incorporates precise, single-responsibility class blueprints matching real-world cinema logistics. Observe their distinct duties:
            </div>
            <div className="border border-white/10 rounded-none overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-white/50">
                <thead className="bg-black text-white/40 uppercase font-mono tracking-[0.2em] text-[9px] border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Class Name</th>
                    <th className="px-6 py-4">Design Role</th>
                    <th className="px-6 py-4 hidden md:table-cell">Responsibility Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {classExplanations.map((cle) => (
                    <tr key={cle.name} className="hover:bg-white/5 bg-[#141414]/50 transition-colors">
                      <td className="px-6 py-4 font-serif italic font-bold text-[#D4AF37] text-sm">{cle.name}</td>
                      <td className="px-6 py-4 text-white/80 font-mono text-[10px] uppercase tracking-wider">{cle.role}</td>
                      <td className="px-6 py-4 text-white/50 leading-relaxed text-xs hidden md:table-cell">{cle.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Exceptions Tab */}
        {activeTab === "exceptions" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 p-5 rounded-none flex gap-4">
              <AlertTriangle className="text-[#D4AF37] w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-[#D4AF37] font-mono">Robust Error Trapping</h4>
                <p className="text-xs text-white/60 leading-relaxed mt-1">
                  Instead of standard app exit crashes, the program models standard operational exceptions extending <code>com.movieticket.booking.BookingSystemException</code>, cleanly captured within <code>try-catch</code> templates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exceptions.map((ex) => (
                <div key={ex.title} className="bg-[#141414] border border-white/5 p-5 rounded-none hover:border-red-400/25 transition-all duration-300">
                  <div className="flex items-center gap-2 text-xs text-red-400 font-mono font-bold uppercase tracking-wider mb-2.5">
                    <Code className="w-4 h-4 text-red-500" />
                    <span>{ex.title}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {ex.cause}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Structures Tab */}
        {activeTab === "structures" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-white/60 text-xs md:text-sm leading-relaxed max-w-3xl font-serif italic">
              Carefully chosen structures from the Java Collections Framework optimize search lookups and resource allocation:
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {dataStructures.map((ds) => (
                <div key={ds.name} className="bg-[#141414] border border-white/5 p-6 rounded-none flex flex-col justify-between hover:border-[#D4AF37]/25 transition-all duration-300">
                  <div>
                    <span className="text-[9px] bg-white/5 text-[#D4AF37] font-mono px-2.5 py-1 rounded-none border border-white/10 self-start block mb-3.5 w-fit uppercase tracking-widest">
                      {ds.reason}
                    </span>
                    <h4 className="text-sm font-serif italic text-white tracking-widest mb-2">{ds.name}</h4>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {ds.detail}
                    </p>
                  </div>
                  <div className="border-t border-white/5 mt-5 pt-3 flex items-center gap-1.5 text-[9px] text-[#D4AF37] uppercase font-mono font-semibold tracking-widest">
                    <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Performance choice</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
