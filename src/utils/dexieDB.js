
import Dexie from "dexie";

export const db = new Dexie("TodoAppDB");
db.version(1).stores({
  todos: "id, title, completed"
});
