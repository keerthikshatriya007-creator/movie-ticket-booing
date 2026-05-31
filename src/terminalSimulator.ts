export interface ConsoleLine {
  text: string;
  type: "stdout" | "stderr" | "input" | "system";
}

export interface SimMovie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  rating: number;
}

export interface SimSeat {
  number: string;
  price: number;
  isBooked: boolean;
}

export interface SimShow {
  id: string;
  movie: SimMovie;
  time: string;
  room: string;
  seats: { [key: string]: SimSeat };
}

export interface SimBooking {
  id: string;
  username: string;
  showId: string;
  movieTitle: string;
  seats: string[];
  totalCost: number;
  status: "CONFIRMED" | "CANCELLED";
}

export interface SimUser {
  username: string;
  passwordHash: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
  employeeId?: string;
}

export class TerminalSimulator {
  private users: { [username: string]: SimUser } = {};
  private movies: SimMovie[] = [];
  private shows: SimShow[] = [];
  private bookings: SimBooking[] = [];
  
  private currentUser: SimUser | null = null;
  private currentPath: string = "";
  
  // State Machine control
  private state: "GUEST_MAIN" | "USER_LOGIN_UNAME" | "USER_LOGIN_PWD" |
                 "REGISTER_UNAME" | "REGISTER_PWD" | "REGISTER_EMAIL" | "REGISTER_PHONE" |
                 "ADMIN_LOGIN_UNAME" | "ADMIN_LOGIN_PWD" |
                 "USER_MAIN" | "ADMIN_MAIN" |
                 "CHECK_SHOWTIMES_INDEX" |
                 "BOOK_SELECT_SHOW" | "BOOK_QTY" | "BOOK_SEAT_LOOP" |
                 "BOOK_PRINT_SPECIFIC_CONFIRM" | "BOOK_PRINT_SPECIFIC_ID" |
                 "CANCEL_ID" | "CANCEL_CONFIRM" |
                 "ADMIN_ADD_ID" | "ADMIN_ADD_TITLE" | "ADMIN_ADD_GENRE" | "ADMIN_ADD_DURATION" | "ADMIN_ADD_RATING" | "ADMIN_ADD_SCHEDULE_YN" | "ADMIN_ADD_SCHEDULE_TIME" | "ADMIN_ADD_SCHEDULE_ROOM" | "ADMIN_ADD_SCHEDULE_PRICE" |
                 "ADMIN_REMOVE_ID" |
                 "ADMIN_UPDATE_ID" | "ADMIN_UPDATE_TITLE" | "ADMIN_UPDATE_GENRE" | "ADMIN_UPDATE_DURATION" | "ADMIN_UPDATE_RATING" = "GUEST_MAIN";

  // Temporary buffers during multi-step interactive workflows
  private buffer: any = {};
  
  public history: ConsoleLine[] = [];

  constructor() {
    this.seedInitialData();
    this.printWelcome();
  }

  private seedInitialData() {
    this.users["admin"] = { username: "admin", passwordHash: "admin123", role: "ADMIN", employeeId: "EMP001", email: "admin@cineplex.com", phone: "+1-800-ADMIN" };
    this.users["user"] = { username: "user", passwordHash: "user123", role: "USER", email: "alice@gmail.com", phone: "+1-555-0199" };

    this.movies.push({ id: "M01", title: "Inception", genre: "Sci-Fi", duration: 148, rating: 8.8 });
    this.movies.push({ id: "M02", title: "The Dark Knight", genre: "Action", duration: 152, rating: 9.0 });
    this.movies.push({ id: "M03", title: "Interstellar", genre: "Sci-Fi", duration: 169, rating: 8.6 });

    this.shows.push(this.createShow("S01", this.movies[0], "01:30 PM", "Auditorium Screen 1", 12.50));
    this.shows.push(this.createShow("S02", this.movies[0], "07:00 PM", "Auditorium Screen 1", 14.00));
    this.shows.push(this.createShow("S03", this.movies[1], "03:45 PM", "Premium Screen 2", 15.00));
    this.shows.push(this.createShow("S04", this.movies[2], "08:15 PM", "IMAX Theater 3", 18.50));
  }

  private createShow(id: string, movie: SimMovie, time: string, room: string, basePrice: number): SimShow {
    const seats: { [sku: string]: SimSeat } = {};
    const rows = ["A", "B", "C", "D", "E"];
    for (let r of rows) {
      const priceMult = (r === "D" || r === "E") ? 1.25 : 1.0;
      for (let c = 1; c <= 6; c++) {
        const num = `${r}${c}`;
        seats[num] = { number: num, price: basePrice * priceMult, isBooked: false };
      }
    }
    return { id, movie, time, room, seats };
  }

