import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loadingReducer';
import { roomReducer } from './room/roomReducer';
import { socketReducer } from './socket/socketReducer';
import { userReducer } from './user/userReducer';

const reducers = combineReducers({
  roomState: roomReducer,
  loadingState: loadingReducer,
  socketState: socketReducer,
  userState: userReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
