export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string | null;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  avatar: string;
  joinDate: string;
}

export interface BoardColumn {
  id: string;
  title: string;
  order: number;
  tasks: Task[]; 
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  status: string;
}