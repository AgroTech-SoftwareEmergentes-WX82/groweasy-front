import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DevicesService } from '../../core/services/devices.service';
import { ValuesService } from '../../core/services/values.service'; // Importar ValuesService
import { NavbarComponent } from "../Shared/navbar/navbar.component"; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, NavbarComponent],
})
export class DevicesComponent implements OnInit {
  deviceForm: FormGroup;
  showModal: boolean = false;
  devices: any[] = []; // Para almacenar la lista de dispositivos

  constructor(private fb: FormBuilder, private devicesService: DevicesService, private valuesService: ValuesService) { // Inyectar ValuesService
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
      // Mapeo de los datos del formulario a los nombres que espera el backend
      const deviceData = {
        name: this.deviceForm.value.deviceName,
        typeDevice: this.deviceForm.value.deviceType,
        topic: this.deviceForm.value.topicId
      };

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

        // Llama a getDeviceValues para cada dispositivo
        this.devices.forEach(device => {
          this.getDeviceValues(device.id); // Llama al método para obtener los valores del dispositivo
        });
      },
      (error) => {
        console.error('Error al obtener los dispositivos', error);
      }
    );
  }

  // Método para obtener los valores de un dispositivo específico
  getDeviceValues(deviceId: number) {
    this.valuesService.getDeviceValues(deviceId).subscribe(
      (values) => {
        // Aquí puedes procesar los valores y asignarlos a tu dispositivo
        // Por ejemplo, podrías agregar una propiedad a cada dispositivo:
        const device = this.devices.find(d => d.id === deviceId);
        if (device) {
          device.values = values; // Asignar los valores obtenidos al dispositivo
        }
      },
      (error) => {
        console.error(`Error al obtener valores del dispositivo ${deviceId}`, error);
      }
    );
  }

  // Método para confirmar la eliminación de un dispositivo
  confirmDelete(deviceId: number) {
    console.log('Intentando eliminar el dispositivo con ID:', deviceId); // Verifica el ID
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
