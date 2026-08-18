import { prisma } from "../../database/prisma";
import {
    DashboardResponse,
    DashboardChartItem
} from "./dashboard.types";

export class DashboardService {

    async getDashboard(): Promise<DashboardResponse> {

        const [
            users,
            clients,
            products,
            orders
        ] = await Promise.all([
            prisma.user.count(),
            prisma.client.count(),
            prisma.product.count(),
            prisma.order.count()
        ]);

        const ordersByMonth = await prisma.order.findMany({
            select: {
                total: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        const chartMap = new Map<string, number>();

        for (const order of ordersByMonth) {

            const month = order.createdAt
                .toLocaleString("pt-BR", {
                    month: "short"
                })
                .replace(".", "");

            const monthFormatted =
                month.charAt(0).toUpperCase() +
                month.slice(1);

            const current =
                chartMap.get(monthFormatted) ?? 0;

            chartMap.set(
                monthFormatted,
                current + Number(order.total)
            );
        }

        const chart: DashboardChartItem[] =
            Array.from(chartMap.entries()).map(
                ([month, total]) => ({
                    month,
                    total
                })
            );

        return {
            users,
            clients,
            products,
            orders,
            chart
        };
    }
}

export const dashboardService =
    new DashboardService();