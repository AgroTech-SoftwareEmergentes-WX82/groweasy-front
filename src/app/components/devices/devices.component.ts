import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevicesService } from '../../core/services/devices.service';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {CreateDevice, GetDevice} from '../../core/model/device.model';
import {ToastService} from '../../shared/toast/toast.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeviceSensor} from '../../core/model/device.enum';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast'; // Importar ValuesService

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
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
  providers: [MessageService, ConfirmationService]
})
export class DevicesComponent implements OnInit {
  deviceForm: FormGroup;
  devices: GetDevice[] = [];
  showModal: boolean = false;

  // Services
  private toastService = inject(ToastService);
  private deviceService = inject(DevicesService);
  private confirmationService = inject(ConfirmationService);


  constructor(private fb: FormBuilder) {
    this.deviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      deviceType: [null, Validators.required],
      topicId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.deviceForm.reset();
  }

  submit() {
    if (this.deviceForm.valid) {
      const deviceData: CreateDevice = {
        name: this.deviceForm.value.deviceName,
        typeDevice: this.deviceForm.value.deviceType,
        topic: this.deviceForm.value.topicId,
      };

      this.deviceService.addDevice(deviceData).subscribe({
        next: (response) => {
          this.toastService.sendSuccess('Dispositivo agregado', 'El dispositivo se agregó correctamente');
          this.loadDevices();
          this.closeModal();
        },
        error: (error) => {
          this.toastService.sendError('Error', 'No se pudo agregar el dispositivo');
        },
      });
    }
  }

  private loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.devices = data;
      },
      error: (error) => {
        this.toastService.sendError('Error', 'No se pudieron cargar los dispositivos');
      },
    });
  }

  confirmDelete(deviceId: number) {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este dispositivo?',
      icon: 'exclamation-triangle',
      accept: () => {
        this.deleteDevice(deviceId);
      }
    });
  }

  deleteDevice(deviceId: number) {
    this.deviceService.deleteDevice(deviceId).subscribe({
      next: (response) => {
        this.toastService.sendSuccess('Dispositivo eliminado', 'El dispositivo ha sido eliminado correctamente');
        this.loadDevices();
      },
      error: (error) => {
        this.toastService.sendError('Error', 'No se pudo eliminar el dispositivo');
      },
    });
  }

  get deviceTypeOptions() {
    return Object.values(DeviceSensor);
  }

  protected readonly faTrash = faTrash;
}
