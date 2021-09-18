import { combineReducers } from 'redux';
import { roomReducer } from './room/roomReducer';

const reducers = combineReducers({
  roomState: roomReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
