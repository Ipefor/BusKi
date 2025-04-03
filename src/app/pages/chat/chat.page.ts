import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Message } from '../../core/models/message.interface';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
} from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  @ViewChild(IonContent) content?: IonContent;
  private readonly messagesService = inject(MessagesService);
  private readonly authService = inject(AuthService);
  messageInput = new FormControl('', Validators.required);
  messages: Message[] = [];
  allMessages: Message[] = [];
  pageSize = 10;
  currentPage = 0;
  countMessages: number = 0;
  currentMessages: number = 0;
  startIndex: number = 0;
  activatedScroll: boolean = true;
  currentUser: string | undefined;

  ngOnInit() {
    this.currentUser = this.authService.userName;
    this.initializeChat();
  }

  ionViewWillEnter() {
    this.initializeChat();
  }

  initializeChat() {
    this.messagesService.getMensajes().subscribe((m) => {
      this.allMessages = m;
      this.countMessages = this.allMessages.length;
      this.loadLastMessages();
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });
  }

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(0);
    }
  }

  loadData(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      console.log(this.currentUser)
      this.loadMoreMessages();
      event.target.complete();
    }, 1000);
  }

  loadMoreMessages() {
    const start = Math.max(
      this.startIndex - (this.currentPage + 1) * this.pageSize,
      0,
    );
    const end = this.startIndex - this.currentPage * this.pageSize;
    const newMessages = this.allMessages.slice(start, end);
    this.messages = [...newMessages, ...this.messages];
    this.currentMessages = this.messages.length;
    this.currentPage++;
  }

  loadLastMessages() {
    const start = Math.max(this.countMessages - 20, 0);
    const end = this.countMessages;
    this.messages = this.allMessages.slice(start, end);
    this.currentPage = 0;
    this.currentMessages = this.messages.length;
    this.startIndex = start;
  }

  sendMessage() {
    this.messagesService.addMessage(this.messageInput.value!);
    this.messageInput.reset();
    this.messages = [];
    this.loadLastMessages();
  }

  deleteMessages() {
    this.messagesService.deleteMessages();
    this.messages = [];
    this.loadLastMessages();
  }

  eventHandler(keyCode: number) {
    if (keyCode == 13) {
      this.messagesService.addMessage(this.messageInput.value!);
      this.messageInput.reset();
      this.messages = [];
      this.loadLastMessages();
      console.log(this.currentUser)
    }
  }
}
