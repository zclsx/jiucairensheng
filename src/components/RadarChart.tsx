'use client';

import React from 'react';
import { DimensionScores, DIMENSIONS } from '@/data/psychologyData';

export interface RadarChartProps {
  dimensions: DimensionScores;
  size?: number;
  showLabels?: boolean;
}

/**
 * RadarChart 组件 - 多维度得分雷达图
 * 使用 SVG 绘制
 * 
 * Requirements: 3.2, 4.3
 * - 展示每个维度的得分
 * - 使用雷达图可视化展示多维度得分
 */
export default function RadarChart({ 
  dimensions, 
  size = 200, 
  showLabels = true 
}: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const labelRadius = size * 0.48;
  
  // Get dimension keys in order
  const dimensionKeys: (keyof DimensionScores)[] = [
    'riskAppetite',
    'emotionalControl', 
    'cognitiveBias',
    'socialDependency',
    'greedIndex',
  ];
  
  const numPoints = dimensionKeys.length;
  const angleStep = (2 * Math.PI) / numPoints;
  const startAngle = -Math.PI / 2; // Start from top
  
  // Calculate point position on the radar
  const getPoint = (index: number, value: number): { x: number; y: number } => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };
  
  // Calculate label position
  const getLabelPosition = (index: number): { x: number; y: number } => {
    const angle = startAngle + index * angleStep;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  };
  
  // Generate polygon points for the data
  const dataPoints = dimensionKeys.map((key, i) => {
    const point = getPoint(i, dimensions[key]);
    return `${point.x},${point.y}`;
  }).join(' ');
  
  // Generate grid lines (concentric pentagons)
  const gridLevels = [20, 40, 60, 80, 100];
  
  const generateGridPolygon = (level: number): string => {
    return dimensionKeys.map((_, i) => {
      const point = getPoint(i, level);
      return `${point.x},${point.y}`;
    }).join(' ');
  };
  
  // Get dimension config for labels
  const getDimensionName = (key: keyof DimensionScores): string => {
    const config = DIMENSIONS.find(d => d.id === key);
    return config?.name || key;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Background */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius + 10} 
          fill="rgba(255,255,255,0.1)" 
        />
        
        {/* Grid lines */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={generateGridPolygon(level)}
            fill="none"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {dimensionKeys.map((_, i) => {
          const endPoint = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {dimensionKeys.map((key, i) => {
          const point = getPoint(i, dimensions[key]);
          const value = dimensions[key];
          // Color based on value
          const isHigh = value >= 70;
          const isLow = value <= 30;
          const fillColor = isHigh 
            ? 'rgba(239, 68, 68, 0.9)' 
            : isLow 
              ? 'rgba(34, 197, 94, 0.9)'
              : 'rgba(59, 130, 246, 0.9)';
          
          return (
            <circle
              key={key}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={fillColor}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Labels */}
      {showLabels && dimensionKeys.map((key, i) => {
        const pos = getLabelPosition(i);
        const value = dimensions[key];
        const isHigh = value >= 70;
        
        return (
          <div
            key={key}
            className="absolute text-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: pos.x, 
              top: pos.y,
              width: '70px',
            }}
          >
            <div className={`text-xs font-semibold drop-shadow-sm ${
              isHigh ? 'text-red-500' : 'text-slate-700'
            }`}>
              {getDimensionName(key)}
            </div>
            <div className={`text-xs font-bold ${
              isHigh ? 'text-red-600' : 'text-slate-600'
            }`}>
              {Math.round(value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
