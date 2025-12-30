'use client';
import React, { useState } from 'react';
import { Chart, ChartData, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Post } from '@/static/postType';

export default function PostsBarChart({ posts }: { posts: Post[] }) {
  Chart.register(...registerables);

  const allYears = Array.from(
    new Set(posts.map((post) => new Date(post.data.date || '').getFullYear()).filter((year) => !isNaN(year))),
  );

  const [selectedYear, setSelectedYear] = useState<number>(allYears[0]);

  const postsByMonth = Array(12).fill(0);

  posts.forEach((post) => {
    const postDate = new Date(post.data.date || '');
    const postYear = postDate.getFullYear();
    const postMonth = postDate.getMonth();

    if (postYear === selectedYear) {
      postsByMonth[postMonth]++;
    }
  });

  const chartData: ChartData<'bar'> = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [
      {
        label: '投稿数',
        data: postsByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192)',
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div>
      {/* 年選択用ドロップダウン */}
      <label className='mr-2' htmlFor='year-select-posts'>
        表示年
      </label>
      <select
        className='rounded-md border-2 border-blue-400 px-1 outline-none transition-colors hover:border-blue-500'
        id='year-select-posts'
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {allYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Bar data={chartData} />
    </div>
  );
}
