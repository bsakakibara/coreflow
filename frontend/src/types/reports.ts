export interface ReportStatus {
    status: string;
    quantity: number;
    total: number;
}

export interface ReportTopProduct {
    productId: number;
    productName: string;
    quantity: number;
    total: number;
}

export interface ReportChartItem {
    month: string;
    total: number;
}

export interface Reports {
    totalOrders: number;
    totalSales: number;
    status: ReportStatus[];
    topProducts: ReportTopProduct[];
    chart: ReportChartItem[];
}