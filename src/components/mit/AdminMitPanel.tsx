import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Users, FileText, Upload, Plus, BarChart3, TrendingUp, Filter, AlertTriangle, BookOpen, Brain, Zap } from 'lucide-react';
import { DiagnosticTestManager } from './admin/DiagnosticTestManager';
import { AnalyticsDashboard } from "./admin/AnalyticsDashboard";


export const AdminMitPanel = () => {
    const [activeTab, setActiveTab] = useState<'tests' | 'analytics'>('analytics');

    const tabs = [
        { id: 'analytics', name: 'Öğrenci Analizleri & Raporlar', icon: BarChart3 },
        { id: 'tests', name: 'Seviye Tespit & Sınavlar', icon: FileText },
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <GraduationCap className="text-indigo-600" size={32} />
                        M.İ.T Yönetim Paneli
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Öğrenci gelişimini takip et, seviye tespit sınavları hazırla.</p>
                </div>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'tests' && <DiagnosticTestManager key="tests" />}
                    {activeTab === 'analytics' && <AnalyticsDashboard key="analytics" />}
                </AnimatePresence>
            </div>
        </div>
    );
};
