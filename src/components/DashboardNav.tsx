import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  User, 
  Target, 
  Calendar, 
  Users, 
  BrainCircuit,
  Settings, 
  ExternalLink,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string | number;
  description: string;
}

export const PRIMARY_DASHBOARD_TABS: NavItemConfig[] = [
  {
    id: 'events',
    label: 'Events',
    path: '/admin/events',
    icon: Calendar,
    badge: 'Active',
    description: 'Town halls, rallies & RSVPs'
  }
];

export const SECONDARY_DASHBOARD_TABS: NavItemConfig[] = [];

interface DashboardNavProps {
  isCollapsed?: boolean;
  onItemClick?: () => void;
  isMobile?: boolean;
}

export function DashboardNav({ 
  isCollapsed = false, 
  onItemClick,
  isMobile = false 
}: DashboardNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

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

    if (onItemClick) onItemClick();
    navigate('/admin/login', { replace: true });
  };

  const isRouteActive = (tabPath: string) => {
    const current = location.pathname;
    if (tabPath === '/admin' || tabPath === '/dashboard') {
      return current === '/admin' || current === '/dashboard' || current === '/admin/' || current === '/dashboard/';
    }
    // Check aliases like /admin/about or /dashboard/about
    const normalizedTab = tabPath.replace('/admin', '').replace('/dashboard', '');
    return current.includes(normalizedTab);
  };

  return (
    <nav className="flex-1 flex flex-col justify-between py-4 select-none">
      {/* Primary Section */}
      <div className="space-y-6 px-3">
        <div>
          {!isCollapsed && !isMobile && (
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-neutral-charcoal/40">
                Core Modules
              </span>
              <span className="text-[10px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                {PRIMARY_DASHBOARD_TABS.length} Tabs
              </span>
            </div>
          )}

          <div className="space-y-1.5">
            {PRIMARY_DASHBOARD_TABS.map((tab) => {
              const active = isRouteActive(tab.path);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={onItemClick}
                  title={isCollapsed ? tab.label : undefined}
                  className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 group ${
                    active
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 font-bold'
                      : 'text-brand-neutral-charcoal/70 hover:bg-brand-neutral-warm hover:text-brand-primary font-medium'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {active && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#0EA5D8] rounded-r-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    active ? 'text-white' : 'text-brand-neutral-charcoal/50 group-hover:text-brand-primary'
                  }`}>
                    <Icon size={20} />
                  </div>

                  {(!isCollapsed || isMobile) && (
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <span className="text-sm truncate">
                        {tab.label}
                      </span>

                      {tab.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          active 
                            ? 'bg-white/20 text-white' 
                            : 'bg-brand-neutral-grey/20 text-brand-neutral-charcoal/60 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Secondary / AI & Tools Section (Only rendered if items exist) */}
        {SECONDARY_DASHBOARD_TABS.length > 0 && (
          <div>
            {!isCollapsed && !isMobile && (
              <div className="px-3 mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-neutral-charcoal/40">
                  Intelligence & Tools
                </span>
              </div>
            )}

            <div className="space-y-1.5">
              {SECONDARY_DASHBOARD_TABS.map((tab) => {
                const active = isRouteActive(tab.path);
                const Icon = tab.icon;

                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    onClick={onItemClick}
                    title={isCollapsed ? tab.label : undefined}
                    className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 group ${
                      active
                        ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 font-bold'
                        : 'text-brand-neutral-charcoal/70 hover:bg-brand-neutral-warm hover:text-brand-primary font-medium'
                    }`}
                  >
                    <div className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      active ? 'text-white' : 'text-brand-neutral-charcoal/50 group-hover:text-brand-primary'
                    }`}>
                      <Icon size={19} />
                    </div>

                    {(!isCollapsed || isMobile) && (
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="text-xs truncate">
                          {tab.label}
                        </span>
                        {tab.badge && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            active 
                              ? 'bg-white/20 text-white' 
                              : 'bg-brand-primary/10 text-brand-primary'
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions & Public Site Quick Link */}
      <div className="px-3 pt-3 border-t border-brand-neutral-grey/20 space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-neutral-charcoal/60 hover:text-brand-primary hover:bg-brand-neutral-warm transition-colors group"
        >
          <ExternalLink size={16} className="text-brand-neutral-charcoal/40 group-hover:text-brand-primary shrink-0" />
          {(!isCollapsed || isMobile) && (
            <div className="flex-1 flex items-center justify-between">
              <span>View Public Portal</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          title="Log Out"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors group cursor-pointer text-left"
        >
          <LogOut size={16} className="text-rose-500 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span>Log Out</span>
          )}
        </button>
      </div>
    </nav>
  );
}
