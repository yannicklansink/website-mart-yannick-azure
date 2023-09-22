import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successpagina',
  templateUrl: './successpagina.component.html',
  styleUrls: ['./successpagina.component.css'],
})
export class SuccesspaginaComponent implements OnInit {
  public analysisPicture: string;
  public autoMerk: string;
  public pictureUrl: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.analysisPicture = params['analysisPicture'];
      this.autoMerk = params['autoMerk'];
      this.pictureUrl = params['pictureUrl']
      console.log('in query params');
      console.log(params['analysisPicture']);
    });
  }
  ngOnInit(): void {}
}
