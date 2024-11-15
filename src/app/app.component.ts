import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MessageService} from 'primeng/api';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {ToastService} from './shared/toast/toast.service';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {ToastModule} from 'primeng/toast';
import {FooterComponent} from './shared/footer/footer.component';
import {Subscription} from 'rxjs';
import {IMqttMessage, IMqttServiceOptions, IPublishOptions, MqttService} from 'ngx-mqtt';
import {IClientSubscribeOptions} from 'mqtt-browser';


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
  _mqttService = inject(MqttService);


  constructor() {
    this.client = this._mqttService;
  }

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


  //CONFIG MQTT
  private curSubscription: Subscription | undefined;
  connection = {
    hostname: 'broker.emqx.io',
    port: 8083,
    path: '/mqtt',
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    // 认证信息
    clientId: 'mqttx_597046f4',
    username: 'emqx_test',
    password: 'emqx_test',
    protocol: 'ws',
  }
  subscription = {
    topic: 'topictest/browser',
    qos: 0,
  };
  publish = {
    topic: 'topictest/browser',
    qos: 0,
    payload: '{ "msg": "Hello, I am browser." }',
  };
  receiveNews = '';
  qosList = [
    {label: 0, value: 0},
    {label: 1, value: 1},
    {label: 2, value: 2},
  ];
  client: MqttService | undefined;
  isConnection = false;
  subscribeSuccess = false;

  // 创建连接
  createConnection() {
    // 连接字符串, 通过协议指定使用的连接方式
    // ws 未加密 WebSocket 连接
    // wss 加密 WebSocket 连接
    // mqtt 未加密 TCP 连接
    // mqtts 加密 TCP 连接
    // wxs 微信小程序连接
    // alis 支付宝小程序连接
    try {
      this.client?.connect(this.connection as IMqttServiceOptions)
    } catch (error) {
      console.log('mqtt.connect error', error);
    }
    this.client?.onConnect.subscribe(() => {
      this.isConnection = true
      console.log('Connection succeeded!');
    });
    this.client?.onError.subscribe((error: any) => {
      this.isConnection = false
      console.log('Connection failed', error);
    });
    this.client?.onMessage.subscribe((packet: any) => {
      this.receiveNews = this.receiveNews.concat([packet.payload.toString(), '\n'].join())
      console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`)
    })
  }


  doSubscribe() {
    const {topic, qos} = this.subscription
    if (!this.client) {
      this.toastService.sendInfo('There is no mqtt client available...', 'close');
      return;
    }
    this.curSubscription = this.client.observe(topic, {qos} as IClientSubscribeOptions)
      .subscribe((message: IMqttMessage) => {
        this.subscribeSuccess = true
        const msg = ['Received message: ', message.payload.toString()].join(' ');
        this.toastService.sendInfo(msg, 'close');
        console.log(message);
      });
  }

  doUnSubscribe() {
    this.curSubscription?.unsubscribe()
    this.subscribeSuccess = false
  }


  doPublish() {
    const {topic, qos, payload} = this.publish
    console.log(this.publish)
    this.client?.unsafePublish(topic, payload, {qos} as IPublishOptions)
  }


  destroyConnection() {
    try {
      this.client?.disconnect(true)
      this.isConnection = false
      console.log('Successfully disconnected!')
    } catch (error: any) {
      console.log('Disconnect failed', error.toString())
    }
  }


}


