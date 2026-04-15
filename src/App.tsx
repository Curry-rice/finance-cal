/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Thermometer, 
  Scale, 
  Gauge, 
  Ruler, 
  Clock, 
  RefreshCw, 
  ArrowUpRight,
  Home,
  LayoutGrid,
  GitCompare,
  Settings,
  Users,
  Briefcase,
  Home as HomeIcon,
  Car,
  Wallet,
  PiggyBank,
  ChevronRight,
  ArrowRight,
  Check,
  Search,
  ArrowLeft,
  FileText,
  PlusCircle,
  LogOut,
  Languages,
  Star,
  ShieldCheck,
  Share2
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GOLD = "#D4AF37";
const DARK_BG = "#0A0A0A";
const CARD_BG = "#1A1A1A";

function ConfirmationDialog({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#1A1A1A] w-full max-w-sm rounded-[32px] p-8 border border-white/10 shadow-2xl space-y-6 text-center"
      >
        <h2 className="text-2xl font-bold text-white">Back to Home</h2>
        
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-[#7ED321]/10 rounded-2xl flex items-center justify-center">
            <LogOut className="w-12 h-12 text-[#7ED321]" />
          </div>
        </div>

        <p className="text-gray-300 font-medium">Are you sure to back to home ?</p>

        {/* Ad Module inside Dialog */}
        <div className="bg-[#222222] rounded-2xl p-4 border border-white/5 space-y-4">
          <div className="flex gap-3">
            <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
              <img 
                src="https://picsum.photos/seed/vpn/200/300" 
                alt="Ad" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-between py-1 text-left flex-1">
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">连接快连，稳定不卡顿</h4>
                <p className="text-gray-500 text-[10px] mt-1">拒绝卡顿，用快连极速体验</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-[#D4AF37] text-black text-xs font-black py-2 px-4 rounded-lg w-full"
              >
                下载
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="py-4 rounded-2xl border border-white/10 text-white font-bold text-sm bg-white/5"
          >
            Continue
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="py-4 rounded-2xl bg-[#D4AF37] text-black font-bold text-sm shadow-lg shadow-[#D4AF37]/20"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface Currency {
  code: string;
  name: string;
  flag: string;
}

const tools: Tool[] = [
  { id: "temp", title: "Temperature", description: "Convert Celsius, Fahrenheit, and Kelvin.", icon: Thermometer, color: "#FF5252" },
  { id: "mass", title: "Mass Convert", description: "Convert grams, pounds, ounces and other units.", icon: Scale, color: "#4CAF50" },
  { id: "speed", title: "Speed Convert", description: "Convert kilometers per hour, miles per hour.", icon: Gauge, color: "#2196F3" },
  { id: "length", title: "Length Convert", description: "Convert units like inches, meters and more!", icon: Ruler, color: "#E91E63" },
  { id: "clock", title: "World Clock", description: "Track current time in multiple cities.", icon: Clock, color: "#00BCD4" },
  { id: "rate", title: "Exchange Rate", description: "Easily convert between currencies.", icon: RefreshCw, color: "#FFC107" },
];

const currencies: Currency[] = [
  { code: "GBP", name: "UK Pound", flag: "🇬🇧" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D4AF37] selection:text-black pb-32 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingElements />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "Home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <HomePage 
              onCurrencyClick={() => setActiveTab("Currency")} 
              selectedCurrency={selectedCurrency} 
              onLoanClick={(title) => {
                if (title === "Mortgages") setActiveTab("MortgageResult");
              }}
            />
          </motion.div>
        )}
        {activeTab === "Tools" && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <ToolsPage />
          </motion.div>
        )}
        {activeTab === "Currency" && (
          <motion.div
            key="currency"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <CurrencySelectionPage 
              selectedCurrency={selectedCurrency} 
              onSelect={(code) => {
                setSelectedCurrency(code);
                setActiveTab("Home");
              }} 
              onBack={() => setActiveTab("Home")}
            />
          </motion.div>
        )}
        {activeTab === "MortgageResult" && (
          <motion.div
            key="mortgage-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <MortgageResultPage 
              currency={selectedCurrency} 
              onBack={() => setActiveTab("Home")} 
            />
          </motion.div>
        )}
        {activeTab === "Setting" && (
          <motion.div
            key="setting"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <SettingsPage onLanguageClick={() => setActiveTab("Currency")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0D0D0D]/80 backdrop-blur-lg border-t border-white/5 px-6 py-3 z-50">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <NavItem icon={Home} label="Home" active={activeTab === "Home"} onClick={() => setActiveTab("Home")} />
          <NavItem icon={LayoutGrid} label="Tools" active={activeTab === "Tools"} onClick={() => setActiveTab("Tools")} />
          <NavItem icon={GitCompare} label="Compare" />
          <NavItem icon={Settings} label="Setting" active={activeTab === "Setting"} onClick={() => setActiveTab("Setting")} />
        </div>
      </nav>
    </div>
  );
}

function FloatingElements() {
  const elements = Array.from({ length: 12 });
  return (
    <>
      {elements.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            rotate: 0,
            opacity: 0.1 + Math.random() * 0.3
          }}
          animate={{ 
            y: "-10%", 
            rotate: 360,
          }}
          transition={{ 
            duration: 15 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 20
          }}
          className="absolute text-[#D4AF37]/20"
          style={{ fontSize: 20 + Math.random() * 40 }}
        >
          {i % 3 === 0 ? "$" : i % 3 === 1 ? "¥" : "€"}
        </motion.div>
      ))}
      <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/3 rounded-full blur-[120px]" />
    </>
  );
}

