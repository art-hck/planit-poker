import { User } from "@common/models";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { patch } from "@ngxs/store/operators";
import { insertOrPatch } from "../util/insert-or-patch.state-operator";
import { Users } from "../actions/users.actions";
import Fetch = Users.Fetch;

interface Model {
  users: User[];
}
type Context = StateContext<Model>;

@State<Model>({
  name: 'Users',
  defaults: ({ users: [] })
})

@Injectable()
export class UsersState {
  @Selector() static users({ users }: Model) { return users; }

  @Action(Fetch)
  fetch({ setState }: Context, { users }: Fetch) {
    setState(patch<Model>({ users: insertOrPatch((a, b) => a.id === b.id, users) }));
  }
}
