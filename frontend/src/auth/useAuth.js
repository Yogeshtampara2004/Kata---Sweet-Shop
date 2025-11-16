import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth hook
 * 
 * Gives access to authentication state and actions:
 *  - token: current JWT
 *  - role: "USER" or "ADMIN"
 *  - setToken(): update JWT and localStorage
 *  - setRole(): set user role
 *  - cartCount: current number of items in cart
 *  - addToCart(): increment cart count
 */
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
}
