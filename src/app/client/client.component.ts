import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent
{
  client: Client = new Client();

  constructor(private warehouseService: WarehouseService) 
  {
    warehouseService.getLoggedInClientProfile().subscribe
    (
      response => 
      {
        if(response.clientId)
        {
          this.client = response;
        }
      }
    )
  }
}
