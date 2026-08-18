export interface DashboardResponse {
    users: number;
    clients: number;
    products: number;
    orders: number;
    chart: DashboardChartItem[];
}

export interface DashboardChartItem {
    month: string;
    total: number;
}