import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MessageService} from 'primeng/api';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {ToastService} from './shared/toast/toast.service';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {ToastModule} from 'primeng/toast';
import {FooterComponent} from './shared/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastModule, FooterComponent,  FontAwesomeModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  faIconLibrary = inject(FaIconLibrary);
  toastService = inject(ToastService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.initFontAwesome();
    this.listenToastService();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  private listenToastService() {
    this.toastService.sendSub.subscribe({
      next: newMessage => {
        if (newMessage && newMessage.summary !== this.toastService.INIT_STATE.summary) {
          this.messageService.add({
            summary: newMessage.summary,
            detail: newMessage.detail,
            severity: newMessage.severity || 'info', // Default to 'info' if no severity provided
            life: 3000 // Tiempo de visualización del mensaje en ms
          });
        }
      }
    });
  }
}
