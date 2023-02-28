import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppSistemaVenta';
  darkMode = false;

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    const body = document.querySelector('body');
    body!.classList.toggle('dark-mode', this.darkMode);
  }
}
