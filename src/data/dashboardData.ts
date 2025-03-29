export const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 5000 },
  { name: "Oct", value: 6000 },
  { name: "Nov", value: 7000 },
  { name: "Dec", value: 9000 }
];

export const revenueData = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 }
];

export const productCategoryData = [
  { name: "Clothing", value: 400 },
  { name: "Electronics", value: 300 },
  { name: "Home Goods", value: 300 },
  { name: "Beauty", value: 200 },
  { name: "Accessories", value: 100 }
];

export const customerAcquisitionData = [
  { name: "Direct", value: 500 },
  { name: "Social", value: 300 },
  { name: "Referral", value: 200 },
  { name: "Search", value: 278 },
  { name: "Email", value: 189 }
];

export const weeklyProductSales = [
  { name: "Mon", shirts: 40, pants: 24, hoodies: 28 },
  { name: "Tue", shirts: 30, pants: 13, hoodies: 20 },
  { name: "Wed", shirts: 20, pants: 98, hoodies: 28 },
  { name: "Thu", shirts: 27, pants: 39, hoodies: 40 },
  { name: "Fri", shirts: 18, pants: 48, hoodies: 35 },
  { name: "Sat", shirts: 23, pants: 38, hoodies: 42 },
  { name: "Sun", shirts: 34, pants: 43, hoodies: 28 }
];

export const productPerformanceData = [
  {
    id: "1",
    name: "Ergonomic Keyboard",
    price: "$129.99",
    sales: 432,
    status: "trending" as const,
    inventory: 56,
    conversion: 3.2,
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: "$59.99",
    sales: 287,
    status: "stable" as const,
    inventory: 124,
    conversion: 2.8,
  },
  {
    id: "3",
    name: "4K Monitor",
    price: "$349.99",
    sales: 156,
    status: "trending" as const,
    inventory: 16,
    conversion: 1.9,
  },
  {
    id: "4",
    name: "USB-C Hub",
    price: "$79.99",
    sales: 76,
    status: "declining" as const,
    inventory: 4,
    conversion: 1.1,
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: "$149.99",
    sales: 203,
    status: "stable" as const,
    inventory: 32,
    conversion: 2.4,
  },
];

export const appEcosystemData = [
  {
    id: "1",
    name: "Email Marketing Pro",
    cost: "$29.99/mo",
    costValue: 29.99,
    revenue: "$780/mo",
    roi: 2500
  },
  {
    id: "2",
    name: "Inventory Manager",
    cost: "$59.99/mo",
    costValue: 59.99,
    revenue: "$350/mo",
    roi: 480
  },
  {
    id: "3",
    name: "Customer Loyalty",
    cost: "$39.99/mo",
    costValue: 39.99,
    revenue: "$190/mo",
    roi: 375
  },
  {
    id: "4",
    name: "Abandoned Cart Recovery",
    cost: "$24.99/mo",
    costValue: 24.99,
    revenue: "$520/mo",
    roi: 1980
  },
  {
    id: "5",
    name: "Social Media Integration",
    cost: "$19.99/mo",
    costValue: 19.99,
    revenue: "$10/mo",
    roi: -50
  }
];

export const salesOverTimeData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      name: "This Week",
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: "Last Week",
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ]
};

export const topCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 12,
    spent: "$1,245.89",
    lastPurchase: "2 days ago"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 8,
    spent: "$876.32",
    lastPurchase: "1 week ago"
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    orders: 6,
    spent: "$654.18",
    lastPurchase: "3 days ago"
  }
];

export const statisticsData = {
  totalRevenue: {
    value: "$56,789.45",
    change: 12.5,
    changeLabel: "vs last month"
  },
  averageOrderValue: {
    value: "$127.89",
    change: 3.2,
    changeLabel: "vs last month"
  },
  conversionRate: {
    value: "4.5%",
    change: 1.8,
    changeLabel: "vs last month"
  },
  activeCustomers: {
    value: "1,234",
    change: -2.3,
    changeLabel: "vs last month"
  }
};
