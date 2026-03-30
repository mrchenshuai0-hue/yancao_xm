/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cloud, 
  Wind, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  BarChart3, 
  CalendarDays, 
  CheckCircle2, 
  Plane,
  Home,
  Bell,
  PieChart,
  FileText,
  Settings,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  MapPin,
  ChevronDown,
  Star,
  ArrowLeft,
  Calendar,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart as ChartPie, 
  Pie,
  BarChart as ChartBar, 
  LineChart as ChartLine,
  AreaChart as ChartArea,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Cell,
  LabelList
} from 'recharts';
import { 
  MOCK_WEATHER, 
  MOCK_CERT_AREAS,
  MOCK_CLIMATE_ANALYSIS,
  MOCK_ELEMENT_DAYS,
  MOCK_MODIFICATION_DETAILS,
  MOCK_MODIFICATION_STATS,
  MOCK_PREDICTIONS,
  MOCK_WARNINGS,
  MOCK_CERTIFICATIONS,
  SANMING_REGIONS
} from './constants';

// --- Types ---
type TabType = 'cert' | 'stats' | 'modification' | 'predict' | 'warning';

// --- Shared Components ---

const Header = ({ title, onBack }: { title: string, onBack?: () => void }) => (
  <div className="sticky top-0 tobacco-gradient text-white h-14 flex items-center px-4 font-bold z-40 shadow-md">
    {onBack && (
      <button onClick={onBack} className="mr-2 p-1 btn-active">
        <ArrowLeft size={22} />
      </button>
    )}
    <div className="flex-1 text-center truncate pr-8 text-base tracking-wider">{title}</div>
  </div>
);

