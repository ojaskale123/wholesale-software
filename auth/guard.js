export function requireAuth(roles = []) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    location.href = "/login.html";
    return;
  }

  if (roles.length && !roles.includes(user.role)) {
    alert("Access denied");
    location.href = "/login.html";
    return;
  }

  return user;
}
