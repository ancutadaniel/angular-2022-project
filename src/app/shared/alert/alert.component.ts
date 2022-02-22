import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent implements OnInit {
  //get message from outside
  @Input() message: string = "";

  // emit an event to close modal
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }
}
