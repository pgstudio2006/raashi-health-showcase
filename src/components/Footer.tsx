import { Stethoscope, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-6 w-6 text-gold" />
            <span className="font-heading text-xl font-bold">Raashi Hospital</span>
          </div>
          <p className="text-sm opacity-70">
            Trusted since 2003 — delivering world-class orthopaedic, maternity, and paediatric care to Surat and beyond.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm opacity-70">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Surat, Gujarat, India</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +91 261 XXX XXXX</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> info@raashihospital.com</div>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Facilities</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>♿ Wheelchair Accessible</li>
            <li>💳 NFC / UPI Payments</li>
            <li>🅿️ Free Parking</li>
            <li>🌐 Telemedicine Available</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-background/10 text-center text-xs opacity-50">
        © 2024 Raashi Orthopaedic & Maternity Hospital. All rights reserved. Demo only.
      </div>
    </div>
  </footer>
);

export default Footer;
