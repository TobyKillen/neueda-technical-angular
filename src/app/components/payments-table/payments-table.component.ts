import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.css'
})
export class PaymentsTableComponent {

  constructor(private HttpService: HttpService) { }

  RawPriceData: any = [];
  ParsedPaymentData: any = [];

  StockChart: Array<any> = [];

  High: Array<string> = [];
  Low: Array<string> = [];
  Open: Array<string> = [];
  Close: Array<string> = [];
  Volume: Array<string> = [];
  Date: Array<string> = [];

  ngOnInit() {
    this.FetchData();
    this.createChart();
  }

  async FetchData() {

    await this.HttpService.$get('https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=C').subscribe((res: any) => {
      this.RawPriceData = res['price_data'];
      this.High = this.RawPriceData['high'];
      this.Low = this.RawPriceData['low'];
      this.Open = this.RawPriceData['open'];
      this.Close = this.RawPriceData['close'];
      this.Volume = this.RawPriceData['volume'];
      this.Date = this.RawPriceData['timestamp'];
  
      // Process the data after it has been fetched
      this.High.forEach((High: string, index: number) => {
        const ParsedData = this.parsePaymentData(High, this.Low[index], this.Open[index], this.Close[index], this.Volume[index], this.Date[index]);
        this.ParsedPaymentData.push(ParsedData);
      });  
    });
  }

  parsePaymentData(High: string, Low: string, Open: string, Close: string, Volume: string, Date: string) {

    const ParsedData =
    {
      'high': High,
      'low': Low,
      'open': Open,
      'close': Close,
      'volume': Volume,
      'date': Date
    }
    return ParsedData;
  }

  createChart() {
    console.log("Function not implemented");  
    // Ideally this should be a candlestick chart / time series chart. 
    // Guessing this is stock data of some sort. Time limited so will not implement.
  }
  



}
