// src/services/roomService.js
const getRooms = () => {
  const raw = localStorage.getItem('rooms');
  return raw ? JSON.parse(raw) : [];
};

const saveRooms = (rooms) => {
  localStorage.setItem('rooms', JSON.stringify(rooms));
};

export const roomService = {
  getAllRooms: () => getRooms(),

  addRoom: (room) => {
    const rooms = getRooms();
    const newRoom = { ...room, id: Date.now() };
    rooms.push(newRoom);
    saveRooms(rooms);
    return newRoom;
  },

  updateRoom: (id, patch) => {
    const rooms = getRooms();
    const idx = rooms.findIndex(r => r.id === id);
    if (idx === -1) return null;
    rooms[idx] = { ...rooms[idx], ...patch };
    saveRooms(rooms);
    return rooms[idx];
  },

  deleteRoom: (id) => {
    let rooms = getRooms();
    rooms = rooms.filter(r => r.id !== id);
    saveRooms(rooms);
    return rooms;
  }
};