// Custom Select Component to replace native select
const CustomSelect = ({ 
  value, 
  options, 
  onChange, 
  className = "", 
  placeholder = "请选择",
  variant = "default",
  icon: Icon,
  textClassName = ""
}: { 
  value: string, 
  options: { value: string, label: string }[], 
  onChange: (val: string) => void, 
  className?: string,
  placeholder?: string,
  variant?: "default" | "ghost" | "border",
  icon?: any,
  textClassName?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const variantStyles = {
    default: "bg-bg-gray border-none",
    ghost: "bg-transparent border-none",
    border: "bg-white border border-border-gray"
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex items-center justify-between px-2 rounded-lg text-[10px] font-medium transition-all active:scale-[0.98] ${variantStyles[variant]}`}
      >
        <div className="flex items-center truncate">
          {Icon && <Icon size={14} className="mr-2 text-tobacco-green shrink-0" />}
          <span className={`truncate ${textClassName} ${!selectedOption ? 'text-text-sub' : (textClassName ? '' : 'text-text-main')}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown size={10} className={`ml-1 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${textClassName || 'text-text-sub'}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 mt-1 bg-white border border-border-gray rounded-lg shadow-xl z-[100] max-h-48 overflow-y-auto no-scrollbar min-w-full w-max max-w-[200px]"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                className={`w-full text-left px-3 py-2.5 text-[10px] border-b border-gray-50 last:border-none transition-colors active:bg-bg-gray whitespace-nowrap ${
                  value === opt.value ? 'text-weather-blue font-bold bg-blue-50/30' : 'text-text-main'
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomDatePicker = ({ 
  value, 
  onChange, 
  className = "", 
  variant = "default",
  icon: Icon = Calendar,
  label,
  type = "date"
}: { 
  value: string, 
  onChange: (val: string) => void, 
  className?: string,
  variant?: "default" | "ghost" | "border",
  icon?: any,
  label?: string,
  type?: string
}) => {
  const variantStyles = {
    default: "bg-bg-gray/50 border-none",
    ghost: "bg-transparent border-none",
    border: "bg-white border border-border-gray"
  };

  return (
    <div className={`flex items-center gap-2 px-2 rounded-lg transition-all ${variantStyles[variant]} ${className}`}>
      {Icon && <Icon size={12} className="text-tobacco-green shrink-0" />}
      {label && <span className="text-[10px] text-text-sub shrink-0">{label}</span>}
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[10px] font-bold text-text-main focus:outline-none flex-1 h-full py-1.5"
      />
    </div>
  );
};

const TabBar = ({ activeTab, setActiveTab }: { activeTab: TabType, setActiveTab: (t: TabType) => void }) => {
  const tabs: { id: TabType, label: string, icon: any }[] = [
    { id: 'stats', label: '要素统计', icon: BarChart3 },
    { id: 'warning', label: '气象预警', icon: Bell },
    { id: 'modification', label: '人影统计', icon: Plane },
    { id: 'predict', label: '气候预测', icon: FileText },
    { id: 'cert', label: '品质认证', icon: CheckCircle2 },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-gray flex justify-around items-center h-16 safe-area-bottom z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-all ${
            activeTab === tab.id ? 'text-tobacco-green scale-105' : 'text-text-sub'
          }`}
        >
          <tab.icon size={22} className={activeTab === tab.id ? 'stroke-[2.5px]' : ''} />
          <span className={`text-[10px] mt-1 font-medium ${activeTab === tab.id ? 'font-bold' : ''}`}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Custom Cascader Select Component for Region Selection
const CascaderSelect = ({ 
  county, 
  town, 
  onSelect, 
  className = "",
  placeholder = "选择地区"
}: { 
  county: string, 
  town: string, 
  onSelect: (county: string, town: string) => void,
  className?: string,
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCounty, setActiveCounty] = useState(county);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) setActiveCounty(county);
  }, [isOpen, county]);

  const selectedCountyData = SANMING_REGIONS.find(r => r.county === activeCounty);
  const towns = selectedCountyData?.towns || [];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between px-3 bg-white border border-border-gray rounded-lg text-[11px] font-medium transition-all active:scale-[0.98] shadow-sm"
      >
        <div className="flex items-center truncate">
          <MapPin size={14} className="mr-2 text-tobacco-green shrink-0" />
          <span className="truncate text-text-main">
            {county === '全部' ? '全部县区' : (town === '全部' ? county : `${county} / ${town}`)}
          </span>
        </div>
        <ChevronDown size={12} className={`ml-1 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-text-sub`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 mt-1 bg-white border border-border-gray rounded-xl shadow-2xl z-[100] flex h-64 w-[280px] overflow-hidden"
          >
            {/* County Column */}
            <div className="w-1/2 border-r border-gray-100 overflow-y-auto no-scrollbar bg-gray-50/50">
              <button
                className={`w-full text-left px-3 py-3 text-[10px] border-b border-gray-100 transition-colors ${
                  activeCounty === '全部' ? 'text-weather-blue font-bold bg-white' : 'text-text-main'
                }`}
                onClick={() => {
                  onSelect('全部', '全部');
                  setIsOpen(false);
                }}
              >
                全部县区
              </button>
              {SANMING_REGIONS.map((r) => (
                <button
                  key={r.county}
                  className={`w-full text-left px-3 py-3 text-[10px] border-b border-gray-100 transition-colors ${
                    activeCounty === r.county ? 'text-weather-blue font-bold bg-white' : 'text-text-main'
                  }`}
                  onClick={() => setActiveCounty(r.county)}
                >
                  {r.county}
                </button>
              ))}
            </div>
            
            {/* Town Column */}
            <div className="w-1/2 overflow-y-auto no-scrollbar bg-white">
              {activeCounty !== '全部' ? (
                <>
                  <button
                    className={`w-full text-left px-3 py-3 text-[10px] border-b border-gray-100 transition-colors ${
                      town === '全部' && county === activeCounty ? 'text-weather-blue font-bold bg-blue-50/30' : 'text-text-main'
                    }`}
                    onClick={() => {
                      onSelect(activeCounty, '全部');
                      setIsOpen(false);
                    }}
                  >
                    全部乡镇
                  </button>
                  {towns.map((t) => (
                    <button
                      key={t}
                      className={`w-full text-left px-3 py-3 text-[10px] border-b border-gray-100 transition-colors ${
                        town === t && county === activeCounty ? 'text-weather-blue font-bold bg-blue-50/30' : 'text-text-main'
                      }`}
                      onClick={() => {
                        onSelect(activeCounty, t);
                        setIsOpen(false);
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-[10px] text-text-sub p-4 text-center">
                  请先选择县区
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RegionSelector = ({ 
  selectedCounty = '全部', 
  setSelectedCounty, 
  selectedTown = '全部', 
  setSelectedTown,
  onRegionChange,
  showTown = true
}: { 
  selectedCounty?: string, 
  setSelectedCounty?: (c: string) => void, 
  selectedTown?: string, 
  setSelectedTown?: (t: string) => void,
  onRegionChange?: (region: { county: string, town: string }) => void,
  showTown?: boolean
}) => {
  const handleSelect = (county: string, town: string) => {
    if (setSelectedCounty) setSelectedCounty(county);
    if (setSelectedTown) setSelectedTown(town);
    if (onRegionChange) onRegionChange({ county, town });
  };

  return (
    <div className="bg-white p-3 border-b border-border-gray sticky top-14 z-30 shadow-sm">
      <CascaderSelect 
        county={selectedCounty}
        town={selectedTown}
        onSelect={handleSelect}
        className="w-full h-10"
      />
    </div>
  );
};

// --- Pages ---

// 1. 气候品质认证
const CertPage = () => {
  const [selectedArea, setSelectedArea] = useState<typeof MOCK_CERT_AREAS[0] | null>(null);
  const [region, setRegion] = useState({ county: '全部', town: '全部' });

  const filteredAreas = useMemo(() => {
    return MOCK_CERT_AREAS.filter(area => {
      const matchesCounty = region.county === '全部' || area.location.includes(region.county);
      const matchesTown = region.town === '全部' || area.location.includes(region.town);
      return matchesCounty && matchesTown;
    });
  }, [region]);

  if (selectedArea) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pb-20">
        <Header title="产区详情" onBack={() => setSelectedArea(null)} />
        <img src={selectedArea.image} alt={selectedArea.name} className="w-full h-48 object-cover" />
        <div className="p-4 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-text-main">{selectedArea.name}</h2>
            <div className="flex items-center text-text-sub text-xs mt-1">
              <MapPin size={12} className="mr-1" /> {selectedArea.location}
              <span className="mx-2">|</span>
              <Calendar size={12} className="mr-1" /> {selectedArea.date}
            </div>
          </div>
          
          <div className="bg-bg-gray p-3 rounded-lg">
            <h3 className="text-sm font-bold mb-1">产区介绍</h3>
            <p className="text-xs text-text-main leading-relaxed">{selectedArea.desc}</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold">气候品质指标</h3>
              <span className="text-[9px] text-text-sub">更新时间: 2026-03-25 03:54</span>
            </div>
            <div className="border border-border-gray rounded-lg overflow-hidden">
              <div className="table-container">
                <table className="w-full text-xs text-left table-fixed-header">
                  <thead>
                    <tr className="bg-bg-gray text-text-sub font-medium">
                      <th className="p-2">指标名称</th>
                      <th className="p-2">检测值</th>
                      <th className="p-2">标准范围</th>
                      <th className="p-2">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-gray">
                    {selectedArea.indicators.map((ind, i) => (
                      <tr key={i} className="bg-white">
                        <td className="p-2">{ind.name}</td>
                        <td className="p-2">{ind.value}</td>
                        <td className="p-2">{ind.range}</td>
                        <td className="p-2 text-green-600 font-bold">{ind.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h3 className="text-sm font-bold text-weather-blue mb-3 flex items-center">
              <Cloud size={16} className="mr-1" /> 产区天气实况
            </h3>
            <div className="grid grid-cols-5 gap-y-4 gap-x-2 text-center">
              <div className="flex flex-col items-center">
                <Sun size={18} className="text-orange-500 mb-1" />
                <div className="text-[9px] text-text-sub">天气</div>
                <div className="text-[11px] font-bold">晴</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">温度</div>
                <div className="text-[11px] font-bold">22℃</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">体感</div>
                <div className="text-[11px] font-bold">24℃</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">湿度</div>
                <div className="text-[11px] font-bold">65%</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">雨量</div>
                <div className="text-[11px] font-bold">0.0mm</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">风向</div>
                <div className="text-[11px] font-bold">东南风</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">风速</div>
                <div className="text-[11px] font-bold">2.4m/s</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">气压</div>
                <div className="text-[11px] font-bold">1012hPa</div>
              </div>
              <div>
                <div className="text-[9px] text-text-sub">能见度</div>
                <div className="text-[11px] font-bold">15km</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-[9px] text-text-sub">风力</div>
                <div className="text-[11px] font-bold">2级</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center">
              <Award size={16} className="mr-1 text-tobacco-gold" /> 气候品质认证证书
            </h3>
            <div className="bg-white border-4 border-double border-tobacco-gold/30 p-4 rounded-lg shadow-inner relative">
              <div className="absolute top-2 right-2 opacity-10">
                <Award size={60} className="text-tobacco-gold" />
              </div>
              <div className="text-center border border-tobacco-gold/20 p-4">
                <h4 className="text-lg font-serif font-bold text-tobacco-green mb-4">气候品质认证证书</h4>
                <div className="space-y-3 text-[10px] text-text-main text-left">
                  <p>产区名称：<span className="font-bold border-b border-gray-300 px-2">{selectedArea.name}</span></p>
                  <p>认证等级：<span className="font-bold border-b border-gray-300 px-2 text-tobacco-gold">{selectedArea.tag}</span></p>
                  <p>认证日期：<span className="font-bold border-b border-gray-300 px-2">{selectedArea.date}</span></p>
                  <p className="leading-relaxed mt-4">
                    经三明市气象局综合评估，该产区在认证期间气候条件优越，符合气候品质认证标准。
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="text-center">
                    <div className="w-16 h-16 border-2 border-red-500/30 rounded-full flex items-center justify-center text-[8px] text-red-500/50 font-bold rotate-12 mb-1">
                      三明市气象局
                    </div>
                    <div className="text-[8px] text-text-sub">2026年03月</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="pb-20">
      <Header title="气候品质认证" />
      
      <RegionSelector onRegionChange={setRegion} />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-tobacco-green flex items-center">
            <Award size={20} className="mr-2 text-tobacco-gold" />
            认证产区列表
          </h2>
          <span className="text-xs text-gray-400">共 {filteredAreas.length} 个产区</span>
        </div>

        {filteredAreas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredAreas.map(area => (
              <motion.div 
                key={area.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedArea(area)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex"
              >
                <div className="w-32 h-32 flex-shrink-0">
                  <img 
                    src={area.image} 
                    alt={area.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-tobacco-green text-sm">{area.name}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 bg-tobacco-gold/10 text-tobacco-gold rounded border border-tobacco-gold/20 shrink-0 ml-2">
                        {area.tag}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 flex items-center mt-1">
                      <MapPin size={10} className="mr-1" />
                      {area.location}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-50">
                    <div className="text-[10px] text-gray-400">
                      认证日期: <span className="text-tobacco-green font-medium">{area.date}</span>
                    </div>
                    <div className="text-tobacco-gold text-[10px] font-bold flex items-center">
                      查看详情 <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-400">未找到相关产区</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Indicator Card for Element Days
const IndicatorCard: React.FC<{ item: any, selectedRegion: string, startDate: string, endDate: string }> = ({ item, selectedRegion, startDate, endDate }) => {
  const [threshold, setThreshold] = useState(item.threshold.toString());
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [displayValue, setDisplayValue] = useState(item.value);
  const [displayName, setDisplayName] = useState(item.name);

  // Update name and value when threshold or dates change
  useEffect(() => {
    // Dynamically update name by replacing the threshold number
    const newName = item.name.replace(/\d+(\.\d+)?/, threshold);
    setDisplayName(newName);

    // Simulate value change based on threshold and date range
    // This is a mock calculation to show the UI is responsive
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    // Deterministic mock value
    const baseVal = parseInt(threshold) || 0;
    const mockVal = Math.max(0, Math.floor((daysDiff * (baseVal % 10 + 5)) / 20));
    setDisplayValue(mockVal.toString());
  }, [threshold, startDate, endDate, item.name]);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 600);
  };

  return (
    <div className="bg-white border border-border-gray rounded-xl p-4 space-y-4 relative overflow-hidden">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute top-2 right-2 bg-green-500 text-white text-[8px] px-2 py-0.5 rounded-full z-10 shadow-sm"
          >
            更新成功
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-text-main">{displayName}</h4>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-sub bg-bg-gray px-1.5 py-0.5 rounded">{startDate} 至 {endDate}</span>
            <span className="text-[10px] text-text-sub">{selectedRegion}站</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-weather-blue">{displayValue}<span className="text-[10px] ml-0.5">天</span></div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-bg-gray/50 p-2 rounded-lg">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-[10px] text-text-sub whitespace-nowrap">阈值设置</span>
          <div className="flex-1 flex items-center gap-1">
            <span className="text-xs font-medium text-text-main">{item.op}</span>
            <input 
              type="number" 
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-12 h-6 bg-white border border-border-gray rounded px-1 text-[10px] focus:outline-none focus:border-weather-blue"
            />
            <span className="text-[10px] text-text-sub font-bold">{item.thresholdUnit}</span>
          </div>
        </div>
        <button 
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`px-3 py-1 text-white text-[10px] font-bold rounded transition-all ${isUpdating ? 'bg-gray-400' : 'bg-weather-blue'}`}
        >
          {isUpdating ? '更新中...' : '更新'}
        </button>
      </div>
    </div>
  );
};

// 2. 气象要素统计
const StatsPage = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'days'>('analysis');
  const [elementTab, setElementTab] = useState<'temp' | 'precip' | 'sunshine'>('temp');
  const [periodTab, setPeriodTab] = useState<'day' | 'tenDay' | 'month' | 'quarter' | 'year'>('day');
  const [isLoading, setIsLoading] = useState(false);
  
  // Region Selection (County & Town)
  const [selectedCounty, setSelectedCounty] = useState(SANMING_REGIONS[0].county);
  const [selectedTown, setSelectedTown] = useState('全部');
  
  // Date selection states
  const [selectedDate, setSelectedDate] = useState('2026-03-22');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedTenDay, setSelectedTenDay] = useState('中旬');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2026-03-22');

  const towns = useMemo(() => {
    return SANMING_REGIONS.find(r => r.county === selectedCounty)?.towns || [];
  }, [selectedCounty]);

  // Trigger loading on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab, elementTab, periodTab, selectedCounty, selectedTown, selectedDate, selectedMonth, selectedYear, selectedTenDay, selectedQuarter]);

  const elementLabels = {
    temp: '气温',
    precip: '降水',
    sunshine: '日照'
  };

  const periodLabels = {
    day: '日统计',
    tenDay: '旬统计',
    month: '月统计',
    quarter: '季统计',
    year: '年统计'
  };

  // Helper to parse value for chart
  const parseVal = (val: string) => parseFloat(val.replace(/[^\d.-]/g, '')) || 0;

  const getUnit = (element: string, value: string, defaultUnit: string) => {
    if (value.includes('天') || element.includes('日数')) return '天';
    return defaultUnit;
  };

  // Comparison Chart Component (Horizontal Bar Chart for better mobile readability)
  const ComparisonChart = ({ data, unit, county, town }: { data: any[], unit: string, county: string, town: string }) => {
    const chartData = data.map(item => {
      const actual = parseVal(item.value);
      const baseVal = parseVal(item.normalValue || item.value);
      const itemUnit = getUnit(item.element, item.value, unit);
      const min = itemUnit === '天' ? Math.round(baseVal - 1.5) : baseVal - 1.5;
      const max = itemUnit === '天' ? Math.round(baseVal + 1.5) : baseVal + 1.5;
      
      let status = '正常';
      let statusColor = 'text-green-500';
      if (actual > max) {
        status = '偏高';
        statusColor = 'text-red-500';
      } else if (actual < min) {
        status = '偏低';
        statusColor = 'text-blue-500';
      }

      return {
        name: item.element,
        station: town !== '全部' ? `${town}站` : `${county}站`,
        actual,
        min,
        max,
        standardRange: [min, max],
        standardLabel: itemUnit === '天' ? `${min}~${max}` : `${min.toFixed(1)}~${max.toFixed(1)}`,
        status,
        statusColor,
        unit: itemUnit
      };
    });

    return (
      <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-sm space-y-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2 text-text-main">
              <BarChart3 size={16} className="text-weather-blue" />
              查询值与标准区间值对比
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-weather-blue" />
                <span className="text-[10px] text-text-sub">查询值</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <span className="text-[10px] text-text-sub">标准范围</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-text-sub">展示各气象要素实测值在常年标准区间内的分布情况</p>
        </div>
        
        <div className="space-y-8">
          {chartData.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-text-main">{item.name}</span>
                  <span className="text-[9px] text-text-sub">{item.station}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-[10px] font-bold ${item.statusColor}`}>{item.status}</span>
                  <span className="text-xs font-black text-weather-blue">{item.actual}<span className="text-[9px] font-normal ml-0.5">{item.unit}</span></span>
                </div>
              </div>
              
              <div className="h-10 w-full relative pt-4">
                {/* Background Track */}
                <div className="absolute top-6 left-0 w-full h-2 bg-gray-100 rounded-full" />
                
                {/* Standard Range Area */}
                <div 
                  className="absolute top-6 h-2 bg-gray-200/80 border-x border-gray-300 z-10"
                  style={{ 
                    left: `${Math.max(0, (item.min / (item.max * 1.2)) * 100)}%`, 
                    width: `${((item.max - item.min) / (item.max * 1.2)) * 100}%` 
                  }}
                />
                
                {/* Range Labels */}
                <div 
                  className="absolute top-0 text-[8px] text-text-sub font-medium transform -translate-x-1/2"
                  style={{ left: `${Math.max(0, (item.min / (item.max * 1.2)) * 100)}%` }}
                >
                  {item.min.toFixed(1)}
                </div>
                <div 
                  className="absolute top-0 text-[8px] text-text-sub font-medium transform -translate-x-1/2"
                  style={{ left: `${Math.min(100, (item.max / (item.max * 1.2)) * 100)}%` }}
                >
                  {item.max.toFixed(1)}
                </div>

                {/* Actual Value Bar */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (item.actual / (item.max * 1.2)) * 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-6 left-0 h-2 bg-weather-blue rounded-full z-20 shadow-[0_0_8px_rgba(30,136,229,0.3)]"
                />
                
                {/* Actual Value Marker */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, left: `${Math.min(100, (item.actual / (item.max * 1.2)) * 100)}%` }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="absolute top-[21px] w-3 h-3 bg-white border-2 border-weather-blue rounded-full z-30 transform -translate-x-1/2 shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-dashed border-border-gray">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50/50 p-2 rounded-xl text-center">
              <div className="text-[8px] text-blue-600 font-bold mb-0.5">偏低</div>
              <div className="text-[10px] text-text-main font-medium">低于标准</div>
            </div>
            <div className="bg-green-50/50 p-2 rounded-xl text-center">
              <div className="text-[8px] text-green-600 font-bold mb-0.5">正常</div>
              <div className="text-[10px] text-text-main font-medium">区间范围内</div>
            </div>
            <div className="bg-red-50/50 p-2 rounded-xl text-center">
              <div className="text-[8px] text-red-600 font-bold mb-0.5">偏高</div>
              <div className="text-[10px] text-text-main font-medium">高于标准</div>
            </div>
          </div>
        </div>
        
        <p className="text-[9px] text-text-sub text-center italic">注：标准区间基于1991-2020年气候平均值计算得出</p>
      </div>
    );
  };

  const renderTimePicker = () => {
    switch (periodTab) {
      case 'day':
        return (
          <CustomDatePicker 
            value={selectedDate}
            onChange={setSelectedDate}
            variant="ghost"
            className="flex-1"
            icon={null}
          />
        );
      case 'tenDay':
        return (
          <div className="flex gap-2 flex-1">
            <CustomDatePicker 
              type="month"
              value={selectedMonth}
              onChange={setSelectedMonth}
              variant="ghost"
              className="w-24"
              icon={null}
            />
            <CustomSelect 
              value={selectedTenDay}
              options={[
                { value: '上旬', label: '上旬' },
                { value: '中旬', label: '中旬' },
                { value: '下旬', label: '下旬' }
              ]}
              onChange={setSelectedTenDay}
              variant="ghost"
              className="w-16 h-7"
              textClassName="text-text-main font-bold"
            />
          </div>
        );
      case 'month':
        return (
          <CustomDatePicker 
            type="month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            variant="ghost"
            className="flex-1"
            icon={null}
          />
        );
      case 'quarter':
        return (
          <div className="flex gap-2 flex-1">
            <CustomSelect 
              value={selectedYear}
              options={[
                { value: '2026', label: '2026年' },
                { value: '2025', label: '2025年' }
              ]}
              onChange={setSelectedYear}
              variant="ghost"
              className="w-20 h-7"
              textClassName="text-text-main font-bold"
            />
            <CustomSelect 
              value={selectedQuarter}
              options={[
                { value: 'Q1', label: '第一季度' },
                { value: 'Q2', label: '第二季度' },
                { value: 'Q3', label: '第三季度' },
                { value: 'Q4', label: '第四季度' }
              ]}
              onChange={setSelectedQuarter}
              variant="ghost"
              className="flex-1 h-7"
              textClassName="text-text-main font-bold"
            />
          </div>
        );
      case 'year':
        return (
          <CustomSelect 
            value={selectedYear}
            options={[
              { value: '2026', label: '2026年' },
              { value: '2025', label: '2025年' },
              { value: '2024', label: '2024年' }
            ]}
            onChange={setSelectedYear}
            variant="ghost"
            className="flex-1 h-7"
            textClassName="text-text-main font-bold"
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <Header title="气象要素统计" />
      
      {/* Top Controls: Region & Period Merged Row */}
      <div className="bg-white border-b border-border-gray sticky top-14 z-30 shadow-sm">
        <div className="flex justify-between px-2">
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 px-1 h-12 text-sm font-medium relative transition-colors ${activeTab === 'analysis' ? 'text-tobacco-green' : 'text-text-sub'}`}
          >
            定期气候值分析
            {activeTab === 'analysis' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-tobacco-green rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('days')}
            className={`flex-1 px-1 h-12 text-sm font-medium relative transition-colors ${activeTab === 'days' ? 'text-tobacco-green' : 'text-text-sub'}`}
          >
            不定期气候值分析
            {activeTab === 'days' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-tobacco-green rounded-full" />}
          </button>
        </div>
      </div>

      {/* Filter Bar: Element & Time Picker */}
      <div className="bg-white px-4 py-3 sticky top-[104px] z-20 border-b border-border-gray/50 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1 bg-bg-gray p-0.5 rounded-lg shrink-0">
              {(['temp', 'precip', 'sunshine'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setElementTab(tab)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                    elementTab === tab ? 'bg-white text-weather-blue shadow-sm' : 'text-text-sub'
                  }`}
                >
                  {elementLabels[tab]}
                </button>
              ))}
            </div>

            <div className="flex gap-1 shrink-0 ml-auto items-center">
              <CascaderSelect 
                county={selectedCounty}
                town={selectedTown}
                onSelect={(c, t) => {
                  setSelectedCounty(c);
                  setSelectedTown(t);
                }}
                className="w-32 h-7"
              />

              {activeTab === 'analysis' && (
                <CustomSelect 
                  value={periodTab}
                  options={Object.entries(periodLabels).map(([k, v]) => ({ value: k, label: v }))}
                  onChange={(val) => setPeriodTab(val as any)}
                  className="w-20 h-7 ml-1"
                  textClassName="text-weather-blue font-bold"
                />
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Time Picker Row */}
        <div className="flex items-center gap-2">
          {activeTab === 'analysis' ? (
            <div className="flex-1 flex items-center gap-2 bg-bg-gray/30 p-1 rounded-lg min-h-[32px]">
              <Calendar size={12} className="text-weather-blue shrink-0 ml-1" />
              <span className="text-[10px] text-text-sub shrink-0">统计时段：</span>
              {renderTimePicker()}
            </div>
          ) : (
            <div className="flex-1 flex items-center gap-2 bg-bg-gray/30 p-1 rounded-lg overflow-x-auto no-scrollbar">
              <Search size={12} className="text-weather-blue shrink-0 ml-1" />
              <span className="text-[10px] text-text-sub shrink-0">查询时段：</span>
              <div className="flex items-center gap-1 shrink-0">
                <CustomDatePicker 
                  value={startDate}
                  onChange={setStartDate}
                  variant="ghost"
                  className="w-24"
                  icon={null}
                />
                <span className="text-[10px] text-text-sub">至</span>
                <CustomDatePicker 
                  value={endDate}
                  onChange={setEndDate}
                  variant="ghost"
                  className="w-24"
                  icon={null}
                />
              </div>
              <button 
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 800);
                }}
                className="ml-auto px-2 py-1 bg-weather-blue text-white text-[10px] font-bold rounded shrink-0"
              >
                查询
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-weather-blue border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] text-text-sub font-bold">数据加载中...</span>
            </div>
          </div>
        )}

        {activeTab === 'analysis' ? (
          <div className="space-y-6">
            {/* Statistics Table */}
            <div className="bg-white border border-border-gray rounded-xl overflow-hidden shadow-sm">
              <div className="bg-bg-gray px-4 py-2 border-b border-border-gray flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-main">{elementLabels[elementTab]}统计报表</span>
                  <span className="text-[10px] text-text-sub px-1.5 py-0.5 bg-white rounded border border-border-gray">
                    {selectedTown !== '全部' ? selectedTown : selectedCounty}站
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-text-sub">更新时间: 2026-03-25 03:54</span>
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-border-gray">
                    <th className="p-3 text-[10px] font-bold text-text-sub uppercase tracking-wider">统计指标</th>
                    <th className="p-3 text-[10px] font-bold text-text-sub uppercase tracking-wider text-right">查询值</th>
                    <th className="p-3 text-[10px] font-bold text-text-sub uppercase tracking-wider text-right">标准范围</th>
                    <th className="p-3 text-[10px] font-bold text-text-sub uppercase tracking-wider text-right">时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gray">
                  {MOCK_CLIMATE_ANALYSIS[elementTab][periodTab].map((row, i) => {
                    const baseVal = parseVal(row.normalValue || row.value);
                    const itemUnit = getUnit(row.element, row.value, elementTab === 'temp' ? '℃' : elementTab === 'precip' ? 'mm' : 'h');
                    const min = itemUnit === '天' ? Math.round(baseVal - 1.5) : (baseVal - 1.5).toFixed(1);
                    const max = itemUnit === '天' ? Math.round(baseVal + 1.5) : (baseVal + 1.5).toFixed(1);
                    return (
                      <tr key={i} className="hover:bg-bg-gray/30 transition-colors">
                        <td className="p-3 text-[11px] font-medium text-text-main">{row.element}</td>
                        <td className="p-3 text-[11px] font-bold text-weather-blue tabular-nums text-right">{row.value}</td>
                        <td className="p-3 text-[11px] font-bold text-text-sub tabular-nums text-right">{min}~{max}{itemUnit}</td>
                        <td className="p-3 text-[10px] text-text-sub tabular-nums text-right">{row.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Comparison Chart */}
            <ComparisonChart 
              data={MOCK_CLIMATE_ANALYSIS[elementTab][periodTab]} 
              unit={elementTab === 'temp' ? '℃' : elementTab === 'precip' ? 'mm' : 'h'} 
              county={selectedCounty}
              town={selectedTown}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ELEMENT_DAYS[elementTab].map((item) => (
              <IndicatorCard 
                key={item.id} 
                item={item} 
                selectedRegion={selectedTown !== '全部' ? selectedTown : selectedCounty} 
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// 3. 人影作业统计
const ModificationPage = () => {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-03-25');
  const [activeView, setActiveView] = useState<'table' | 'chart'>('table');

  const stats = MOCK_MODIFICATION_STATS;
  
  const totals = useMemo(() => {
    return stats.reduce((acc, curr) => ({
      opTotal: acc.opTotal + curr.opTotal,
      ammoTotal: acc.ammoTotal + curr.ammoTotal,
      smoke: acc.smoke + curr.smoke
    }), { opTotal: 0, ammoTotal: 0, smoke: 0 });
  }, [stats]);

  const chartData = useMemo(() => {
    return stats.map(s => ({
      name: s.county.replace('区', '').replace('县', '').replace('市', ''),
      '作业次数': s.opTotal,
      '用弹量': s.ammoTotal,
      '烟条': s.smoke
    }));
  }, [stats]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <Header title="人影作业统计" />
      
      <div className="p-4 space-y-4">
        {/* Date Query Section */}
        <div className="bg-white rounded-2xl p-4 card-shadow border border-border-gray/50">
          <div className="grid grid-cols-2 gap-3">
            <CustomDatePicker 
              label="起始时间"
              value={startDate}
              onChange={setStartDate}
              className="h-10"
            />
            <CustomDatePicker 
              label="结束时间"
              value={endDate}
              onChange={setEndDate}
              className="h-10"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 text-center">
            <div className="text-[9px] text-text-sub mb-1 font-bold">作业总次数</div>
            <div className="text-lg font-black text-weather-blue">{totals.opTotal}</div>
            <div className="text-[8px] text-text-sub mt-0.5">单位: 次</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100 text-center">
            <div className="text-[9px] text-text-sub mb-1 font-bold">总用弹量</div>
            <div className="text-lg font-black text-orange-600">{totals.ammoTotal}</div>
            <div className="text-[8px] text-text-sub mt-0.5">单位: 枚</div>
          </div>
          <div className="bg-green-50 p-3 rounded-2xl border border-green-100 text-center">
            <div className="text-[9px] text-text-sub mb-1 font-bold">烟条总量</div>
            <div className="text-lg font-black text-tobacco-green">{totals.smoke}</div>
            <div className="text-[8px] text-text-sub mt-0.5">单位: 根</div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex bg-bg-gray/50 p-1 rounded-xl border border-border-gray/30">
          <button 
            onClick={() => setActiveView('table')}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${activeView === 'table' ? 'bg-white text-tobacco-green shadow-sm' : 'text-text-sub'}`}
          >
            表格视图
          </button>
          <button 
            onClick={() => setActiveView('chart')}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${activeView === 'chart' ? 'bg-white text-tobacco-green shadow-sm' : 'text-text-sub'}`}
          >
            图表分析
          </button>
        </div>

        {activeView === 'table' ? (
          <div className="bg-white rounded-2xl border border-border-gray overflow-hidden card-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-bg-gray/50 border-b border-border-gray">
                    <th rowSpan={2} className="p-2 text-[10px] font-bold text-text-sub border-r border-border-gray text-center">市县</th>
                    <th colSpan={4} className="p-2 text-[10px] font-bold text-text-sub border-b border-r border-border-gray text-center">作业次数(次)</th>
                    <th colSpan={4} className="p-2 text-[10px] font-bold text-text-sub border-b border-r border-border-gray text-center">用弹量(枚)</th>
                    <th rowSpan={2} className="p-2 text-[10px] font-bold text-text-sub text-center">烟条(根)</th>
                  </tr>
                  <tr className="bg-bg-gray/30 border-b border-border-gray">
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">总计</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">增雨</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">防雹</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">其它</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">总计</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">增雨</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">防雹</th>
                    <th className="p-1 text-[9px] font-bold text-text-sub border-r border-border-gray text-center">其它</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gray">
                  {stats.map((row, i) => (
                    <tr key={i} className="hover:bg-bg-gray/20">
                      <td className="p-2 text-[10px] font-medium text-text-main border-r border-border-gray text-center">{row.county}</td>
                      <td className="p-2 text-[10px] font-bold text-text-main border-r border-border-gray text-center">{row.opTotal}</td>
                      <td className="p-2 text-[10px] text-text-sub border-r border-border-gray text-center">{row.opRain}</td>
                      <td className="p-2 text-[10px] text-text-sub border-r border-border-gray text-center">{row.opHail || ''}</td>
                      <td className="p-2 text-[10px] text-text-sub border-r border-border-gray text-center">{row.opOther || ''}</td>
                      <td className="p-2 text-[10px] font-bold text-text-main border-r border-border-gray text-center">{row.ammoTotal}</td>
                      <td className="p-2 text-[10px] text-text-sub border-r border-border-gray text-center">{row.ammoRain}</td>
                      <td className="p-2 text-[10px] text-text-sub border-r border-border-gray text-center">{row.ammoHail || ''}</td>
                      <td className="p-2 text-[10px] text-text-sub border-r border-border-gray text-center">{row.ammoOther || ''}</td>
                      <td className="p-2 text-[10px] font-bold text-tobacco-green text-center">{row.smoke}</td>
                    </tr>
                  ))}
                  <tr className="bg-bg-gray/50 font-bold">
                    <td className="p-2 text-[10px] text-text-main border-r border-border-gray text-center">合计</td>
                    <td colSpan={4} className="p-2 text-[10px] text-weather-blue border-r border-border-gray text-center">{totals.opTotal}</td>
                    <td colSpan={4} className="p-2 text-[10px] text-orange-600 border-r border-border-gray text-center">{totals.ammoTotal}</td>
                    <td className="p-2 text-[10px] text-tobacco-green text-center">{totals.smoke}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-border-gray card-shadow space-y-6">
            <div className="h-[240px] w-full">
              <h4 className="text-[10px] font-bold text-text-sub mb-2">各地区作业量对比</h4>
              <ResponsiveContainer width="100%" height="100%">
                <ChartBar data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                  <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="作业次数" fill="#1E88E5" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="用弹量" fill="#FB8C00" radius={[4, 4, 0, 0]} barSize={12} />
                </ChartBar>
              </ResponsiveContainer>
            </div>
            
            <div className="h-[240px] w-full">
              <h4 className="text-[10px] font-bold text-text-sub mb-2">烟条发放分布</h4>
              <ResponsiveContainer width="100%" height="100%">
                <ChartArea data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                  <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="烟条" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.1} />
                </ChartArea>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// 4. 气候预测产品
const PredictPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('season');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [filters, setFilters] = useState({
    year: '2026年',
    month: '全部',
    season: '全部'
  });

  const categories = [
    { id: 'halfMonth', label: '周预报' },
    { id: 'month', label: '月预报' },
    { id: 'season', label: '季节预报' },
    { id: 'year', label: '年度预报' },
  ];

  const filteredPredictions = MOCK_PREDICTIONS.filter(p => {
    if (p.category !== activeCategory) return false;
    if (activeCategory === 'halfMonth' || activeCategory === 'month') {
      return filters.month === '全部' || p.month === filters.month;
    }
    if (activeCategory === 'season') {
      return filters.season === '全部' || p.season === filters.season;
    }
    if (activeCategory === 'year') {
      return filters.year === '全部' || p.year === filters.year;
    }
    return true;
  });

  if (selectedReport) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pb-20 bg-white min-h-screen">
        <div className="h-12 bg-white border-b border-border-gray flex items-center px-4 sticky top-0 z-50">
          <button onClick={() => setSelectedReport(null)} className="p-1 -ml-1">
            <ChevronLeft size={20} className="text-text-main" />
          </button>
          <span className="ml-2 font-bold text-sm truncate">{selectedReport.title}</span>
        </div>
        
        <div className="p-4">
          <div className="text-center mb-6">
            <h2 className="text-base font-bold text-text-main leading-tight mb-1">{selectedReport.title}</h2>
            {selectedReport.subtitle && <div className="text-xs text-text-sub mb-2">{selectedReport.subtitle}</div>}
            <div className="flex justify-between items-center text-[10px] text-text-sub border-y border-border-gray/50 py-2 mt-4">
              <span>三明市气象局</span>
              <span>签发：{selectedReport.issuer || 'xxx'}</span>
            </div>
            <div className="text-[10px] text-text-sub mt-2">发布时间：{selectedReport.publishTime}</div>
          </div>

          <div className="space-y-4">
            {selectedReport.content.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="text-xs text-text-main leading-relaxed whitespace-pre-wrap">
                {para}
              </p>
            ))}
          </div>

          {selectedReport.table && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold flex items-center">
                  <div className="w-1 h-3 bg-weather-blue mr-2 rounded-full" />
                  附表 三明市2026年春季各县（市、区）气温、降水预测表
                </h3>
                <span className="text-[9px] text-text-sub">更新时间: 2026-03-25 03:54</span>
              </div>
              <div className="border border-border-gray rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px] text-left border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-bg-gray text-text-sub font-medium border-b border-border-gray">
                        <th className="p-2 border-r border-border-gray" rowSpan={2}>地市</th>
                        <th className="p-2 border-r border-border-gray" rowSpan={2}>县区</th>
                        <th className="p-2 text-center border-b border-r border-border-gray" colSpan={3}>气温（单位：℃）</th>
                        <th className="p-2 text-center border-b border-border-gray" colSpan={3}>降水（单位：毫米）</th>
                      </tr>
                      <tr className="bg-bg-gray text-text-sub font-medium border-b border-border-gray">
                        <th className="p-1 text-center border-r border-border-gray">预测值</th>
                        <th className="p-1 text-center border-r border-border-gray">常年值</th>
                        <th className="p-1 text-center border-r border-border-gray">距平</th>
                        <th className="p-1 text-center border-r border-border-gray">预测值</th>
                        <th className="p-1 text-center border-r border-border-gray">常年值</th>
                        <th className="p-1 text-center">距平</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-gray">
                      {selectedReport.table.map((row: any, i: number) => (
                        <tr key={i} className="bg-white">
                          {i === 0 && <td className="p-2 border-r border-border-gray font-medium text-center" rowSpan={selectedReport.table.length}>三明</td>}
                          <td className="p-2 border-r border-border-gray font-medium">{row.county}</td>
                          <td className="p-1 text-center border-r border-border-gray">{row.temp}</td>
                          <td className="p-1 text-center border-r border-border-gray">{row.tempNormal}</td>
                          <td className="p-1 text-center border-r border-border-gray text-orange-600">{row.tempDiff}</td>
                          <td className="p-1 text-center border-r border-border-gray">{row.rain}</td>
                          <td className="p-1 text-center border-r border-border-gray">{row.rainNormal}</td>
                          <td className="p-1 text-center text-blue-600">{row.rainDiff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-[9px] text-text-sub mt-2 leading-relaxed">
                注：略高：平均气温偏高0.1～1.0℃；偏少：降水距平百分率为-50～-20%。
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <Header title="气候预测产品" />
      <div className="flex bg-white border-b border-border-gray sticky top-12 z-30 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setFilters({ year: '2026年', month: '全部', season: '全部' });
            }}
            className={`flex-1 min-w-[80px] h-12 text-sm font-medium relative transition-colors ${activeCategory === cat.id ? 'text-weather-blue' : 'text-text-sub'}`}
          >
            {cat.label}
            {activeCategory === cat.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-weather-blue rounded-full" />}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <CustomSelect 
            value={filters.year}
            options={[
              { value: '全部', label: '全部年份' },
              { value: '2026年', label: '2026年' },
              { value: '2025年', label: '2025年' }
            ]}
            onChange={(val) => setFilters({...filters, year: val})}
            variant="border"
            className="flex-1 h-10"
          />
          
          {(activeCategory === 'halfMonth' || activeCategory === 'month') && (
            <CustomSelect 
              value={filters.month}
              options={[
                { value: '全部', label: '全部月份' },
                ...['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map(m => ({ value: m, label: m }))
              ]}
              onChange={(val) => setFilters({...filters, month: val})}
              variant="border"
              className="flex-1 h-10"
            />
          )}

          {activeCategory === 'season' && (
            <CustomSelect 
              value={filters.season}
              options={[
                { value: '全部', label: '全部季节' },
                { value: '春季', label: '春季' },
                { value: '夏季', label: '夏季' },
                { value: '秋季', label: '秋季' },
                { value: '冬季', label: '冬季' }
              ]}
              onChange={(val) => setFilters({...filters, season: val})}
              variant="border"
              className="flex-1 h-10"
            />
          )}
        </div>

        <div className="space-y-3">
          {filteredPredictions.length > 0 ? (
            filteredPredictions.map(predict => (
              <div 
                key={predict.id} 
                onClick={() => setSelectedReport(predict)}
                className="bg-white border border-border-gray rounded-xl p-4 shadow-sm flex justify-between items-center active:bg-bg-gray transition-colors cursor-pointer"
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-sm mb-1 leading-tight text-text-main line-clamp-1">{predict.title}</h3>
                  <div className="text-[10px] text-text-sub">发布时间：{predict.publishTime}</div>
                </div>
                <ChevronRight size={16} className="text-border-gray" />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-text-sub text-xs">暂无相关预测报告</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// 5. 气象预警产品
const WarningPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('regular');
  const [showPopup, setShowPopup] = useState(false);
  const [region, setRegion] = useState({ county: '宁化县', town: '全部' });

  const categories = [
    { id: 'regular', label: '常规预警' },
    { id: 'important', label: '重要天气预警' },
    { id: 'shortTerm', label: '短时强天气' },
    { id: 'direct', label: '短临直通信息' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredWarnings = useMemo(() => {
    return MOCK_WARNINGS.filter(w => {
      const matchesCategory = w.category === activeCategory;
      const matchesCounty = region.county === '全部' || w.county === region.county || w.county === '全部';
      const matchesTown = region.town === '全部' || w.town === region.town || w.town === '全部';
      return matchesCategory && matchesCounty && matchesTown;
    });
  }, [activeCategory, region]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <Header title="气象预警产品" />
      
      <div className="bg-white border-b border-border-gray sticky top-14 z-30">
        <div className="flex justify-between px-2">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-1 px-1 h-12 text-[11px] sm:text-xs font-medium relative transition-colors ${activeCategory === cat.id ? 'text-tobacco-green' : 'text-text-sub'}`}
            >
              {cat.label}
              {activeCategory === cat.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-tobacco-green rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <RegionSelector 
        selectedCounty={region.county}
        selectedTown={region.town}
        onRegionChange={setRegion}
      />

      <div className="p-4 space-y-4">
        {activeCategory === 'important' && filteredWarnings.length > 0 && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
            <div className="text-xs font-bold text-red-600 mb-1 flex items-center">
              <AlertTriangle size={16} className="mr-1.5" /> 最新重要天气预警
            </div>
            <p className="text-xs text-red-800 leading-relaxed font-medium">{filteredWarnings[0].content}</p>
          </div>
        )}

        <div className="space-y-3">
          {filteredWarnings.length > 0 ? (
            filteredWarnings.map(warning => (
              <div key={warning.id} className="bg-white rounded-2xl p-4 card-shadow border border-border-gray/50 btn-active">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold text-white ${
                    warning.level === '橙色' ? 'bg-orange-500' : 
                    warning.level === '黄色' ? 'bg-yellow-500' :
                    warning.level === '蓝色' ? 'bg-blue-500' :
                    warning.level === '重要' ? 'bg-red-600' :
                    warning.level === '强天气' ? 'bg-purple-600' :
                    'bg-tobacco-green'
                  }`}>
                    {warning.type}
                  </span>
                  <span className="text-[10px] text-text-sub font-medium">{warning.time}</span>
                </div>
                <div className="text-sm font-bold text-text-main mb-1">{warning.area}</div>
                <p className="text-xs text-text-sub leading-relaxed line-clamp-2">{warning.content}</p>
                {warning.advice && (
                  <div className="mt-3 p-3 bg-bg-gray rounded-xl text-[10px] text-text-main border border-border-gray/30">
                    <span className="font-bold text-tobacco-green">防御指南：</span>{warning.advice}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full card-shadow mb-3">
                <Bell size={24} className="text-text-sub opacity-20" />
              </div>
              <p className="text-xs text-text-sub">暂无相关预警信息</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl w-full max-w-[320px] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-orange-500 mb-4">
                  <AlertTriangle size={24} className="mr-2" />
                  <h3 className="text-lg font-bold">【暴雨橙色预警】</h3>
                </div>
                <p className="text-sm text-text-main leading-relaxed">预计未来3小时内宁化县部分乡镇降雨量将达50毫米以上。请注意防范强降水可能引发的次生灾害。</p>
              </div>
              <div className="flex border-t border-border-gray">
                <button onClick={() => setShowPopup(false)} className="flex-1 h-12 text-sm text-text-sub font-medium border-r border-border-gray btn-active">忽略</button>
                <button onClick={() => setShowPopup(false)} className="flex-1 h-12 text-sm text-white bg-weather-blue font-bold btn-active">确认</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('stats');

  const renderPage = () => {
    switch (activeTab) {
      case 'cert': return <CertPage />;
      case 'stats': return <StatsPage />;
      case 'modification': return <ModificationPage />;
      case 'predict': return <PredictPage />;
      case 'warning': return <WarningPage />;
      default: return <CertPage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-gray flex justify-center">
      <div className="w-full max-w-[414px] min-h-screen bg-white relative overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
