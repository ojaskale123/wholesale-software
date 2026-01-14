export const Schema = {
  User: ["id", "name", "role", "shopId", "phone", "password", "createdAt"],
  Shop: ["id", "shopName", "ownerId", "shopkeeperId", "createdAt"],
  Product: ["id", "shopId", "name", "category", "price", "quantity"],
  Sale: ["id", "shopId", "productId", "quantity", "amount", "soldBy", "createdAt"],
  Attendance: ["id", "shopId", "workerId", "date", "checkIn", "checkOut"],
  Task: ["id", "shopId", "assignedTo", "description", "status"],
  AuditLog: ["id", "shopId", "userId", "action", "timestamp"]
};
