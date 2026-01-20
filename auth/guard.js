export function requireAuth(requiredRole = null) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first");
    location.href = "/login.html";
    return;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied");
    history.back();
    return;
  }

  return user;
}
