import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  isDataLoading = false;
  cars: Car[] = [];
  isData = true;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute //mevcut route,url
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars();
      }
    })

  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.isDataLoading = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      console.log("data : " + response.data[0]);
      if (response.data[0] == undefined) {
          this.isData = false;
      }
      setTimeout(() => {
        this.isData = true;
      }, 2000);
      this.isDataLoading = true;
    });
  }

  getCarsByColor(colorId: number){
    this.carService.getCarsByColor(colorId).subscribe((response =>{
      this.cars = response.data;
      if (response.data[0] == undefined) {
        this.isData = false;
    }
    setTimeout(() => {
      this.isData = true;
    }, 1000);
    }))
  }


}
