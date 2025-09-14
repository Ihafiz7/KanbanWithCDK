import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/kanban.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  errorMessage = '';

  constructor(private projectService: KanbanService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load projects';
        this.loading = false;
      }
    });
  }

  viewProject(projectId: any) {
    this.router.navigate(['/kanban', projectId]);
  }
}
