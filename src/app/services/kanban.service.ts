import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BoardColumn, User, Task, Project } from '../kanban.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

   private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getColumns(): Observable<BoardColumn[]> {
    return this.http.get<BoardColumn[]>(`${this.apiUrl}/columns`).pipe(
      catchError(error => {
        console.error('Error fetching columns', error);
        return of(this.getDefaultColumns());
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getTasks(): Observable<Task[]> {
    
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      catchError(error => {
        console.error('Error fetching tasks', error);
        return of([]);
      })
    );
  }

  addTask(task: Partial<Task>): Observable<Task> {
    const newTask: Task = {
      ...task as Task,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return this.http.post<Task>(`${this.apiUrl}/tasks`, newTask).pipe(
      catchError(error => {
        console.error('Error adding task', error);
        return of(newTask);
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    const updatedTask = {
      ...task,
      updatedAt: new Date()
    };
    
    return this.http.put<Task>(`${this.apiUrl}/tasks/${task.id}`, updatedTask).pipe(
      catchError(error => {
        console.error('Error updating task', error);
        return of(updatedTask);
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`).pipe(
      catchError(error => {
        console.error('Error deleting task', error);
        return of();
      })
    );
  }

  addColumn(column: Partial<BoardColumn>): Observable<BoardColumn> {
    const newColumn: BoardColumn = {
      ...column as BoardColumn,
      id: this.generateId(),
      order: this.getDefaultColumns().length + 1
    };
    
    return this.http.post<BoardColumn>(`${this.apiUrl}/columns`, newColumn).pipe(
      catchError(error => {
        console.error('Error adding column', error);
        return of(newColumn);
      })
    );
  }

  deleteColumn(columnId: string): Observable<void> {
    this.http.get<Task[]>(`${this.apiUrl}/tasks?status=${columnId}`).subscribe(tasks => {
      tasks.forEach(task => this.deleteTask(task.id).subscribe());
    });

    return this.http.delete<void>(`${this.apiUrl}/columns/${columnId}`).pipe(
      catchError(error => {
        console.error('Error deleting column', error);
        return of();
      })
    );
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: any, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }

 private getDefaultColumns(): BoardColumn[] {
  return [
    { id: 'todo', title: 'To Do', order: 1, tasks: [] },
    { id: 'inProgress', title: 'In Progress', order: 2, tasks: [] },
    { id: 'review', title: 'Review', order: 3, tasks: [] },
    { id: 'done', title: 'Done', order: 4, tasks: [] }
  ];
}


  private getDefaultUsers(): User[] {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        department: 'QA',
        position: 'QA Engineer',
        avatar: 'https://i.pravatar.cc/150?img=1',
        joinDate: '2023-01-10'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        department: 'Development',
        position: 'Frontend Developer',
        avatar: 'https://i.pravatar.cc/150?img=2',
        joinDate: '2022-12-05'
      }
    ];
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
