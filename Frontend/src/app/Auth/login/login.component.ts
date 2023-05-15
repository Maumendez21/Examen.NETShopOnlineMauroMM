import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;
  public isLoading = false;
  public alert = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

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

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.formLogin.invalid) {
      return;
    }
    this.isLoading = true;

    const data = {
      email: this.formLogin.value.email || '',
      password: this.formLogin.value.password || '',
    };

    this.authService.login(this.formLogin.value).subscribe(
      (data) => {
        
        console.log(data);
        
        if (!data.ok) {
          this.isLoading = false;
          this.toastr.error(data.message, "Error");
          return;
        }

        switch (data.rol) {
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

      },
      (error) => {
        this.toastr.error(error.message, "Error");
      }
    );

  }

}
