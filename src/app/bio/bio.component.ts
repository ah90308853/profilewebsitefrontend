import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent
{
  private sendMessageResult: boolean = false;
  private messageForm = this.fb.group
  (
    {
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      message: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z0-9!?. ]*"), Validators.maxLength(200)]})
    }
  )

  constructor(private warehouseService: WarehouseService, private fb: FormBuilder)
  {

  }

  sendMessage()
  {
    this.warehouseService.newMessage(this.messageForm.value).subscribe
    (
      response => this.sendMessageResult = response
    );

    this.messageForm.reset();
  }

  get getMessageForm()
  {
    return this.messageForm;
  }

  get getSendMessageResult()
  {
    return this.sendMessageResult;
  }

  getSendMessageResultMessage()
  {
    if (this.sendMessageResult)
    {
      return "Message Sent!";
    }
    else
    {
      return "Message failed to send. Please try again later";
    }
  }

  getMessageFormField(fieldName: string)
  {
    return this.messageForm.get(fieldName) as FormControl;
  }
}
