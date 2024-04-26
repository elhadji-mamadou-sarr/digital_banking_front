import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private authService : AuthService,
    private router : Router
  ){}

  ngOnInit(): void {

  }

  logout(){
    this.authService.logout().subscribe(
      () => {
        this.router.navigate([''])
      },
      (error)=>{
        console.log("Erreur : ", error);

      }
    )
  }

}
