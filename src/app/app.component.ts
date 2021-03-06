import { Component } from '@angular/core';
import { CarService } from './carservice';
import { Car } from './car';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
})
export class AppComponent {
  cars: Car[];

  virtualCars: Car[];

  cols: any[];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
    ];

    this.cars = Array.from({ length: 10000 }).map(() =>
      this.carService.generateCar()
    );
    this.virtualCars = Array.from({ length: 10000 });
  }

  loadCarsLazy(event: LazyLoadEvent) {
    //simulate remote connection with a timeout
    console.log(event);
    setTimeout(() => {
      //load data of required page
      let loadedCars = this.cars.slice(event.first, event.first + event.rows);

      //populate page of virtual cars
      Array.prototype.splice.apply(this.virtualCars, [
        ...[event.first, event.rows],
        ...loadedCars,
      ]);

      //trigger change detection
      this.virtualCars = [...this.virtualCars];
    }, Math.random() * 1000 + 250);
  }
}
