import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CreateNotification, GetNotification } from '../../core/model/notification.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from '../../shared/toast/toast.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FontAwesomeModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
 
})
export class NotificationsComponent implements OnInit {
  notificationForm: FormGroup;
  notifications: GetNotification[] = [];
  showModal: boolean = false;

  // Services
  private toastService = inject(ToastService);
  private notificationService = inject(NotificationsService);
  private confirmationService = inject(ConfirmationService);

  constructor(private fb: FormBuilder) {
    this.notificationForm = this.fb.group({
      notificationEmail: ['', Validators.required],
      notificationMessage: ['', Validators.required],
      notificationThreshold: ['', Validators.required],
      notificationTime: ['', Validators.required],
      idNotification: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.notificationForm.reset();
  }

  submit() {
    if (this.notificationForm.valid) {
      const notificationData: CreateNotification = {
        email: this.notificationForm.value.notificationEmail,
        message: this.notificationForm.value.notificationMessage,
        threshold: this.notificationForm.value.notificationThreshold,
        time: this.notificationForm.value.notificationTime,
        idDevice: this.notificationForm.value.idNotification,
      };

      this.notificationService.addNotifications(notificationData).subscribe({
        next: () => {
          this.toastService.sendSuccess('Notificación agregada', 'La notificación se agregó correctamente');
          this.loadNotifications();
          this.closeModal();
        },
        error: () => {
          this.toastService.sendError('Error', 'No se pudo agregar la notificación');
        },
      });
    }
  }

  private loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: () => {
        this.toastService.sendError('Error', 'No se pudieron cargar las notificaciones');
      },
    });
  }

  confirmDelete(notificationId: number) {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta notificación?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteNotification(notificationId);
      },
    });
  }

  deleteNotification(notificationId: number) {
    this.notificationService.deleteNotifications(notificationId).subscribe({
      next: () => {
        this.toastService.sendSuccess('Notificación eliminada', 'La notificación ha sido eliminada correctamente');
        this.loadNotifications();
      },
      error: () => {
        this.toastService.sendError('Error', 'No se pudo eliminar la notificación');
      },
    });
  }

  protected readonly faTrash = faTrash;
}
