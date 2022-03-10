import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Room, RoomRole, User, Uuid, Voting } from '@common/models';
import { Subject } from 'rxjs';
import { AuthService } from '../../../app/services/auth.service';
import { PlaningPokerWsService } from '../../../app/services/planing-poker-ws.service';
import { Colors } from '../../../shared/util/colors';
import { RoomSettingsComponent } from '../room-settings/room-settings.component';

@Component({
  selector: 'pp-room-users',
  templateUrl: './room-users.component.html',
  styleUrls: ['./room-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomUsersComponent implements OnChanges, OnDestroy {
  @Input() users?: User[] | null;
  @Input() room?: Room<true> | null;
  @Input() activeVoting?: Voting<true> | null;

  readonly voteColors = new Map<number | null, string>();
  readonly destroy$ = new Subject<void>();
  votes?: Map<Uuid, number | null>;
  readonly groups = [{
    name: 'Голосующие',
    roles: [RoomRole.user]
  }, {
    name: 'Наблюдатели',
    roles: [RoomRole.observer]
  }];

  constructor(public authService: AuthService, private dialog: MatDialog, public pp: PlaningPokerWsService) {
  }

  ngOnChanges(c: SimpleChanges) {
    if (c['activeVoting']) {
      this.votes = new Map<Uuid, number | null>(this.activeVoting?.votes);
      this.voteColors.clear();
      Array.from(new Set(this.votes.values())).sort().forEach(vote => this.voteColors.set(vote, Colors[this.voteColors.size]));
    }
  }

  openRoomSettings() {
    this.dialog.open(RoomSettingsComponent, { data: { room: this.room }, width: '350px', autoFocus: false, restoreFocus: false });
  }

  trackByFn = (index: number, item: User) => item.id;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