  private printWelcome() {
    this.writeLine("=================================================", "system");
    this.writeLine("  WELCOME TO CINEPLEX BOOKING ENTERPRISE CORE    ", "system");
    this.writeLine("=================================================", "system");
    this.writeLine("[System Info]: Persistent state loaded successfully.", "system");
    this.printGuestMenu();
  }

  public writeLine(text: string, type: "stdout" | "stderr" | "input" | "system" = "stdout") {
    this.history.push({ text, type });
  }

  public getHistory() {
    return this.history;
  }

  public clearHistory() {
    this.history = [];
    this.writeLine("[Terminal Screen Cleared]", "system");
    if (this.state === "GUEST_MAIN") this.printGuestMenu();
    else if (this.state === "USER_MAIN") this.printUserMenu();
    else if (this.state === "ADMIN_MAIN") this.printAdminMenu();
    else this.writeLine(`Buffer waiting at prompt... Type anything.`, "system");
  }

  public processInput(rawInput: string) {
    const input = rawInput.trim();
    this.writeLine(rawInput, "input");

    try {
      this.handleStateMachine(input);
    } catch (e: any) {
      this.writeLine(`\n[ERROR]: ${e.message}`, "stderr");
      this.writeLine("Please try again with correct parameters.");
      this.returnToCurrentMenuPrompt();
    }
  }

