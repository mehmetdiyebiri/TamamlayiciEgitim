import React from 'react';

export interface LgsGridSegment {
  from: string; // e.g. "C3"
  to: string;   // e.g. "D4"
  type: 'solid' | 'dashed';
}

export interface LgsGridFigure {
  xLabels: string[]; // e.g. ["1", "2", "3", "4", "5", "6"] or ["A", "B", "C", "D", "E", "F"]
  yLabels: string[]; // e.g. ["A", "B", "C", "D", "E", "F"] or ["1", "2", "3", "4", "5", "6"]
  segments: LgsGridSegment[];
  points?: string[];
  label?: string; // e.g. "A", "B", "C", "D"
  caption?: string;
}

interface LgsCoordinateGridRendererProps {
  figure: LgsGridFigure;
  size?: number; // width & height of the SVG area (default: 200)
  selected?: boolean;
  status?: 'default' | 'correct' | 'wrong';
  optionLetter?: string;
  className?: string;
}

export function LgsCoordinateGridRenderer({
  figure,
  size = 200,
  selected = false,
  status = 'default',
  optionLetter,
  className = ''
}: LgsCoordinateGridRendererProps) {
  const { xLabels, yLabels, segments } = figure;

  const cols = xLabels.length;
  const rows = yLabels.length;

  // Layout metrics
  const paddingLeft = 24;
  const paddingBottom = 24;
  const paddingTop = 12;
  const paddingRight = 12;

  const gridWidth = size - paddingLeft - paddingRight;
  const gridHeight = size - paddingTop - paddingBottom;

  const stepX = gridWidth / (cols - 1 || 1);
  const stepY = gridHeight / (rows - 1 || 1);

  // Helper to map coordinate label (e.g. "C3" or "3C") to pixel (x, y)
  const getCoordinates = (pointStr: string): { x: number; y: number } | null => {
    const clean = pointStr.trim().toUpperCase();
    
    // Find x index and y index
    let colIdx = -1;
    let rowIdx = -1;

    // Check if format is LetterNumber (e.g. "C3") or NumberLetter (e.g. "3C")
    for (let c = 0; c < xLabels.length; c++) {
      for (let r = 0; r < yLabels.length; r++) {
        const xL = xLabels[c].toUpperCase();
        const yL = yLabels[r].toUpperCase();
        if (clean === `${yL}${xL}` || clean === `${xL}${yL}`) {
          colIdx = c;
          rowIdx = r;
          break;
        }
      }
      if (colIdx !== -1) break;
    }

    // Direct match check:
    if (colIdx === -1 || rowIdx === -1) {
      // Try parsing single characters
      for (let char of clean) {
        const cI = xLabels.findIndex(l => l.toUpperCase() === char);
        if (cI !== -1 && colIdx === -1) colIdx = cI;
        const rI = yLabels.findIndex(l => l.toUpperCase() === char);
        if (rI !== -1 && rowIdx === -1) rowIdx = rI;
      }
    }

    if (colIdx === -1 || rowIdx === -1) return null;

    const x = paddingLeft + colIdx * stepX;
    // Y axis usually increases from bottom to top in math / LGS charts
    const y = paddingTop + (rows - 1 - rowIdx) * stepY;

    return { x, y };
  };

  // Border & background based on status
  const borderColor = 
    status === 'correct' 
      ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20' 
      : status === 'wrong'
      ? 'border-rose-400 bg-rose-50/30'
      : selected
      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20'
      : 'border-slate-200 bg-white hover:border-slate-300';

  return (
    <div className={`relative flex flex-col items-center p-3 rounded-2xl border transition-all ${borderColor} ${className}`}>
      {/* Option Letter Tag */}
      {(optionLetter || figure.label) && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shadow-2xs ${
            status === 'correct'
              ? 'bg-emerald-600 text-white'
              : status === 'wrong'
              ? 'bg-rose-600 text-white'
              : selected
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700'
          }`}>
            {optionLetter || figure.label}
          </span>
        </div>
      )}

      {/* SVG Coordinate Grid */}
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full max-w-[220px] aspect-square select-none overflow-visible"
      >
        {/* Unit Square Grid Lines (Characteristic LGS Light-Blue Color) */}
        <g stroke="#38bdf8" strokeWidth="1.25" opacity="0.85">
          {/* Vertical Grid Lines */}
          {xLabels.map((_, c) => {
            const x = paddingLeft + c * stepX;
            return (
              <line 
                key={`vl-${c}`} 
                x1={x} 
                y1={paddingTop} 
                x2={x} 
                y2={paddingTop + gridHeight} 
              />
            );
          })}

          {/* Horizontal Grid Lines */}
          {yLabels.map((_, r) => {
            const y = paddingTop + r * stepY;
            return (
              <line 
                key={`hl-${r}`} 
                x1={paddingLeft} 
                y1={y} 
                x2={paddingLeft + gridWidth} 
                y2={y} 
              />
            );
          })}
        </g>

        {/* Outer Grid Border */}
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={gridWidth}
          height={gridHeight}
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
        />

        {/* X Axis Labels (Bottom) */}
        <g className="text-[10px] font-bold fill-slate-700">
          {xLabels.map((label, c) => {
            const x = paddingLeft + c * stepX;
            const y = paddingTop + gridHeight + 15;
            return (
              <text 
                key={`xl-${c}`} 
                x={x} 
                y={y} 
                textAnchor="middle" 
                fontSize="10" 
                fontWeight="700"
                fill="#334155"
              >
                {label}
              </text>
            );
          })}
        </g>

        {/* Y Axis Labels (Left) */}
        <g className="text-[10px] font-bold fill-slate-700">
          {yLabels.map((label, r) => {
            // rows-1-r so bottom label is r=0
            const y = paddingTop + (rows - 1 - r) * stepY + 3.5;
            const x = paddingLeft - 8;
            return (
              <text 
                key={`yl-${r}`} 
                x={x} 
                y={y} 
                textAnchor="end" 
                fontSize="10" 
                fontWeight="700"
                fill="#334155"
              >
                {label}
              </text>
            );
          })}
        </g>

        {/* Connecting Lines (Düz: solid, Kesik: dashed) */}
        {segments.map((seg, sIdx) => {
          const pt1 = getCoordinates(seg.from);
          const pt2 = getCoordinates(seg.to);
          if (!pt1 || !pt2) return null;

          const isDashed = seg.type === 'dashed';

          return (
            <line
              key={`seg-${sIdx}`}
              x1={pt1.x}
              y1={pt1.y}
              x2={pt2.x}
              y2={pt2.y}
              stroke="#0f172a"
              strokeWidth="2.2"
              strokeDasharray={isDashed ? '4,3.5' : undefined}
              strokeLinecap="round"
            />
          );
        })}

        {/* Intersection Points (Dots on vertices) */}
        {(() => {
          // Collect unique points
          const renderedPoints = new Set<string>();
          const allPointStrings: string[] = [];

          segments.forEach(s => {
            allPointStrings.push(s.from, s.to);
          });
          if (figure.points) {
            allPointStrings.push(...figure.points);
          }

          return allPointStrings.map((ptStr, pIdx) => {
            const coords = getCoordinates(ptStr);
            if (!coords) return null;
            const key = `${Math.round(coords.x)},${Math.round(coords.y)}`;
            if (renderedPoints.has(key)) return null;
            renderedPoints.add(key);

            return (
              <circle
                key={`pt-${pIdx}`}
                cx={coords.x}
                cy={coords.y}
                r="3.2"
                fill="#0f172a"
              />
            );
          });
        })()}
      </svg>

      {/* Caption or description if present */}
      {figure.caption && (
        <span className="text-[11px] font-semibold text-slate-600 mt-2 text-center break-words">
          {figure.caption}
        </span>
      )}
    </div>
  );
}
