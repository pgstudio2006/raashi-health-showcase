import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarCheck, Stethoscope, Baby, Bone, Heart, Users, Award, Clock, ShieldCheck, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/data";
import heroImg from "@/assets/hospital-hero.jpg";

const stats = [
  { label: "Years of Trust", value: "20+", icon: Award },
  { label: "Happy Patients", value: "50,000+", icon: Users },
  { label: "Surgeries", value: "12,000+", icon: Heart },
  { label: "Doctors", value: "3", icon: Stethoscope },
];

const specialties = [
  { name: "Orthopaedics", icon: Bone, desc: "Joint replacements, fracture care, sports injuries, and arthroscopic surgery." },
  { name: "Maternity", icon: Baby, desc: "High-risk pregnancy, normal & C-section delivery, infertility treatments." },
  { name: "Paediatrics", icon: Heart, desc: "Newborn care, vaccination, growth tracking, and child wellness." },
];

const testimonials = [
  { name: "Ramesh P.", text: "Dr. Piyush performed my knee replacement. I'm walking pain-free now. Truly life-changing!", rating: 5 },
  { name: "Sneha M.", text: "Dr. Anisha made my entire pregnancy journey comfortable. The maternity care here is exceptional.", rating: 5 },
  { name: "Kiran S.", text: "Dr. Amrit has been our family paediatrician for 15 years. My children love visiting him.", rating: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Raashi Hospital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="live-dot" />
              <span className="text-sm font-medium text-green-400">Live Consultation Desk</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/30 mb-6">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-gold font-semibold text-sm tracking-wide">#1 Rated Hospital in Surat</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-background leading-tight mb-6">
              Where Healing<br />
              <span className="text-gold">Meets Heart</span>
            </h1>
            <p className="text-background/80 text-lg mb-8 max-w-lg">
              Surat's most trusted hospital since 2003 — delivering world-class orthopaedic, maternity & paediatric care with cutting-edge telemedicine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/doctors">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
                  <CalendarCheck className="mr-2 h-5 w-5" /> Book Consultation
                </Button>
              </Link>
              <Link to="/prescriptions">
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 text-base px-8">
                  View Prescriptions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Desk */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <Wifi className="h-5 w-5 text-primary-foreground animate-pulse" />
            <span className="text-primary-foreground font-medium text-sm">Doctors Available Now:</span>
            {doctors.filter(d => d.available).map((d) => (
              <Link key={d.id} to={`/book/${d.id}`} className="frost-panel px-3 py-1.5 rounded-full text-xs font-semibold text-foreground hover:scale-105 transition-transform">
                {d.name} — {d.specialty}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="font-heading text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Our Specialties</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Comprehensive care across three core departments, backed by 20+ years of expertise.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {specialties.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="frost-panel rounded-2xl p-8 hover-card-lift"
              >
                <s.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{s.name}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Patient Stories</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="frost-panel rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic mb-4">"{t.text}"</p>
                <p className="font-semibold text-foreground text-sm">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-accent-foreground mb-8">Accessible For Everyone</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["♿ Wheelchair Access", "💳 NFC & UPI Payments", "🅿️ Free Parking", "🌐 Telemedicine", "🛡️ NABH Standards"].map((f) => (
              <div key={f} className="frost-panel rounded-full px-6 py-3 text-sm font-medium text-foreground">{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-gold" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Ready to Consult?</h2>
          <p className="opacity-80 mb-8 max-w-lg mx-auto">Book a video consultation with our specialists from the comfort of your home.</p>
          <Link to="/doctors">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 text-base px-10">
              <CalendarCheck className="mr-2 h-5 w-5" /> Book Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