  private handleStateMachine(input: string) {
    switch (this.state) {
      // --- GUEST STATE MACHINE ---
      case "GUEST_MAIN":
        const gChoice = parseInt(input);
        if (isNaN(gChoice) || gChoice < 1 || gChoice > 4) {
          this.writeLine("Value out of index. Range must be [1-4]: ", "stderr");
          return;
        }
        if (gChoice === 1) {
          this.writeLine("\n--- CUSTOMER LOGIN SCREEN ---");
          this.writeLine("Enter Username: ", "system");
          this.state = "USER_LOGIN_UNAME";
        } else if (gChoice === 2) {
          this.writeLine("\n--- USER REGISTRATION SCREEN ---");
          this.writeLine("Provide Desired Username: ", "system");
          this.state = "REGISTER_UNAME";
        } else if (gChoice === 3) {
          this.writeLine("\n--- ADMINISTRATOR ACCESS SCREEN ---");
          this.writeLine("Enter Administrative Username: ", "system");
          this.state = "ADMIN_LOGIN_UNAME";
        } else if (gChoice === 4) {
          this.writeLine("\n=================================================", "system");
          this.writeLine(" THANK YOU FOR USING CINEPLEX CORE. GOODBYE!     ", "system");
          this.writeLine("=================================================", "system");
          this.writeLine("[System Status]: Terminal Session Halted. Refresh to boot.", "system");
          this.state = "GUEST_MAIN";
        }
        break;

      case "USER_LOGIN_UNAME":
        if (!input) throw new Error("Username cannot be empty.");
        this.buffer.loginUname = input.toLowerCase();
        this.writeLine("Enter Password: ", "system");
        this.state = "USER_LOGIN_PWD";
        break;

      case "USER_LOGIN_PWD":
        const userObj = this.users[this.buffer.loginUname];
        if (!userObj || userObj.passwordHash !== input || userObj.role !== "USER") {
          throw new Error("Authentication failed! Invalid username or password.");
        }
        this.currentUser = userObj;
        this.writeLine(`\n[Login Success]: Welcome back, ${userObj.username}!`, "system");
        this.printUserMenu();
        this.state = "USER_MAIN";
        this.buffer = {};
        break;

      case "REGISTER_UNAME":
        if (input.length < 3) throw new Error("Credentials invalid: Name must be >= 3 characters.");
        if (this.users[input.toLowerCase()]) throw new Error("Username already exists! Choose another name.");
        this.buffer.regUname = input;
        this.writeLine("Provide Secure Password: ", "system");
        this.state = "REGISTER_PWD";
        break;

      case "REGISTER_PWD":
        if (input.length < 4) throw new Error("Credentials invalid: Password must be >= 4 characters.");
        this.buffer.regPwd = input;
        this.writeLine("Provide Primary Email: ", "system");
        this.state = "REGISTER_EMAIL";
        break;

      case "REGISTER_EMAIL":
        if (!input.includes("@")) throw new Error("Invalid email format (missing '@').");
        this.buffer.regEmail = input;
        this.writeLine("Provide Contact Number: ", "system");
        this.state = "REGISTER_PHONE";
        break;

      case "REGISTER_PHONE":
        if (!input) throw new Error("Phone number cannot be empty.");
        this.users[this.buffer.regUname.toLowerCase()] = {
          username: this.buffer.regUname,
          passwordHash: this.buffer.regPwd,
          email: this.buffer.regEmail,
          phone: input,
          role: "USER"
        };
        this.writeLine("\n[Registration Success]: User details saved. You can now login!", "system");
        this.printGuestMenu();
        this.state = "GUEST_MAIN";
        this.buffer = {};
        break;

      case "ADMIN_LOGIN_UNAME":
        if (!input) throw new Error("Username cannot be empty.");
        this.buffer.adminUname = input.toLowerCase();
        this.writeLine("Enter Superuser Password: ", "system");
        this.state = "ADMIN_LOGIN_PWD";
        break;

      case "ADMIN_LOGIN_PWD":
        const adminObj = this.users[this.buffer.adminUname];
        if (!adminObj || adminObj.passwordHash !== input || adminObj.role !== "ADMIN") {
          throw new Error("Authentication failed! Invalid account or administrative permissions.");
        }
        this.currentUser = adminObj;
        this.writeLine(`\n[Admin Access]: Authenticated successfully. Welcome Controller, ${adminObj.username}!`, "system");
        this.printAdminMenu();
        this.state = "ADMIN_MAIN";
        this.buffer = {};
        break;

      // --- USER STATE MACHINE ---
      case "USER_MAIN":
        const uChoice = parseInt(input);
        if (isNaN(uChoice) || uChoice < 1 || uChoice > 7) {
          this.writeLine("Value out of index. Range must be [1-7]: ", "stderr");
          return;
        }

        switch (uChoice) {
          case 1:
            this.printMoviesCatalog();
            this.printUserMenu();
            break;
          case 2:
            this.writeLine("\n--- DISCOVER SHOW TIMES ---");
            this.printMoviesCatalog();
            this.writeLine("Select Movie Index to see Timeslots: ", "system");
            this.state = "CHECK_SHOWTIMES_INDEX";
            break;
          case 3:
            this.writeLine("\n--- REGISTER TICKET BOOKING ---");
            this.printShowsList();
            this.writeLine("Select Show Index to continue checkout: ", "system");
            this.state = "BOOK_SELECT_SHOW";
            break;
          case 4:
            this.printPersonalHistory();
            break;
          case 5:
            this.printPersonalCancelMenu();
            break;
          case 6:
            this.printProfile();
            this.printUserMenu();
            break;
          case 7:
            this.logout();
            break;
        }
        break;

      case "CHECK_SHOWTIMES_INDEX":
        const smIndex = parseInt(input) - 1;
        if (isNaN(smIndex) || smIndex < 0 || smIndex >= this.movies.length) {
          throw new Error("Invalid Movie Selection Index.");
        }
        const selMov = this.movies[smIndex];
        this.writeLine(`\nSchedules for: '${selMov.title}'`, "system");
        let foundShow = false;
        for (let sh of this.shows) {
          if (sh.movie.id === selMov.id) {
            const availCount = Object.values(sh.seats).filter(s => !s.isBooked).length;
            this.writeLine(`  * Show ID: [${sh.id}] | Time: ${sh.time} | Hall: ${sh.room} | Seats Available: ${availCount}`, "stdout");
            foundShow = true;
          }
        }
        if (!foundShow) {
          this.writeLine("No slots scheduled currently for this movie.", "stdout");
        }
        this.printUserMenu();
        this.state = "USER_MAIN";
        break;

      case "BOOK_SELECT_SHOW":
        const shIdx = parseInt(input) - 1;
        if (isNaN(shIdx) || shIdx < 0 || shIdx >= this.shows.length) {
          throw new Error("Invalid show selection coordinate.");
        }
        this.buffer.bookingShow = this.shows[shIdx];
        this.displaySeatLayout(this.shows[shIdx]);
        this.writeLine("How many seat tickets would you like to purchase? (Max 10): ", "system");
        this.state = "BOOK_QTY";
        break;

      case "BOOK_QTY":
        const qty = parseInt(input);
        if (isNaN(qty) || qty < 1 || qty > 10) {
          throw new Error("Quantity must be a valid integer between 1 and 10.");
        }
        this.buffer.bookingQty = qty;
        this.buffer.seatsSelected = [];
        this.buffer.seatsRemaining = qty;
        this.writeLine(`Enter Seat Tag Selection #1 (like A1, B4): `, "system");
        this.state = "BOOK_SEAT_LOOP";
        break;

      case "BOOK_SEAT_LOOP":
        const seatTag = input.toUpperCase();
        const activeShow: SimShow = this.buffer.bookingShow;
        const matchedSeat = activeShow.seats[seatTag];

        if (!matchedSeat) {
          this.writeLine(`Seat '${seatTag}' is invalid for this hall layout. Re-enter selection #${this.buffer.seatsSelected.length + 1}: `, "stderr");
          return;
        }
        if (matchedSeat.isBooked) {
          this.writeLine(`Seat '${seatTag}' has status 'X' (Already booked). Re-enter selection #${this.buffer.seatsSelected.length + 1}: `, "stderr");
          return;
        }
        if (this.buffer.seatsSelected.includes(seatTag)) {
          this.writeLine(`You already specified seat '${seatTag}'. Choose a different one: `, "stderr");
          return;
        }

        this.buffer.seatsSelected.push(seatTag);
        this.buffer.seatsRemaining--;

        if (this.buffer.seatsRemaining > 0) {
          this.writeLine(`Enter Seat Tag Selection #${this.buffer.seatsSelected.length + 1} (like A1, B4): `, "system");
        } else {
          // Commit Booking!
          const bookId = `BK${1000 + this.bookings.length + 1}`;
          
          // Mark booked
          const bookedSeatObjs: SimSeat[] = [];
          for (let tag of this.buffer.seatsSelected) {
            activeShow.seats[tag].isBooked = true;
            bookedSeatObjs.push(activeShow.seats[tag]);
          }

          const bTotal = bookedSeatObjs.reduce((acc, s) => acc + s.price, 0);

          const newBooking: SimBooking = {
            id: bookId,
            username: this.currentUser!.username,
            showId: activeShow.id,
            movieTitle: activeShow.movie.title,
            seats: this.buffer.seatsSelected,
            totalCost: bTotal,
            status: "CONFIRMED"
          };

          this.bookings.push(newBooking);

          this.writeLine("\n[PAYMENT CONFIRMED]: Booking made successfully!\n", "system");
          this.printReceipt(newBooking, activeShow);
          
          this.buffer = {};
          this.printUserMenu();
          this.state = "USER_MAIN";
        }
        break;

      case "BOOK_PRINT_SPECIFIC_CONFIRM":
        if (input.toUpperCase() === "Y") {
          this.writeLine("Enter Booking ID: ", "system");
          this.state = "BOOK_PRINT_SPECIFIC_ID";
        } else {
          this.printUserMenu();
          this.state = "USER_MAIN";
        }
        break;

      case "BOOK_PRINT_SPECIFIC_ID":
        const targetId = input.toUpperCase();
        const foundB = this.bookings.find(b => b.id === targetId && b.username === this.currentUser!.username);
        if (!foundB) {
          this.writeLine("Receipt ID not found in your purchase accounts.", "stderr");
        } else {
          const matchingShow = this.shows.find(s => s.id === foundB.showId)!;
          this.printReceipt(foundB, matchingShow);
        }
        this.printUserMenu();
        this.state = "USER_MAIN";
        break;

      case "CANCEL_ID":
        const cancelId = input.toUpperCase().trim();
        const cBk = this.bookings.find(b => b.id === cancelId && b.username === this.currentUser!.username);
        if (!cBk) {
          this.writeLine("Invalid Booking ID reference. Action cancelled.", "stderr");
          this.printUserMenu();
          this.state = "USER_MAIN";
        } else if (cBk.status === "CANCELLED") {
          this.writeLine("This booking ticket represents a cancelled category already.", "stderr");
          this.printUserMenu();
          this.state = "USER_MAIN";
        } else {
          this.buffer.cancelBooking = cBk;
          this.writeLine(`Confirm cancellation of ${cancelId}? This action is irreversible (Y/N): `, "system");
          this.state = "CANCEL_CONFIRM";
        }
        break;

      case "CANCEL_CONFIRM":
        if (input.toUpperCase() === "Y") {
          const activeBk: SimBooking = this.buffer.cancelBooking;
          activeBk.status = "CANCELLED";
          
          // Release seats
          const showRef = this.shows.find(s => s.id === activeBk.showId);
          if (showRef) {
            for (let seatNum of activeBk.seats) {
              if (showRef.seats[seatNum]) {
                showRef.seats[seatNum].isBooked = false;
              }
            }
          }
          this.writeLine(`\n[Cancellation success]: Booking status set to CANCELLED. Seats are now released.`, "system");
          this.writeLine(`A full refund of $${activeBk.totalCost.toFixed(2)} has been initiated.`, "stdout");
        } else {
          this.writeLine("Operation aborted dynamically.", "system");
        }
        this.buffer = {};
        this.printUserMenu();
        this.state = "USER_MAIN";
        break;

      // --- ADMIN STATE MACHINE ---
      case "ADMIN_MAIN":
        const aChoice = parseInt(input);
        if (isNaN(aChoice) || aChoice < 1 || aChoice > 7) {
          this.writeLine("Value out of index. Range must be [1-7]: ", "stderr");
          return;
        }

        switch (aChoice) {
          case 1:
            this.printMoviesCatalog();
            this.printAdminMenu();
            break;
          case 2:
            this.writeLine("\n--- CREATE NEW MOVIE RECORD ---");
            this.writeLine("Enter Unique Movie Code ID (e.g., M04): ", "system");
            this.state = "ADMIN_ADD_ID";
            break;
          case 3:
            this.writeLine("\n--- REMOVE MOVIE REGISTER ---");
            this.printMoviesCatalog();
            this.writeLine("Enter Movie ID coordinate to drop (e.g. M01): ", "system");
            this.state = "ADMIN_REMOVE_ID";
            break;
          case 4:
            this.writeLine("\n--- UPDATE MOVIE DATA DICTIONARY ---");
            this.printMoviesCatalog();
            this.writeLine("Enter Movie ID target for editing (e.g. M02): ", "system");
            this.state = "ADMIN_UPDATE_ID";
            break;
          case 5:
            this.printAllGlobalBookings();
            this.printAdminMenu();
            break;
          case 6:
            this.printProfile();
            this.printAdminMenu();
            break;
          case 7:
            this.logout();
            break;
        }
        break;

      // ADMIN ADD WORKFLOW
      case "ADMIN_ADD_ID":
        const amId = input.toUpperCase();
        if (!amId) throw new Error("ID cannot be empty.");
        if (this.movies.find(m => m.id === amId)) throw new Error("A movie with this ID already exists.");
        this.buffer.newId = amId;
        this.writeLine("Enter Movie Title: ", "system");
        this.state = "ADMIN_ADD_TITLE";
        break;

      case "ADMIN_ADD_TITLE":
        if (!input) throw new Error("Title can not be empty.");
        this.buffer.newTitle = input;
        this.writeLine("Enter Genre: ", "system");
        this.state = "ADMIN_ADD_GENRE";
        break;

      case "ADMIN_ADD_GENRE":
        if (!input) throw new Error("Genre can not be empty.");
        this.buffer.newGenre = input;
        this.writeLine("Enter Runtime Duration (Minutes): ", "system");
        this.state = "ADMIN_ADD_DURATION";
        break;

      case "ADMIN_ADD_DURATION":
        const dur = parseInt(input);
        if (isNaN(dur) || dur < 10 || dur > 360) throw new Error("Duration must be an integer between 10 and 360.");
        this.buffer.newDuration = dur;
        this.writeLine("Enter Average Ratings (0.0 to 10.0): ", "system");
        this.state = "ADMIN_ADD_RATING";
        break;

      case "ADMIN_ADD_RATING":
        const rat = parseFloat(input);
        if (isNaN(rat) || rat < 0.0 || rat > 10.0) throw new Error("Rating must be a floating point between 0.0 and 10.0.");
        this.buffer.newRating = rat;

        // Create Movie
        const newMovie: SimMovie = {
          id: this.buffer.newId,
          title: this.buffer.newTitle,
          genre: this.buffer.newGenre,
          duration: this.buffer.newDuration,
          rating: this.buffer.newRating
        };
        this.movies.push(newMovie);
        this.writeLine(`\n[Admin Notification]: Movie record '${newMovie.title}' added to active reels!`, "system");
        
        this.writeLine("Do you want to create a show schedule for this new movie? (Y/N): ", "system");
        this.state = "ADMIN_ADD_SCHEDULE_YN";
        break;

      case "ADMIN_ADD_SCHEDULE_YN":
        if (input.toUpperCase() === "Y") {
          this.writeLine("Enter Show Time (e.g., 04:30 PM): ", "system");
          this.state = "ADMIN_ADD_SCHEDULE_TIME";
        } else {
          this.buffer = {};
          this.printAdminMenu();
          this.state = "ADMIN_MAIN";
        }
        break;

      case "ADMIN_ADD_SCHEDULE_TIME":
        if (!input) throw new Error("Show time is required.");
        this.buffer.nsTime = input;
        this.writeLine("Enter Theatre Room (e.g., Screen 5): ", "system");
        this.state = "ADMIN_ADD_SCHEDULE_ROOM";
        break;

      case "ADMIN_ADD_SCHEDULE_ROOM":
        if (!input) throw new Error("Theatre Room is required.");
        this.buffer.nsRoom = input;
        this.writeLine("Enter Base Seat Cost (e.g., 10.00): ", "system");
        this.state = "ADMIN_ADD_SCHEDULE_PRICE";
        break;

      case "ADMIN_ADD_SCHEDULE_PRICE":
        const price = parseFloat(input);
        if (isNaN(price) || price < 5.0 || price > 100.0) throw new Error("Price must be a number between $5.00 and $100.00.");
        const nsId = `S${1000 + this.shows.length + 1}`;
        const associatedMov = this.movies[this.movies.length - 1];
        
        const newShowObj = this.createShow(nsId, associatedMov, this.buffer.nsTime, this.buffer.nsRoom, price);
        this.shows.push(newShowObj);
        this.writeLine(`[Admin Notification]: Show slot ${nsId} scheduled successfully!`, "system");
        this.buffer = {};
        this.printAdminMenu();
        this.state = "ADMIN_MAIN";
        break;

      // ADMIN REMOVE WORKFLOW
      case "ADMIN_REMOVE_ID":
        const rId = input.toUpperCase();
        const dropIndex = this.movies.findIndex(m => m.id === rId);
        if (dropIndex === -1) {
          this.writeLine(`Could not find a Movie with structural ID ${rId}`, "stderr");
        } else {
          const removedName = this.movies[dropIndex].title;
          this.movies.splice(dropIndex, 1);
          // Purge active schedules
          this.shows = this.shows.filter(s => s.movie.id !== rId);
          this.writeLine(`\n[Admin Success]: Movie record ${rId} (${removedName}) and its active schedules were successfully purged.`, "system");
        }
        this.printAdminMenu();
        this.state = "ADMIN_MAIN";
        break;

      // ADMIN UPDATE WORKFLOW
      case "ADMIN_UPDATE_ID":
        const uId = input.toUpperCase();
        const editMov = this.movies.find(m => m.id === uId);
        if (!editMov) {
          throw new Error("Movie ID not found. Action dropped.");
        }
        this.buffer.editId = uId;
        this.writeLine(`Enter replacement Title [Current: ${editMov.title}]: `, "system");
        this.state = "ADMIN_UPDATE_TITLE";
        break;

      case "ADMIN_UPDATE_TITLE":
        if (!input) throw new Error("Title can not be empty.");
        this.buffer.editTitle = input;
        this.writeLine("Enter replacement Genre: ", "system");
        this.state = "ADMIN_UPDATE_GENRE";
        break;

      case "ADMIN_UPDATE_GENRE":
        if (!input) throw new Error("Genre can not be empty.");
        this.buffer.editGenre = input;
        this.writeLine("Enter replacement Duration (Minutes): ", "system");
        this.state = "ADMIN_UPDATE_DURATION";
        break;

      case "ADMIN_UPDATE_DURATION":
        const uDur = parseInt(input);
        if (isNaN(uDur) || uDur < 10 || uDur > 360) throw new Error("Duration must be an integer between 10 and 360.");
        this.buffer.editDuration = uDur;
        this.writeLine("Enter replacement Rating (0.0 to 10.0): ", "system");
        this.state = "ADMIN_UPDATE_RATING";
        break;

      case "ADMIN_UPDATE_RATING":
        const uRat = parseFloat(input);
        if (isNaN(uRat) || uRat < 0.0 || uRat > 10.0) throw new Error("Rating must be a floating point between 0.0 and 10.0.");
        
        // Find and swap
        const mObj = this.movies.find(m => m.id === this.buffer.editId);
        if (mObj) {
          mObj.title = this.buffer.editTitle;
          mObj.genre = this.buffer.editGenre;
          mObj.duration = this.buffer.editDuration;
          mObj.rating = uRat;
          
          this.writeLine(`\n[Admin Success]: Database records synchronized for ID ${this.buffer.editId}`, "system");
        }
        
        this.buffer = {};
        this.printAdminMenu();
        this.state = "ADMIN_MAIN";
        break;
    }
  }

