/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * type: {string[]}
 */

export const publicRoutes = ["/", "/auth/verify-email", "/quiz"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect to the dashboard if the user is already authenticated
 * type: {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/register-plan",
  "/auth/error",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
