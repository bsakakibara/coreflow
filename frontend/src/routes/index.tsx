import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { MainLayout } from "../layouts/MainLayout";
import { Clients } from "../pages/Clients";
import { Products } from "../pages/Products";
import { Orders } from "../pages/Orders";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute roles={["ADMIN"]}>
                                <Users />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/clients"
                        element={
                            <ProtectedRoute>
                                <Clients />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}