  private returnToCurrentMenuPrompt() {
    this.buffer = {};
    if (!this.currentUser) {
      this.printGuestMenu();
      this.state = "GUEST_MAIN";
    } else if (this.currentUser.role === "ADMIN") {
      this.printAdminMenu();
      this.state = "ADMIN_MAIN";
    } else {
      this.printUserMenu();
      this.state = "USER_MAIN";
    }
  }

  private logout() {
    this.writeLine(`\n[Session Ended]: User '${this.currentUser!.username}' logged out securely.`, "system");
    this.currentUser = null;
    this.printGuestMenu();
    this.state = "GUEST_MAIN";
  }

  // --- MENU GRAPHICS PRINTERS ---

  private printGuestMenu() {
    this.writeLine("\n------ CINEPLEX BOOKING SYSTEM MAIN ------");
    this.writeLine("1. Customer Login");
    this.writeLine("2. User Registration");
    this.writeLine("3. Admin Credentials Login");
    this.writeLine("4. Exit Application");
    this.writeLine("Please select your option [1-4]: ", "stdout");
  }

  private printUserMenu() {
    this.writeLine("\n------ CUSTOMER OPERATIONS DESK ------");
    this.writeLine(`Signed-in Account: ${this.currentUser!.username}`);
    this.writeLine("----------------------------------------");
    this.writeLine("1. View Available Movies & Rating List");
    this.writeLine("2. Select Movie & Check Showtimes");
    this.writeLine("3. Reserve Show Tickets (Book Seats)");
    this.writeLine("4. View My Ticket Receipt History");
    this.writeLine("5. Request Ticket Cancellation");
    this.writeLine("6. Display My Customer Profile");
    this.writeLine("7. Logout Current Customer User");
    this.writeLine("Please select your option [1-7]: ", "stdout");
  }

