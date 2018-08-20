import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../models/cell/cell.model';
import { Ship } from '../../models/ship/ship.model';
import { ArrangeShipsService } from '../../services/arrange-ships.service';
import { FireService } from '../../services/fire.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() field: Array<Cell>;
  @Input() isShipsVisible: boolean;
  @Input() isCanFire: boolean;
  @Input() fleet: Array<Ship>;
  @Input() movesHistory: Array<string> = [];
  showButton = true;
  constructor(
    private arrangeShipService: ArrangeShipsService,
    private fireService: FireService
  ) {

  }
  ngOnInit() {
    if (this.isCanFire) {
      this.arrangeShipService.placeShips(this.field, this.fleet);
    }
  }
  arrangeShips() {
    this.arrangeShipService.placeShips(this.field, this.fleet);
    this.showButton = false;
  }
  fire(cell: Cell) {
    if (!this.isCanFire || cell.isFired) {
      return;
    }
    this.fireService.makeShot(cell);
  }
}
