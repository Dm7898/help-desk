import multer from "multer";
import path from "path";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", // .jpg, .jpeg
    "image/png", // .png
    "application/pdf", // .pdf
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPG, JPEG, PNG, PDF, DOC, and DOCX are allowed."
      ),
      false
    ); // Reject the file
  }
};

// Set up multer middleware
export const upload = multer({ storage, fileFilter });
// Create a new ticket
export const createTicket = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const ticket = new Ticket({
      title,
      description,
      customerName: user.name,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const getTickets = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    let tickets = [];
    if (user.role === "Customer") {
      // Customer sees only their tickets
      tickets = await Ticket.find({ customerName: user.name }).sort({
        lastUpdated: -1,
      });
    } else if (user.role === "Agent" || user.role === "Admin") {
      // Agent and Admin see all tickets
      tickets = await Ticket.find({});
    }
    // console.log(tickets, user.role);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// Add a note to a ticket
export const addNote = async (req, res) => {
  const { ticketId } = req.params; // Extract ticketId from route parameters
  const content = req.body.content; // Parse content from req.body
  const file = req.file
    ? `/uploads/${req.file.filename}` // Extract file path from req.file
    : null;

  console.log(content, req.file);
  const user = req.userId; // User adding the note (extracted from token)
  //   console.log(ticketId, content, user);
  try {
    const ticket = await Ticket.findById(ticketId); // Find the ticket by ID
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    const note = {
      text: content,
      user,
      attachment: file,
    };

    ticket.notes.push(note); // Add the note to the ticket
    ticket.lastUpdated = new Date(); // Update the last updated timestamp
    await ticket.save();

    res.status(200).json(ticket); // Return the updated ticket
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const getAllTickets = async (req, res) => {
  try {
    // Fetch all tickets from the database
    const tickets = await Ticket.find(
      {},
      "ticketId title description lastUpdated"
    ); // Adjust the fields as needed
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
};
// Update the status of a ticket
export const updateStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;
  //   console.log(ticketId, status);
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    ticket.status = status;
    ticket.lastUpdated = new Date();
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
