import { Component, Inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Room } from '@common/models';
import { filter } from 'rxjs';
import { AuthService } from '../../../app/services/auth.service';
import { PlaningPokerWsService } from '../../../app/services/planing-poker-ws.service';
import { ConfirmComponent } from '../../../shared/component/confirm/confirm.component';
import { RoomShareDialogComponent } from '../room-share/room-share.component';

@Component({
  selector: 'pp-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss']
})
export class RoomSettingsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { room: Room<true> },
    public dialogRef: MatDialogRef<RoomSettingsComponent>,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    public pp: PlaningPokerWsService,
    public authService: AuthService,
  ) {
  }

  inviteRoom() {
    this.bottomSheet.open(RoomShareDialogComponent, { data: { roomId: this.data.room.id }, restoreFocus: false });
  }

  deleteRoom() {
    const data = {
      title: 'Удалить комнату?',
      content: 'Отменить действие будет невозможно. Все данные о голосованиях в комнате будут также удалены.',
      cancel: 'Отмена',
      submit: 'Удалить'
    };

    this.dialog.open(ConfirmComponent, { width: '360px', data, restoreFocus: false }).afterClosed().pipe(filter(Boolean))
      .subscribe(() => {
        this.pp.deleteRoom(this.data.room.id);
        this.dialogRef.close();
      });
  }

  leaveRoom() {
    this.router.navigate(['/']);
    this.pp.leaveRoom(this.data.room.id);
    this.dialogRef.close();
  }
}
