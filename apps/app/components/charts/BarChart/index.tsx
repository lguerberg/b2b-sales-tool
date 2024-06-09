'use client'

import { Bar, BarChart as RechartBarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { BarChartProps } from './types'

export default function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartBarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => value} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </RechartBarChart>
    </ResponsiveContainer>
  )
}
