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

export const getDemoPrescriptions = (patientPhone: string): Prescription[] => {
  const normalizedPhone = patientPhone.replace(/\D/g, "").slice(0, 10) || "9999999999";
  const phoneSuffix = normalizedPhone.slice(-4);

  return [
    {
      id: `DEMO-RX-${phoneSuffix}-1`,
      bookingId: `DEMO-BOOK-${phoneSuffix}-1`,
      doctorId: "dr-piyush",
      patientName: "Demo Patient",
      patientAge: 34,
      patientPhone: normalizedPhone,
      medicines: [
        { name: "Calcium + Vitamin D3", dosage: "1 tablet after breakfast", duration: "30 days" },
        { name: "Pain Relief Gel", dosage: "Apply twice daily", duration: "10 days" },
      ],
      notes: "Demo prescription for showcase purposes. Avoid strain and continue light movement.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `DEMO-RX-${phoneSuffix}-2`,
      bookingId: `DEMO-BOOK-${phoneSuffix}-2`,
      doctorId: "dr-amrit",
      patientName: "Demo Patient",
      patientAge: 8,
      patientPhone: normalizedPhone,
      medicines: [
        { name: "Paracetamol Syrup", dosage: "5 ml after food", duration: "3 days" },
        { name: "ORS", dosage: "Small sips through the day", duration: "2 days" },
      ],
      notes: "Demo pediatric prescription. Monitor temperature and maintain hydration.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export const findPrescriptionsByPhone = (patientPhone: string) => {
  const normalizedPhone = patientPhone.replace(/\D/g, "").slice(0, 10);
  const matches = getPrescriptions().filter((p) => p.patientPhone === normalizedPhone);

  if (matches.length > 0) {
    return {
      prescriptions: matches,
      isDemo: false,
    };
  }

  return {
    prescriptions: getDemoPrescriptions(normalizedPhone),
    isDemo: true,
  };
};

export const generateBookingId = () => {
  return "RAASHI-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};
