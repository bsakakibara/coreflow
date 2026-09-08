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
            orders,
            ordersByStatus
        ] = await Promise.all([
            prisma.user.count(),

            prisma.client.count(),

            prisma.product.count(),

            prisma.order.count(),

            prisma.order.groupBy({
                by: ["status"],
                _count: {
                    _all: true
                }
            })
        ]);

        const now = new Date();

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

        const [
            currentMonthOrders,
            currentMonthSales
        ] = await Promise.all([

            prisma.order.count({
                where: {
                    createdAt: {
                        gte: startOfMonth,
                        lt: startOfNextMonth
                    }
                }
            }),

            prisma.order.aggregate({
                _sum: {
                    total: true
                },
                where: {
                    createdAt: {
                        gte: startOfMonth,
                        lt: startOfNextMonth
                    }
                }
            })
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

        const statusMap = {
            PENDENTE: 0,
            CONCLUIDO: 0,
            CANCELADO: 0
        };

        for (const item of ordersByStatus) {
            statusMap[item.status] = item._count._all;
        }

        return {
            users,
            clients,
            products,
            orders,
            chart,

            ordersByStatus: [
                {
                    status: "PENDENTE",
                    total: statusMap.PENDENTE
                },
                {
                    status: "CONCLUIDO",
                    total: statusMap.CONCLUIDO
                },
                {
                    status: "CANCELADO",
                    total: statusMap.CANCELADO
                }
            ],

            currentMonthOrders,
            currentMonthSales:
                Number(currentMonthSales._sum.total ?? 0)
        };
    }
}

export const dashboardService =
    new DashboardService();