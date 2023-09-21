import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successpagina',
  templateUrl: './successpagina.component.html',
  styleUrls: ['./successpagina.component.css']
})
export class SuccesspaginaComponent implements OnInit {

  public message: string;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
      console.log("in query params");
      console.log(params['message']);
    });
  }
  ngOnInit(): void {
  }

}
