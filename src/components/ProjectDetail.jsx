import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Cpu, Layers, Smartphone, 
  Play, Pause, Volume2, VolumeX, Folder, FolderOpen,  
  ChevronLeft, ChevronRight, CheckCircle2, MapPin, 
  Layers3, ShieldAlert, Sparkles, MessageSquareCode,
  Truck, ShoppingCart, Heart, GraduationCap, Music, Users,
  BookOpen, Info, Settings, Compass, Search, Calendar, Plus, Minus
} from 'lucide-react';
import { SiGithub, SiFlutter, SiDart, SiFirebase, SiSupabase } from 'react-icons/si';
import { projectsDetailData } from '../data/projectsDetailData';

// Map icon strings to component nodes
const getIconNode = (iconName, color = 'currentColor', size = 20) => {
  const icons = {
    Truck: <Truck size={size} style={{ color }} />,
    ShoppingCart: <ShoppingCart size={size} style={{ color }} />,
    Heart: <Heart size={size} style={{ color }} />,
    GraduationCap: <GraduationCap size={size} style={{ color }} />,
    Music: <Music size={size} style={{ color }} />,
    Users: <Users size={size} style={{ color }} />,
    BookOpen: <BookOpen size={size} style={{ color }} />,
    MapPin: <MapPin size={size} style={{ color }} />,
    Layers: <Layers size={size} style={{ color }} />,
    Layers3: <Layers3 size={size} style={{ color }} />,
    Smartphone: <Smartphone size={size} style={{ color }} />,
    MessageSquareCode: <MessageSquareCode size={size} style={{ color }} />,
    ShieldAlert: <ShieldAlert size={size} style={{ color }} />,
    Cpu: <Cpu size={size} style={{ color }} />,
    Play: <Play size={size} style={{ color }} />,
    Settings: <Settings size={size} style={{ color }} />,
    Compass: <Compass size={size} style={{ color }} />
  };
  return icons[iconName] || <Info size={size} style={{ color }} />;
};

// Map tech string to brand icons
const getStatIcon = (type) => {
  switch (type) {
    case 'flutter': return <SiFlutter className="text-sky-400" />;
    case 'dart': return <SiDart className="text-sky-500" />;
    case 'supabase': return <SiSupabase className="text-[#3ECF8E]" />;
    case 'firebase': return <SiFirebase className="text-amber-500" />;
    default: return null;
  }
};

