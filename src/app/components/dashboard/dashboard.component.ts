import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class DashboardComponent {
  tasks = [
    { id: 1, title: 'Complete project proposal', priority: 'high', dueDate: '2023-06-15', completed: false },
    { id: 2, title: 'Review team tasks', priority: 'medium', dueDate: '2023-06-12', completed: true },
    { id: 3, title: 'Schedule client meeting', priority: 'low', dueDate: '2023-06-20', completed: false },
    { id: 4, title: 'Update documentation', priority: 'medium', dueDate: '2023-06-18', completed: false },
  ];

  stats = {
    totalTasks: 24,
    completedTasks: 19,
    inProgress: 1,
    overdue: 4
  };

  teamMembers = [
    { name: 'John Doe', role: 'Developer', tasks: 5, avatar: '/assets/avatars/john.jpg' },
    { name: 'Jane Smith', role: 'Designer', tasks: 3, avatar: '/assets/avatars/jane.jpg' },
    { name: 'Mike Johnson', role: 'QA', tasks: 4, avatar: '/assets/avatars/mike.jpg' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleTaskCompletion(task: any): void {
    task.completed = !task.completed;
  }

  getProgressPercentage(): number {
    return (this.stats.completedTasks / this.stats.totalTasks) * 100;
  }

  collapsed = true;
    openMenu: string | null = null;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) this.openMenu = null;
  }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }
}
