import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Client } from '../client';
import { LoggedInClientServiceService } from '../logged-in-client-service.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-clientlogin',
  templateUrl: './clientlogin.component.html',
  styleUrls: ['./clientlogin.component.css']
})
export class ClientloginComponent
{
  clients: Client[] = [];

  private clientLoginForm = this.fb.group
  (
    {
      clientId: new FormControl(null, {validators: [Validators.required, Validators.pattern("^[0-9]+$")]})
    }
  )

  constructor(private warehouseService: WarehouseService, private loggedInClientService: LoggedInClientServiceService, private fb: FormBuilder)
  {
    warehouseService.getCurrentClients().subscribe
    (
      response => this.clients = response
    );
  }

  get getClients()
  {
    return this.clients;
  }

  get getClientLoginForm()
  {
    return this.clientLoginForm;
  }

  setLoggedInClient()
  {
    let validId = false;
    for (let i = 0; i < this.clients.length; i++)
    {
      if (this.clientLoginForm.get('clientId')?.value == this.clients[i].clientId)
      {
        validId = true;
      }
    }

    if (validId)
    {
      this.loggedInClientService.setLoggedInClient(this.clientLoginForm.get('clientId')?.value);
    }
    
    this.clientLoginForm.reset();
  }
}
