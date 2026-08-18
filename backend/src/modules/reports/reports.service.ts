import { prisma } from "../../database/prisma";
import {
    ReportsResponse,
    ReportStatusItem,
    ReportProductItem,
    ReportChartItem
} from "./reports.types";

export class ReportsService {

    async getReports(): Promise<ReportsResponse> {

        const orders = await prisma.order.findMany({

            include: {

                items: {

                    include: {

                        product: true

                    }

                }

            },

            orderBy: {

                createdAt: "asc"

            }

        });

        const totalOrders = orders.length;

        const totalSales = orders.reduce(
            (total, order) =>
                total + Number(order.total),
            0
        );

        const statusMap = new Map<
            string,
            {
                quantity: number;
                total: number;
            }
        >();

        const productMap = new Map<
            number,
            {
                productName: string;
                quantity: number;
                total: number;
            }
        >();

        const chartMap = new Map<string, number>();

        for (const order of orders) {

            /*
             * Agrupa pedidos por status
             */

            const currentStatus =
                statusMap.get(order.status) ?? {
                    quantity: 0,
                    total: 0
                };

            statusMap.set(
                order.status,
                {
                    quantity:
                        currentStatus.quantity + 1,

                    total:
                        currentStatus.total +
                        Number(order.total)
                }
            );

            /*
             * Agrupa vendas por mês
             */

            const month =
                order.createdAt
                    .toLocaleString("pt-BR", {
                        month: "short"
                    })
                    .replace(".", "");

            const monthFormatted =
                month.charAt(0).toUpperCase() +
                month.slice(1);

            const currentMonth =
                chartMap.get(monthFormatted) ?? 0;

            chartMap.set(
                monthFormatted,
                currentMonth +
                Number(order.total)
            );

            /*
             * Agrupa produtos vendidos
             */

            for (const item of order.items) {

                const currentProduct =
                    productMap.get(item.productId) ?? {
                        productName: item.product.name,
                        quantity: 0,
                        total: 0
                    };

                productMap.set(
                    item.productId,
                    {
                        productName:
                            currentProduct.productName,

                        quantity:
                            currentProduct.quantity +
                            item.quantity,

                        total:
                            currentProduct.total +
                            Number(item.price) *
                            item.quantity
                    }
                );

            }

        }

        const status: ReportStatusItem[] =
            Array.from(statusMap.entries()).map(
                ([status, data]) => ({
                    status,
                    quantity: data.quantity,
                    total: data.total
                })
            );

        const topProducts: ReportProductItem[] =
            Array.from(productMap.entries())
                .map(
                    ([productId, data]) => ({
                        productId,
                        productName:
                            data.productName,
                        quantity:
                            data.quantity,
                        total:
                            data.total
                    })
                )
                .sort(
                    (a, b) =>
                        b.quantity - a.quantity
                )
                .slice(0, 5);

        const chart: ReportChartItem[] =
            Array.from(chartMap.entries()).map(
                ([month, total]) => ({
                    month,
                    total
                })
            );

        return {
            totalOrders,
            totalSales,
            status,
            topProducts,
            chart
        };
    }
}

export const reportsService =
    new ReportsService();