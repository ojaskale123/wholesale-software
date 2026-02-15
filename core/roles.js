// core/role.js

/**
 * Central role definitions
 * This file is the SINGLE source of truth for roles
 * Do not hardcode role strings anywhere else
 */
export const ROLES = Object.freeze({
  OWNER: "OWNER",
  SHOPKEEPER: "SHOPKEEPER",
  WORKER: "WORKER"
});

/**
 * Role helpers (safe checks)
 */
export function isOwner(user) {
  return user?.role === ROLES.OWNER;
}

export function isShopkeeper(user) {
  return user?.role === ROLES.SHOPKEEPER;
}

export function isWorker(user) {
  return user?.role === ROLES.WORKER;
}

/**
 * Role-based UI helpers
 */
export function canUpdateJobStatus(user) {
  return isWorker(user) || isShopkeeper(user);
}

export function canSendWhatsApp(user) {
  return isShopkeeper(user);
}
