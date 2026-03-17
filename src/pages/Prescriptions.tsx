import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findPrescriptionsByPhone, doctors, type Prescription } from "@/lib/data";

const Prescriptions = () => {
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState<Prescription[] | null>(null);
  const [showingDemo, setShowingDemo] = useState(false);

  const search = () => {
    const { prescriptions, isDemo } = findPrescriptionsByPhone(phone);
    setResults(prescriptions);
    setShowingDemo(isDemo);
  };

  const printRx = (rx: Prescription) => {
    const doc = doctors.find((d) => d.id === rx.doctorId);
    const w = window.open("", "_blank");
    if (!w) return;

    w.document.write(`
      <html><head><title>Prescription - ${rx.patientName}</title>
      <style>
        body{font-family:sans-serif;padding:40px;max-width:700px;margin:auto;color:#1a1a1a}
        h1{color:#1a6b5a;font-size:24px;border-bottom:2px solid #1a6b5a;padding-bottom:8px}
        .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
        .meta{color:#666;font-size:13px}
        table{width:100%;border-collapse:collapse;margin:20px 0}
        th,td{border:1px solid #ddd;padding:10px;text-align:left;font-size:14px}
        th{background:#f0f9f7;color:#1a6b5a}
        .notes{background:#f9f9f9;padding:12px;border-radius:8px;font-size:13px;margin-top:12px}
        .rx{font-size:40px;color:#1a6b5a;font-weight:bold}
      </style></head><body>
      <div class="header">
        <div><h1>Raashi Orthopaedic & Maternity Hospital</h1><p class="meta">Surat, Gujarat | Tel: +91 261 XXX XXXX</p></div>
        <div class="rx">Rx</div>
      </div>
      <p><strong>Doctor:</strong> ${doc?.name || "N/A"} (${doc?.qualifications || ""})</p>
      <p><strong>Patient:</strong> ${rx.patientName}, Age ${rx.patientAge}</p>
      <p class="meta">Date: ${new Date(rx.createdAt).toLocaleDateString()}</p>
      <table><tr><th>Medicine</th><th>Dosage</th><th>Duration</th></tr>
      ${rx.medicines.map((m) => `<tr><td>${m.name}</td><td>${m.dosage}</td><td>${m.duration}</td></tr>`).join("")}
      </table>
      ${rx.notes ? `<div class="notes"><strong>Notes:</strong> ${rx.notes}</div>` : ""}
      <p class="meta" style="margin-top:40px;text-align:center">This is a digitally generated prescription. Demo only.</p>
      </body></html>
    `);
    w.document.close();
    w.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">Your Prescriptions</h1>
          <p className="text-muted-foreground">
            Enter any 10-digit mobile number to view prescriptions. If no real records exist, demo prescriptions will be shown.
          </p>
        </motion.div>

        <div className="frost-panel rounded-2xl p-6 mb-8">
          <div className="flex gap-3">
            <Input
              placeholder="10-digit mobile number"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1"
            />
            <Button onClick={search} disabled={phone.length !== 10} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {results !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {showingDemo && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
                  Demo mode: no saved prescription was found for this mobile number, so sample prescriptions are being shown.
                </div>
              )}

              {results.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No prescriptions found for this number.</p>
                </div>
              ) : (
                results.map((rx) => {
                  const doc = doctors.find((d) => d.id === rx.doctorId);

                  return (
                    <motion.div
                      key={rx.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="frost-panel rounded-2xl p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-heading text-lg font-bold text-foreground">{doc?.name}</h3>
                          <p className="text-xs text-muted-foreground">{new Date(rx.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="text-3xl text-primary font-heading font-bold">Rx</span>
                      </div>

                      <div className="space-y-2 mb-4">
                        {rx.medicines.map((m, i) => (
                          <div key={i} className="bg-accent rounded-lg px-4 py-2 text-sm">
                            <span className="font-semibold text-foreground">{m.name}</span>
                            <span className="text-muted-foreground"> - {m.dosage} | {m.duration}</span>
                          </div>
                        ))}
                      </div>

                      {rx.notes && <p className="text-sm text-muted-foreground italic mb-4">Note: {rx.notes}</p>}

                      <Button variant="outline" size="sm" onClick={() => printRx(rx)}>
                        <Printer className="mr-2 h-4 w-4" /> View / Print PDF
                      </Button>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Prescriptions;
