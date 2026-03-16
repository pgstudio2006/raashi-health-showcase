import drPiyush from "@/assets/dr-piyush.jpg";
import drAnisha from "@/assets/dr-anisha.jpg";
import drAmrit from "@/assets/dr-amrit.jpg";

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualifications: string;
  experience: number;
  fee: number;
  image: string;
  highlights: string[];
  available: boolean;
  loginId: string;
  password: string;
}

export interface Booking {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  complaint: string;
  files: string[];
  status: "pending" | "completed";
  createdAt: string;
}

export interface Prescription {
  id: string;
  bookingId: string;
  doctorId: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  medicines: { name: string; dosage: string; duration: string }[];
  notes: string;
  createdAt: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-piyush",
    name: "Dr. Piyush Desai",
    title: "Senior Orthopaedic Surgeon",
    specialty: "Orthopaedics",
    qualifications: "MS (Ortho), FICS, FIOA",
    experience: 22,
    fee: 500,
    image: drPiyush,
    highlights: ["Joint Replacement Specialist", "Arthroscopy Expert", "Sports Injury Management"],
    available: true,
    loginId: "piyush123",
    password: "piyush123",
  },
  {
    id: "dr-anisha",
    name: "Dr. Anisha Desai",
    title: "Senior Gynaecologist & Obstetrician",
    specialty: "Maternity",
    qualifications: "MD (OB-GYN), DNB, FICOG",
    experience: 18,
    fee: 500,
    image: drAnisha,
    highlights: ["High-Risk Pregnancy Care", "Laparoscopic Surgery", "Infertility Treatment"],
    available: true,
    loginId: "anisha123",
    password: "anisha123",
  },
  {
    id: "dr-amrit",
    name: "Dr. Amrit Kantilal",
    title: "Senior Paediatrician",
    specialty: "Paediatrics",
    qualifications: "MD (Paeds), DCH, FIAP",
    experience: 30,
    fee: 400,
    image: drAmrit,
    highlights: ["Neonatal Care Expert", "Paediatric Immunology", "Growth & Development"],
    available: true,
    loginId: "amrit123",
    password: "amrit123",
  },
];

export const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export const getBookings = (): Booking[] => {
  return JSON.parse(localStorage.getItem("raashi_bookings") || "[]");
};

export const saveBooking = (booking: Booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem("raashi_bookings", JSON.stringify(bookings));
};

export const getPrescriptions = (): Prescription[] => {
  return JSON.parse(localStorage.getItem("raashi_prescriptions") || "[]");
};

export const savePrescription = (rx: Prescription) => {
  const prescriptions = getPrescriptions();
  prescriptions.push(rx);
  localStorage.setItem("raashi_prescriptions", JSON.stringify(prescriptions));
};

export const generateBookingId = () => {
  return "RAASHI-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};
