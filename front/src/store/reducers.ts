import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loadingReducer';
import { roomReducer } from './room/roomReducer';
import { socketReducer } from './socket/socketReducer';

const reducers = combineReducers({
  roomState: roomReducer,
  loadingState: loadingReducer,
  socketState: socketReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
