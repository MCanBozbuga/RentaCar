import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  isDataLoading = false;
  cars: Car[] = [];
  colors : Color[] = [];
  brands : Brand[] = [];
  currentCar: Car
  imageUrl = "https://localhost:44389"
  isData = true;
  brandFilter: number = 0;
  colorFilter: number = 0;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute, //mevcut route,url,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] && params["colorId"] ) {
        this.getCarDetailsByBrandIdAndColorId(params["brandId"], params["colorId"])
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars();
        this.getColors();
        this.getBrands();
      }
    })

  }
  getCarDetailsByBrandIdAndColorId(brandId: number, colorId: number){
console.log("objscscsect");
this.carService.getCarDetailsByBrandIdAndColorId(brandId, colorId).subscribe((response => {
  this.cars = response.data;
}))
  }

  getColors(){
    this.colorService.getColors().subscribe((response => {
      this.colors = response.data;
    }))
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response => {
      this.brands = response.data;
    }))
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
      else{this.isData = true}
    }))
  }

  setCurrentCarDetail(car: Car){
    this.currentCar = car
  }

  getCarImage(car: Car){
    if (car.imagePath == null) {
      let path = this.imageUrl + "/images/default.jpg"
      return path;
    }
    else{
      let path = this.imageUrl + car.imagePath;
      return path;
    }

  }


}
