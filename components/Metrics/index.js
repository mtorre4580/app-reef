import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './style.module.scss';

export default function Metrics({ parameters }) {
  const data = Object.keys(parameters).map((date) => {
    let parameterByDate = parameters[date];
    return {
      ...parameterByDate,
      name: date,
    };
  });

  return (
    <div className={styles.ctn}>
      <h3 className={styles.title}>Gráfico</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ca" fill="#8884d8" />
          <Bar dataKey="mg" fill="#82ca9d" />
          <Bar dataKey="kh" fill="#2a9d8f" />
          <Bar dataKey="no3" fill="#023e8a" />
          <Bar dataKey="po4" fill="#b07d62" />
          <Bar dataKey="ph" fill="#d90429" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
