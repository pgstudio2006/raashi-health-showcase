import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, User, FileUp, CreditCard, Check, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { doctors, timeSlots, saveBooking, generateBookingId } from "@/lib/data";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Schedule", icon: CalendarDays },
  { label: "Details", icon: User },
  { label: "Records", icon: FileUp },
  { label: "Checkout", icon: CreditCard },
];

const BookConsultation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [complaint, setComplaint] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [paying, setPaying] = useState(false);

  if (!doctor) return <div className="pt-24 text-center text-foreground">Doctor not found.</div>;

  const canNext = () => {
    if (step === 0) return !!date && !!time;
    if (step === 1) return name.trim() && age && phone.length === 10 && complaint.trim();
    return true;
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: string[] = [];
    Array.from(e.target.files).forEach((f) => {
      if (f.size <= 5 * 1024 * 1024) newFiles.push(f.name);
    });
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      const bookingId = generateBookingId();
      saveBooking({
        id: bookingId,
        doctorId: doctor.id,
        date: format(date!, "yyyy-MM-dd"),
        time,
        patientName: name,
        patientAge: parseInt(age),
        patientPhone: phone,
        complaint,
        files,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      navigate("/confirmation", { state: { bookingId, doctor, date: format(date!, "PPP"), time } });
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Doctor Banner */}
        <div className="frost-panel rounded-2xl p-6 flex items-center gap-4 mb-8">
          <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">{doctor.name}</h2>
            <p className="text-sm text-muted-foreground">{doctor.title} · ₹{doctor.fee}</p>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-foreground">{s.label}</span>
              {i < steps.length - 1 && <div className={cn("w-8 sm:w-16 h-0.5 mx-1", i < step ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <div className="frost-panel rounded-2xl p-6">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Pick Date & Time</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date() || d > addDays(new Date(), 7)}
                  className="rounded-md border mb-6 pointer-events-auto"
                />
                {date && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Available Slots — {format(date, "PPP")}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium transition-colors border",
                            time === slot ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="frost-panel rounded-2xl p-6 space-y-4">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Patient Details</h3>
                <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                  <Input placeholder="Phone (10 digits)" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} />
                </div>
                <Textarea placeholder="Chief Complaint — describe your symptoms" value={complaint} onChange={(e) => setComplaint(e.target.value)} rows={4} />
              </div>
            )}

            {step === 2 && (
              <div className="frost-panel rounded-2xl p-6">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Upload Medical Records</h3>
                <label className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload (max 5MB each)</p>
                  <input type="file" multiple className="hidden" onChange={handleFiles} accept="image/*,.pdf" />
                </label>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between bg-accent rounded-lg px-4 py-2 text-sm text-foreground">
                        <span>{f}</span>
                        <button onClick={() => setFiles(files.filter((_, j) => j !== i))}><X className="h-4 w-4 text-muted-foreground" /></button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-3">This step is optional. You may skip it.</p>
              </div>
            )}

            {step === 3 && (
              <div className="frost-panel rounded-2xl p-6">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Review & Pay</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between"><span className="text-muted-foreground">Doctor</span><span className="font-semibold text-foreground">{doctor.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold text-foreground">{date ? format(date, "PPP") : ""}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold text-foreground">{time}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Patient</span><span className="font-semibold text-foreground">{name}, Age {age}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-semibold text-foreground">{phone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Complaint</span><span className="font-semibold text-foreground max-w-[200px] text-right">{complaint}</span></div>
                  {files.length > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Attached Files</span><span className="font-semibold text-foreground">{files.length} file(s)</span></div>}
                  <hr className="border-border" />
                  <div className="flex justify-between text-base"><span className="font-bold text-foreground">Total</span><span className="font-bold text-primary">₹{doctor.fee}</span></div>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={handlePay}
                  disabled={paying}
                >
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing via Razorpay...
                    </span>
                  ) : (
                    "Pay & Confirm ₹" + doctor.fee
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">🔒 Secure demo payment — no actual charges</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 0 && !paying && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
          <div className="flex-1" />
          {step < 3 && (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
