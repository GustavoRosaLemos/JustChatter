import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loadingReducer';
import { roomReducer } from './room/roomReducer';

const reducers = combineReducers({
  roomState: roomReducer,
  loadingState: loadingReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
