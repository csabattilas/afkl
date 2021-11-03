import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Connection} from '../../../types';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionComponent {
  @Input() connection?: Connection

  constructor() {
  }
}
