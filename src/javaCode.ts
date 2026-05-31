export interface JavaFile {
  name: string;
  path: string;
  description: string;
  code: string;
}

export const JAVA_FILES: JavaFile[] = [
  {
    name: "Person.java",
    path: "Person.java",
    description: "An abstract base class demonstrating Abstraction and Inheritance, serving as the parent for User and Admin.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.Serializable;

/**
 * Abstract class representing a generic Person in the system.
 * Demonstrates Abstraction and Encapsulation.
 */
public abstract class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String username;
    private String password;
    private String role; // "USER" or "ADMIN"

    // Constructor
    public Person(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Encapsulation: Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Abstraction: Common behavior defined, to be implemented poly-morphically by subclasses
    public abstract String getProfileSummary();
    
    @Override
    public String toString() {
        return "Username: " + username + " (" + role + ")";
    }
}`
  },
  {
    name: "User.java",
    path: "User.java",
    description: "Represents a customer in the system. Inherits from Person, adding booking history and contact information.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a standard customer/User.
 * Demonstrates Inheritance from Person.
 */
public class User extends Person {
    private static final long serialVersionUID = 1L;

    private String email;
    private String phoneNumber;
    private List<Booking> bookingHistory;

    // Constructor calling super class
    public User(String username, String password, String email, String phoneNumber) {
        super(username, password, "USER");
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.bookingHistory = new ArrayList<>();
    }

    // Encapsulation: Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Booking> getBookingHistory() {
        return bookingHistory;
    }

    public void addBooking(Booking booking) {
        this.bookingHistory.add(booking);
    }

    public void removeBooking(Booking booking) {
        this.bookingHistory.remove(booking);
    }

    // Polymorphism: Implementing abstract method from super class
    @Override
    public String getProfileSummary() {
        return "Customer Profile: [User: " + getUsername() + ", Email: " + email + ", Phone: " + phoneNumber + ", Bookings count: " + bookingHistory.size() + "]";
    }
}`
  },
  {
    name: "Admin.java",
    path: "Admin.java",
    description: "Represents an administrator, inheriting from Person, with authority to manage show schedules and view statistics.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

/**
 * Represents an administrator account.
 * Demonstrates Inheritance from Person.
 */
public class Admin extends Person {
    private static final long serialVersionUID = 1L;

    private String employeeId;

    // Constructor calling super class
    public Admin(String username, String password, String employeeId) {
        super(username, password, "ADMIN");
        this.employeeId = employeeId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    // Polymorphism: Implementing abstract method from super class
    @Override
    public String getProfileSummary() {
        return "Administrator Profile: [Admin: " + getUsername() + ", Employee ID: " + employeeId + "]";
    }
}`
  },
  {
    name: "Movie.java",
    path: "Movie.java",
    description: "Contains detail specifications of a theatrical presentation, including title, genre, run duration, and rating.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.Serializable;

/**
 * Represents a theatrical Movie in the system.
 */
public class Movie implements Serializable {
    private static final long serialVersionUID = 1L;

    private String movieId;
    private String title;
    private String genre;
    private int durationMinutes;
    private double rating;

    // Default Constructor
    public Movie(String movieId, String title, String genre, int durationMinutes, double rating) {
        this.movieId = movieId;
        this.title = title;
        this.genre = genre;
        this.durationMinutes = durationMinutes;
        this.rating = rating;
    }

    // Getters and Setters
    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return String.format("[%s] %s (%s) - %d mins | Rating: %.1f/10", 
            movieId, title, genre, durationMinutes, rating);
    }
}`
  },
  {
    name: "Seat.java",
    path: "Seat.java",
    description: "Encapsulates individual seat spatial coordinate, price category, and booking availability indicators.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.Serializable;

/**
 * Represents a single seat in a theatre room.
 */
public class Seat implements Serializable {
    private static final long serialVersionUID = 1L;

    private String seatNumber; // e.g. "A1", "C4"
    private double price;
    private boolean isBooked;

    // Constructor
    public Seat(String seatNumber, double price) {
        this.seatNumber = seatNumber;
        this.price = price;
        this.isBooked = false;
    }

    // Getters and Setters
    public String getSeatNumber() {
        return seatNumber;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    // Helper Methods
    public void reserve() {
        this.isBooked = true;
    }

    public void release() {
        this.isBooked = false;
    }

    @Override
    public String toString() {
        return seatNumber + (isBooked ? "[X]" : "[O]");
    }
}`
  },
  {
    name: "Show.java",
    path: "Show.java",
    description: "Handles the movie showtimes, auditorium rooms, and the internal grid representation of physical seats.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Represents a specific Show / screening of a movie.
 */
public class Show implements Serializable {
    private static final long serialVersionUID = 1L;

    private String showId;
    private Movie movie;
    private String showTime; // e.g., "12:00 PM", "03:30 PM", "07:00 PM"
    private String theatreRoom; // e.g., "Screen 1"
    private Map<String, Seat> seatGrid; // Key: Seat Number (e.g., "A1"), Value: Seat Object

    private int rowsCount = 5;
    private int colsCount = 6;

    // Constructor
    public Show(String showId, Movie movie, String showTime, String theatreRoom, double basePrice) {
        this.showId = showId;
        this.movie = movie;
        this.showTime = showTime;
        this.theatreRoom = theatreRoom;
        this.seatGrid = new HashMap<>();
        initializeSeats(basePrice);
    }

    // Initialize screen row-col seats (A1 to E6)
    private void initializeSeats(double basePrice) {
        char rowChar = 'A';
        for (int i = 0; i < rowsCount; i++) {
            // Give higher prices to rear premium columns or rows (e.g. Row E is premium)
            double rowPriceMultiplier = (rowChar == 'D' || rowChar == 'E') ? 1.25 : 1.0;
            for (int k = 1; k <= colsCount; k++) {
                String seatNum = "" + rowChar + k;
                double finalPrice = basePrice * rowPriceMultiplier;
                seatGrid.put(seatNum, new Seat(seatNum, finalPrice));
            }
            rowChar++;
        }
    }

    // Getters and Setters
    public String getShowId() {
        return showId;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getShowTime() {
        return showTime;
    }

    public String getTheatreRoom() {
        return theatreRoom;
    }

    public Map<String, Seat> getSeatGrid() {
        return seatGrid;
    }

    // Booking seat validations
    public Seat getSeat(String seatNumber) {
        return seatGrid.get(seatNumber.toUpperCase().trim());
    }

    public void displaySeatLayout() {
        System.out.println("\\n--- SEAT LAYOUT FOR " + theatreRoom + " (" + movie.getTitle() + " @ " + showTime + ") ---");
        System.out.println("============== SCREEN PROJECTION AREA ==============");
        System.out.println("             [O] = Available   [X] = Booked\\n");
        
        char rowChar = 'A';
        for (int i = 0; i < rowsCount; i++) {
            System.out.print("Row " + rowChar + " |  ");
            for (int k = 1; k <= colsCount; k++) {
                String seatNum = "" + rowChar + k;
                Seat seat = seatGrid.get(seatNum);
                String seatRep = seat.isBooked() ? "\\u001B[31m[X]\\u001B[0m" : "\\u001B[32m[" + seatNum + "]\\u001B[0m";
                // Console color compatibility toggle
                seatRep = seat.isBooked() ? "[X] " : "[" + seatNum + "] ";
                System.out.print(seatRep + " ");
            }
            System.out.println();
            rowChar++;
        }
        System.out.println("\\n----------------------------------------------------");
    }

    public int getAvailableSeatsCount() {
        int count = 0;
        for (Seat seat : seatGrid.values()) {
            if (!seat.isBooked()) {
                count++;
            }
        }
        return count;
    }
}`
  },
  {
    name: "Booking.java",
    path: "Booking.java",
    description: "Saves individual reservation histories, binding a user, specific show schedule, and lists of reserved seats.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.Serializable;
import java.util.List;

/**
 * Represents a reservation transaction in the system.
 */
public class Booking implements Serializable {
    private static final long serialVersionUID = 1L;

    private String bookingId;
    private User user;
    private Show show;
    private List<Seat> bookedSeats;
    private double totalCost;
    private String bookingStatus; // "CONFIRMED", "CANCELLED"

    // Constructor
    public Booking(String bookingId, User user, Show show, List<Seat> bookedSeats) {
        this.bookingId = bookingId;
        this.user = user;
        this.show = show;
        this.bookedSeats = bookedSeats;
        this.bookingStatus = "CONFIRMED";
        this.totalCost = calculateTotalCost();
    }

    private double calculateTotalCost() {
        double cost = 0.0;
        for (Seat seat : bookedSeats) {
            cost += seat.getPrice();
        }
        return cost;
    }

    // Getters and Setters
    public String getBookingId() {
        return bookingId;
    }

    public User getUser() {
        return user;
    }

    public Show getShow() {
        return show;
    }

    public List<Seat> getBookedSeats() {
        return bookedSeats;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public void cancelBooking() {
        this.bookingStatus = "CANCELLED";
        // Release seats associated
        for (Seat seat : bookedSeats) {
            seat.release();
        }
    }

    @Override
    public String toString() {
        StringBuilder seatNums = new StringBuilder();
        for (Seat s : bookedSeats) {
            seatNums.append(s.getSeatNumber()).append(" ");
        }
        return String.format("Booking ID: %s | Movie: %s | Seats: [%s] | Total paid: $%.2f | Status: %s",
            bookingId, show.getMovie().getTitle(), seatNums.toString().trim(), totalCost, bookingStatus);
    }
}`
  },
  {
    name: "Ticket.java",
    path: "Ticket.java",
    description: "Represents the printable billing invoice, providing receipt layout generation capabilities.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Represents a printable Ticket Receipt generated from a Booking.
 * Demonstrates single responsibility layout rendering.
 */
public class Ticket implements Serializable {
    private static final long serialVersionUID = 1L;

    private Booking booking;
    private String issueDate;

    public Ticket(Booking booking) {
        this.booking = booking;
        this.issueDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public String generateReceipt() {
        StringBuilder sb = new StringBuilder();
        sb.append("====================================================\\n");
        sb.append("            CINEPLEX MOVIE TICKET RECEIPT           \\n");
        sb.append("====================================================\\n");
        sb.append(String.format("Booking Reference ID: %-20s\\n", booking.getBookingId()));
        sb.append(String.format("Customer Username:    %-20s\\n", booking.getUser().getUsername()));
        sb.append(String.format("Issue Date-Time:      %-20s\\n", issueDate));
        sb.append("----------------------------------------------------\\n");
        sb.append(String.format("Movie Title:          %-20s\\n", booking.getShow().getMovie().getTitle()));
        sb.append(String.format("Movie Genre:          %-20s\\n", booking.getShow().getMovie().getGenre()));
        sb.append(String.format("Duration (mins):      %-20d\\n", booking.getShow().getMovie().getDurationMinutes()));
        sb.append(String.format("Show Schedule:        %-20s\\n", booking.getShow().getShowTime()));
        sb.append(String.format("Theatre Auditorium:   %-20s\\n", booking.getShow().getTheatreRoom()));
        sb.append("----------------------------------------------------\\n");
        
        sb.append("Booked Seats Detail:\\n");
        for (Seat seat : booking.getBookedSeats()) {
            sb.append(String.format("  * Seat %-5s Price: $%.2f\\n", seat.getSeatNumber(), seat.getPrice()));
        }
        sb.append("----------------------------------------------------\\n");
        sb.append(String.format("Subtotal:             $%.2f\\n", booking.getTotalCost()));
        sb.append(String.format("Tax/Fees (GST 10%%):   $%.2f\\n", booking.getTotalCost() * 0.1));
        double grandTotal = booking.getTotalCost() * 1.1;
        sb.append(String.format("GRAND TOTAL PAID:     $%.2f\\n", grandTotal));
        sb.append("----------------------------------------------------\\n");
        sb.append(String.format("Transaction Status:   %-20s\\n", booking.getBookingStatus()));
        sb.append("====================================================\\n");
        sb.append("     Thank you for choosing Cineplex! Enjoy the show!\\n");
        sb.append("====================================================\\n");
        return sb.toString();
    }
}`
  },
  {
    name: "Exceptions.java",
    path: "Exceptions.java",
    description: "Custom classes supporting solid robust user input exception filtering (InvalidLogin, InvalidSeat, InvalidInput).",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

/**
 * Base custom exception for the Movie Booking System.
 */
class BookingSystemException extends Exception {
    public BookingSystemException(String message) {
        super(message);
    }
}

/**
 * Exception thrown when user fails to authenticate properly.
 */
class InvalidLoginException extends BookingSystemException {
    public InvalidLoginException(String message) {
        super(message);
    }
}

/**
 * Exception thrown when the specified seat number does not exist inside layout.
 */
class InvalidSeatException extends BookingSystemException {
    public InvalidSeatException(String message) {
        super(message);
    }
}

/**
 * Exception thrown when a user tries to book an already occupied seat.
 */
class SeatAlreadyBookedException extends BookingSystemException {
    public SeatAlreadyBookedException(String message) {
        super(message);
    }
}

/**
 * Exception thrown when generic user inputs (such as menu indices) fail to compile correctly.
 */
class InvalidInputException extends BookingSystemException {
    public InvalidInputException(String message) {
        super(message);
    }
}`
  },
  {
    name: "MovieBookingSystem.java",
    path: "MovieBookingSystem.java",
    description: "The primary coordinator (Facade) orchestrating lists, maps, registrations, and saving/loading state via File I/O simulate files.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.*;
import java.util.*;

/**
 * Controller/Engine orchestrating data storage, validations, persistence and logic.
 * Demonstrates Encapsulation and Data Structures (HashMap, ArrayList).
 */
public class MovieBookingSystem {
    private Map<String, Person> users;      // Key: Username, Value: Person (User/Admin) - Polymorphism
    private List<Movie> movies;             // Storing movies available
    private List<Show> shows;               // Storing scheduled shows
    private List<Booking> globalBookings;   // Global register of bookings for Admin inspections

    private static final String DATA_FILE = "booking_system_data.ser";

    // Constructor
    public MovieBookingSystem() {
        this.users = new HashMap<>();
        this.movies = new ArrayList<>();
        this.shows = new ArrayList<>();
        this.globalBookings = new ArrayList<>();
        
        // Populate standard default parameters
        seedInitialData();
    }

    private void seedInitialData() {
        // Build Default Admin
        Admin primaryAdmin = new Admin("admin", "admin123", "EMP001");
        users.put(primaryAdmin.getUsername(), primaryAdmin);

        // Build Default Customer
        User simpleUser = new User("user", "user123", "alice@gmail.com", "+1-555-0199");
        users.put(simpleUser.getUsername(), simpleUser);

        // Build Default Movies
        Movie m1 = new Movie("M01", "Inception", "Sci-Fi", 148, 8.8);
        Movie m2 = new Movie("M02", "The Dark Knight", "Action", 152, 9.0);
        Movie m3 = new Movie("M03", "Interstellar", "Sci-Fi", 169, 8.6);
        movies.add(m1);
        movies.add(m2);
        movies.add(m3);

        // Build Default Shows
        shows.add(new Show("S01", m1, "01:30 PM", "Auditorium Screen 1", 12.50));
        shows.add(new Show("S02", m1, "07:00 PM", "Auditorium Screen 1", 14.00));
        shows.add(new Show("S03", m2, "03:45 PM", "Premium Screen 2", 15.00));
        shows.add(new Show("S04", m3, "08:15 PM", "IMAX Theater 3", 18.50));
    }

    // --- Authentication & Registrations ---
    
    public boolean registerUser(String username, String password, String email, String phone) throws InvalidInputException {
        if (users.containsKey(username.toLowerCase().trim())) {
            throw new InvalidInputException("Username already exists! Choose another name.");
        }
        if (username.length() < 3 || password.length() < 4) {
            throw new InvalidInputException("Invalid credentials: Name must be >=3 chars, password >=4 chars.");
        }
        User newUser = new User(username, password, email, phone);
        users.put(username.toLowerCase().trim(), newUser);
        return true;
    }

    public Person login(String username, String password) throws InvalidLoginException {
        Person person = users.get(username.toLowerCase().trim());
        if (person == null || !person.getPassword().equals(password)) {
            throw new InvalidLoginException("Authentication failed! Invalid username or password.");
        }
        return person;
    }

    // --- Movie Management (Admin Operations) ---

    public void addMovie(Movie movie) {
        movies.add(movie);
    }

    public boolean deleteMovie(String movieId) {
        Movie movieToDelete = null;
        for (Movie m : movies) {
            if (m.getMovieId().equalsIgnoreCase(movieId)) {
                movieToDelete = m;
                break;
            }
        }
        if (movieToDelete != null) {
            movies.remove(movieToDelete);
            
            // Clean up dependent schedules
            shows.removeIf(sh -> sh.getMovie().getMovieId().equalsIgnoreCase(movieId));
            return true;
        }
        return false;
    }

    public boolean updateMovie(String movieId, String title, String genre, int duration, double rating) {
        for (Movie m : movies) {
            if (m.getMovieId().equalsIgnoreCase(movieId)) {
                m.setTitle(title);
                m.setGenre(genre);
                m.setDurationMinutes(duration);
                m.setRating(rating);
                return true;
            }
        }
        return false;
    }

    // --- Scheduling Slots ---

    public void addShow(Show show) {
        shows.add(show);
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public List<Show> getShows() {
        return shows;
    }

    public List<Booking> getGlobalBookings() {
        return globalBookings;
    }

    // --- Booking Operations ---

    public Booking bookTickets(User user, Show show, List<String> seatNumbers) 
            throws InvalidSeatException, SeatAlreadyBookedException {
        
        List<Seat> seatsToReserve = new ArrayList<>();
        
        // Phase 1: Validate seat existence and availability
        for (String seatNum : seatNumbers) {
            Seat seat = show.getSeat(seatNum);
            if (seat == null) {
                throw new InvalidSeatException("Seat coordinate '" + seatNum + "' is invalid for this hall layout.");
            }
            if (seat.isBooked()) {
                throw new SeatAlreadyBookedException("Seat '" + seatNum + "' has code 'X' (Already booked by another user).");
            }
            seatsToReserve.add(seat);
        }

        // Phase 2: Perform seat reservations
        for (Seat seat : seatsToReserve) {
            seat.reserve();
        }

        // Phase 3: Create Booking Record
        String bookingId = "BK" + (1000 + globalBookings.size() + 1);
        Booking booking = new Booking(bookingId, user, show, seatsToReserve);
        
        // Save to user and global history
        user.addBooking(booking);
        globalBookings.add(booking);
        
        return booking;
    }

    public boolean cancelTicket(String bookingId) {
        for (Booking booking : globalBookings) {
            if (booking.getBookingId().equalsIgnoreCase(bookingId)) {
                if (booking.getBookingStatus().equals("CANCELLED")) {
                    return false; // Already cancelled
                }
                booking.cancelBooking();
                return true;
            }
        }
        return false;
    }

    // --- Persistence Management (File I/O Simulation and actual representation) ---

    public boolean saveData() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(DATA_FILE))) {
            oos.writeObject(users);
            oos.writeObject(movies);
            oos.writeObject(shows);
            oos.writeObject(globalBookings);
            return true;
        } catch (IOException e) {
            System.err.println("File writing serialization failure: " + e.getMessage());
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    public boolean loadData() {
        File file = new File(DATA_FILE);
        if (!file.exists()) {
            return false;
        }
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            users = (Map<String, Person>) ois.readObject();
            movies = (List<Movie>) ois.readObject();
            shows = (List<Show>) ois.readObject();
            globalBookings = (List<Booking>) ois.readObject();
            return true;
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Loading serial file mismatch. Loading seeded defaults: " + e.getMessage());
            return false;
        }
    }
}`
  },
  {
    name: "Main.java",
    path: "Main.java",
    description: "The primary program entry point housing the console menu logic, reading scanner, and looping command inputs.",
    code: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

package com.movieticket.booking;

import java.io.InputStream;
import java.util.*;

/**
 * Main command loop orchestrating menus, user logins, inputs, and exceptions handling.
 */
public class Main {
    private static MovieBookingSystem system = new MovieBookingSystem();
    private static Scanner scanner = new Scanner(System.in);
    private static Person currentLoggedInUser = null;

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("  WELCOME TO CINEPLEX BOOKING ENTERPRISE CORE    ");
        System.out.println("=================================================");
        
        // Load external state (if exists)
        boolean dataLoaded = system.loadData();
        if (dataLoaded) {
            System.out.println("[System Info]: Persistent state loaded successfully.");
        } else {
            System.out.println("[System Info]: No previous backup file found. Initialized with factory seeded database.");
        }

        boolean exit = false;
        while (!exit) {
            try {
                if (currentLoggedInUser == null) {
                    exit = displayGuestMenu();
                } else if (currentLoggedInUser instanceof Admin) {
                    exit = displayAdminMenu();
                } else {
                    exit = displayCustomerMenu();
                }
            } catch (Exception e) {
                System.out.println("\\n\\u001B[31m[ERROR]: " + e.getMessage() + "\\u001B[0m");
                System.out.println("Please try again with correct parameters.");
                // Consume buffer
                scanner.nextLine();
            }
        }
        
        // Auto-save backup values upon exit
        boolean saved = system.saveData();
        if (saved) {
            System.out.println("[System Info]: Backups saved to local disk storage successfully.");
        }
        System.out.println("\\n=================================================");
        System.out.println(" THANK YOU FOR USING CINEPLEX CORE. GOODBYE!     ");
        System.out.println("=================================================");
    }

    // --- CLI MENUS AND COMMAND PROCEDURES ---

    private static boolean displayGuestMenu() throws BookingSystemException {
        System.out.println("\\n------ CINEPLEX BOOKING SYSTEM MAIN ------");
        System.out.println("1. Customer Login");
        System.out.println("2. User Registration");
        System.out.println("3. Admin Credentials Login");
        System.out.println("4. Exit Application");
        System.out.print("Please select your option [1-4]: ");
        
        int choice = readIntegerChoice(1, 4);
        switch (choice) {
            case 1:
                handleUserLogin();
                break;
            case 2:
                handleUserRegistration();
                break;
            case 3:
                handleAdminLogin();
                break;
            case 4:
                return true; // exits loop
        }
        return false;
    }

    private static boolean displayAdminMenu() throws BookingSystemException {
        System.out.println("\\n------ ADMINISTRATOR DASHBOARD MENU ------");
        System.out.println("Current User: " + currentLoggedInUser.getUsername() + " (Employee-Level Access)");
        System.out.println("----------------------------------------");
        System.out.println("1. View All Movie Records");
        System.out.println("2. Create New Movie Entry");
        System.out.println("3. Remove Movie Database Register");
        System.out.println("4. Update Movie Information");
        System.out.println("5. View Global Bookings History");
        System.out.println("6. Display Current Admin Profile");
        System.out.println("7. Logout Administrator Session");
        System.out.print("Please select your option [1-7]: ");

        int choice = readIntegerChoice(1, 7);
        switch (choice) {
            case 1:
                viewAllMovies();
                break;
            case 2:
                handleAddMovie();
                break;
            case 3:
                handleRemoveMovie();
                break;
            case 4:
                handleUpdateMovie();
                break;
            case 5:
                viewAllGlobalBookings();
                break;
            case 6:
                System.out.println("\\n" + currentLoggedInUser.getProfileSummary());
                break;
            case 7:
                processLogout();
                break;
        }
        return false;
    }

    private static boolean displayCustomerMenu() throws BookingSystemException {
        System.out.println("\\n------ CUSTOMER OPERATIONS DESK ------");
        System.out.println("Signed-in Account: " + currentLoggedInUser.getUsername());
        System.out.println("----------------------------------------");
        System.out.println("1. View Available Movies & Rating List");
        System.out.println("2. Select Movie & Check Showtimes");
        System.out.println("3. Reserve Show Tickets (Book Seats)");
        System.out.println("4. View My Ticket Receipt History");
        System.out.println("5. Request Ticket Cancellation");
        System.out.println("6. Display My Customer Profile");
        System.out.println("7. Logout Current Customer User");
        System.out.print("Please select your option [1-7]: ");

        int choice = readIntegerChoice(1, 7);
        switch (choice) {
            case 1:
                viewAllMovies();
                break;
            case 2:
                handleCheckShowtimes();
                break;
            case 3:
                handleBookSeats();
                break;
            case 4:
                viewPersonalBookingHistory();
                break;
            case 5:
                handleCancelBooking();
                break;
            case 6:
                System.out.println("\\n" + currentLoggedInUser.getProfileSummary());
                break;
            case 7:
                processLogout();
                break;
        }
        return false;
    }

    // --- HELPER BUSINESS ACTIONS ---

    private static void handleUserLogin() throws InvalidLoginException {
        System.out.println("\\n--- CUSTOMER LOGIN SCREEN ---");
        System.out.print("Enter Username: ");
        String uname = scanner.nextLine().trim();
        System.out.print("Enter Password: ");
        String pword = scanner.nextLine().trim();

        Person p = system.login(uname, pword);
        if (p instanceof User) {
            currentLoggedInUser = p;
            System.out.println("\\n[Login Success]: Welcome back, " + p.getUsername() + "!");
        } else {
            throw new InvalidLoginException("Error: Access denied. Please log in through the Admin Portal instead.");
        }
    }

    private static void handleUserRegistration() throws InvalidInputException {
        System.out.println("\\n--- USER REGISTRATION SCREEN ---");
        System.out.print("Provide Desired Username: ");
        String uname = scanner.nextLine().trim();
        System.out.print("Provide Secure Password: ");
        String pword = scanner.nextLine().trim();
        System.out.print("Provide Primary Email: ");
        String email = scanner.nextLine().trim();
        System.out.print("Provide Contact Number: ");
        String phone = scanner.nextLine().trim();

        boolean registered = system.registerUser(uname, pword, email, phone);
        if (registered) {
            System.out.println("\\n[Registration Success]: User details saved. You can now login!");
        }
    }

    private static void handleAdminLogin() throws InvalidLoginException {
        System.out.println("\\n--- ADMINISTRATOR ACCESS SCREEN ---");
        System.out.print("Enter Administrative Username: ");
        String uname = scanner.nextLine().trim();
        System.out.print("Enter Superuser Password: ");
        String pword = scanner.nextLine().trim();

        Person p = system.login(uname, pword);
        if (p instanceof Admin) {
            currentLoggedInUser = p;
            System.out.println("\\n[Admin Access]: Authenticated successfully. Welcome Controller, " + p.getUsername() + "!");
        } else {
            throw new InvalidLoginException("Error: Account is not associated with employee permissions.");
        }
    }

    private static void viewAllMovies() {
        System.out.println("\\n--- ACTIVE SCREENPLAY DATABASE ---");
        List<Movie> movs = system.getMovies();
        if (movs.isEmpty()) {
            System.out.println("No movies currently stored in the catalog.");
            return;
        }
        int index = 1;
        for (Movie m : movs) {
            System.out.println(index + ". " + m);
            index++;
        }
    }

    private static void handleCheckShowtimes() {
        System.out.println("\\n--- DISCOVER SHOW TIMES ---");
        viewAllMovies();
        List<Movie> movs = system.getMovies();
        if (movs.isEmpty()) return;

        System.out.print("Select Movie Index to see Timeslots: ");
        int selection = readIntegerChoice(1, movs.size());
        Movie selectedMovie = movs.get(selection - 1);

        System.out.println("\\nSchedules for: '" + selectedMovie.getTitle() + "'");
        List<Show> activeShows = system.getShows();
        boolean foundShow = false;
        for (Show s : activeShows) {
            if (s.getMovie().getMovieId().equalsIgnoreCase(selectedMovie.getMovieId())) {
                System.out.println(String.format("  * Show ID: [%-4s] | Time: %-10s | Hall: %-15s | Seats Available: %d",
                    s.getShowId(), s.getShowTime(), s.getTheatreRoom(), s.getAvailableSeatsCount()));
                foundShow = true;
            }
        }
        if (!foundShow) {
            System.out.println("No slots scheduled currently for this movie.");
        }
    }

    private static void handleBookSeats() throws InvalidSeatException, SeatAlreadyBookedException, InvalidInputException {
        System.out.println("\\n--- REGISTER TICKET BOOKING ---");
        List<Show> shows = system.getShows();
        if (shows.isEmpty()) {
            System.out.println("No Shows are registered currently in the systems database.");
            return;
        }

        // List active show details
        int index = 1;
        for (Show sh : shows) {
            System.out.println(String.format("%d. [%s] %s | Room: %s | Time: %s",
                index, sh.getShowId(), sh.getMovie().getTitle(), sh.getTheatreRoom(), sh.getShowTime()));
            index++;
        }

        System.out.print("Select Show Index to continue checkout: ");
        int showSelect = readIntegerChoice(1, shows.size());
        Show selectedShow = shows.get(showSelect - 1);

        // Display seating layout visually
        selectedShow.displaySeatLayout();

        System.out.print("How many seat tickets would you like to purchase? (Max 10): ");
        int seatCount = readIntegerChoice(1, 10);

        List<String> userSeatsSelection = new ArrayList<>();
        for (int i = 1; i <= seatCount; i++) {
            System.out.print("Enter Seat Tag Selection #" + i + " (like A1, B4): ");
            String tag = scanner.nextLine().toUpperCase().trim();
            userSeatsSelection.add(tag);
        }

        // Perform transactional reservation
        Booking finalBooking = system.bookTickets((User) currentLoggedInUser, selectedShow, userSeatsSelection);
        
        // Print Receipt confirmation
        System.out.println("\\n\\u001B[32m[PAYMENT CONFIRMED]: Booking made successfully!\\u001B[0m\\n");
        Ticket ticketReceipt = new Ticket(finalBooking);
        System.out.println(ticketReceipt.generateReceipt());
    }

    private static void viewPersonalBookingHistory() {
        System.out.println("\\n--- PERSONAL BOOKING HISTORY ---");
        User user = (User) currentLoggedInUser;
        List<Booking> localHist = user.getBookingHistory();
        if (localHist.isEmpty()) {
            System.out.println("No historic bookings recorded. Start your cinematic journey now!");
            return;
        }

        for (Booking bk : localHist) {
            System.out.println(bk);
            System.out.println("----------------------------------------");
        }
        
        System.out.print("Do you wish to print details for a specific Receipt ID? (Y/N): ");
        String confirm = scanner.nextLine().trim();
        if (confirm.equalsIgnoreCase("Y")) {
            System.out.print("Enter Booking ID: ");
            String bId = scanner.nextLine().toUpperCase().trim();
            boolean found = false;
            for (Booking bk : localHist) {
                if (bk.getBookingId().equalsIgnoreCase(bId)) {
                    Ticket t = new Ticket(bk);
                    System.out.println("\\n" + t.generateReceipt());
                    found = true;
                    break;
                }
            }
            if (!found) {
                System.out.println("Receipt ID not found in your purchase accounts.");
            }
        }
    }

    private static void handleCancelBooking() {
        System.out.println("\\n--- CANCEL CONFIRMED TICKETS ---");
        User user = (User) currentLoggedInUser;
        List<Booking> localHist = user.getBookingHistory();
        if (localHist.isEmpty()) {
            System.out.println("No purchases found under this customer file.");
            return;
        }

        int activeCount = 0;
        for (Booking bk : localHist) {
            if (bk.getBookingStatus().equals("CONFIRMED")) {
                System.out.println(bk);
                activeCount++;
            }
        }
        if (activeCount == 0) {
            System.out.println("No confirmed active show tickets found for cancellation.");
            return;
        }

        System.out.print("Enter booking ID which you wish to cancel: ");
        String bId = scanner.nextLine().toUpperCase().trim();
        
        Booking targetedBooking = null;
        for (Booking bk : localHist) {
            if (bk.getBookingId().equalsIgnoreCase(bId)) {
                targetedBooking = bk;
                break;
            }
        }

        if (targetedBooking == null) {
            System.out.println("Invalid Booking ID reference. Action cancelled.");
            return;
        }

        System.out.print("Confirm cancellation of " + bId + "? This action is irreversible (Y/N): ");
        String opt = scanner.nextLine().trim();
        if (opt.equalsIgnoreCase("Y")) {
            boolean success = system.cancelTicket(bId);
            if (success) {
                System.out.println("\\n[Cancellation success]: Booking status set to CANCELLED. Seats are now released.");
                double refundedCost = targetedBooking.getTotalCost();
                System.out.println("A full refund of $" + String.format("%.2f", refundedCost) + " has been initiated.");
            } else {
                System.out.println("Ticket represents a cancelled category already.");
            }
        } else {
            System.out.println("Operation aborted dynamically.");
        }
    }

    // --- ADMIN OPERATION DECORATION HANDLERS ---

    private static void handleAddMovie() throws InvalidInputException {
        System.out.println("\\n--- CREATE NEW MOVIE RECORD ---");
        System.out.print("Enter Unique Movie Code ID (e.g. M04): ");
        String id = scanner.nextLine().toUpperCase().trim();
        System.out.print("Enter Movie Title: ");
        String title = scanner.nextLine().trim();
        System.out.print("Enter Genre: ");
        String genre = scanner.nextLine().trim();
        System.out.print("Enter Runtime Duration (Minutes): ");
        int duration = readIntegerChoice(10, 360);
        System.out.print("Enter Average Ratings (0.0 to 10.0): ");
        double rating = readDoubleChoice(0.0, 10.0);

        Movie newMovie = new Movie(id, title, genre, duration, rating);
        system.addMovie(newMovie);
        System.out.println("\\n[Admin Notification]: Movie record '" + title + "' added to active reels!");
        
        // Let's schedule a default show for this movie too so it can be booked
        System.out.print("Do you want to create a show schedule for this new movie? (Y/N): ");
        String choice = scanner.nextLine().trim();
        if (choice.equalsIgnoreCase("Y")) {
            System.out.print("Enter Show Time (e.g., 04:30 PM): ");
            String sTime = scanner.nextLine().trim();
            System.out.print("Enter Theatre Room (e.g., Screen 5): ");
            String sRoom = scanner.nextLine().trim();
            System.out.print("Enter Base Seat Cost (e.g., 10.00): ");
            double basePrice = readDoubleChoice(5.00, 50.00);
            
            String showId = "S" + (1000 + system.getShows().size() + 1);
            Show ns = new Show(showId, newMovie, sTime, sRoom, basePrice);
            system.addShow(ns);
            System.out.println("[Admin Notification]: Show slot " + showId + " scheduled successfully! ");
        }
    }

    private static void handleRemoveMovie() {
        System.out.println("\\n--- REMOVE MOVIE REGISTER ---");
        viewAllMovies();
        List<Movie> movs = system.getMovies();
        if (movs.isEmpty()) return;

        System.out.print("Enter Movie ID coordinate to drop (e.g. M01): ");
        String idNum = scanner.nextLine().toUpperCase().trim();

        boolean removed = system.deleteMovie(idNum);
        if (removed) {
            System.out.println("\\n[Admin Success]: Movie record " + idNum + " and its active schedules were successfully purged.");
        } else {
            System.out.println("Could not find a Movie with structural ID " + idNum);
        }
    }

    private static void handleUpdateMovie() throws InvalidInputException {
        System.out.println("\\n--- UPDATE MOVIE DATA DICTIONARY ---");
        viewAllMovies();
        List<Movie> movs = system.getMovies();
        if (movs.isEmpty()) return;

        System.out.print("Enter Movie ID target for editing (e.g. M02): ");
        String idNum = scanner.nextLine().toUpperCase().trim();

        boolean existsNum = false;
        for (Movie m : movs) {
            if (m.getMovieId().equalsIgnoreCase(idNum)) {
                existsNum = true;
                break;
            }
        }
        if (!existsNum) {
            System.out.println("Movie ID not found. Action dropped.");
            return;
        }

        System.out.print("Enter replacement Title: ");
        String title = scanner.nextLine().trim();
        System.out.print("Enter replacement Genre: ");
        String genre = scanner.nextLine().trim();
        System.out.print("Enter replacement Duration (Minutes): ");
        int duration = readIntegerChoice(10, 360);
        System.out.print("Enter replacement Rating (0.0 to 10.0): ");
        double rating = readDoubleChoice(0.0, 10.0);

        boolean updated = system.updateMovie(idNum, title, genre, duration, rating);
        if (updated) {
            System.out.println("\\n[Admin Success]: Database records synchronized for ID " + idNum);
        }
    }

    private static void viewAllGlobalBookings() {
        System.out.println("\\n--- GLOBAL BOOKINGS ENGINE ARCHIVE ---");
        List<Booking> gBookings = system.getGlobalBookings();
        if (gBookings.isEmpty()) {
            System.out.println("Zero transactions completed currently in the system network.");
            return;
        }

        for (Booking bk : gBookings) {
            System.out.println("Client: " + bk.getUser().getUsername() + " | " + bk);
            System.out.println("----------------------------------------------------");
        }
    }

    private static void processLogout() {
        System.out.println("\\n[Session Ended]: User '" + currentLoggedInUser.getUsername() + "' logged out securely.");
        currentLoggedInUser = null;
    }

    // --- SECURE SCANNERS EXCEPTION CONTROLLER ---

    private static int readIntegerChoice(int min, int max) {
        while (true) {
            try {
                String input = scanner.nextLine().trim();
                int val = Integer.parseInt(input);
                if (val < min || val > max) {
                    System.out.print("Value out of index. Range must be [" + min + "-" + max + "]: ");
                    continue;
                }
                return val;
            } catch (NumberFormatException e) {
                System.out.print("Invalid digital number input. Please type a valid integer: ");
            }
        }
    }

    private static double readDoubleChoice(double min, double max) {
        while (true) {
            try {
                String input = scanner.nextLine().trim();
                double val = Double.parseDouble(input);
                if (val < min || val > max) {
                    System.out.print("Value out of scope range [" + min + "-" + max + "]: ");
                    continue;
                }
                return val;
            } catch (NumberFormatException e) {
                System.out.print("Invalid digital numeric input. Please type a valid double value: ");
            }
        }
    }
}
`
  }
];
