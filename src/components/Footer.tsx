import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-neutral-charcoal text-brand-neutral-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-4 pr-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-brand-accent font-heading font-bold text-xl">K</span>
              </div>
              <span className="font-body text-sm font-bold tracking-[0.2em] uppercase text-brand-neutral-white">
                Kamau Wa Mbiu
              </span>
            </div>
            <p className="font-body text-sm text-brand-neutral-white/60 leading-relaxed mb-6">
              Building a brighter, more transparent future for our community through dedicated service and uncompromising integrity.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-6">Quick Links</h4>
            <ul className="space-y-4 font-body text-sm text-brand-neutral-white/70">
              <li><Link to="/" className="hover:text-brand-neutral-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-neutral-white transition-colors">About Kamau</Link></li>
              <li><Link to="/vision" className="hover:text-brand-neutral-white transition-colors">Vision</Link></li>
              <li><Link to="/membership" className="hover:text-brand-neutral-white transition-colors">Membership</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-6">Campaign</h4>
            <ul className="space-y-4 font-body text-sm text-brand-neutral-white/70">
              <li><Link to="/events" className="hover:text-brand-neutral-white transition-colors">Events</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-6">Contact</h4>
            <ul className="space-y-4 font-body text-sm text-brand-neutral-white/70">
              <li className="flex items-start">
                <MapPin size={16} className="mr-4 mt-0.5 shrink-0 text-brand-neutral-white/40" />
                <span>Limuru Community Centre,<br/>Limuru, Kiambu, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-4 shrink-0 text-brand-neutral-white/40" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-4 shrink-0 text-brand-neutral-white/40" />
                <span>info@kamauwambiu.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-brand-neutral-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-body text-brand-neutral-white/40 uppercase tracking-widest font-bold">
          <p>&copy; {new Date().getFullYear()} Kamau Wa Mbiu Campaign. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-brand-neutral-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-neutral-white transition-colors">Terms of Use</Link>
            <Link to="/admin/events" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors normal-case font-medium">
              <Shield size={13} className="text-slate-400" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-12">
           <span className="font-heading italic text-xl sm:text-2xl text-brand-neutral-white/30">
             Together, We Shape Tomorrow.
           </span>
        </div>
      </div>
    </footer>
  );
}
