import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authError = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.authError = '';
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password)
      .catch(
        error => {
          this.authError = error.message;
        }
      )
  }

}
