export enum EnumState {
  INIT = 'init',
  ESTIMATE = 'estimate',
  HISTORY = 'history',
  LOADING = 'loading',
}

export interface AppState {
  state: EnumState;
  text: string | undefined;

}