// Recursive Folder Tree Component
const FolderTree = ({ item, themeColor }) => {
  const [open, setOpen] = useState(item.isOpen !== false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="pl-4 select-none">
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer transition-colors duration-200 text-sm ${
          hasChildren ? 'hover:bg-white/5 text-slate-300' : 'text-slate-400 hover:text-white'
        }`}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? <FolderOpen size={16} style={{ color: themeColor }} /> : <Folder size={16} className="text-slate-500" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 ml-1.5 mr-2" />
        )}
        <span className="font-mono text-xs">{item.name}</span>
      </div>
      {hasChildren && open && (
        <div className="border-l border-white/5 ml-2 mt-0.5">
          {item.children.map((child, idx) => (
            <FolderTree key={idx} item={child} themeColor={themeColor} />
          ))}
        </div>
      )}
    </div>
  );
};

// High-fidelity dynamic CSS mock screen renderer for devices
const DeviceScreenPreview = ({ mockType, themeColor }) => {
  const [cartCount, setCartCount] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [compassHeading, setCompassHeading] = useState(135);

  useEffect(() => {
    let interval;
    if (mockType === 'music-playing' && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    } else if (mockType === 'muslim-compass') {
      interval = setInterval(() => {
        setCompassHeading((prev) => (prev + (Math.random() * 4 - 2) + 360) % 360);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [mockType, isPlaying]);

  const wrapperClass = "w-full h-full bg-[#0b0f19] flex flex-col relative text-[11px] font-sans overflow-hidden";

  switch (mockType) {
    // ---------------- WASSALY SCREENS ----------------
    case 'wassaly-dashboard':
      return (
        <div className={wrapperClass}>
          {/* Header */}
          <div className="p-3 border-b border-white/5 flex justify-between items-center bg-[#0d1322]">
            <span className="font-bold text-white flex items-center gap-1">
              <Truck size={12} style={{ color: themeColor }} /> Wassaly
            </span>
            <span className="text-[9px] text-slate-400">Cairo, EG</span>
          </div>
          {/* Search bar */}
          <div className="p-2">
            <div className="bg-slate-900 border border-white/5 rounded-lg p-1.5 flex items-center gap-1.5 text-slate-500">
              <Search size={10} />
              <span>Search stores or handymen...</span>
            </div>
          </div>
          {/* Categories Grid */}
          <div className="px-2 py-1">
            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Categories</span>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Grocery', icon: <ShoppingCart size={12} className="text-indigo-400" /> },
                { label: 'Plumbing', icon: <Users size={12} className="text-sky-400" /> },
                { label: 'Food', icon: <Truck size={12} className="text-emerald-400" /> },
                { label: 'Med', icon: <Heart size={12} className="text-rose-400" /> }
              ].map((cat, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-1 flex flex-col items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">{cat.icon}</div>
                  <span className="text-[8px] text-slate-300 font-medium truncate w-full">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Promo Card */}
          <div className="mx-2 mt-2 p-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 flex justify-between items-center relative overflow-hidden">
            <div className="space-y-0.5 z-10">
              <span className="text-[8px] uppercase tracking-wider bg-indigo-500 text-white px-1.5 py-0.5 rounded font-bold">Offer</span>
              <h5 className="font-bold text-white text-xs mt-1">50% Discount</h5>
              <p className="text-[9px] text-slate-400">On your first plumber dispatch</p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Truck size={60} />
            </div>
          </div>
          {/* Bottom active task */}
          <div className="mt-auto p-2 bg-[#0d1322] border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-300">Active Delivery: Order #1042</span>
            </div>
            <span className="text-[9px] font-mono text-indigo-400">8m away</span>
          </div>
        </div>
      );
    case 'wassaly-cart':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 flex items-center justify-between bg-[#0d1322]">
            <span className="font-bold text-white">Your Cart</span>
            <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">{cartCount} items</span>
          </div>
          <div className="p-2 space-y-2 flex-grow overflow-y-auto">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex justify-between items-center">
              <div className="space-y-0.5">
                <h6 className="font-semibold text-white">Maintenance Package</h6>
                <span className="text-[9px] text-slate-500">Service: Electrician</span>
              </div>
              <div className="flex items-center gap-2 border border-white/5 rounded bg-black/20 px-1 py-0.5">
                <button onClick={() => cartCount > 1 && setCartCount(cartCount - 1)} className="text-slate-400 hover:text-white"><Minus size={10} /></button>
                <span className="font-mono text-white text-xs">{cartCount}</span>
                <button onClick={() => setCartCount(cartCount + 1)} className="text-slate-400 hover:text-white"><Plus size={10} /></button>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex justify-between items-center">
              <div className="space-y-0.5">
                <h6 className="font-semibold text-white">Organic Apples</h6>
                <span className="text-[9px] text-slate-500">Shop: HealthyGrocer</span>
              </div>
              <span className="font-mono text-slate-400">$4.50</span>
            </div>
          </div>
          <div className="p-3 bg-[#0d1322] border-t border-white/5 space-y-2">
            <div className="flex justify-between text-slate-400 text-[10px]">
              <span>Delivery Fee</span>
              <span className="font-mono text-white">$2.50</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xs">
              <span>Total Cost</span>
              <span className="font-mono" style={{ color: themeColor }}>${(cartCount * 12.0 + 7.0).toFixed(2)}</span>
            </div>
            <button className="w-full py-2 rounded-lg font-bold text-center text-white text-xs transition-all duration-300 hover:brightness-115 active:scale-98" style={{ backgroundColor: themeColor }}>
              PROCEED TO PAY
            </button>
          </div>
        </div>
      );
    case 'wassaly-map':
      return (
        <div className={wrapperClass}>
          {/* Mock Map View using SVGs */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,50 L 300,50 M 50,0 L 50,400 M 180,0 L 180,400 M 0,220 L 300,220 M 0,330 L 300,330" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 50,120 C 100,120 180,180 180,220" stroke={themeColor} strokeWidth="2" fill="none" />
            </svg>
            {/* User Pin */}
            <div className="absolute top-[214px] left-[174px] z-10 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center shadow-lg animate-pulse" />
            </div>
            {/* Courier Pin */}
            <div className="absolute top-[114px] left-[44px] z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center shadow-2xl">
                <Truck size={12} style={{ color: themeColor }} />
              </div>
            </div>
          </div>
          {/* Floating UI overlay */}
          <div className="p-3 bg-[#0d1322]/90 backdrop-blur border-b border-white/5 flex justify-between items-center z-10 relative">
            <span className="font-bold text-white">Tracking Courier</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">ON THE WAY</span>
          </div>
          {/* Bottom sheet */}
          <div className="mt-auto p-3 bg-[#0d1322] border-t border-white/5 rounded-t-xl z-10 relative space-y-2 shadow-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h6 className="font-bold text-white">Muhammad Mahmoud</h6>
                <span className="text-[9px] text-slate-500">Toyota Corolla (Black)</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-mono" style={{ color: themeColor }}>ETA 8 MIN</span>
                <p className="text-[8px] text-slate-500">Distance: 1.8 km</p>
              </div>
            </div>
          </div>
        </div>
      );
    case 'wassaly-service':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 flex items-center bg-[#0d1322] justify-between">
            <span className="font-bold text-white">Book Handyman</span>
            <span className="text-[9px] text-slate-400">Step 2 of 3</span>
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            {/* Priority Select */}
            <div className="space-y-1">
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Job Priority</span>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="border border-indigo-500/30 bg-indigo-500/10 text-white rounded-lg p-1.5 font-semibold">Urgent</div>
                <div className="border border-white/5 bg-white/[0.02] text-slate-400 rounded-lg p-1.5">Normal</div>
                <div className="border border-white/5 bg-white/[0.02] text-slate-400 rounded-lg p-1.5">Flexible</div>
              </div>
            </div>
            {/* Date Input */}
            <div className="space-y-1">
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Preferred Date & Time</span>
              <div className="bg-slate-900 border border-white/5 rounded-lg p-2 text-slate-300 flex items-center justify-between">
                <span>June 18, 2026 at 10:00 AM</span>
                <Calendar size={10} style={{ color: themeColor }} />
              </div>
            </div>
            {/* Description Text area */}
            <div className="space-y-1">
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Describe the plumbing issue</span>
              <div className="bg-slate-900 border border-white/5 rounded-lg p-2 text-slate-500 min-h-[50px]">
                Leaking pipe in the kitchen under the sink. Requires immediate repair.
              </div>
            </div>
          </div>
          <div className="p-3 bg-[#0d1322] border-t border-white/5">
            <button className="w-full py-2 rounded-lg font-bold text-center text-white text-xs transition-all duration-300 hover:brightness-115" style={{ backgroundColor: themeColor }}>
              DISPATCH REQUEST
            </button>
          </div>
        </div>
      );

    // ---------------- BYNONA SCREENS ----------------
    case 'bynona-catalog':
      return (
        <div className={wrapperClass}>
          {/* Header */}
          <div className="p-3 border-b border-white/5 flex justify-between items-center bg-[#071424]">
            <span className="font-bold text-white">Bynona E-Commerce</span>
            <div className="flex items-center gap-1.5 bg-cyan-950 border border-cyan-500/35 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">Wholesale</span>
            </div>
          </div>
          {/* Mini Categories */}
          <div className="p-2 flex gap-1.5 overflow-x-auto">
            {['All', 'Clothing', 'Shoes', 'Bags', 'Accessories'].map((cat, i) => (
              <span key={i} className={`px-2 py-0.5 rounded-full whitespace-nowrap text-[8px] ${i === 0 ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-slate-400'}`}>
                {cat}
              </span>
            ))}
          </div>
          {/* Catalog Grid */}
          <div className="px-2 py-1 grid grid-cols-2 gap-2 flex-grow overflow-y-auto">
            {[
              { name: 'Denim Jacket', price: '$12.00', bulk: 'Min 10: $8.50' },
              { name: 'Leather Boots', price: '$45.00', bulk: 'Min 5: $35.00' },
              { name: 'Sport Duffle', price: '$18.00', bulk: 'Min 15: $12.00' },
              { name: 'Silk Scarf', price: '$8.00', bulk: 'Min 50: $4.50' }
            ].map((p, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-2 flex flex-col justify-between">
                <div className="w-full aspect-square rounded-lg bg-white/5 mb-1.5 flex items-center justify-center text-slate-600">
                  <ShoppingCart size={16} />
                </div>
                <div>
                  <h6 className="font-semibold text-white truncate text-[9px]">{p.name}</h6>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-bold font-mono text-[9px] text-cyan-400">{p.price}</span>
                  </div>
                  <span className="text-[7.5px] font-mono text-emerald-400 font-medium block mt-0.5 bg-emerald-500/10 px-1 py-0.5 rounded w-fit">{p.bulk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'bynona-detail':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#071424] flex items-center justify-between">
            <span className="font-bold text-white">Item Specification</span>
            <ShoppingCart size={12} className="text-cyan-400" />
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            {/* Product image block */}
            <div className="w-full aspect-video rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600">
              <ShoppingCart size={32} />
            </div>
            <div className="space-y-1">
              <h5 className="text-white font-bold text-sm">Denim Jacket (Wholesale Grade)</h5>
              <p className="text-[9px] text-slate-400 leading-normal">Premium heavyweight cotton denim jacket with reinforced seams and metal button enclosures. Available in standard size packets.</p>
            </div>
            {/* Pricing Matrix */}
            <div className="border border-white/5 rounded-xl bg-white/[0.01] p-2 space-y-1">
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono block">Bulk Pricing Matrix</span>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[8.5px] font-mono mt-1">
                <div className="bg-white/5 rounded p-1"><span className="block text-slate-500">1-9 pcs</span><span className="font-bold text-slate-300">$12.00</span></div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded p-1"><span className="block text-cyan-500/70">10-49 pcs</span><span className="font-bold">$8.50</span></div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded p-1"><span className="block text-emerald-500/70">50+ pcs</span><span className="font-bold">$6.80</span></div>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-white/5 bg-[#071424] flex items-center gap-3">
            <div className="w-1/3 bg-slate-900 border border-white/5 rounded-lg py-1.5 text-center text-white font-bold font-mono">
              Qty: 10
            </div>
            <button className="flex-1 py-2 rounded-lg bg-cyan-500 text-black font-bold text-center text-xs">
              ADD TO BATCH
            </button>
          </div>
        </div>
      );
    case 'bynona-cart':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 flex items-center justify-between bg-[#071424]">
            <span className="font-bold text-white">Batch Invoice</span>
            <span className="text-[9px] text-cyan-400 font-mono">Invoice #8824</span>
          </div>
          <div className="p-2 space-y-2 flex-grow overflow-y-auto">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 space-y-1">
              <div className="flex justify-between font-bold text-white text-[9.5px]">
                <span>Denim Jacket (Bulk Pack)</span>
                <span>$85.00</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[8px] font-mono">
                <span>10 items x $8.50 (Wholesale Bracket)</span>
                <span className="text-emerald-400 font-semibold">- $35.00 saved</span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-[#071424] border-t border-white/5 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Wholesale Total</span>
              <span className="font-mono text-white">$85.00</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xs pt-1 border-t border-white/5">
              <span>Payable Total</span>
              <span className="font-mono text-cyan-400">$85.00</span>
            </div>
            <button className="w-full py-2 rounded-lg bg-cyan-500 text-black font-bold text-center text-xs">
              AUTHORIZE TRANSACTION
            </button>
          </div>
        </div>
      );
    case 'bynona-notifications':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#071424] flex items-center justify-between">
            <span className="font-bold text-white">System Alerts</span>
            <span className="text-[8px] bg-cyan-500 text-black px-2 py-0.5 rounded-full font-bold">2 NEW</span>
          </div>
          <div className="p-2 space-y-2 flex-grow overflow-y-auto">
            {[
              { title: '📦 Batch Dispatched', desc: 'Your bulk order of Denim Jackets has shipped via Freight Cargo.', time: '10m ago', isNew: true },
              { title: '💸 Price Markdown Alert', desc: 'Sports Duffle wholesale requirement dropped to min 10 units.', time: '2h ago', isNew: true },
              { title: '✅ Invoice Settled', desc: 'Wholesale Invoice #8821 payment cleared successfully.', time: 'Yesterday', isNew: false }
            ].map((n, i) => (
              <div key={i} className={`border rounded-xl p-2.5 space-y-1 relative ${n.isNew ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-white/[0.01] border-white/5'}`}>
                {n.isNew && <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                <div className="flex justify-between items-center pr-4">
                  <h6 className="font-bold text-white text-[9.5px]">{n.title}</h6>
                  <span className="text-[7.5px] text-slate-500 font-mono">{n.time}</span>
                </div>
                <p className="text-[8.5px] text-slate-400 leading-normal">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    // ---------------- MUSLIM APP SCREENS ----------------
    case 'muslim-dashboard':
      return (
        <div className={wrapperClass}>
          {/* Next prayer banner */}
          <div className="p-4 bg-emerald-950/80 border-b border-emerald-500/20 text-center relative overflow-hidden">
            <span className="text-[8px] uppercase tracking-wider text-emerald-400 font-mono font-bold">Next Prayer</span>
            <h5 className="font-bold text-white text-sm mt-0.5">Asr in 1h 24m</h5>
            <p className="text-[8.5px] text-slate-400 mt-0.5 font-mono">Cairo, EG — Maghrib 6:58 PM</p>
          </div>
          {/* Prayer grid */}
          <div className="p-3 space-y-1.5 flex-grow overflow-y-auto">
            {[
              { name: 'Fajr', time: '3:12 AM', completed: true },
              { name: 'Dhuhr', time: '12:01 PM', completed: true },
              { name: 'Asr', time: '3:35 PM', active: true },
              { name: 'Maghrib', time: '6:58 PM' },
              { name: 'Isha', time: '8:32 PM' }
            ].map((p, i) => (
              <div key={i} className={`p-2.5 rounded-xl border flex justify-between items-center ${p.active ? 'bg-emerald-500/10 border-emerald-500/35 text-white' : 'bg-white/[0.01] border-white/5 text-slate-400'}`}>
                <div className="flex items-center gap-1.5">
                  {p.completed ? <CheckCircle2 size={10} className="text-emerald-400" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />}
                  <span className="font-semibold">{p.name}</span>
                </div>
                <span className="font-mono">{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'muslim-player':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#05110d] flex items-center justify-between">
            <span className="font-bold text-white">Surah Player</span>
            <Music size={12} className="text-emerald-400" />
          </div>
          <div className="p-4 flex flex-col items-center justify-center flex-grow space-y-4">
            <div className="w-20 h-20 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center relative">
              <BookOpen size={32} className="text-emerald-400 animate-pulse" />
            </div>
            <div className="text-center space-y-0.5">
              <h5 className="font-bold text-white text-xs">Surah Al-Mulk</h5>
              <span className="text-[8.5px] text-slate-500">Reciter: Mishary Alafasy</span>
            </div>
            {/* Progress bar */}
            <div className="w-full space-y-1 px-4">
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '45%' }} />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>02:45</span>
                <span>06:12</span>
              </div>
            </div>
            {/* Audio Controls */}
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white"><ChevronLeft size={16} /></button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="text-slate-400 hover:text-white"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      );
    case 'muslim-compass':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#05110d] flex items-center justify-between">
            <span className="font-bold text-white">Qibla Compass</span>
            <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">LIVE SENSOR</span>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow p-4 space-y-4">
            <div className="w-28 h-28 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center relative">
              {/* Compass Ring */}
              <div 
                className="absolute inset-2 border-2 border-dashed border-emerald-500/20 rounded-full transition-transform duration-500"
                style={{ transform: `rotate(${-compassHeading}deg)` }}
              >
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white font-mono">N</span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-500 font-mono">S</span>
              </div>
              {/* Center Needle */}
              <Compass size={32} className="text-emerald-400 rotate-45 animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-white font-bold font-mono text-xs">{Math.round(compassHeading)}° Qibla angle</span>
              <p className="text-[8px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">Magnetometer status: Stable</p>
            </div>
          </div>
        </div>
      );
    case 'muslim-calculator':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#05110d] flex items-center justify-between">
            <span className="font-bold text-white">Zakat Ledger</span>
            <span className="text-[8px] text-slate-400 font-mono">Nisab Limit: $5,800</span>
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            {/* Gold Rate API box */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[8px]">Live 24K Gold Rate</span>
                <h6 className="font-bold text-white text-[10px]">$76.50 / gram</h6>
              </div>
              <span className="text-[7.5px] uppercase tracking-wider bg-emerald-500 text-black px-1.5 py-0.5 rounded font-bold">API ACTIVE</span>
            </div>
            {/* Input fields */}
            <div className="space-y-2">
              <div className="space-y-0.5">
                <span className="text-[8px] text-slate-500 font-mono">CASH & LIQUID FUNDS ($)</span>
                <div className="bg-slate-900 border border-white/5 p-2 rounded text-slate-300 font-mono text-xs">$10,000</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-[8px] text-slate-500 font-mono">GOLD ASSETS (GRAMS)</span>
                <div className="bg-slate-900 border border-white/5 p-2 rounded text-slate-300 font-mono text-xs">85g</div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-[#05110d] border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[8px] font-mono">REQUIRED ZAKAT</span>
              <h6 className="font-bold text-emerald-400 text-xs font-mono">$412.56</h6>
            </div>
            <button className="py-1.5 px-3 rounded-lg bg-emerald-500 text-black font-bold text-[9.5px]">PAY ZAKAT</button>
          </div>
        </div>
      );

    // ---------------- CANCER DETECTION SCREENS ----------------
    case 'cancer-dashboard':
      return (
        <div className={wrapperClass}>
          {/* Header */}
          <div className="p-3 border-b border-white/5 bg-[#170a0d] flex justify-between items-center">
            <span className="font-bold text-white flex items-center gap-1">
              <Heart size={12} className="text-rose-500 animate-pulse" /> CancerAI Client
            </span>
            <span className="text-[8px] uppercase tracking-wider bg-rose-500 text-white px-1.5 py-0.5 rounded font-bold font-mono">CLINIC ACTIVE</span>
          </div>
          {/* Search */}
          <div className="p-2">
            <div className="bg-slate-900 border border-white/5 rounded-lg p-1.5 flex items-center gap-1.5 text-slate-500">
              <Search size={10} />
              <span>Filter patient files...</span>
            </div>
          </div>
          {/* Patient Cards list */}
          <div className="px-2 space-y-1.5 flex-grow overflow-y-auto">
            {[
              { id: 'PAT-4202', name: 'James Carter', age: '58y', risk: 'High Risk 82%', riskColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
              { id: 'PAT-1184', name: 'Sarah Jenkins', age: '42y', risk: 'Low Risk 15%', riskColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
              { id: 'PAT-9014', name: 'Robert Miller', age: '67y', risk: 'Moderate 48%', riskColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
            ].map((p, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <h6 className="font-semibold text-white">{p.name} <span className="text-slate-500 text-[8.5px]">({p.age})</span></h6>
                  <span className="font-mono text-[8.5px] text-slate-500">{p.id}</span>
                </div>
                <span className={`text-[8px] font-mono px-2 py-0.5 rounded border ${p.riskColor}`}>{p.risk}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'cancer-detail':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#170a0d] flex items-center justify-between">
            <span className="font-bold text-white">PAT-4202 Profile</span>
            <Users size={12} className="text-rose-500" />
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div className="bg-white/[0.01] border border-white/5 p-2 rounded-lg"><span className="text-slate-500 block">GENETIC MUTATION</span><span className="text-slate-300 font-mono font-bold">APC - EXON 15</span></div>
              <div className="bg-white/[0.01] border border-white/5 p-2 rounded-lg"><span className="text-slate-500 block">FAMILY HISTORY</span><span className="text-rose-400 font-bold">Colorectal (1st Deg)</span></div>
            </div>
            {/* Input segment */}
            <div className="space-y-1">
              <span className="text-[8px] text-slate-500 font-mono">GENETIC GENE STRING (FASTQ)</span>
              <div className="bg-slate-900 border border-white/5 p-2 rounded font-mono text-slate-400 break-all leading-normal text-[8.5px]">
                AAGCTTTGGCCTAACTGGCCATATCGATCGATCGGCTAATCGTTAA...
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-white/5 bg-[#170a0d]">
            <button className="w-full py-2 rounded-lg bg-rose-500 text-white font-bold text-center text-xs shadow-lg shadow-rose-500/20">
              UPDATE RECORD
            </button>
          </div>
        </div>
      );
    case 'cancer-chart':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#170a0d] flex items-center justify-between">
            <span className="font-bold text-white">CEA Tumor Indicators</span>
            <span className="text-[8px] text-rose-400 font-mono">Limit: &lt; 5.0 ng/mL</span>
          </div>
          <div className="p-3 flex-grow flex flex-col justify-between">
            {/* SVG line chart */}
            <div className="flex-grow flex items-center justify-center">
              <svg className="w-full h-[120px]" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                {/* Grid Lines */}
                <line x1="10" y1="10" x2="190" y2="10" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="10" y1="50" x2="190" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="10" y1="90" x2="190" y2="90" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
                {/* CEA threshold */}
                <line x1="10" y1="65" x2="190" y2="65" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 1" />
                {/* Trend line */}
                <path d="M 20,80 L 60,75 L 100,55 L 140,25 L 180,15" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
                {/* Points */}
                <circle cx="20" cy="80" r="2.5" fill="#f43f5e" />
                <circle cx="60" cy="75" r="2.5" fill="#f43f5e" />
                <circle cx="100" cy="55" r="2.5" fill="#f43f5e" />
                <circle cx="140" cy="25" r="2.5" fill="#f43f5e" />
                <circle cx="180" cy="15" r="2.5" fill="#f43f5e" />
              </svg>
            </div>
            <div className="grid grid-cols-5 text-center text-[7.5px] text-slate-500 font-mono mt-1 border-t border-white/5 pt-1.5">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span>
            </div>
          </div>
        </div>
      );
    case 'cancer-ml':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#170a0d] flex items-center justify-between">
            <span className="font-bold text-white">AI Predictor Gauge</span>
            <Cpu size={12} className="text-rose-500" />
          </div>
          <div className="p-4 flex flex-col items-center justify-center flex-grow space-y-4">
            {/* Risk semi-circle */}
            <div className="relative w-28 h-14 overflow-hidden">
              <svg className="absolute top-0 left-0 w-28 h-28" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="251" strokeDashoffset="125" />
              </svg>
              <div className="absolute bottom-0 inset-x-0 text-center">
                <span className="text-rose-400 text-xs font-bold font-mono">82%</span>
                <p className="text-[7.5px] text-slate-500 font-mono uppercase tracking-wider">High Risk</p>
              </div>
            </div>
            <div className="text-center space-y-1.5 px-2">
              <span className="text-slate-300 font-bold block">Patient assessment completed</span>
              <p className="text-[8px] text-slate-500 leading-normal">System suggests immediate diagnostic colonoscopy screening and gene sequencing update checks.</p>
            </div>
          </div>
        </div>
      );

    // ---------------- MANSY LEARNING SCREENS ----------------
    case 'learning-dashboard':
      return (
        <div className={wrapperClass}>
          {/* Header */}
          <div className="p-3 border-b border-white/5 bg-[#1b0a24] flex justify-between items-center">
            <span className="font-bold text-white flex items-center gap-1">
              <GraduationCap size={12} className="text-purple-400" /> Mansy Academy
            </span>
            <span className="text-[9px] bg-purple-500 text-black px-2 py-0.5 rounded-full font-bold">Premium</span>
          </div>
          {/* Course card list */}
          <div className="p-2 space-y-2 flex-grow overflow-y-auto">
            <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[7.5px] uppercase tracking-wider text-purple-400 font-bold font-mono">FEATURED COURSE</span>
                  <h6 className="font-bold text-white text-[9.5px]">Flutter Clean Arch & BLoC</h6>
                </div>
                <span className="text-[9px] text-purple-400 font-bold font-mono">85%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 space-y-2 opacity-75">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[7.5px] uppercase tracking-wider text-slate-500 font-bold font-mono">DATABASE TIER</span>
                  <h6 className="font-bold text-white text-[9.5px]">Supabase Backend Security</h6>
                </div>
                <span className="text-[9px] text-slate-400 font-bold font-mono">12%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>
      );
    case 'learning-course':
      return (
        <div className={wrapperClass}>
          {/* Video Mockup */}
          <div className="w-full aspect-video bg-black flex flex-col justify-end relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={20} className="text-purple-400 opacity-80" />
            </div>
            {/* Scrubber overlay */}
            <div className="bg-black/60 p-2 flex items-center justify-between z-10 text-[8px] font-mono text-slate-300">
              <div className="flex items-center gap-1">
                <Pause size={8} />
                <span>12:42 / 45:10</span>
              </div>
              <span>720p HD</span>
            </div>
          </div>
          {/* Section details */}
          <div className="p-3 flex-grow overflow-y-auto space-y-2">
            <h5 className="font-bold text-white text-xs">Section 3: State Management Safety</h5>
            <p className="text-[8.5px] text-slate-400 leading-normal">Implementing SafeBloc structures, avoiding memory leakage inside controllers, and using connectivity Streams.</p>
          </div>
        </div>
      );
    case 'learning-quiz':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#1b0a24] flex justify-between items-center">
            <span className="font-bold text-white">Quiz Milestone</span>
            <span className="text-[8.5px] text-purple-400 font-mono">Timer: 08m 14s</span>
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[8px] text-slate-500 font-mono">QUESTION 2 OF 10</span>
              <h5 className="text-white font-bold text-[10px] leading-normal">Which component encapsulates remote service transactions inside custom repositories?</h5>
            </div>
            {/* Options list */}
            <div className="space-y-1.5 text-[9.5px]">
              <div className="border border-white/5 bg-white/[0.01] rounded-lg p-2 text-slate-400">Presentation Widgets</div>
              <div className="border border-emerald-500/30 bg-emerald-500/10 rounded-lg p-2 text-emerald-400 font-bold flex justify-between items-center">
                <span>TaskRunner & failures</span>
                <CheckCircle2 size={10} />
              </div>
              <div className="border border-white/5 bg-white/[0.01] rounded-lg p-2 text-slate-400">Declarative GoRouter</div>
            </div>
          </div>
        </div>
      );
    case 'learning-profile':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#1b0a24] flex justify-between items-center">
            <span className="font-bold text-white">Premium Profile</span>
            <Settings size={12} className="text-purple-400" />
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            {/* Subscription badge */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-2.5 text-center space-y-0.5">
              <span className="text-purple-400 text-[8px] uppercase tracking-wider font-mono">CURRENT PLAN</span>
              <h6 className="font-bold text-white text-xs">Annual Access Token</h6>
              <p className="text-[8px] text-slate-500">Renews on Jan 14, 2027</p>
            </div>
            {/* Certificates */}
            <div className="space-y-1.5">
              <span className="text-[8px] text-slate-500 font-mono">COMPLETED CERTIFICATES</span>
              <div className="bg-white/[0.01] border border-white/5 rounded-lg p-2 flex justify-between items-center">
                <span className="text-slate-300 font-medium">Flutter Clean Architecture</span>
                <span className="text-[7.5px] uppercase bg-emerald-500 text-black font-bold px-1 rounded font-mono">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ---------------- MUSIC PLAYER SCREENS ----------------
    case 'music-dashboard':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#241305] flex items-center justify-between">
            <span className="font-bold text-white">Audio Library</span>
            <span className="text-[8.5px] text-amber-500 font-mono">Folders Scanned: 4</span>
          </div>
          <div className="p-2 space-y-1.5 flex-grow overflow-y-auto">
            {[
              { title: 'Acoustic Dreams.mp3', size: '6.4 MB', path: '/Music/Favorites' },
              { title: 'Synthwave Skyline.flac', size: '18.2 MB', path: '/Music/Synthwave' },
              { title: 'Ambient Waves.wav', size: '32.1 MB', path: '/Music/Chillout' }
            ].map((track, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <h6 className="font-semibold text-white truncate max-w-[150px]">{track.title}</h6>
                  <span className="text-[7.5px] font-mono text-slate-500">{track.path}</span>
                </div>
                <span className="text-[8px] font-mono text-slate-500">{track.size}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'music-playing':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#241305] flex items-center justify-between">
            <span className="font-bold text-white">Now Playing</span>
            <Music size={12} className="text-amber-500" />
          </div>
          <div className="p-4 flex flex-col items-center justify-center flex-grow space-y-4">
            {/* Glowing disc art */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl relative">
              <div className="w-6 h-6 rounded-full bg-[#0b0f19] border-2 border-white flex items-center justify-center">
                <Music size={10} className="text-amber-500" />
              </div>
              <div className="absolute -inset-1 border border-amber-500/10 rounded-2xl animate-pulse" />
            </div>
            <div className="text-center space-y-0.5">
              <h5 className="font-bold text-white text-xs">Synthwave Skyline</h5>
              <span className="text-[8.5px] text-slate-500">Artist: RetroVision</span>
            </div>
            {/* Audio scrubber */}
            <div className="w-full space-y-1 px-4">
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>01:12</span>
                <span>03:20</span>
              </div>
            </div>
            {/* Media player controls */}
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white"><ChevronLeft size={16} /></button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="text-slate-400 hover:text-white"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      );
    case 'music-playlist':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#241305] flex items-center justify-between">
            <span className="font-bold text-white">Synthwave Queue</span>
            <span className="text-[8px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">REORDER</span>
          </div>
          <div className="p-2 space-y-1.5 flex-grow overflow-y-auto">
            {[
              { id: 1, title: '1. Synthwave Skyline', duration: '03:20' },
              { id: 2, title: '2. Neon Gridlines', duration: '04:12' },
              { id: 3, title: '3. Sunset Cruiser', duration: '02:56' }
            ].map((song, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 flex justify-between items-center cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-mono text-[9px]">⋮⋮</span>
                  <span className="font-semibold text-white text-[9.5px]">{song.title}</span>
                </div>
                <span className="font-mono text-[8.5px] text-slate-500">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'music-settings':
      return (
        <div className={wrapperClass}>
          <div className="p-3 border-b border-white/5 bg-[#241305] flex items-center justify-between">
            <span className="font-bold text-white">Scanner Rules</span>
            <Settings size={12} className="text-amber-500" />
          </div>
          <div className="p-3 space-y-3 flex-grow overflow-y-auto">
            {/* Scan directories list */}
            <div className="space-y-1.5">
              <span className="text-[8px] text-slate-500 font-mono">SCAN PATHS</span>
              <div className="bg-white/[0.01] border border-white/5 rounded-lg p-2 font-mono text-[8.5px] text-slate-300">
                /Users/mahmoud/Music
              </div>
            </div>
            {/* Rule options */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scan nested subfolders</span>
                <span className="w-7 h-4 bg-amber-500 rounded-full p-0.5 flex items-center justify-end"><span className="w-3 h-3 bg-black rounded-full" /></span>
              </div>
              <div className="flex justify-between items-center opacity-60">
                <span className="text-slate-400">Ignore files below 1MB</span>
                <span className="w-7 h-4 bg-slate-800 rounded-full p-0.5 flex items-center"><span className="w-3 h-3 bg-slate-600 rounded-full" /></span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-[#241305] border-t border-white/5">
            <button className="w-full py-2 rounded-lg bg-amber-500 text-black font-bold text-center text-xs">
              TRIGGER SCANNER ISOLATE
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className={wrapperClass}>
          <div className="flex-grow flex items-center justify-center p-4 text-center">
            <span className="text-slate-500">Screen Mockup Unavailable</span>
          </div>
        </div>
      );
  }
};

const ProjectDetail = ({ slug }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const videoRef = useRef(null);
  const data = projectsDetailData[slug];
  const hasWalkthrough = !!data?.overview?.walkthrough?.videoPath;
  const hasGallery = !!(data?.screenshots && data.screenshots.length > 0 && data.screenshots.some(s => s.path));

  // Auto-scroll to top when page mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const frameId = requestAnimationFrame(() => {
      setActiveTab('overview');
      setActiveSlide(0);
      setLightboxIndex(null);
    });
    return () => cancelAnimationFrame(frameId);
  }, [slug]);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const nextSlide = () => {
    if (!data?.screenshots?.length) return;
    setActiveSlide((prev) => (prev + 1) % data.screenshots.length);
  };

  const prevSlide = () => {
    if (!data?.screenshots?.length) return;
    setActiveSlide((prev) => (prev - 1 + data.screenshots.length) % data.screenshots.length);
  };

  const handleLightboxNav = useCallback((direction) => {
    if (!data?.screenshots?.length || lightboxIndex === null) return;
    if (direction === 'next') {
      setLightboxIndex((prev) => (prev + 1) % data.screenshots.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + data.screenshots.length) % data.screenshots.length);
    }
  }, [data, lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleLightboxNav('next');
      if (e.key === 'ArrowLeft') handleLightboxNav('prev');
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleLightboxNav]);

  // If slug is invalid, redirect back
  if (!data) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-6" style={{ paddingTop: '90px' }}>
        <h2 className="text-2xl font-bold text-white mb-4">Case Study Not Found</h2>
        <a href="#projects" onClick={() => window.location.hash = '#projects'} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden pb-20 animate-fade-in" style={{ paddingTop: '90px' }}>
      {/* Abstract Background Glows */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full blur-[150px] pointer-events-none opacity-10 transition-colors duration-500" 
        style={{ backgroundColor: data.color }}
        aria-hidden="true" 
      />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#6366f1]/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Navigation / Header controls */}
        <div className="flex justify-between items-center mb-16 pt-4">
          <motion.a 
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#projects';
            }}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </motion.a>
          
          <div className="flex gap-3">
            <a 
              href={data.repository} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all duration-300"
            >
              <SiGithub size={14} /> Repository
            </a>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span 
              className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border bg-white/5 transition-colors duration-500" 
              style={{ color: data.color, borderColor: `${data.color}20` }}
            >
              {data.questNumber}
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-white/5 bg-white/5 text-slate-400">
              {data.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-normal mb-6">
            {data.title} <br/>
            <span className="gradient-text">{data.subtitle}</span>
          </h1>
          
          <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
            {data.tagline}
          </p>

          {/* Quick Stats Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
            {data.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 space-y-1"
                style={{ '--hover-color': data.color }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${data.color}30`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
              >
                <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500">{stat.label}</span>
                <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                  {stat.isIcon && getStatIcon(stat.iconType)} {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 mb-12 relative">
          {['overview', 'features', 'architecture', hasGallery ? 'gallery' : null].filter(Boolean).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-sm font-semibold capitalize tracking-wider relative transition-colors duration-300 ${
                activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeDetailTab"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: data.color }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="min-h-[400px]"
          >
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className={hasWalkthrough ? "grid md:grid-cols-5 gap-12 items-start" : "w-full space-y-8"}>
                <div className={hasWalkthrough ? "md:col-span-3 space-y-8" : "w-full space-y-8"}>
                  <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles size={18} style={{ color: data.color }} /> {data.overview.goalTitle}
                    </h3>
                    <p className="text-slate-300 font-light leading-relaxed mb-4">
                      {data.overview.goalDesc1}
                    </p>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {data.overview.goalDesc2}
                    </p>
                  </div>

                  <div className="space-y-4 pt-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-xs" style={{ color: data.color }}>
                      Core Outcomes
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {data.overview.outcomes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                          <span className="text-sm font-light text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Video / Device Mockup Sidebar */}
                {hasWalkthrough && (
                  <div className="md:col-span-2 space-y-6">
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
                      <h3 className="text-base font-bold text-white mb-4 self-start">
                        App Walkthrough
                      </h3>
                      
                      {/* iPhone mockup */}
                      <div 
                        className="relative border-[6px] border-slate-800 rounded-[32px] bg-black shadow-2xl overflow-hidden aspect-[9/19.5] mx-auto ring-1 ring-white/10"
                        style={{ maxWidth: '180px', width: '100%' }}
                      >
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-900 rounded-full z-20" />
                        <video
                          ref={videoRef}
                          src={data.overview.walkthrough.videoPath}
                          className="w-full h-full object-cover cursor-pointer [&:fullscreen]:object-contain"
                          loop
                          muted={videoMuted}
                          autoPlay
                          playsInline
                          controls
                          onPlay={() => setVideoPlaying(true)}
                          onPause={() => setVideoPlaying(false)}
                        />
                      </div>

                      <div className="flex gap-4 mt-4 justify-center">
                        <button 
                          onClick={handleVideoToggle}
                          className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 flex items-center justify-center"
                          aria-label={videoPlaying ? "Pause video" : "Play video"}
                        >
                          {videoPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button 
                          onClick={handleMuteToggle}
                          className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 flex items-center justify-center"
                          aria-label={videoMuted ? "Unmute video" : "Mute video"}
                        >
                          {videoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>

                      <p className="text-[11px] font-mono text-center text-slate-500 mt-4 uppercase tracking-widest">
                        Live walkthrough video
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FEATURES TAB */}
            {activeTab === 'features' && (
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {data.features.map((feature, idx) => (
                    <div 
                      key={feature.id} 
                      className="glass-card p-6 rounded-2xl flex flex-col justify-between border-l-2"
                      style={{ borderLeftColor: idx % 2 === 0 ? data.color : '#6366f1' }}
                    >
                      <div className="space-y-4">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{ 
                            backgroundColor: `${idx % 2 === 0 ? data.color : '#6366f1'}10`,
                            borderColor: `${idx % 2 === 0 ? data.color : '#6366f1'}20`
                          }}
                        >
                          {getIconNode(feature.iconName, idx % 2 === 0 ? data.color : '#6366f1')}
                        </div>
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                        {feature.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] font-mono bg-white/5 px-2.5 py-1 rounded-md text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Callout Info */}
                <div 
                  className="p-5 rounded-2xl border flex items-start gap-4"
                  style={{ 
                    borderColor: data.alert.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                    backgroundColor: data.alert.type === 'warning' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(6, 182, 212, 0.05)'
                  }}
                >
                  <ShieldAlert className="mt-1 flex-shrink-0" style={{ color: data.alert.type === 'warning' ? '#f59e0b' : '#06b6d4' }} />
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white">{data.alert.title}</h5>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {data.alert.desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ARCHITECTURE TAB */}
            {activeTab === 'architecture' && (
              <div className="grid md:grid-cols-5 gap-10 items-start">
                <div className="md:col-span-2 space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-base font-bold text-white mb-4">
                      Directory Architecture
                    </h3>
                    <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 max-h-[480px] overflow-y-auto">
                      {data.architecture.folderTree.map((item, idx) => (
                        <FolderTree key={idx} item={item} themeColor={data.color} />
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 mt-3 text-center uppercase tracking-wider">
                      {data.architecture.folderCaption}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold" style={{ color: data.color }}>
                      Structural Rigor
                    </span>
                    <h3 className="text-2xl font-bold text-white">{data.architecture.techTitle}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {data.architecture.techDesc}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {data.architecture.layers.map((layer, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ 
                              backgroundColor: layer.color === 'indigo' ? '#6366f1' : layer.color === 'sky' ? '#0ea5e9' : '#10b981' 
                            }} 
                          />
                          {layer.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          {layer.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Cpu size={16} style={{ color: data.color }} /> Dependency Injection & State Safety
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {data.architecture.diDetails}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">Interface Gallery</h3>
                    <p className="text-sm text-slate-400 font-light">Explore features and interactive mockups of the application.</p>
                  </div>
                  
                  {/* Slider controls */}
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSlide}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Slideshow Display */}
                <div className="grid md:grid-cols-5 gap-10 items-center bg-white/[0.01] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                  <div className="md:col-span-2 flex justify-center">
                    
                    {/* Active Screenshot Phone Container */}
                    <div 
                      onClick={() => setLightboxIndex(activeSlide)}
                      className="relative border-[6px] border-slate-800 rounded-[34px] bg-[#0b0f19] shadow-2xl overflow-hidden aspect-[9/19.5] w-[220px] md:w-[240px] ring-1 ring-white/10 cursor-pointer hover:scale-105 transition-transform duration-300 group/image"
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-full z-20" />
                      <div 
                        className="absolute inset-0 bg-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center bg-black/35"
                      >
                        <span className="text-white bg-slate-900/85 px-3 py-1.5 rounded-lg text-xs font-mono tracking-widest">ZOOM</span>
                      </div>
                      
                      {data.screenshots[activeSlide].path ? (
                        <img 
                          src={data.screenshots[activeSlide].path} 
                          alt={data.screenshots[activeSlide].title} 
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <DeviceScreenPreview mockType={data.screenshots[activeSlide].mockType} themeColor={data.color} />
                      )}
                    </div>

                  </div>

                  <div className="md:col-span-3 space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-mono" style={{ color: data.color }}>Screen {activeSlide + 1} of {data.screenshots.length}</span>
                      <h4 className="text-2xl font-bold text-white">{data.screenshots[activeSlide].title}</h4>
                      <p className="text-slate-400 font-light leading-relaxed">{data.screenshots[activeSlide].desc}</p>
                    </div>

                    {/* Miniature selector grid */}
                    <div className="flex flex-wrap gap-2 max-w-lg">
                      {data.screenshots.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => setActiveSlide(idx)}
                          className={`w-12 h-20 rounded-md border overflow-hidden relative flex-shrink-0 transition-all ${
                            activeSlide === idx 
                              ? 'ring-2 scale-105' 
                              : 'border-white/10 opacity-40 hover:opacity-80'
                          }`}
                          style={{ 
                            borderColor: activeSlide === idx ? data.color : 'rgba(255, 255, 255, 0.1)',
                            boxShadow: activeSlide === idx ? `0 0 10px ${data.color}40` : 'none'
                          }}
                        >
                          {s.path ? (
                            <img src={s.path} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full scale-[0.35] origin-top-left overflow-hidden select-none pointer-events-none">
                              <div className="w-[143px] h-[310px]">
                                <DeviceScreenPreview mockType={s.mockType} themeColor={data.color} />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Footer controls */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.a 
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#projects';
            }}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Return to Home
          </motion.a>
          
          <span className="text-xs font-mono text-slate-600">
            {data.title} Case Study — Mahmoud Magdy Mansour
          </span>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-xs font-mono tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full"
            >
              CLOSE (ESC)
            </button>

            <button 
              onClick={() => handleLightboxNav('prev')}
              className="absolute left-4 md:left-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4">
              <div 
                className="relative border-[4px] border-slate-800 rounded-[28px] bg-[#0b0f19] shadow-2xl overflow-hidden aspect-[9/19.5] h-[70vh] md:h-[75vh]"
              >
                {data.screenshots[lightboxIndex].path ? (
                  <img 
                    src={data.screenshots[lightboxIndex].path} 
                    alt={data.screenshots[lightboxIndex].title} 
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <DeviceScreenPreview mockType={data.screenshots[lightboxIndex].mockType} themeColor={data.color} />
                )}
              </div>
              <div className="text-center max-w-xl">
                <h4 className="text-lg font-bold text-white">{data.screenshots[lightboxIndex].title}</h4>
                <p className="text-xs text-slate-400 font-light mt-1">{data.screenshots[lightboxIndex].desc}</p>
              </div>
            </div>

            <button 
              onClick={() => handleLightboxNav('next')}
              className="absolute right-4 md:right-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
