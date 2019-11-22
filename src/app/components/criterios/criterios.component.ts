import { Component, OnInit,NgZone } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

  constructor( private zone: NgZone) { }

  ngOnInit() {
  }
  reloadPage() { //click handler or similar
    this.zone.runOutsideAngular(() => {
        location.reload();

        delay(1000);
    });
}

}
