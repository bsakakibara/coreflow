import type { Dashboard } from "../types/dashboard";
import { api } from "./api";

export const dashboardService = {

    async getDashboard(): Promise<Dashboard> {

        const response =
            await api.get<Dashboard>("/dashboard");

        return response.data;

    }

};