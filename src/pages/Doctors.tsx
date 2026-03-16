import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, GraduationCap, IndianRupee, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const Doctors = () => (
  <div className="min-h-screen pt-24 pb-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">Our Specialists</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Meet the team that has been serving Surat's families with compassion and expertise since 2003.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.id}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="frost-panel rounded-2xl overflow-hidden hover-card-lift"
          >
            <div className="relative h-64 overflow-hidden">
              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
              {doc.available && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/90 text-sm font-semibold rounded-full px-3 py-1 text-background">
                  <span className="w-2 h-2 bg-background rounded-full animate-pulse-live" /> Live
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-foreground">{doc.name}</h3>
              <p className="text-primary text-sm font-semibold mb-2">{doc.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <GraduationCap className="h-3.5 w-3.5" /> {doc.qualifications}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {doc.experience} yrs</span>
                <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> ₹{doc.fee}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {doc.highlights.map((h) => (
                  <span key={h} className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md">{h}</span>
                ))}
              </div>
              <Link to={`/book/${doc.id}`}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Doctors;
