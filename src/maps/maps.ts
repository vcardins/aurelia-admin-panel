import {bindable} from 'aurelia-framework';
import * as mapsapi from 'google-maps-api';
import * as toastr from 'toastr';
import {inject, autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//@autoinject //inject(mapsapi('<Do I really need the api key>'), EventAggregator)//'InsertYourGMAPIKeyHere'
@inject(mapsapi('<API_KEY_HERE>'), EventAggregator)
export class Maps {  
  map:any;
  geocoder:any;
  self:any;
  private ea:EventAggregator;
  
  constructor(mapsapi, eventAggregator:EventAggregator) {
    let _self = this;    
    let maps = mapsapi.then( function(maps) {
        _self.map = maps;
        _self.geocoder = new google.maps.Geocoder();
    }, function(e){
      toastr.error(e.message);
    });   
    this.ea = eventAggregator;
  }
  
  activate() {
    this.ea.subscribe('router:navigation:complete', e => {
        if (e.instruction.fragment !== "/maps") { return; }
        setTimeout(function() {
            this.map = new google.maps.Map(document.getElementById('gmap'),
            {
                center: new google.maps.LatLng(38.8977, -77.0366),
                zoom: 15
            });
        }, 100);
    });
  } 
  
}