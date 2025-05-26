import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css'],
  imports: [RouterLink, MatButtonModule]
})
export class EmptyCartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
