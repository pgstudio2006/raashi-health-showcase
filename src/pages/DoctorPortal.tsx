import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, Video, ClipboardList, Plus, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doctors, getBookings, savePrescription, generateBookingId, type Doctor, type Booking } from "@/lib/data";
import { toast } from "sonner";

const DoctorPortal = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [activeCall, setActiveCall] = useState<Booking | null>(null);
  const [rxOpen, setRxOpen] = useState(false);
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
  const [rxNotes, setRxNotes] = useState("");

  const handleLogin = () => {
    const doc = doctors.find((d) => d.loginId === loginId && d.password === password);
    if (doc) {
      setDoctor(doc);
      toast.success(`Welcome, ${doc.name}`);
    } else {
      toast.error("Invalid credentials");
    }
  };

  const pendingBookings = doctor
    ? getBookings().filter((b) => b.doctorId === doctor.id && b.status === "pending")
    : [];

  const addMedicine = () => setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  const removeMedicine = (i: number) => setMedicines(medicines.filter((_, j) => j !== i));
  const updateMedicine = (i: number, field: string, value: string) => {
    const updated = [...medicines];
    (updated[i] as any)[field] = value;
    setMedicines(updated);
  };

  const saveRx = () => {
    if (!activeCall || !doctor) return;
    const validMeds = medicines.filter((m) => m.name.trim());
    if (validMeds.length === 0) { toast.error("Add at least one medicine"); return; }
    savePrescription({
      id: "RX-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      bookingId: activeCall.id,
      doctorId: doctor.id,
      patientName: activeCall.patientName,
      patientAge: activeCall.patientAge,
      patientPhone: activeCall.patientPhone,
      medicines: validMeds,
      notes: rxNotes,
      createdAt: new Date().toISOString(),
    });

    // Mark booking as completed
    const bookings = getBookings();
    const updated = bookings.map((b) => b.id === activeCall.id ? { ...b, status: "completed" as const } : b);
    localStorage.setItem("raashi_bookings", JSON.stringify(updated));

    toast.success("Prescription saved & synced!");
    setRxOpen(false);
    setMedicines([{ name: "", dosage: "", duration: "" }]);
    setRxNotes("");
  };

  // Login screen
  if (!doctor) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="frost-panel rounded-2xl p-8 max-w-sm w-full">
          <div className="text-center mb-6">
            <LogIn className="h-10 w-10 mx-auto text-primary mb-3" />
            <h1 className="font-heading text-3xl font-bold text-foreground">Doctor Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Secure portal for hospital staff</p>
          </div>
          <div className="space-y-4">
            <Input placeholder="Login ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleLogin}>Sign In</Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">Demo: piyush123 / piyush123</p>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">{doctor.name}</h1>
              <p className="text-sm text-muted-foreground">{doctor.title}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setDoctor(null)}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Queue */}
          <div className="lg:col-span-2">
            <div className="frost-panel rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <ClipboardList className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-xl font-bold text-foreground">Today's Queue</h2>
                <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {pendingBookings.length} pending
                </span>
              </div>
              {pendingBookings.length === 0 ? (
                <p className="text-muted-foreground text-sm py-10 text-center">No pending appointments. Book one from the patient side to see it here!</p>
              ) : (
                <div className="space-y-3">
                  {pendingBookings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-border rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{b.patientName} <span className="text-muted-foreground text-xs">Age {b.patientAge}</span></p>
                        <p className="text-xs text-muted-foreground">{b.complaint}</p>
                        <p className="text-xs text-muted-foreground mt-1">📞 {b.patientPhone} · 🕐 {b.time}</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => { setActiveCall(b); setRxOpen(false); }}
                      >
                        <Video className="mr-1 h-4 w-4" /> Start Call
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="frost-panel rounded-2xl p-6 text-center">
              <div className="font-heading text-4xl font-bold text-primary">{pendingBookings.length}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="frost-panel rounded-2xl p-6 text-center">
              <div className="font-heading text-4xl font-bold text-gold">{getBookings().filter(b => b.doctorId === doctor.id && b.status === "completed").length}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>

        {/* Video Call + Rx Panel */}
        <AnimatePresence>
          {activeCall && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <div className="frost-panel rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Video Call with {activeCall.patientName}
                    </h3>
                    <p className="text-xs text-muted-foreground">Booking #{activeCall.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setRxOpen(!rxOpen)}>
                      <ClipboardList className="mr-1 h-4 w-4" /> {rxOpen ? "Hide" : "Write"} Prescription
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setActiveCall(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex">
                  <div className={rxOpen ? "w-3/5" : "w-full"}>
                    <iframe
                      src={`https://meet.jit.si/raashi-${activeCall.id.toLowerCase()}`}
                      className="w-full h-[500px]"
                      allow="camera; microphone; fullscreen; display-capture"
                    />
                  </div>
                  <AnimatePresence>
                    {rxOpen && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "40%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-border p-4 overflow-y-auto h-[500px]"
                      >
                        <h4 className="font-heading text-lg font-bold text-foreground mb-4">E-Prescription</h4>
                        <div className="space-y-3">
                          {medicines.map((m, i) => (
                            <div key={i} className="space-y-2 border border-border rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-muted-foreground">Medicine #{i + 1}</span>
                                {medicines.length > 1 && (
                                  <button onClick={() => removeMedicine(i)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                                )}
                              </div>
                              <Input placeholder="Medicine name" value={m.name} onChange={(e) => updateMedicine(i, "name", e.target.value)} className="text-sm" />
                              <div className="grid grid-cols-2 gap-2">
                                <Input placeholder="Dosage" value={m.dosage} onChange={(e) => updateMedicine(i, "dosage", e.target.value)} className="text-sm" />
                                <Input placeholder="Duration" value={m.duration} onChange={(e) => updateMedicine(i, "duration", e.target.value)} className="text-sm" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 w-full" onClick={addMedicine}>
                          <Plus className="mr-1 h-4 w-4" /> Add Medicine
                        </Button>
                        <Textarea placeholder="Doctor's notes..." value={rxNotes} onChange={(e) => setRxNotes(e.target.value)} className="mt-3" rows={3} />
                        <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={saveRx}>
                          <Save className="mr-2 h-4 w-4" /> Sign & Save
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorPortal;