  private printAdminMenu() {
    this.writeLine("\n------ ADMINISTRATOR DASHBOARD MENU ------");
    this.writeLine(`Current User: ${this.currentUser!.username} (Employee-Level Access)`);
    this.writeLine("----------------------------------------");
    this.writeLine("1. View All Movie Records");
    this.writeLine("2. Create New Movie Entry");
    this.writeLine("3. Remove Movie Database Register");
    this.writeLine("4. Update Movie Information");
    this.writeLine("5. View Global Bookings History");
    this.writeLine("6. Display Current Admin Profile");
    this.writeLine("7. Logout Administrator Session");
    this.writeLine("Please select your option [1-7]: ", "stdout");
  }

  private printMoviesCatalog() {
    this.writeLine("\n--- ACTIVE SCREENPLAY DATABASE ---");
    if (this.movies.length === 0) {
      this.writeLine("No movies currently stored in the catalog.");
      return;
    }
    this.movies.forEach((m, idx) => {
      this.writeLine(`${idx + 1}. [${m.id}] ${m.title} (${m.genre}) - ${m.duration} mins | Rating: ${m.rating.toFixed(1)}/10`);
    });
  }

  private printShowsList() {
    this.shows.forEach((sh, idx) => {
      this.writeLine(`${idx + 1}. [${sh.id}] ${sh.movie.title} | Room: ${sh.room} | Time: ${sh.time}`);
    });
  }

