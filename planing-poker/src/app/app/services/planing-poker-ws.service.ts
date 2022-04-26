import { Injectable } from '@angular/core';
import { Handshake, Role, RoomRole, Token, Uuid, WsAction, WsEvent } from '@common/models';
import { merge, Observable, tap } from 'rxjs';
import { WsService } from './ws.service';

type PlaningPokerWsServiceEventsType = { [K in keyof WsEvent as K extends string ? `${K}$` : never]: Observable<WsEvent[K]> };
type PlaningPokerWsServiceActionsType = Record<keyof WsAction, (...args: any[]) => unknown>;
type PlaningPokerWsServiceEventsArrType = { events: Partial<{ [K in keyof WsEvent]: (payload: WsEvent[K]) => any | (keyof WsEvent)[] }> };

type PlaningPokerWsServiceType = Partial<PlaningPokerWsServiceEventsType> & PlaningPokerWsServiceActionsType & PlaningPokerWsServiceEventsArrType;

@Injectable({
  providedIn: 'root'
})
export class PlaningPokerWsService implements PlaningPokerWsServiceType {

  readonly restartVoting$ = this.ws.read('restartVoting');
  readonly flip$ = this.ws.read('flip');
  readonly voted$ = this.ws.read('voted');
  readonly rooms$ = this.ws.read('rooms');
  readonly room$ = this.ws.read('room');

  events(events: PlaningPokerWsServiceEventsArrType['events'] | (keyof WsEvent)[]) {
    return merge(...(Array.isArray(events) ? events.map(e => this.ws.read(e)) : Object.entries(events).map(([e, fn]) => this.ws.read(e as keyof WsEvent).pipe(tap(d => fn(d as any))))));
  }

  constructor(private ws: WsService) {
  }

  handshake(payload: Handshake) {
    this.ws.send('handshake', payload, { force: true });
    return this.ws.read('handshake');
  }

  bye() {
    this.ws.send('bye', {});
  }

  linkGoogle(token: Token, googleCode: string) {
    this.ws.send('linkGoogle', { token, googleCode }, { force: true });
  }

  vote(votingId: Uuid, point: string) {
    this.ws.send('vote', { point, votingId });
  }

  unvote(votingId: Uuid) {
    this.ws.send('unvote', { votingId });
  }

  flip(votingId: Uuid) {
    this.ws.send('flip', { votingId });
  }

  activateVoting(votingId: Uuid) {
    this.ws.send('activateVoting', { votingId });
  }

  restartVoting(votingId: Uuid) {
    this.ws.send('restartVoting', { votingId });
  }

  newVoting(roomId: Uuid, names: string[]) {
    this.ws.send('newVoting', { names, roomId });
  }

  newRoom(name: string, points: string[]) {
    this.ws.send('newRoom', { name, points });
  }

  joinRoom(roomId: Uuid) {
    this.ws.send('joinRoom', { roomId });
  }

  disconnectRoom(roomId: Uuid) {
    this.ws.send('disconnectRoom', { roomId });
  }

  deleteVoting(votingId: Uuid) {
    this.ws.send('deleteVoting', { votingId });
  }

  editVoting(votingId: Uuid, name: string) {
    this.ws.send('editVoting', { votingId, name });
  }

  rooms() {
    this.ws.send('rooms', {});
  }

  setRole(userId: Uuid, roomId: Uuid, role: RoomRole) {
    this.ws.send('setRole', { userId, role, roomId });
  }

  feedback(subject: string, message: string) {
    this.ws.send('feedback', { subject, message });
  }

  deleteRoom(roomId: Uuid) {
    this.ws.send('deleteRoom', { roomId });
  }

  leaveRoom(roomId: Uuid, userId?: Uuid) {
    this.ws.send('leaveRoom', { roomId, userId });
  }

  editUser(name: string, role: Role) {
    this.ws.send('editUser', { name, role });
  }
}