import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-launch-program',
  templateUrl: './launch-program.component.html',
  styleUrls: ['./launch-program.component.scss']
})
export class LaunchProgramComponent implements OnInit {
	filterObj: Object = {
		'launchYearList' : [],
		'launchStatusList' : [],
		'landStatusList' : []
	}
  	selectedFilter : Object ={};
  	dataList : Array<any> = [];
	
  	constructor(
		private actRoute: ActivatedRoute,
     	private router: Router,
     	private apiService: ApiService
  	) { 
    	this.selectedFilter['launch_year'] = this.actRoute.snapshot.queryParams.launch_year;
    	this.selectedFilter['launch_success'] = this.actRoute.snapshot.queryParams.launch_success;
    	this.selectedFilter['land_success'] = this.actRoute.snapshot.queryParams.land_success;
  	}

  	ngOnInit() {
  		this.setFilterData();
  	}

  	setFilterData(){
  		this.filterObj['launchYearList'] = [
  			{"value": "2006", "isSelected": false},
  			{"value": "2007", "isSelected": false},
  			{"value": "2008", "isSelected": false},
  			{"value": "2009", "isSelected": false},
  			{"value": "2010", "isSelected": false},
  			{"value": "2011", "isSelected": false},
  			{"value": "2012", "isSelected": false},
  			{"value": "2013", "isSelected": false},
  			{"value": "2014", "isSelected": false},
  			{"value": "2015", "isSelected": false},
  			{"value": "2016", "isSelected": false},
  			{"value": "2017", "isSelected": false},
  			{"value": "2018", "isSelected": false},
  			{"value": "2019", "isSelected": false},
  			{"value": "2020", "isSelected": false}
  		];

  		this.filterObj['launchStatusList'] = [
  			{"value": "True", "isSelected": false},
  			{"value": "False", "isSelected": false}
  		];

  		this.filterObj['landStatusList'] = [
  			{"value": "True", "isSelected": false},
  			{"value": "False", "isSelected": false}
  		];

  		this.preSelectFilter();
  	}

  	preSelectFilter(){
  		this.filterObj['launchYearList'].forEach(obj=>obj['isSelected'] = this.selectedFilter['launch_year'] == obj['value']);

  		this.filterObj['launchStatusList'].forEach(obj=>obj['isSelected'] = this.selectedFilter['launch_success'] == obj['value']);

  		this.filterObj['landStatusList'].forEach(obj=>obj['isSelected'] = this.selectedFilter['land_success'] == obj['value']);

    	this.getFilteredDataList();
  	}

  	setFilterSelection(key, position, currentStatus){
  		this.filterObj[key].forEach(obj=>obj['isSelected'] = false);
  		this.filterObj[key][position]['isSelected'] = !currentStatus;

      var filterValue = this.filterObj[key][position]['isSelected']?this.filterObj[key][position]['value'] : undefined;

  		if(key=='launchYearList')
  			this.selectedFilter['launch_year'] = filterValue;
	  	else if(key=='launchStatusList')
  			this.selectedFilter['launch_success'] = filterValue;
  		else if(key=='landStatusList')
  			this.selectedFilter['land_success'] = filterValue;
	  	
	  	this.addParamToRoute(this.selectedFilter);
  	}

  	addParamToRoute(queryParamObj){
     	this.router.navigate([], {
    		queryParams: queryParamObj,
    		queryParamsHandling: 'merge'
    	});

    	this.getFilteredDataList();
   	}

   	getFilteredDataList(){
   		var url = 'launches?limit=100';
      var queryParam = "";

      if(this.selectedFilter['launch_year'])
   		 queryParam = '&launch_year='+this.selectedFilter['launch_year'];
      if(this.selectedFilter['launch_success'])
       queryParam +='&launch_success='+this.selectedFilter['launch_success'].toLowerCase();
      if(this.selectedFilter['land_success'])
       queryParam +='&land_success='+this.selectedFilter['land_success'].toLowerCase();

      if(queryParam != "")
        url+=queryParam;

   		this.apiService.apiRequest(url, 'get')
   		.subscribe(
   			result=>{
   				this.dataList = result;

          this.dataList.forEach((obj)=>{
            if(obj['rocket'] && obj['rocket']['first_stage'] && obj['rocket']['first_stage']['cores']){
              obj['launch_landing'] = obj['rocket']['first_stage']['cores'].some(coreDetail => coreDetail['land_success']);
            };
          });

   			},
   			error =>{
   				console.log(error);
   			}
   		);

   	}
}
