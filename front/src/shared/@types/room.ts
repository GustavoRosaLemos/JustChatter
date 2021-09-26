export interface Room {
  _id: string;
  name: string;
  description: string;
}

export interface Member {
  user: {
    _id: string;
    name: string;
    username: string;
  };
  room: {
    _id: string;
    name: string;
    key?: string;
  };
}