  private displaySeatLayout(sh: SimShow) {
    this.writeLine(`\n--- SEAT LAYOUT FOR ${sh.room} (${sh.movie.title} @ ${sh.time}) ---`);
    this.writeLine("============== SCREEN PROJECTION AREA ==============");
    this.writeLine("             [O] = Available   [X] = Booked\n");

    const rows = ["A", "B", "C", "D", "E"];
    for (let r of rows) {
      let rowStr = `Row ${r} |  `;
      for (let c = 1; c <= 6; c++) {
        const num = `${r}${c}`;
        const seat = sh.seats[num];
        rowStr += seat.isBooked ? `[X] ` : `[${num}] `;
      }
      this.writeLine(rowStr);
    }
    this.writeLine("\n----------------------------------------------------");
  }

  private printPersonalHistory() {
    this.writeLine("\n--- PERSONAL BOOKING HISTORY ---");
    const myBookings = this.bookings.filter(b => b.username === this.currentUser!.username);
    if (myBookings.length === 0) {
      this.writeLine("No historic bookings recorded. Start your cinematic journey now!");
      this.printUserMenu();
      this.state = "USER_MAIN";
      return;
    }

    myBookings.forEach((b) => {
      this.writeLine(`Booking ID: ${b.id} | Movie: ${b.movieTitle} | Seats: [${b.seats.join(" ")}] | Total paid: $${b.totalCost.toFixed(2)} | Status: ${b.status}`);
      this.writeLine("----------------------------------------");
    });

    this.writeLine("Do you wish to print details for a specific Receipt ID? (Y/N): ", "system");
    this.state = "BOOK_PRINT_SPECIFIC_CONFIRM";
  }

