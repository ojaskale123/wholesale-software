export function guard(requiredRole) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== requiredRole) {
    alert("Unauthorized access");
    location.href = "/login.html";
  }
}
