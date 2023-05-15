import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(    
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService) { }

  public formRegister!: FormGroup;
  public isLoading = false;
  public alert = "";

  ngOnInit(): void {

    if(this.authService.token)
    {
      switch (this.authService.role) {
        case 1:
          this.router.navigateByUrl('/admin/shops');
          break;
        case 2:
          this.router.navigateByUrl('/admin/products');
          break;
        case 3:
          this.router.navigateByUrl('/');
          break;
        default:
          break;
      }
    }
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      address: [''],
    });
  }

  register()
  {
    if (this.formRegister.invalid) {
      return;
    }

    const data = {
      ...this.formRegister.value || '',
    };

    this.authService.register(data)
    .subscribe(data => {
      if (!data.ok) {
        this.isLoading = false;
        this.alert = data.message;
        return;
      }
      this.router.navigateByUrl('/');
    })
  }
}
