'use client';
import React from 'react';
import { Chart, ChartData, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Post } from '@/static/postType';

export default function TagPieChart({ posts, otherThreshold = 0.05 }: { posts: Post[]; otherThreshold?: number }) {
  Chart.register(...registerables);

  const calculateTagFrequency = (posts: Post[]) => {
    const tagCount: { [key: string]: number } = {};

    posts.forEach((post) => {
      post.data.tags?.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    return tagCount;
  };

  const tagCount = calculateTagFrequency(posts);
  const totalTags = Object.values(tagCount).reduce((a, b) => a + b, 0);

  // "Other" としてまとめる処理
  const processedData = Object.entries(tagCount).reduce(
    (acc, [tag, count]) => {
      const percentage = count / totalTags;
      if (percentage > otherThreshold) {
        acc.labels.push(tag);
        acc.data.push(count);
      } else {
        acc.otherCount += count;
      }
      return acc;
    },
    { labels: [], data: [], otherCount: 0 } as { labels: string[]; data: number[]; otherCount: number },
  );

  if (processedData.otherCount > 0) {
    processedData.labels.push('その他');
    processedData.data.push(processedData.otherCount);
  }

  const chartData: ChartData<'doughnut', number[], string> = {
    labels: processedData.labels,
    datasets: [
      {
        label: '投稿数',
        data: processedData.data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverOffset: 4,
        borderWidth: 3,
      },
    ],
  };

  return <Doughnut data={chartData} />;
}
