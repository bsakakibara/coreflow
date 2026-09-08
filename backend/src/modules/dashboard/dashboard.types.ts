export interface DashboardResponse {
    users: number;
    clients: number;
    products: number;
    orders: number;

    chart: DashboardChartItem[];

    ordersByStatus: DashboardStatusItem[];

    currentMonthOrders: number;
    currentMonthSales: number;
}

export interface DashboardChartItem {
    month: string;
    total: number;
}

export interface DashboardStatusItem {
    status: "PENDENTE" | "CONCLUIDO" | "CANCELADO";
    total: number;
}