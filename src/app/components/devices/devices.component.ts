import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DevicesService } from '../../core/services/devices.service';
import { NavbarComponent } from "../Shared/navbar/navbar.component"; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, NavbarComponent],
})
export class DevicesComponent implements OnInit {
  deviceForm: FormGroup;
  showModal: boolean = false;
  devices: any[] = []; // Para almacenar la lista de dispositivos

  constructor(private fb: FormBuilder, private devicesService: DevicesService) {
    this.deviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      deviceType: ['', Validators.required],
      topicId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDevices(); // Obtener la lista de dispositivos al iniciar
  }

  // Método para mostrar el modal
  openModal() {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
    this.deviceForm.reset(); // Reinicia el formulario
  }

  // Método para enviar el formulario
  submit() {
    if (this.deviceForm.valid) {
      const deviceData = this.deviceForm.value;

      this.devicesService.addDevice(deviceData).subscribe(
        (response) => {
          console.log('Dispositivo agregado', response);
          this.getDevices(); // Actualizar la lista de dispositivos después de agregar uno nuevo
          this.closeModal(); // Cierra el modal y reinicia el formulario
        },
        (error) => {
          console.error('Error al agregar el dispositivo', error);
        }
      );
    }
  }

  // Método para obtener los dispositivos
  getDevices() {
    this.devicesService.getDevices().subscribe(
      (response) => {
        this.devices = response; // Almacena la lista de dispositivos obtenida desde el backend
      },
      (error) => {
        console.error('Error al obtener los dispositivos', error);
      }
    );
  }

  // Método para confirmar la eliminación de un dispositivo
  confirmDelete(deviceId: number) {
    if (confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      this.deleteDevice(deviceId);
    }
  }

  // Método para eliminar un dispositivo
  deleteDevice(deviceId: number) {
    this.devicesService.deleteDevice(deviceId).subscribe(
      (response) => {
        console.log('Dispositivo eliminado', response);
        this.getDevices(); // Actualizar la lista de dispositivos después de eliminar uno
      },
      (error) => {
        console.error('Error al eliminar el dispositivo', error);
      }
    );
  }
}
