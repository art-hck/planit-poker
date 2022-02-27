import { Injectable } from '@angular/core';
import { Handshake, Room, RoomRole, User } from '@common/models';
import { Select } from '@ngxs/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { UsersState } from '../states/users.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Select(UsersState.users) users$!: Observable<User[]>;
  readonly beforeLogout$ = new Subject<{ emitEvent?: boolean } | void>();
  readonly logout$ = new Subject<{ emitEvent?: boolean } | void>();
  readonly login$ = new ReplaySubject<Handshake>(1);
  readonly user$ = new ReplaySubject<User | null>(1);

  constructor() {
    this.logout$.subscribe(d => {
      this.beforeLogout$.next(d);
      window?.localStorage.removeItem('token');
      window?.localStorage.removeItem('refreshToken');
      this.user$.next(null);
    });

    window?.addEventListener('storage', e => e.key === 'token' && e.newValue === null && this.logout$.next());
  }

  hasRole(user: User, role: RoomRole, room?: Room<true>): boolean {
    return !!room?.users.find(([id]) => id === user.id)?.[1].includes(role);
  }

  isAdmin(user: User, room?: Room<true>): boolean {
    return this.hasRole(user, RoomRole.admin, room);
  }
}