  private printPersonalCancelMenu() {
    this.writeLine("\n--- CANCEL CONFIRMED TICKETS ---");
    const myBookings = this.bookings.filter(b => b.username === this.currentUser!.username);
    if (myBookings.length === 0) {
      this.writeLine("No purchases found under this customer file.", "stdout");
      this.printUserMenu();
      this.state = "USER_MAIN";
      return;
    }

    const confBookings = myBookings.filter(b => b.status === "CONFIRMED");
    if (confBookings.length === 0) {
      this.writeLine("No confirmed active show tickets found for cancellation.", "stdout");
      this.printUserMenu();
      this.state = "USER_MAIN";
      return;
    }

    confBookings.forEach((b) => {
      this.writeLine(`Booking ID: ${b.id} | Movie: ${b.movieTitle} | Seats: [${b.seats.join(" ")}] | Total paid: $${b.totalCost.toFixed(2)} | Status: ${b.status}`);
    });

    this.writeLine("Enter booking ID which you wish to cancel: ", "system");
    this.state = "CANCEL_ID";
  }

  private printProfile() {
    this.writeLine("\n--- CURRENT PROFILE SUMMARY ---");
    if (this.currentUser!.role === "ADMIN") {
      this.writeLine(`Administrator Profile: [Admin: ${this.currentUser!.username}, Employee ID: ${this.currentUser!.employeeId || "EMP001"}]`);
    } else {
      const bCount = this.bookings.filter(b => b.username === this.currentUser!.username).length;
      this.writeLine(`Customer Profile: [User: ${this.currentUser!.username}, Email: ${this.currentUser!.email}, Phone: ${this.currentUser!.phone}, Bookings count: ${bCount}]`);
    }
  }

