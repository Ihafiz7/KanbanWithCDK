import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/kanban.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit{
  userForm: FormGroup;
  isEditMode = false;
  userId: String | null = null;
  isLoading = false;
  errorMessage = '';

  departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

  constructor(
    private fb: FormBuilder,
    private userService: KanbanService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      avatar: ['https://randomuser.me/api/portraits/men/1.jpg'],
      joinDate: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = params['id'];
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: any): void {
    this.isLoading = true;
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load user data.';
        this.isLoading = false;
        console.error('Error loading user:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const userData: User = this.userForm.value;

      const operation = this.isEditMode
        ? this.userService.updateUser(this.userId!, userData)
        : this.userService.createUser(userData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.errorMessage = this.isEditMode 
            ? 'Failed to update user. Please try again.' 
            : 'Failed to create user. Please try again.';
          this.isLoading = false;
          console.error('Error saving user:', error);
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }

}
