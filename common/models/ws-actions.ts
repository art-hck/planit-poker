import { Voting } from "./voting";
import { Uuid } from "./uuid";
import { User } from "./user";
import { Handshake } from "./handshake";
import { RoomRole } from "./room-role";
import { Room } from "./room";

export interface WsAction {
  handshake: Handshake;
  bye: { roomId?: Uuid };
  vote: { point: number, votingId: Uuid };
  unvote: { votingId: Uuid };
  flip: { votingId: Uuid };
  restartVoting: { votingId: Uuid };
  activateVoting: { votingId: Uuid }
  newVoting: { name: string, roomId: Uuid }
  deleteVoting: { votingId: Uuid }
  newRoom: { name: string }
  rooms: {}
  joinRoom: { roomId: Uuid }
  setRole: { userId: Uuid, roomId: Uuid, role: RoomRole }
  feedback: { message: string, subject: string }
}

export interface WsEvent<serialized = true> {
  handshake: Pick<Handshake, 'token' | 'refreshToken'>;
  restartVoting: Voting<serialized>;
  flip: Voting<serialized>;
  users: [Uuid, User][]
  voted: { userId: Uuid, votingId: Uuid, point?: number }
  unvoted: { userId: Uuid, votingId: Uuid }
  votings: [Uuid, Voting<serialized>][]
  activateVoting: { votingId: Uuid }
  reject: {}
  denied: {},
  newRoom: { roomId: Uuid },
  notFoundRoom: {},
  rooms: [Uuid, { id: Uuid, name: string }][]
  room: Room<serialized>
  feedback: { success: boolean }
  invalidToken: {}
}
