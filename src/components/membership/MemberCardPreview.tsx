import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Download, 
  Share2, 
  Check, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  QrCode,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MEMBERSHIP_TIERS, MembershipTierId } from './TierCards';

export interface MemberCardData {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  constituency: string;
  ward: string;
  tierId: MembershipTierId;
  interests: string[];
  membershipId: string;
  registeredAt: string;
}

interface MemberCardPreviewProps {
  data: MemberCardData;
  onReset?: () => void;
}

export function MemberCardPreview({ data, onReset }: MemberCardPreviewProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const tier = MEMBERSHIP_TIERS.find((t) => t.id === data.tierId) || MEMBERSHIP_TIERS[0];

  const handleCopyShare = () => {
    const shareText = `I just joined the Kamau Wa Mbiu movement as a ${tier.name}! Join me in shaping the future: ${window.location.origin}/membership`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🎉 I just registered as an official member of the Kamau Wa Mbiu Digital Leadership Platform (Member ID: ${data.membershipId})! Let's build our community together: ${window.location.origin}/membership`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleDownload = () => {
    // Printable / visual card save simulation
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl relative overflow-hidden"
    >
      {/* Top Confetti / Celebration Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-md">
          <Sparkles size={32} />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck size={14} /> Official Member Verified
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#14213D]">
          Welcome to the Movement, {data.fullName}!
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
          Your digital membership has been recorded in the platform registry. Here is your official Supporter ID card.
        </p>
      </div>

      {/* 💳 Digital Supporter Card UI */}
      <div 
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1148B8] via-[#0D3894] to-[#14213D] text-white p-6 sm:p-8 shadow-2xl border border-white/20 mb-8"
      >
        {/* Card Background Pattern */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#0EA5D8]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4F8DD9]/20 rounded-full blur-2xl pointer-events-none translate-y-1/2 -translate-x-1/4" />
        
        {/* Watermark Logo */}
        <div className="absolute right-4 bottom-2 text-white/5 font-heading text-8xl font-black select-none pointer-events-none">
          KWM
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between relative z-10 border-b border-white/15 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1148B8] flex items-center justify-center font-extrabold text-xl shadow-md">
              K
            </div>
            <div>
              <p className="font-bold text-sm text-white leading-tight">Kamau Wa Mbiu</p>
              <p className="text-[10px] font-semibold text-[#0EA5D8] uppercase tracking-widest">Digital Leadership Platform</p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/20">
              {tier.name}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid sm:grid-cols-3 gap-6 relative z-10 items-center">
          <div className="sm:col-span-2 space-y-4">
            <div>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Member Name</p>
              <h3 className="font-heading text-2xl font-bold text-white tracking-wide truncate">
                {data.fullName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Member ID</p>
                <p className="text-sm font-mono font-bold text-[#0EA5D8]">{data.membershipId}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Registered Date</p>
                <p className="text-sm font-semibold text-white/90">{data.registeredAt}</p>
              </div>
            </div>
          </div>

          {/* QR Code / Chip Section */}
          <div className="sm:col-span-1 flex flex-col items-center sm:items-end justify-center">
            <div className="p-3 bg-white rounded-2xl shadow-lg text-slate-900 flex flex-col items-center">
              <QrCode size={64} className="text-[#1148B8]" />
              <span className="text-[8px] font-extrabold uppercase tracking-tighter text-slate-500 mt-1">
                Scan to Verify
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Pillars */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Verified Citizen Grassroots Registry</span>
          </div>
          <span className="font-mono text-[10px] text-white/50">Tier: {tier.badge}</span>
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <button
          onClick={handleDownload}
          className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Download size={16} />
          <span>Download / Print Member Card</span>
        </button>

        <button
          onClick={handleCopyShare}
          className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} className="text-emerald-600" />
              <span className="text-emerald-600">Share Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={16} />
              <span>Copy Verification Link</span>
            </>
          )}
        </button>
      </div>

      {/* Next Community Action Steps */}
      <div className="bg-[#F8FBFF] rounded-3xl p-6 border border-slate-200/80 mb-6">
        <h4 className="font-heading text-base font-bold text-[#14213D] mb-4">
          Recommended Next Steps:
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          
          {/* Action 1: WhatsApp Channel */}
          <button
            onClick={handleWhatsAppShare}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                Join Community WhatsApp
                <ExternalLink size={12} className="text-slate-400 group-hover:text-emerald-600" />
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Receive direct voice notes, mobilization alerts & daily ward briefs.
              </p>
            </div>
          </button>

          {/* Action 2: Events Page */}
          <Link
            to="/events"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#1148B8] hover:shadow-md transition-all text-left group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1148B8]/10 text-[#1148B8] flex items-center justify-center shrink-0 group-hover:bg-[#1148B8] group-hover:text-white transition-colors">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                Explore Upcoming Events
                <ArrowRight size={12} className="text-slate-400 group-hover:text-[#1148B8]" />
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                RSVP for next week's constituency town hall and civic forum.
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* Reset Option */}
      {onReset && (
        <div className="text-center pt-2">
          <button
            onClick={onReset}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 underline"
          >
            Register another member
          </button>
        </div>
      )}
    </motion.div>
  );
}
