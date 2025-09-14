import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/kanban.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
 projectForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private projectService: KanbanService , private router: Router) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const project: Project = this.projectForm.value;

      this.projectService.createProject(project).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = 'Project created successfully!';
          this.projectForm.reset();

          if (res && res.id) {
          this.redirectToProject(res.id); 
        }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Failed to create project. Please try again.';
          console.error(err);
        }
      });
    }
  }

  redirectToProject(projectId: string | number) {
    this.router.navigate(['/kanban/', projectId]);
  }
}
