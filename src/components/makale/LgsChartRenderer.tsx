import React from 'react';
import { BarChart2, PieChart as PieIcon, TrendingUp, Info } from 'lucide-react';
import { LgsChartData } from '../../data/lgsMebiAnd2026Data';

interface LgsChartRendererProps {
  chart: LgsChartData;
}

export function LgsChartRenderer({ chart }: LgsChartRendererProps) {
  if (!chart || !chart.items || chart.items.length === 0) return null;

  // 1. MULTI-COLUMN SIDE-BY-SIDE CHARTS (Like PDF Page 1 Banking Question)
  if (chart.type === 'multi_column') {
    return (
      <div className="my-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
          <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 shrink-0 mt-0.5 sm:mt-0">
              <BarChart2 size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 break-words leading-tight">{chart.title}</h4>
              {chart.subtitle && <p className="text-[11px] text-slate-500 font-medium break-words leading-tight mt-0.5">{chart.subtitle}</p>}
            </div>
          </div>
          {chart.unit && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 self-start sm:self-auto">
              Birim: {chart.unit}
            </span>
          )}
        </div>

        {/* 3 side-by-side sub-charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chart.items.map((subChart, sIdx) => {
            const values = subChart.values || [];
            const maxVal = Math.max(...values.map(v => v.value), 60);

            return (
              <div key={sIdx} className="p-3.5 bg-slate-50/70 rounded-xl border border-gray-200/80 flex flex-col justify-between">
                <div className="text-center font-bold text-xs text-slate-800 mb-3 min-h-[32px] flex items-center justify-center leading-snug break-words px-1">
                  {subChart.label}
                </div>

                {/* Vertical bars container */}
                <div className="h-44 flex items-end justify-center gap-2.5 pt-4 pb-2 px-2 border-b-2 border-l-2 border-slate-300 relative bg-white/70 rounded-xs">
                  {/* Y Axis indicators */}
                  <div className="absolute left-1 top-1 text-[9px] font-semibold text-slate-400">%{maxVal}</div>
                  <div className="absolute left-1 top-1/2 text-[9px] font-semibold text-slate-400">%{Math.round(maxVal / 2)}</div>
                  <div className="absolute left-1 bottom-1 text-[9px] font-semibold text-slate-400">%0</div>

                  {values.map((v, vIdx) => {
                    const heightPercent = Math.max(12, Math.round((v.value / maxVal) * 100));
                    const defaultColor = vIdx === 0 ? '#0284C7' : vIdx === 1 ? '#EA580C' : '#CA8A04';
                    const barColor = v.color || defaultColor;

                    return (
                      <div key={vIdx} className="flex flex-col items-center flex-1 min-w-[40px] max-w-[65px] h-full justify-end group">
                        <span className="text-[11px] font-black text-slate-800 mb-1 whitespace-nowrap">
                          {v.displayValue || `%${v.value}`}
                        </span>
                        <div 
                          className="w-full rounded-t-md transition-all duration-500 shadow-2xs group-hover:brightness-95"
                          style={{ 
                            height: `${heightPercent}%`, 
                            backgroundColor: barColor 
                          }}
                        />
                        <span className="text-[10px] font-bold text-slate-700 mt-1.5 text-center break-words leading-tight px-0.5">
                          {v.seriesName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {chart.note && (
          <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-medium flex items-start gap-2">
            <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <span className="break-words leading-relaxed">{chart.note}</span>
          </div>
        )}
      </div>
    );
  }

  // 2. GROUPED BAR CHART (Multi-Metric Columns for categories)
  if (chart.type === 'grouped_bar') {
    const allValues = chart.items.flatMap(item => (item.values || []).map(v => v.value));
    const maxVal = Math.max(...allValues, 100);

    return (
      <div className="my-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
          <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 shrink-0 mt-0.5 sm:mt-0">
              <BarChart2 size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 break-words leading-tight">{chart.title}</h4>
              {chart.subtitle && <p className="text-[11px] text-slate-500 font-medium break-words leading-tight mt-0.5">{chart.subtitle}</p>}
            </div>
          </div>

          {/* Legend */}
          {chart.seriesLabels && (
            <div className="flex items-center gap-3 flex-wrap shrink-0">
              {chart.seriesLabels.map((s, sIdx) => (
                <div key={sIdx} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <span className="w-3 h-3 rounded-xs shadow-2xs shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="break-words">{s.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chart Drawing Area */}
        <div className="space-y-2">
          {/* Grouped Bars Container */}
          <div className="h-48 flex items-end justify-around gap-2 pt-6 pb-0 px-3 border-b-2 border-l-2 border-slate-300 relative bg-slate-50/50 rounded-tl-sm">
            {/* Axis indicators */}
            <div className="absolute left-1 top-2 text-[9px] font-semibold text-slate-400">
              {maxVal.toLocaleString('tr-TR')}
            </div>
            <div className="absolute left-1 top-1/2 text-[9px] font-semibold text-slate-400">
              {Math.round(maxVal / 2).toLocaleString('tr-TR')}
            </div>
            <div className="absolute left-1 bottom-1 text-[9px] font-semibold text-slate-400">
              0
            </div>

            {/* Grid line */}
            <div className="absolute left-6 right-0 top-1/2 border-b border-dashed border-slate-200 pointer-events-none" />

            {chart.items.map((item, iIdx) => {
              const values = item.values || [];

              return (
                <div key={iIdx} className="flex-1 flex flex-col items-center h-full justify-end min-w-[70px] max-w-[130px]">
                  {/* Bars group */}
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {values.map((v, vIdx) => {
                      const heightPercent = Math.max(10, Math.round((v.value / maxVal) * 100));
                      const seriesColor = chart.seriesLabels?.[vIdx]?.color || v.color || '#3B82F6';

                      return (
                        <div key={vIdx} className="flex flex-col items-center flex-1 h-full justify-end group">
                          <span className="text-[10px] font-bold text-slate-700 mb-1 opacity-90 whitespace-nowrap">
                            {v.displayValue || v.value.toLocaleString('tr-TR')}
                          </span>
                          <div 
                            className="w-full rounded-t-sm shadow-2xs group-hover:brightness-95 transition-all"
                            style={{ 
                              height: `${heightPercent}%`, 
                              backgroundColor: seriesColor 
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category labels row (BELOW the baseline, never truncated) */}
          <div className="flex justify-around gap-2 px-3 pt-2">
            {chart.items.map((item, iIdx) => (
              <div key={iIdx} className="flex-1 min-w-[70px] max-w-[130px] text-center px-1">
                <span className="text-xs font-bold text-slate-800 block break-words leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {chart.note && (
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-[11px] text-slate-600 font-medium break-words leading-relaxed">
            💡 {chart.note}
          </div>
        )}
      </div>
    );
  }

  // 3. COLORFUL PIE / DONUT CHART
  if (chart.type === 'pie') {
    const totalVal = chart.items.reduce((sum, it) => sum + (it.value || 0), 0);
    const colors = ['#2563EB', '#059669', '#D97706', '#7C3AED', '#E11D48', '#0891B2', '#4F46E5'];

    // Calculate angles for pie chart
    let currentAngle = 0;
    const slices = chart.items.map((it, idx) => {
      const val = it.value || 0;
      const percent = totalVal > 0 ? Math.round((val / totalVal) * 100) : 0;
      const angle = totalVal > 0 ? (val / totalVal) * 360 : 0;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      const color = it.color || colors[idx % colors.length];

      return {
        ...it,
        percent,
        startAngle,
        endAngle,
        color
      };
    });

    return (
      <div className="my-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
          <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5 sm:mt-0">
              <PieIcon size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 break-words leading-tight">{chart.title}</h4>
              {chart.subtitle && <p className="text-[11px] text-slate-500 font-medium break-words leading-tight mt-0.5">{chart.subtitle}</p>}
            </div>
          </div>
          {chart.unit && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 self-start sm:self-auto">
              Birim: {chart.unit}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
          {/* SVG Pie Chart */}
          <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {slices.map((slice, sIdx) => {
                const strokeDash = `${slice.percent} ${100 - slice.percent}`;
                const prevPercents = slices.slice(0, sIdx).reduce((acc, s) => acc + s.percent, 0);
                const strokeOffset = 100 - prevPercents;

                return (
                  <circle
                    key={sIdx}
                    cx="50"
                    cy="50"
                    r="32"
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="20"
                    strokeDasharray={strokeDash}
                    strokeDashoffset={strokeOffset}
                    className="transition-all hover:opacity-90"
                  />
                );
              })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xs font-black text-slate-800">
                {totalVal ? totalVal.toLocaleString('tr-TR') : '%100'}
              </span>
              <span className="text-[10px] font-bold text-slate-500">Toplam Dağılım</span>
            </div>
          </div>

          {/* Slices Legend & Progress Bars */}
          <div className="flex-1 w-full max-w-sm space-y-3">
            {slices.map((slice, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                    <span className="break-words leading-tight">{slice.label}</span>
                  </div>
                  <span className="font-black text-slate-900 shrink-0 ml-2">
                    {slice.displayValue || `%${slice.percent}`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${slice.percent}%`, backgroundColor: slice.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {chart.note && (
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-[11px] text-slate-600 font-medium break-words leading-relaxed">
            💡 {chart.note}
          </div>
        )}
      </div>
    );
  }

  // 4. HORIZONTAL BAR CHART (Yatay Çubuk Grafiği)
  if (chart.type === 'horizontal_bar') {
    const maxVal = Math.max(...chart.items.map(it => it.value || 0), 100);
    const colors = ['#2563EB', '#059669', '#D97706', '#7C3AED', '#E11D48', '#0891B2'];

    return (
      <div className="my-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
          <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 shrink-0 mt-0.5 sm:mt-0">
              <TrendingUp size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 break-words leading-tight">{chart.title}</h4>
              {chart.subtitle && <p className="text-[11px] text-slate-500 font-medium break-words leading-tight mt-0.5">{chart.subtitle}</p>}
            </div>
          </div>
          {chart.unit && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 self-start sm:self-auto">
              Birim: {chart.unit}
            </span>
          )}
        </div>

        <div className="space-y-3.5 pt-1">
          {chart.items.map((item, idx) => {
            const val = item.value || 0;
            const percent = maxVal > 0 ? Math.round((val / maxVal) * 100) : 0;
            const color = item.color || colors[idx % colors.length];

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 gap-2">
                  <div className="flex items-center gap-2 break-words leading-snug flex-1 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="break-words">{item.label}</span>
                  </div>
                  <span className="font-black text-slate-900 shrink-0 ml-2">
                    {item.displayValue || (chart.unit ? `${val} ${chart.unit}` : val.toLocaleString('tr-TR'))}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full rounded-full transition-all duration-500 shadow-2xs"
                    style={{ width: `${Math.max(6, percent)}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {chart.note && (
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-[11px] text-slate-600 font-medium break-words leading-relaxed">
            💡 {chart.note}
          </div>
        )}
      </div>
    );
  }

  // 5. STANDARD COLORFUL VERTICAL BAR CHART
  // Note: Dedicated plotting area + dedicated category label row below the X-axis baseline
  // guarantees that labels like "Fonksiyonellik", "Çevreye Katkı", "Özgün Tasarım", "Maliyet Verimi"
  // are 100% visible and NEVER squished, clipped, or truncated with ellipsis!
  const maxVal = Math.max(...chart.items.map(it => it.value || 0), 100);
  const colors = ['#2563EB', '#059669', '#7C3AED', '#D97706', '#E11D48', '#0891B2', '#F97316', '#10B981'];

  return (
    <div className="my-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
        <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
          <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 shrink-0 mt-0.5 sm:mt-0">
            <BarChart2 size={16} />
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 break-words leading-tight">{chart.title}</h4>
            {chart.subtitle && <p className="text-[11px] text-slate-500 font-medium break-words leading-tight mt-0.5">{chart.subtitle}</p>}
          </div>
        </div>
        {chart.unit && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 self-start sm:self-auto">
            Birim: {chart.unit}
          </span>
        )}
      </div>

      {/* Sütun Grafiği Çizimi (Plotting Area + Separate Label Row) */}
      <div className="space-y-2 pt-1">
        {/* Bars Plot Area */}
        <div className="h-48 sm:h-52 flex items-end justify-around gap-2 sm:gap-4 pt-6 pb-0 px-3 sm:px-4 border-b-2 border-l-2 border-slate-300 relative bg-slate-50/50 rounded-tl-sm">
          {/* Y Axis Reference Numbers */}
          <div className="absolute left-1 top-2 text-[9px] font-semibold text-slate-400">
            {maxVal.toLocaleString('tr-TR')}
          </div>
          <div className="absolute left-1 top-1/2 text-[9px] font-semibold text-slate-400">
            {Math.round(maxVal / 2).toLocaleString('tr-TR')}
          </div>
          <div className="absolute left-1 bottom-1 text-[9px] font-semibold text-slate-400">
            0
          </div>

          {/* Reference Gridlines */}
          <div className="absolute left-6 right-0 top-2 border-b border-dashed border-slate-200 pointer-events-none" />
          <div className="absolute left-6 right-0 top-1/2 border-b border-dashed border-slate-200 pointer-events-none" />

          {/* Bars */}
          {chart.items.map((item, idx) => {
            const val = item.value || 0;
            const heightPercent = maxVal > 0 ? Math.max(14, Math.round((val / maxVal) * 100)) : 14;
            const color = item.color || colors[idx % colors.length];

            return (
              <div 
                key={idx} 
                className="flex-1 flex flex-col items-center h-full justify-end min-w-[70px] max-w-[140px] px-0.5 group"
              >
                {/* Value displayed cleanly on top of bar */}
                <span className="text-[11px] sm:text-xs font-black text-slate-800 mb-1.5 group-hover:scale-105 transition-transform text-center whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded-sm border border-slate-200 shadow-2xs">
                  {item.displayValue || (chart.unit === '%' ? `%${val}` : `${val} ${chart.unit || ''}`.trim())}
                </span>

                {/* The Bar */}
                <div 
                  className="w-full max-w-[52px] rounded-t-lg shadow-2xs group-hover:brightness-95 transition-all"
                  style={{ 
                    height: `${heightPercent}%`, 
                    backgroundColor: color 
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis Category Labels Row (Placed BELOW the X-axis baseline - 100% visible, NEVER truncated) */}
        <div className="flex justify-around gap-2 sm:gap-4 px-3 sm:px-4 pt-2.5">
          {chart.items.map((item, idx) => {
            const color = item.color || colors[idx % colors.length];

            return (
              <div 
                key={idx} 
                className="flex-1 flex flex-col items-center min-w-[70px] max-w-[140px] px-1 text-center"
              >
                {/* Dot matching bar color */}
                <span 
                  className="w-2.5 h-2.5 rounded-full mb-1 shadow-2xs shrink-0" 
                  style={{ backgroundColor: color }} 
                />
                {/* Full label with word wrap - Metnin tamamı kesinlikle görünür */}
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug text-center break-words w-full select-text">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Legend & Data Strip (Guarantees immediate scannability on all devices) */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {chart.items.map((item, idx) => {
            const val = item.value || 0;
            const color = item.color || colors[idx % colors.length];
            const displayVal = item.displayValue || (chart.unit === '%' ? `%${val}` : `${val} ${chart.unit || ''}`.trim());

            return (
              <div 
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shadow-2xs"
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="font-bold text-slate-800 break-words">{item.label}:</span>
                <span className="font-black text-indigo-700 ml-1 shrink-0">{displayVal}</span>
              </div>
            );
          })}
        </div>
      </div>

      {chart.note && (
        <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-[11px] text-slate-600 font-medium break-words leading-relaxed">
          💡 {chart.note}
        </div>
      )}
    </div>
  );
}
