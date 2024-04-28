import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { OrderService } from '../../../../core/services/order.service';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import Chart, { Ticks } from 'chart.js/auto';
import { EgyCurrencyPipe } from '../../../../shared/pipes/egy-currency.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EgyCurrencyPipe,MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class HomeComponent {

  formDate!: FormGroup;
  dateWithoutTime!: any;
  numberOfOrders!: number;
  totalOfOrders!: number;

  public chart: any;
  ordersStatus = {
    pendding: 0,
    rejected: 0,
    completed: 0,
  }
  keyOrderStatus: string[] = [];
  valueOrderStatus: number[] = [];

  public barChart: any;
  allOrderInYear:number[]=[];

  constructor(private FB: FormBuilder, private orderService: OrderService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.inatializeDateForm()
    this.onSearch()
    this.extractKeysAndValues()
    this.createChart()
    this.createBarChart();
  }

  inatializeDateForm() {
    this.formDate = this.FB.group({
      date: [new Date()]
    })
  }

  onSearch() {
    // console.log(this.formDate.get('date')?.value)

    if (this.formDate.value != null) {
      this.dateWithoutTime = this.datePipe.transform(this.formDate.get('date')?.value, 'yyyy-MM-dd');

      this.orderService.getNumbersOrders(1, { date: this.dateWithoutTime }).subscribe((res: any) => {
        this.numberOfOrders = res
      });

      this.orderService.getTotalOrders(1, { date: this.dateWithoutTime }).subscribe((res: any) => {
        this.totalOfOrders = res
      });

      this.orderService.getOrdersStatus(1, { date: this.dateWithoutTime }).subscribe((res: any) => {
        this.ordersStatus.pendding = res.pendding;
        this.ordersStatus.rejected = res.rejected;
        this.ordersStatus.completed = res.completed;
        
        if(this.chart)
        {
          this.chart.destroy();
          this.keyOrderStatus=[];
          this.valueOrderStatus=[];
          this.extractKeysAndValues();
          this.createChart();
        }
         

        
      });

      this.orderService.getOrdersInYear({ date: this.dateWithoutTime }).subscribe((res: any) => {
                
        this.allOrderInYear = res;
        
        if(this.barChart)
        {
          this.barChart.destroy();
          // this.allOrderInYear=[];
          this.createBarChart();
        }
             
      })

    }
  }

  onFilter(filterBy: number, from: string) {

    
    if (from === 'order') {
      this.orderService.getNumbersOrders(filterBy, { date: this.dateWithoutTime }).subscribe((res: any) => {
        this.numberOfOrders = res
      })
    }
    else if(from === 'price') {
      this.orderService.getTotalOrders(filterBy, { date: this.dateWithoutTime }).subscribe((res: any) => {
        this.totalOfOrders = res
      })
    }

    else if(from === 'status') {
      this.orderService.getOrdersStatus(filterBy, { date: this.dateWithoutTime }).subscribe((res: any) => {
        this.ordersStatus.pendding = res.pendding;
        this.ordersStatus.rejected = res.rejected;
        this.ordersStatus.completed = res.completed;

        if(this.chart)
        {
          this.chart.destroy();
          this.keyOrderStatus=[];
          this.valueOrderStatus=[];
          this.extractKeysAndValues();
          this.createChart();
        }
      })
    }



  }


  extractKeysAndValues() {
    for (const key in this.ordersStatus) {
      if (this.ordersStatus.hasOwnProperty(key)) {
        this.keyOrderStatus.push(key);
        this.valueOrderStatus.push(this.ordersStatus[key as keyof typeof this.ordersStatus]);
      }
    }
  }

  createChart() {

    
    this.chart = new Chart("MyChart", {
      type: 'doughnut',

      data: {
        labels: this.keyOrderStatus,
        datasets: [{
          label: ' No. Orders',
          data: this.valueOrderStatus,
          backgroundColor: [
            'blue',
            'red',
            'green',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 1.5,
        
      },
      
    });
  }


  createBarChart(){
  
    this.barChart = new Chart("MyBarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Jan', 'Feb', 'March','April','May', 'June', 'July','Aug','Sep','Oct','Nov','Dec' ], 
	       datasets: [
          {
            label: "Sales",
            data: this.allOrderInYear,
            backgroundColor: '#98BDFF',
            
          }
        ]
      },
      options: {
        aspectRatio:5,
        
        scales: {
          y: {
            beginAtZero: true,
            ticks: {stepSize:1}
          
          },

        
        }
      
      }
  
  })
  }


}
