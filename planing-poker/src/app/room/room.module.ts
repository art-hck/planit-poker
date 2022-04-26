import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxsModule } from '@ngxs/store';

import { AppSharedModule } from '../shared/app-shared.module';
import { RoomCardsComponent } from './components/room-cards/room-cards.component';
import { RoomCreateComponent } from './components/room-create/room-create.component';
import { RoomSettingsComponent } from './components/room-settings/room-settings.component';
import { RoomShareDialogComponent } from './components/room-share/room-share.component';
import { RoomUserComponent } from './components/room-users/room-user/room-user.component';
import { RoomUsersComponent } from './components/room-users/room-users.component';
import { RoomUsersPipe } from './components/room-users/room-users.pipe';
import { RoomVotingsCreateComponent } from './components/room-votings-create/room-votings-create.component';
import { RoomVotingsDeleteComponent } from './components/room-votings-delete/room-votings-delete.component';
import { RoomVotingsEditComponent } from './components/room-votings-edit/room-votings-edit.component';
import { RoomVotingsComponent } from './components/room-votings/room-votings.component';
import { RoomComponent } from './components/room/room.component';
import { RoomsHomeComponent } from './components/rooms-home/rooms-home.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { DoughnutDirective } from './directives/doughnut.directive';
import { RoomRoutingModule } from './room-routing.module';
import { UsersState } from './states/users.state';
import { VotingsState } from './states/votings.state';


@NgModule({
  declarations: [
    RoomComponent,
    RoomVotingsComponent,
    RoomVotingsCreateComponent,
    RoomVotingsDeleteComponent,
    RoomUsersComponent,
    RoomCardsComponent,
    RoomUsersPipe,
    RoomUserComponent,
    RoomCreateComponent,
    RoomsComponent,
    RoomShareDialogComponent,
    RoomsHomeComponent,
    RoomSettingsComponent,
    DoughnutDirective,
    RoomVotingsEditComponent,
  ],
  imports: [
    RoomRoutingModule,
    AppSharedModule,
    NgxsModule.forFeature([UsersState, VotingsState]),

    MatDividerModule,
    MatRippleModule,
    MatStepperModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSelectModule
  ]
})
export class RoomModule {
}