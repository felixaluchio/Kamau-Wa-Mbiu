import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronRight,
  Sparkles, 
  LogOut, 
  User as UserIcon, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Activity,
  Command,
  PanelLeftClose,
  PanelLeft,
  Home,
  User,
  Target,
  Calendar,
  Users,
  ArrowLeft
} from 'lucide-react';
import { DashboardNav, PRIMARY_DASHBOARD_TABS } from './DashboardNav';
import { AdminGuard } from './AdminGuard';
import { auth } from '../lib/firebase';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      if (auth && typeof auth.signOut === 'function') {
        await auth.signOut().catch(() => {});
      }
    } catch (_) {}

    try {
      sessionStorage.removeItem('adminAuth');
      sessionStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdminAuthenticated');
    } catch (_) {}

    setIsProfileDropdownOpen(false);
    navigate('/admin/login', { replace: true });
  };

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [location.pathname]);

  // Compute active page title & breadcrumbs
  const getPageMeta = () => {
    const path = location.pathname;
    if (path.includes('/about')) {
      return { title: 'About & Leadership Journey', section: 'Biography & Timeline' };
    }
    if (path.includes('/vision') || path.includes('/manifesto')) {
      return { title: 'Vision & Manifesto Pillars', section: 'Policy & Campaign Promises' };
    }
    if (path.includes('/events')) {
      return { title: 'Events & Town Halls', section: 'Calendar & RSVPs' };
    }
    if (path.includes('/membership') || path.includes('/volunteers')) {
      return { title: 'Membership & Volunteers', section: 'Citizen Profiles & Roles' };
    }
    if (path.includes('/ai')) {
      return { title: 'AI Knowledge Manager', section: 'RAG & Ask Kamau' };
    }
    if (path.includes('/settings')) {
      return { title: 'Platform Settings', section: 'Roles & Configuration' };
    }
    return { title: 'Dashboard Overview', section: 'Leadership Operations' };
  };

  const pageMeta = getPageMeta();

  return (
    <AdminGuard>
      <div className="min-h-screen bg-brand-neutral-warm font-body flex flex-col antialiased text-brand-neutral-charcoal selection:bg-brand-primary/20 selection:text-brand-primary">
        
        {/* Desktop and Mobile Container */}
        <div className="flex-1 flex overflow-hidden">

        {/* 1. Desktop Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarCollapsed ? 88 : 280 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="hidden md:flex flex-col bg-white border-r border-brand-neutral-grey/30 z-30 shrink-0 shadow-sm"
        >
          {/* Brand Header */}
          <div className="h-20 flex items-center justify-between px-5 border-b border-brand-neutral-grey/20">
            <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-md shadow-brand-primary/20 shrink-0">
                K
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-bold text-base text-brand-neutral-charcoal truncate">
                    Kamau Wa Mbiu
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-[#0EA5D8] uppercase">
                    Admin Console
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-xl text-brand-neutral-charcoal/40 hover:text-brand-primary hover:bg-brand-neutral-warm transition-colors"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label="Toggle Sidebar"
            >
              {isSidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <DashboardNav isCollapsed={isSidebarCollapsed} />
          </div>

          {/* Sidebar Footer User Info */}
          <div className="p-3 border-t border-brand-neutral-grey/20 bg-white">
            <div className={`flex items-center gap-3 p-2 rounded-2xl bg-brand-neutral-warm/60 border border-brand-neutral-grey/30 ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}>
              <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 border border-brand-primary/20">
                KM
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-brand-neutral-charcoal truncate">Kamau Campaign HQ</p>
                  <p className="text-[10px] text-success-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse"></span>
                    Verified Admin
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.aside>

        {/* 2. Mobile Drawer */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="fixed inset-0 bg-brand-neutral-charcoal/60 backdrop-blur-sm z-50 md:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white border-r border-brand-neutral-grey/30 z-50 flex flex-col md:hidden shadow-2xl"
              >
                {/* Mobile Drawer Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-brand-neutral-grey/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-md shadow-brand-primary/20">
                      K
                    </div>
                    <div>
                      <span className="font-heading font-bold text-base text-brand-neutral-charcoal">
                        Kamau Wa Mbiu
                      </span>
                      <span className="block text-[10px] font-bold tracking-widest text-[#0EA5D8] uppercase">
                        Admin Portal
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-2 rounded-xl text-brand-neutral-charcoal/50 hover:bg-brand-neutral-warm hover:text-brand-neutral-charcoal"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2">
                  <DashboardNav isMobile onItemClick={() => setIsMobileDrawerOpen(false)} />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* 3. Main Content Container */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
          
          {/* Top Header Bar */}
          <header className="h-20 bg-white/90 backdrop-blur-md border-b border-brand-neutral-grey/30 flex items-center justify-between px-4 sm:px-8 z-20 shrink-0 gap-4">
            
            {/* Left Header: Mobile menu trigger & Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button 
                onClick={() => setIsMobileDrawerOpen(true)}
                className="md:hidden p-2.5 rounded-xl bg-brand-neutral-warm border border-brand-neutral-grey/40 text-brand-neutral-charcoal hover:text-brand-primary focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu size={20} />
              </button>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-neutral-charcoal/50">
                  <Link to="/admin" className="hover:text-brand-primary transition-colors">Admin</Link>
                  <ChevronRight size={12} />
                  <span className="text-[#1148B8] truncate">{pageMeta.section}</span>
                </div>
                <h1 className="font-heading text-lg sm:text-xl font-bold text-brand-neutral-charcoal truncate">
                  {pageMeta.title}
                </h1>
              </div>
            </div>

            {/* Middle: Search Bar with Shortcut */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
              <div className={`relative w-full flex items-center bg-brand-neutral-warm/80 rounded-2xl px-4 py-2 border transition-all duration-200 ${
                isSearchFocused 
                  ? 'border-brand-primary ring-2 ring-brand-primary/20 bg-white shadow-sm' 
                  : 'border-brand-neutral-grey/40 hover:border-brand-neutral-grey/70'
              }`}>
                <Search size={16} className="text-brand-neutral-charcoal/40 mr-2.5 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search policies, volunteers, events, or FAQs..." 
                  className="bg-transparent border-none focus:outline-none text-xs font-medium w-full placeholder:text-brand-neutral-charcoal/40 text-brand-neutral-charcoal"
                />
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-brand-neutral-grey/30 text-[10px] font-bold text-brand-neutral-charcoal/40 shrink-0 ml-2">
                  <Command size={10} />
                  <span>K</span>
                </div>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Live Status Pill */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-success-700 bg-success-50 border border-success-200/80 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span>
                <span>Live & Synced</span>
              </div>

              {/* Notification Popover Button */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2.5 rounded-xl text-brand-neutral-charcoal/70 hover:text-brand-primary hover:bg-brand-neutral-warm border border-transparent hover:border-brand-neutral-grey/30 transition-all"
                  aria-label="Notifications"
                >
                  <Bell size={19} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full ring-2 ring-white"></span>
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-brand-neutral-grey/30 shadow-2xl p-4 z-50 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-brand-neutral-grey/20">
                        <span className="font-heading text-sm font-bold text-brand-neutral-charcoal">Recent Activity</span>
                        <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">3 New</span>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto divide-y divide-brand-neutral-grey/10 text-xs">
                        <div className="pt-2">
                          <p className="font-bold text-brand-neutral-charcoal">New Volunteer Registered</p>
                          <p className="text-[11px] text-brand-neutral-charcoal/60">Faith Njoki signed up for Limuru Central ward coordination.</p>
                          <span className="text-[10px] text-brand-neutral-charcoal/40 mt-1 block">5 minutes ago</span>
                        </div>
                        <div className="pt-2">
                          <p className="font-bold text-brand-neutral-charcoal">AI Flagged Query for Review</p>
                          <p className="text-[11px] text-brand-neutral-charcoal/60">Citizen asked about market stall tax exemptions.</p>
                          <span className="text-[10px] text-brand-neutral-charcoal/40 mt-1 block">22 minutes ago</span>
                        </div>
                      </div>
                      <Link 
                        to="/admin/events" 
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block text-center text-xs font-bold text-brand-primary hover:underline pt-2 border-t border-brand-neutral-grey/20"
                      >
                        View All Activity
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Back to Public Site Link */}
              <Link
                to="/"
                title="Back to Public Website"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-brand-neutral-grey/40 text-brand-neutral-charcoal/75 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-neutral-warm text-xs font-semibold transition-all group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Site</span>
              </Link>

              {/* Direct Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                title="Log Out of Admin Dashboard"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-rose-200 bg-rose-50/80 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 text-xs font-bold transition-all shadow-xs cursor-pointer group"
              >
                <LogOut size={15} className="transition-transform group-hover:-translate-x-0.5" />
                <span>Logout</span>
              </button>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-brand-neutral-grey/30 hidden sm:block"></div>

              {/* Admin Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-2xl hover:bg-brand-neutral-warm border border-transparent hover:border-brand-neutral-grey/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center font-heading font-extrabold text-sm shadow-sm shadow-brand-primary/20">
                    KW
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors leading-none">
                      Kamau Wa Mbiu
                    </p>
                    <p className="text-[10px] font-semibold text-brand-neutral-charcoal/50 mt-1">
                      Campaign Admin
                    </p>
                  </div>
                  <ChevronDown size={14} className="text-brand-neutral-charcoal/40 group-hover:text-brand-neutral-charcoal transition-transform duration-200 hidden sm:block" />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-3xl border border-brand-neutral-grey/30 shadow-2xl p-3 z-50 space-y-1.5"
                    >
                      <div className="p-3 bg-brand-neutral-warm/60 rounded-2xl border border-brand-neutral-grey/20 mb-2">
                        <p className="text-xs font-extrabold text-brand-neutral-charcoal">Kamau Wa Mbiu</p>
                        <p className="text-[11px] text-brand-neutral-charcoal/60 truncate">admin@kamauwambiu.org</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                          <ShieldCheck size={12} /> Super Administrator
                        </div>
                      </div>

                      <Link
                        to="/admin/settings"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-neutral-charcoal hover:bg-brand-neutral-warm hover:text-brand-primary transition-colors"
                      >
                        <SettingsIcon size={16} className="text-brand-neutral-charcoal/50" />
                        Platform Settings
                      </Link>

                      <Link
                        to="/admin/about"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-neutral-charcoal hover:bg-brand-neutral-warm hover:text-brand-primary transition-colors"
                      >
                        <UserIcon size={16} className="text-brand-neutral-charcoal/50" />
                        Edit Biography Profile
                      </Link>

                      <div className="border-t border-brand-neutral-grey/20 pt-1 space-y-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-error-600 hover:bg-error-50 transition-colors w-full text-left cursor-pointer"
                        >
                          <LogOut size={16} />
                          Log Out
                        </button>
                        <Link
                          to="/"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-neutral-charcoal/70 hover:bg-brand-neutral-warm transition-colors w-full"
                        >
                          Exit to Website
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </header>

          {/* Page Dynamic Body Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-brand-neutral-warm/60 pb-28 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-7xl mx-auto h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* 4. Mobile Bottom Navigation Bar (For quick 1-tap switching between the 4 primary tabs) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-neutral-grey/30 px-2 py-2 z-40 shadow-lg">
        <div className="grid grid-cols-4 gap-1 items-center">
          {PRIMARY_DASHBOARD_TABS.map((tab) => {
            const active = location.pathname === tab.path || (location.pathname.startsWith(tab.path) && tab.path !== '/admin' && tab.path !== '/dashboard');
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-center transition-all ${
                  active 
                    ? 'text-brand-primary font-bold' 
                    : 'text-brand-neutral-charcoal/50 hover:text-brand-neutral-charcoal'
                }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${active ? 'bg-brand-primary/10 text-brand-primary' : ''}`}>
                  <Icon size={19} />
                </div>
                <span className="text-[10px] tracking-tight truncate w-full mt-0.5">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      </div>
    </AdminGuard>
  );
}
export default DashboardLayout;
