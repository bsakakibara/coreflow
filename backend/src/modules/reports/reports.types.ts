export interface ReportStatusItem {
    status: string;
    quantity: number;
    total: number;
}

export interface ReportProductItem {
    productId: number;
    productName: string;
    quantity: number;
    total: number;
}

export interface ReportChartItem {
    month: string;
    total: number;
}

export interface ReportsResponse {
    totalOrders: number;
    totalSales: number;
    status: ReportStatusItem[];
    topProducts: ReportProductItem[];
    chart: ReportChartItem[];
}