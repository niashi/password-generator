import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneratorComponent } from './generator/generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GeneratorComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'password-generator';
}
