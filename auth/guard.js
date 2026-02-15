export function requireAuth(allowedRoles = []) {

  const stored = localStorage.getItem("currentUser");

  if (!stored) {
    window.location.href = "/login.html";
    return;
  }

  const user = JSON.parse(stored);

  // If allowedRoles is string, convert to array
  if (typeof allowedRoles === "string") {
    allowedRoles = [allowedRoles];
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    window.location.href = "/login.html";
    return;
  }

  return user;
}
