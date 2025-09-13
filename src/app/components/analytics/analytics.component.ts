import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  stats = [
    {
      value: 24,
      label: 'Total Projects',
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 211z',
      iconColor: 'text-[#ea580c]',
      bgColor: 'bg-orange-50',
      trendIcon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      trendValue: '18% from last month',
      trendColor: 'text-green-500'
    },
    {
      value: 18,
      label: 'Active Projects',
      iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      trendIcon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      trendValue: '12% from last month',
      trendColor: 'text-green-500'
    },
    {
      value: '92%',
      label: 'Completion Rate',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      trendIcon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      trendValue: '4% from last month',
      trendColor: 'text-green-500'
    },
    {
      value: 2,
      label: 'Behind Schedule',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      trendIcon: 'M5 14l7-7m0 0l7 7m-7-7v18',
      trendValue: '2 from last month',
      trendColor: 'text-red-500'
    }
  ];

  statusData = [
    { label: 'Completed', value: 180, color: 'bg-[#ea580c]' },
    { label: 'In Progress', value: 140, color: 'bg-blue-500' },
    { label: 'Planning', value: 100, color: 'bg-yellow-500' },
    { label: 'Review', value: 80, color: 'bg-purple-500' },
    { label: 'Delayed', value: 60, color: 'bg-red-500' }
  ];

  teamPerformance = [
    { name: 'Design Team', percentage: 85, color: 'bg-[#ea580c]' },
    { name: 'Development', percentage: 92, color: 'bg-green-500' },
    { name: 'Marketing', percentage: 78, color: 'bg-blue-500' },
    { name: 'QA Team', percentage: 90, color: 'bg-purple-500' }
  ];

  recentProjects = [
    {
      name: 'Mobile App Redesign',
      dueDate: '15 Jun 2023',
      status: 'Completed',
      statusClass: 'bg-green-100 text-green-800',
      iconBg: 'bg-orange-50',
      iconColor: 'text-[#ea580c]',
      iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
    },
    {
      name: 'Website Launch',
      dueDate: '22 Jun 2023',
      status: 'In Progress',
      statusClass: 'bg-blue-100 text-blue-800',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      name: 'Product Roadmap',
      dueDate: '30 Jun 2023',
      status: 'Planning',
      statusClass: 'bg-yellow-100 text-yellow-800',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    }
  ];

  recentActivities = [
    {
      initials: 'JD',
      description: 'John Doe updated the project timeline',
      time: '2 hours ago'
    },
    {
      initials: 'AS',
      description: 'Alice Smith completed the design phase',
      time: '5 hours ago'
    },
    {
      initials: 'MJ',
      description: 'Mike Johnson added new tasks to the backlog',
      time: '1 day ago'
    },
    {
      initials: 'EP',
      description: 'Emma Parker resolved 5 issues',
      time: '2 days ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
