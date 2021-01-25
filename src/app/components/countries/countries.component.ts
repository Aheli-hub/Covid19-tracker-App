import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import {DateWiseData} from 'src/app/models/date-wise-data';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';



@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
   data : GlobalDataSummary []; 
   countries : string[]=[];
   totalConfirmed=0;
   totalDeaths=0;
   totalRecovered=0;
   totalActive=0;
   selectedCountryData : DateWiseData[];  
   dateWiseData;
   lineChart : GoogleChartInterface ={
     chartType :  'LineChart'
   }
  
     
   
  constructor( private service : DataServiceService) { }

  ngOnInit(): void {
    this.service.getDateWiswData().subscribe(
      (result)=>{
        this.dateWiseData= result;
        this.updateChart();
       // console.log(result);

    })
    this.service.getGlobalData().subscribe(result =>{
      this. data= result;
      this.data.forEach(cs=>{
       this.countries.push(cs.country)
      })
    })
  }
  updateChart(){
    let dataTable =[];
    dataTable.push(['Dates','Cases'])
    this.selectedCountryData.forEach(cs => {
      dataTable.push([cs.date, cs.cases])
    })

    this.lineChart = {
      chartType :'LineChart',
      dataTable : dataTable ,
      options : {
        height : 500,
        animation:{
          duration:1000,
          easing : 'out',
        },
      },

    };
  }
  updateValues(country: string){
    console.log(country); 
    this.data.forEach(cs =>{
      if(cs.country== country){
        this.totalActive=cs.active
        this.totalConfirmed=cs.confirmed
        this.totalRecovered=cs.recovered
        this.totalDeaths=cs.deaths
      }
    })
   this.selectedCountryData= this.dateWiseData[country];
   //console.log(this.selectedCountryData);
   this.updateChart();
  }

}
