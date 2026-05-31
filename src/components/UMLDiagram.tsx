import { useState } from "react";
import { ArrowDown, HelpCircle, GitCommit, Settings, HelpCircle as HelpIcon, ArrowRight, Layers, Users, Film, Ticket } from "lucide-react";

interface UmlClass {
  name: string;
  type: "class" | "abstract" | "exception" | "interface";
  package: string;
  superClass?: string;
  fields: string[];
  methods: string[];
  relations: { target: string; label: string; type: "inherits" | "associates" | "composes" }[];
}

export default function UMLDiagram() {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  const umlClasses: UmlClass[] = [
    {
      name: "Person",
      type: "abstract",
      package: "com.movieticket.booking",
      fields: [
        "- username: String",
        "- password: String",
        "- role: String"
      ],
      methods: [
        "+ Person(username, password, role)",
        "+ getUsername(): String",
        "+ getPassword(): String",
        "+ getRole(): String",
        "+ getProfileSummary(): String {abstract}"
      ],
      relations: []
    },
    {
      name: "User",
      type: "class",
      package: "com.movieticket.booking",
      superClass: "Person",
      fields: [
        "- email: String",
        "- phoneNumber: String",
        "- bookingHistory: List<Booking>"
      ],
      methods: [
        "+ User(username, password, email, phone)",
        "+ getEmail(): String",
        "+ getPhoneNumber(): String",
        "+ getBookingHistory(): List<Booking>",
        "+ addBooking(Booking): void",
        "+ removeBooking(Booking): void",
        "+ getProfileSummary(): String {override}"
      ],
      relations: [
        { target: "Person", label: "Inherits", type: "inherits" },
        { target: "Booking", label: "Stores", type: "associates" }
      ]
    },
    {
      name: "Admin",
      type: "class",
      package: "com.movieticket.booking",
      superClass: "Person",
      fields: [
        "- employeeId: String"
      ],
      methods: [
        "+ Admin(username, password, employeeId)",
        "+ getEmployeeId(): String",
        "+ setEmployeeId(String): void",
        "+ getProfileSummary(): String {override}"
      ],
      relations: [
        { target: "Person", label: "Inherits", type: "inherits" }
      ]
    },
    {
      name: "Movie",
      type: "class",
      package: "com.movieticket.booking",
      fields: [
        "- movieId: String",
        "- title: String",
        "- genre: String",
        "- durationMinutes: int",
        "- rating: double"
      ],
      methods: [
        "+ Movie(id, title, genre, mins, rate)",
        "+ getMovieId(): String",
        "+ getTitle(): String",
        "+ getGenre(): String",
        "+ getDurationMinutes(): int",
        "+ getRating(): double",
        "+ toString(): String"
      ],
      relations: []
    },
    {
      name: "Seat",
      type: "class",
      package: "com.movieticket.booking",
      fields: [
        "- seatNumber: String",
        "- price: double",
        "- isBooked: boolean"
      ],
      methods: [
        "+ Seat(seatNumber, price)",
        "+ getSeatNumber(): String",
        "+ getPrice(): double",
        "+ isBooked(): boolean",
        "+ reserve(): void",
        "+ release(): void"
      ],
      relations: []
    },
    {
      name: "Show",
      type: "class",
      package: "com.movieticket.booking",
      fields: [
        "- showId: String",
        "- movie: Movie",
        "- showTime: String",
        "- theatreRoom: String",
        "- seatGrid: Map<String, Seat>"
      ],
      methods: [
        "+ Show(id, movie, time, room, basePrice)",
        "+ getShowId(): String",
        "+ getMovie(): Movie",
        "+ getShowTime(): String",
        "+ getTheatreRoom(): String",
        "+ getSeatGrid(): Map<String, Seat>",
        "+ getSeat(String): Seat",
        "+ displaySeatLayout(): void",
        "+ getAvailableSeatsCount(): int"
      ],
      relations: [
        { target: "Movie", label: "Has 1", type: "associates" },
        { target: "Seat", label: "Composes", type: "composes" }
      ]
    },
    {
      name: "Booking",
      type: "class",
      package: "com.movieticket.booking",
      fields: [
        "- bookingId: String",
        "- user: User",
        "- show: Show",
        "- bookedSeats: List<Seat>",
        "- totalCost: double",
        "- bookingStatus: String"
      ],
      methods: [
        "+ Booking(id, user, show, listSeats)",
        "+ getBookingId(): String",
        "+ getUser(): User",
        "+ getShow(): Show",
        "+ getBookedSeats(): List<Seat>",
        "+ getTotalCost(): double",
        "+ getBookingStatus(): String",
        "+ cancelBooking(): void"
      ],
      relations: [
        { target: "User", label: "Reserved By", type: "associates" },
        { target: "Show", label: "Schedules", type: "associates" },
        { target: "Seat", label: "Books", type: "associates" }
      ]
    },
    {
      name: "Ticket",
      type: "class",
      package: "com.movieticket.booking",
      fields: [
        "- booking: Booking",
        "- issueDate: String"
      ],
      methods: [
        "+ Ticket(booking)",
        "+ generateReceipt(): String"
      ],
      relations: [
        { target: "Booking", label: "Receipt For", type: "associates" }
      ]
    },
    {
      name: "MovieBookingSystem",
      type: "class",
      package: "com.movieticket.booking",
      fields: [
        "- users: Map<String, Person>",
        "- movies: List<Movie>",
        "- shows: List<Show>",
        "- globalBookings: List<Booking>"
      ],
      methods: [
        "+ MovieBookingSystem()",
        "+ registerUser(uname, pwd, email, phone): boolean",
        "+ login(uname, pwd): Person",
        "+ addMovie(Movie): void",
        "+ deleteMovie(String): boolean",
        "+ updateMovie(id, title, genre, mins, rating): boolean",
        "+ bookTickets(User, Show, List<String>): Booking",
        "+ cancelTicket(String): boolean",
        "+ saveData(): boolean",
        "+ loadData(): boolean"
      ],
      relations: [
        { target: "User", label: "Manages", type: "associates" },
        { target: "Movie", label: "Catalogs", type: "associates" },
        { target: "Show", label: "Schedules", type: "associates" },
        { target: "Booking", label: "Tracks", type: "associates" }
      ]
    }
  ];

  const getClassBorderClass = (cName: string, type: string) => {
    const isHovered = hoveredClass === cName;
    const isRelated = hoveredClass && umlClasses.find(c => c.name === hoveredClass)?.relations.some(r => r.target === cName);
    const isRelatedBack = hoveredClass && umlClasses.find(c => c.name === cName)?.relations.some(r => r.target === hoveredClass);

    if (isHovered) return "border-[#B88E2F] ring-1 ring-[#B88E2F]/30 scale-[1.015]";
    if (isRelated || isRelatedBack) return "border-[#B88E2F]/50 shadow-md transform -translate-y-0.5";

    switch (type) {
      case "abstract":
        return "border-black/10 hover:border-[#B88E2F]/30";
      default:
        return "border-black/5 hover:border-[#B88E2F]/30";
    }
  };

  const getClassBg = (type: string) => {
    switch (type) {
      case "abstract":
        return "bg-black/5";
      default:
        return "bg-white";
    }
  };

  const getClassIcon = (type: string) => {
    switch (type) {
      case "abstract":
        return <Layers className="w-4 h-4 text-[#B88E2F]" />;
      default:
        return <Users className="w-4 h-4 text-[#B88E2F]/80" />;
    }
  };

  return (
    <div className="flex flex-col gap-6" id="java-uml-diagram">
      {/* Legend & Help Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-black/10 p-6 rounded-none shadow-sm animate-fadeIn">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#B88E2F] shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <h4 className="text-sm font-serif italic text-black tracking-wider">Interactive Class Diagrams & Relationships</h4>
            <p className="text-xs text-black/50 leading-relaxed max-w-xl">
              Hover over any class node to witness logical encapsulation boundaries, inheritance constructs, and object compositions highlighting dynamically.
            </p>
          </div>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-4 border-l border-black/5 md:pl-6 pt-3 md:pt-0">
          <div className="flex items-center gap-2 text-[11px] text-black/60 font-mono">
            <span className="w-2 h-2 bg-[#B88E2F] inline-block"></span>
            <span>Inheritance</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-black/60 font-mono">
            <span className="w-2 h-2 bg-stone-500 inline-block"></span>
            <span>Association</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-black/60 font-mono">
            <span className="w-2 h-2 bg-[#9E7415] inline-block"></span>
            <span>Composition</span>
          </div>
        </div>
      </div>

      {/* Grid of UML Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {umlClasses.map((uml) => (
          <div
            key={uml.name}
            onMouseEnter={() => setHoveredClass(uml.name)}
            onMouseLeave={() => setHoveredClass(null)}
            className={`flex flex-col backdrop-blur-sm rounded-none overflow-hidden border shadow-sm transition-all duration-300 ${getClassBg(
              uml.type
            )} ${getClassBorderClass(uml.name, uml.type)}`}
          >
            {/* Header */}
            <div className={`px-4.5 py-3.5 border-b border-black/10 flex items-center justify-between ${uml.type === "abstract" ? "bg-black/5" : "bg-black/1"}`}>
              <div className="flex items-center gap-2.5">
                {getClassIcon(uml.type)}
                <div>
                  <div className="flex items-center gap-1.5 align-baseline">
                    <span className="text-sm font-serif italic text-black tracking-wide">{uml.name}</span>
                    {uml.superClass && (
                      <span className="text-[9px] bg-[#B88E2F]/10 text-[#B88E2F] px-2 py-0.5 rounded-none font-mono border border-[#B88E2F]/20 uppercase tracking-wider font-semibold">
                        extends {uml.superClass}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-black/35 block font-mono leading-none mt-1">
                    {uml.package}
                  </span>
                </div>
              </div>
              <span className={`text-[8px] px-2 py-0.5 rounded-none font-bold tracking-[0.15em] uppercase border ${
                uml.type === "abstract"
                  ? "bg-black/5 text-black/60 border-black/10"
                  : "bg-[#B88E2F]/10 text-[#B88E2F] border-[#B88E2F]/25"
              }`}>
                {uml.type}
              </span>
            </div>

            {/* Properties List */}
            <div className="p-4 border-b border-black/5 bg-[#FAF9F5]/40 animate-fadeIn">
              <span className="text-[9px] text-[#B88E2F] uppercase tracking-[0.15em] font-bold block mb-2 font-sans">
                properties
              </span>
              <div className="space-y-1.5 font-mono text-[11px] text-black/70 font-medium">
                {uml.fields.map((f, i) => (
                  <div key={i} className="truncate" title={f}>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Methods List */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-[#B88E2F] uppercase tracking-[0.15em] font-bold block mb-2 font-sans font-semibold">
                  methods
                </span>
                <div className="space-y-1 font-mono text-[11px] text-black/55">
                  {uml.methods.slice(0, 5).map((m, i) => (
                    <div key={i} className="truncate font-medium hover:text-[#B88E2F]" title={m}>
                      {m}
                    </div>
                  ))}
                  {uml.methods.length > 5 && (
                    <div className="text-[10px] italic text-black/35 pt-1 font-mono">
                      + {uml.methods.length - 5} additional procedures...
                    </div>
                  )}
                </div>
              </div>

              {/* Relationship summary on card border */}
              {uml.relations.length > 0 && (
                <div className="mt-5 pt-3 border-t border-black/5">
                  <div className="flex flex-wrap gap-1.5 animate-fadeIn">
                    {uml.relations.map((r, i) => (
                      <span
                        key={i}
                        className={`text-[9.5px] px-2 py-0.5 rounded-none font-mono flex items-center gap-1 leading-none border ${
                          r.type === "inherits"
                            ? "bg-[#B88E2F]/5 text-[#B88E2F] border-[#B88E2F]/15 font-semibold"
                            : r.type === "composes"
                            ? "bg-stone-50 border-stone-200 text-stone-600"
                            : "bg-black/5 text-black/60 border-black/10"
                        }`}
                      >
                        {r.label} 
                        <span className="text-black/20">→</span> 
                        <strong className="text-black/80 font-bold">{r.target}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
