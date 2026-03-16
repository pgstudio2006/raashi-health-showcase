import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Confirmation = () => {
  const { state } = useLocation();
  const bookingId = state?.bookingId;
  const videoLink = bookingId ? `https://meet.jit.si/raashi-${bookingId.toLowerCase()}` : "";

  if (!bookingId) return <Navigate to="/" />;

  const copyLink = () => {
    navigator.clipboard.writeText(videoLink);
    toast.success("Video link copied!");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="frost-panel rounded-2xl p-10 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground text-sm mb-6">Your consultation has been successfully booked.</p>

        <div className="bg-muted rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Booking ID</span><span className="font-bold text-primary">{state.bookingId}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Doctor</span><span className="font-semibold text-foreground">{state.doctor?.name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold text-foreground">{state.date}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold text-foreground">{state.time}</span></div>
        </div>

        <div className="bg-accent rounded-xl p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-2">Video Consultation Link</p>
          <div className="flex items-center gap-2">
            <input readOnly value={videoLink} className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground" />
            <Button size="sm" variant="outline" onClick={copyLink}><Copy className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a href={videoLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Video className="mr-2 h-4 w-4" /> Enter Waiting Room
            </Button>
          </a>
          <Link to="/">
            <Button variant="outline" className="w-full">Back to Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Confirmation;