function HomePage({ onCurrencyClick, selectedCurrency, onLoanClick }: { onCurrencyClick: () => void, selectedCurrency: string, onLoanClick: (title: string) => void }) {
  return (
    <>
      <header className="px-6 py-10 flex justify-between items-center relative">
        <div className="w-10" />
        <h1 className="text-3xl font-black tracking-tighter relative z-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Loan Calculator
        </h1>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCurrencyClick}
          className="bg-[#1A1A1A] border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-[#D4AF37] shadow-lg"
        >
          <span>{selectedCurrency}</span>
          <ChevronRight className="w-3 h-3" />
        </motion.button>
      </header>

      <main className="px-4 space-y-8 max-w-lg mx-auto">
        {/* Loan Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          <LoanCard icon={Users} title="Personal Loan" color="#4A90E2" onClick={() => onLoanClick("Personal Loan")} />
          <LoanCard icon={Briefcase} title="Business Loan" color="#F5A623" onClick={() => onLoanClick("Business Loan")} />
          
          {/* Ad Module */}
          <div className="col-span-2">
            <AdModule />
          </div>

          <LoanCard icon={HomeIcon} title="Mortgages" color="#7ED321" onClick={() => onLoanClick("Mortgages")} />
          <LoanCard icon={Car} title="Auto Loan" color="#BD10E0" onClick={() => onLoanClick("Auto Loan")} />
        </div>

        {/* Investment Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold px-1 border-l-4 border-[#D4AF37] ml-1">Investment</h2>
          <div className="space-y-3">
            <InvestmentItem icon={Wallet} title="FD" subtitle="Fixed Deposit" color="#4A90E2" />
            <InvestmentItem icon={PiggyBank} title="RD" subtitle="Recurring Deposit" color="#F5A623" />
          </div>
        </div>
      </main>
    </>
  );
}

function MortgageResultPage({ currency, onBack }: { currency: string, onBack: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const data = [
    { name: 'Principal & Interest', value: 829, color: '#A855F7' },
    { name: 'Property Tax', value: 1, color: '#EAB308' },
    { name: 'HOA Fees', value: 54, color: '#EC4899' },
    { name: 'PMI', value: 4, color: '#22C55E' },
    { name: 'Home insurance', value: 1, color: '#06B6D4' },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <>
      <AnimatePresence>
        {showConfirm && (
          <ConfirmationDialog 
            onConfirm={onBack} 
            onCancel={() => setShowConfirm(false)} 
          />
        )}
      </AnimatePresence>

      <header className="px-6 py-8 flex justify-between items-center bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowConfirm(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <h1 className="text-xl font-bold">Result</h1>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowConfirm(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white"
        >
          <HomeIcon className="w-5 h-5" />
        </motion.button>
      </header>

      <main className="px-4 pb-10 space-y-6 max-w-lg mx-auto">
        {/* Loan Information */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-gray-400 mb-2">Loan Information</h2>
          <div className="space-y-3">
            <InfoRow label="Home Price" value={`9,999${currency}`} />
            <InfoRow label="Interest Rate" value="1.0 %" />
            <InfoRow label="Loan Term" value="1 years" />
            <InfoRow label="Down Payment" value={`100${currency}`} />
            <InfoRow label="Property Tax" value={`1${currency}`} />
            <InfoRow label="PMI" value={`4${currency}`} />
            <InfoRow label="Home insurance" value={`1${currency}`} />
            <InfoRow label="HOA Fees" value={`54${currency}`} />
          </div>
        </div>

        {/* Result after calculation */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-gray-400">Result after calculation</h2>
          
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={180}
                  endAngle={-180}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-500">Total Payment</span>
              <span className="text-2xl font-black text-[#D4AF37]">{total.toFixed(2)} {currency}</span>
              <span className="text-[10px] text-gray-500">/ month</span>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/5 pt-6">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{item.value}{currency}</span>
                  <span className="text-gray-500 text-xs">({((item.value / total) * 100).toFixed(2)}%)</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className="font-bold">Total Payment</span>
              <span className="font-black text-lg text-[#D4AF37]">{total}{currency}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(212,175,55,0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <FileText className="w-5 h-5" />
            Share PDF
          </motion.button>

          <LargeAdModule />
        </div>
      </main>
    </>
  );
}

function LargeAdModule() {
  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#E5C048" }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
      >
        INSTALL
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-white/10 shadow-2xl group"
      >
        <img 
          src="https://picsum.photos/seed/finance-banner/800/450" 
          alt="Ad Banner" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white/70 text-[10px] px-2 py-0.5 rounded font-bold border border-white/10">
          AD
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md p-1 border border-white/20 shadow-lg">
            <img 
              src="https://picsum.photos/seed/app-icon/100/100" 
              alt="App Icon" 
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="bg-white text-black text-[8px] font-black px-1 rounded-sm">AD</span>
              <h4 className="text-white font-bold text-sm truncate shadow-black drop-shadow-md">
                Photo Recovery - Data R...
              </h4>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function CurrencySelectionPage({ selectedCurrency, onSelect, onBack }: { selectedCurrency: string, onSelect: (code: string) => void, onBack: () => void }) {
  return (
    <>
      <header className="px-6 py-8 flex justify-between items-center bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="w-10" />
        <h1 className="text-xl font-bold">Currency Unit</h1>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white"
        >
          <Check className="w-6 h-6" />
        </motion.button>
      </header>

      <main className="px-4 pb-10 space-y-3 max-w-lg mx-auto">
        {currencies.map((currency) => (
          <motion.button
            key={currency.code}
            whileHover={{ scale: 1.01, backgroundColor: "#222222" }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(currency.code)}
            className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all ${
              selectedCurrency === currency.code 
                ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
                : "bg-[#1A1A1A] border-white/5"
            }`}
          >
            <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl">
              {currency.flag}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{currency.code}</span>
                <span className="text-gray-500 text-sm">{currency.name}</span>
              </div>
            </div>
            {selectedCurrency === currency.code && (
              <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <Check className="w-4 h-4 text-black" />
              </div>
            )}
          </motion.button>
        ))}

        <div className="pt-6">
          <AdModule />
        </div>
      </main>
    </>
  );
}

function SettingsPage({ onLanguageClick }: { onLanguageClick: () => void }) {
  const settingsItems = [
    { icon: Languages, label: "Language", onClick: onLanguageClick, hasChevron: true, color: "#7ED321" },
    { icon: Star, label: "Rate Us", color: "#F5A623" },
    { icon: ShieldCheck, label: "Privacy Policy", color: "#4A90E2" },
    { icon: Share2, label: "Share", color: "#BD10E0" },
  ];

  return (
    <div className="px-6 py-12 space-y-6">
      <h1 className="text-3xl font-black text-center text-white mb-8">Setting</h1>

      {/* Independent Ad Module */}
      <AdModule />

      <div className="bg-[#1A1A1A] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
        <div className="divide-y divide-white/5">
          {settingsItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              whileTap={{ scale: 0.98 }}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-6 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="text-lg font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.label}
                </span>
              </div>
              {item.hasChevron && (
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolsPage() {
  return (
    <>
      <header className="px-6 py-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <h1 className="text-2xl font-bold tracking-tight relative z-10">Tools</h1>
      </header>

      <main className="px-4 space-y-6 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {tools.slice(0, 2).map((tool) => (
            <div key={tool.id}>
              <ToolCard tool={tool} />
            </div>
          ))}

          <div className="col-span-2">
            <AdModule />
          </div>

          {tools.slice(2).map((tool) => (
            <div key={tool.id}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function LoanCard({ icon: Icon, title, color, onClick }: { icon: any, title: string, color: string, onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -5, backgroundColor: "#222222" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col items-center gap-4 relative group transition-colors cursor-pointer"
    >
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
        <ArrowUpRight className="w-4 h-4 text-black" />
      </div>
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
      <span className="font-bold text-sm text-center">{title}</span>
    </motion.div>
  );
}

function InvestmentItem({ icon: Icon, title, subtitle, color }: { icon: any, title: string, subtitle: string, color: string }) {
  return (
    <motion.div
      whileHover={{ x: 5, backgroundColor: "#222222" }}
      whileTap={{ scale: 0.99 }}
      className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 shadow-lg flex items-center gap-4 group transition-colors"
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-[10px] text-gray-500">{subtitle}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
    </motion.div>
  );
}

function AdModule() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl p-4 relative"
    >
      <div className="absolute top-2 left-2 bg-[#4CAF50] text-white text-[10px] px-1 rounded font-bold z-10">Ad</div>
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-xl bg-[#2A2A2A] flex-shrink-0 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/tool-ad/200/200" 
            alt="Ad Icon" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="text-sm font-bold truncate">Loan Calculator: Plan</h3>
            <p className="text-[10px] text-gray-400 line-clamp-2 mt-1">
              Loan Calculator is a practical and easy-to-use finance calculator designed to...
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#E5C048" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#D4AF37] text-black text-[10px] font-bold py-2 rounded-lg"
          >
            安装
          </motion.button>
        </div>
      </div>
      <div className="absolute bottom-1 right-2 text-[8px] text-gray-600">谷歌广告</div>
    </motion.div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <motion.div
      whileHover={{ y: -5, backgroundColor: "#222222" }}
      whileTap={{ scale: 0.98 }}
      className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 shadow-xl flex flex-col gap-3 relative group transition-colors"
    >
      <div className="flex justify-between items-start">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: `${tool.color}15` }}
        >
          <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ background: `radial-gradient(circle at center, ${tool.color}, transparent)` }}
          />
        </div>
        <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
          <ArrowUpRight className="w-4 h-4 text-black" />
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-sm text-white">{tool.title}</h3>
        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
          {tool.description}
        </p>
      </div>
    </motion.div>
  );
}

function NavItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <div className={`p-1.5 rounded-xl ${active ? 'bg-[#D4AF37]/10' : ''}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </motion.button>
  );
}



