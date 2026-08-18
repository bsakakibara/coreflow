export interface DashboardChartItem {
    month: string;
    total: number;
}

export interface Dashboard {
    users: number;
    clients: number;
    products: number;
    orders: number;
    chart: DashboardChartItem[];
}