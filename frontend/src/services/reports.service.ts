import { api } from "./api";

import type { Reports } from "../types/reports";

export const reportsService = {

    async getReports(): Promise<Reports> {

        const response =
            await api.get<Reports>("/reports");

        return response.data;

    }

};