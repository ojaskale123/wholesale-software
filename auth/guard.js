export function requireAuth(allowedRoles = []) {

  const raw = localStorage.getItem("currentUser");

  if (!raw) {
    window.location.href = "../login.html";
    return;
  }

  const user = JSON.parse(raw);

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    window.location.href = "../login.html";
    return;
  }

  return user;
}
