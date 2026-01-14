export function requireAuth(allowedRoles = []) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login");
    location.href = "/login.html";
    return;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    alert("Access denied");
    location.href = "/login.html";
    return;
  }

  if (user.role === "SHOPKEEPER" && !user.shopId) {
    alert("Shop not assigned yet");
    location.href = "/login.html";
    return;
  }

  return user;
}