  private printAllGlobalBookings() {
    this.writeLine("\n--- GLOBAL BOOKINGS ENGINE ARCHIVE ---");
    if (this.bookings.length === 0) {
      this.writeLine("Zero transactions completed currently in the system network.");
      return;
    }
    this.bookings.forEach((b) => {
      this.writeLine(`Client: ${b.username} | Booking ID: ${b.id} | Movie: ${b.movieTitle} | Seats: [${b.seats.join(" ")}] | Total paid: $${b.totalCost.toFixed(2)} | Status: ${b.status}`);
      this.writeLine("----------------------------------------------------");
    });
  }

  private printReceipt(b: SimBooking, sh: SimShow) {
    const localTime = new Date().toISOString().replace("T", " ").substring(0, 19);
    this.writeLine("====================================================", "stdout");
    this.writeLine("            CINEPLEX MOVIE TICKET RECEIPT           ", "stdout");
    this.writeLine("====================================================", "stdout");
    this.writeLine(`Booking Reference ID: ${b.id.padEnd(20)}`, "stdout");
    this.writeLine(`Customer Username:    ${b.username.padEnd(20)}`, "stdout");
    this.writeLine(`Issue Date-Time:      ${localTime.padEnd(20)}`, "stdout");
    this.writeLine("----------------------------------------------------", "stdout");
    this.writeLine(`Movie Title:          ${sh.movie.title.padEnd(20)}`, "stdout");
    this.writeLine(`Movie Genre:          ${sh.movie.genre.padEnd(20)}`, "stdout");
    this.writeLine(`Duration (mins):      ${sh.movie.duration.toString().padEnd(20)}`, "stdout");
    this.writeLine(`Show Schedule:        ${sh.time.padEnd(20)}`, "stdout");
    this.writeLine(`Theatre Auditorium:   ${sh.room.padEnd(20)}`, "stdout");
    this.writeLine("----------------------------------------------------", "stdout");
    
    this.writeLine("Booked Seats Detail:", "stdout");
    for (let sTag of b.seats) {
      const seatPrice = sh.seats[sTag]?.price || 12.50;
      this.writeLine(`  * Seat ${sTag.padEnd(5)} Price: $${seatPrice.toFixed(2)}`, "stdout");
    }
    this.writeLine("----------------------------------------------------", "stdout");
    this.writeLine(`Subtotal:             $${b.totalCost.toFixed(2)}`, "stdout");
    this.writeLine(`Tax/Fees (GST 10%):   $${(b.totalCost * 0.1).toFixed(2)}`, "stdout");
    const grandTotal = b.totalCost * 1.1;
    this.writeLine(`GRAND TOTAL PAID:     $${grandTotal.toFixed(2)}`, "stdout");
    this.writeLine("----------------------------------------------------", "stdout");
    this.writeLine(`Transaction Status:   ${b.status.padEnd(20)}`, "stdout");
    this.writeLine("====================================================", "stdout");
    this.writeLine("     Thank you for choosing Cineplex! Enjoy the show!", "stdout");
    this.writeLine("====================================================", "stdout");
  }
}
