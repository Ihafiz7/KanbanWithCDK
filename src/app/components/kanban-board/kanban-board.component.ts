import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn, Task, User } from 'src/app/kanban.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  columns: BoardColumn[] = [];
  users: User[] = [];
  showAddTaskModal = false;
  showAddColumnModal = false;
  newTask: Partial<Task> = {};
  newColumn: Partial<BoardColumn> = {};
  selectedColumn = '';
  editingTask: Task | null = null;
  connectedDropLists: string[] = [];
  projectId!: string;

  constructor(private kanbanService: KanbanService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.projectId);

    this.loadData();
  }

  loadData(): void {
    this.kanbanService.getColumns().subscribe(columns => {
      this.columns = columns.sort((a, b) => a.order - b.order);

      this.connectedDropLists = this.columns.map(c => c.id);
    });

    this.kanbanService.getUsers().subscribe(users => {
      this.users = users.map(u => ({ ...u, id: String(u.id) }));
      this.users = users;
    });

    this.kanbanService.getTasksByProject(this.projectId).subscribe(tasks => {
      this.columns.forEach(col => {
        col.tasks = tasks.filter(t => t.status === col.id);
      });

      this.connectedDropLists = this.columns.map(c => c.id);
    });
  }

  drop(event: CdkDragDrop<Task[]>, columnId: string): void {
    if (event.previousContainer === event.container) {
      // Reorder inside the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // The dropped task
      const task = event.container.data[event.currentIndex];
      task.status = columnId;

      // Update backend
      this.kanbanService.updateTask(task).subscribe(updatedTask => {
        const col = this.columns.find(c => c.id === columnId);
        if (col) {
          const idx = col.tasks.findIndex(t => t.id === updatedTask.id);
          if (idx !== -1) col.tasks[idx] = updatedTask;
        }
      });
    }
  }

  openAddTaskModal(columnId: string): void {
    this.selectedColumn = columnId;
    this.newTask = { status: columnId, priority: 'medium' };
    this.editingTask = null;
    this.showAddTaskModal = true;
  }

  openEditTaskModal(task: Task): void {
    this.editingTask = { ...task };
    this.newTask = { ...task };
    this.selectedColumn = task.status;
    this.showAddTaskModal = true;
  }

  saveTask(): void {
    if (this.newTask.title && this.newTask.title.trim()) {
      if (this.editingTask) {
        const updatedTask = { ...this.editingTask, ...this.newTask } as Task;
        this.kanbanService.updateTask(updatedTask).subscribe(task => {
          const col = this.columns.find(c => c.id === task.status);
          if (col) {
            const idx = col.tasks.findIndex(t => t.id === task.id);
            if (idx !== -1) col.tasks[idx] = task;
          }
          this.resetTaskModal();
        });
      } else {
        this.newTask.projectId = this.projectId;
        this.kanbanService.addTask(this.newTask as Task).subscribe(task => {
          const col = this.columns.find(c => c.id === task.status);
          if (col) col.tasks.push(task);
          this.resetTaskModal();
        });
      }
    }
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.kanbanService.deleteTask(task.id).subscribe(() => {
        const col = this.columns.find(c => c.id === task.status);
        if (col) col.tasks = col.tasks.filter(t => t.id !== task.id);
      });
    }
  }

  addColumn(): void {
    if (this.newColumn.title && this.newColumn.title.trim()) {
      this.kanbanService.addColumn(this.newColumn as BoardColumn).subscribe(column => {
        column.tasks = [];
        this.columns.push(column);
        this.showAddColumnModal = false;
        this.newColumn = {};
      });
    }
  }

  deleteColumn(columnId: string): void {
    if (confirm('Are you sure you want to delete this column? All tasks in it will be deleted.')) {
      this.kanbanService.deleteColumn(columnId).subscribe(() => {
        this.columns = this.columns.filter(c => c.id !== columnId);
      });
    }
  }

  onAssigneeChange(task: Task | null, newValue: any): void {
    if (!task) return;

    const newAssignee = (newValue === '' ? null : String(newValue)); 
    if (task.assignee === newAssignee) return; 
    task.assignee = newAssignee;

    // send backend
    this.kanbanService.updateTask(task).subscribe({
      next: updatedTask => {
        const col = this.columns.find(c => c.id === updatedTask.status);
        if (!col) {
          console.warn('Column not found for status', updatedTask.status);
          return;
        }
        col.tasks = col.tasks || [];
        const idx = col.tasks.findIndex(t => t.id === updatedTask.id);
        if (idx !== -1) col.tasks[idx] = updatedTask;
        else col.tasks.push(updatedTask);
        // force change detection for arrays
        col.tasks = [...col.tasks];
      },
      error: err => {
        console.error('Failed to update assignee', err);
      }
    });
  }

    getUserInitialsById(userId: string | number | null | undefined): string {
      const user = this.getUserById(userId);
      return user ? this.getUserInitials(user) : '?';
    }


    getUserInitials(user: User): string {
      if (!user || !user.name) return '?';
      const names = user.name.split(' ');
      return names.length > 1
        ? names[0][0] + names[1][0]
        : names[0][0];
    }

    getUserById(userId: any): User | undefined {
      console.log(this.users);

      return this.users.find(user => user.id === userId);
    }

    trackByColumnId(index: number, column: BoardColumn): string {
      return column.id;
    }

    trackByTaskId(index: number, task: Task): string {
      return task.id;
    }

  private resetTaskModal(): void {
    this.showAddTaskModal = false;
    this.newTask = {};
    this.editingTask = null;
  }
}