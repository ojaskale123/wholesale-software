export function requireAuth(allowedRoles = []) {

  const userStr = localStorage.getItem("currentUser");

  if (!userStr) {
    window.location.href = "/login.html";
    return null;
  }

  const user = JSON.parse(userStr);

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    window.location.href = "/login.html";
    return null;
  }

  return user;
}
