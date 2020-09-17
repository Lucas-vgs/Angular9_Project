import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/Services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RecipeBookService } from '../shared/Services/recipe-book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  isAuthenticated = false;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService,
    private recipeService: RecipeBookService) { }

  ngOnInit() {
    this.dataService.fetchData().subscribe();
    this.subs = this.authService.user.subscribe(data => {
      this.isAuthenticated = !!data;
      if (this.isAuthenticated) {
        this.dataService.fetchDataByEmail(data.email).subscribe();
        this.recipeService.email = data.email
      }
    })
    // O subscribe é só para a requisição ser enviada. O subscribe precisa ocorrer em algum lugar.
    //Do contrário o Angular não emite a requisição.  
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
