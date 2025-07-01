// src/components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit: string;
}

// No changes needed here, as the unit is passed down directly.
// Just ensuring it's up to date.
export default function StatCard({ icon: Icon, label, value, unit }: StatCardProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="text-2xl text-slate-600" />
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-lg font-semibold text-slate-800">
          {value} <span className="text-sm font-normal text-slate-600">{unit}</span>
        </p>
      </div>
    </div>
  );
}