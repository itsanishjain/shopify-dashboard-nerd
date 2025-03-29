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
    profit: "$23,414.00",
    margin: 45,
    cost: "$71.49",
    stockDays: 28,
    totalValue: "$7,256.44",
    turnoverRate: 8.4,
    variants: 3,
    category: "Electronics"
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: "$59.99",
    sales: 287,
    status: "stable" as const,
    inventory: 124,
    conversion: 2.8,
    profit: "$7,620.00",
    margin: 38,
    cost: "$37.19",
    stockDays: 94,
    totalValue: "$4,611.56",
    turnoverRate: 3.8,
    variants: 4,
    category: "Electronics"
  },
  {
    id: "3",
    name: "4K Monitor",
    price: "$349.99",
    sales: 156,
    status: "trending" as const,
    inventory: 16,
    conversion: 1.9,
    profit: "$19,320.00",
    margin: 32,
    cost: "$237.99",
    stockDays: 22,
    totalValue: "$3,807.84",
    turnoverRate: 16.2,
    variants: 2,
    category: "Electronics"
  },
  {
    id: "4",
    name: "USB-C Hub",
    price: "$79.99",
    sales: 76,
    status: "declining" as const,
    inventory: 4,
    conversion: 1.1,
    profit: "$1,280.00",
    margin: 16,
    cost: "$67.19",
    stockDays: 11,
    totalValue: "$268.76",
    turnoverRate: 31.5,
    variants: 1,
    category: "Accessories"
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: "$149.99",
    sales: 203,
    status: "stable" as const,
    inventory: 32,
    conversion: 2.4,
    profit: "$13,810.00",
    margin: 41,
    cost: "$88.49",
    stockDays: 34,
    totalValue: "$2,831.68",
    turnoverRate: 10.5,
    variants: 6,
    category: "Electronics"
  },
  {
    id: "6",
    name: "Bluetooth Earbuds",
    price: "$89.99",
    sales: 543,
    status: "trending" as const,
    inventory: 77,
    conversion: 4.2,
    profit: "$28,215.00",
    margin: 52,
    cost: "$43.19",
    stockDays: 31,
    totalValue: "$3,325.63",
    turnoverRate: 11.9,
    variants: 3,
    category: "Audio"
  },
  {
    id: "7",
    name: "Gaming Headset",
    price: "$119.99",
    sales: 289,
    status: "trending" as const,
    inventory: 28,
    conversion: 3.8,
    profit: "$17,050.00",
    margin: 47,
    cost: "$63.59",
    stockDays: 21,
    totalValue: "$1,780.52",
    turnoverRate: 17.3,
    variants: 2,
    category: "Gaming"
  },
  {
    id: "8",
    name: "Laptop Stand",
    price: "$49.99",
    sales: 176,
    status: "stable" as const,
    inventory: 89,
    conversion: 2.6,
    profit: "$5,720.00",
    margin: 36,
    cost: "$31.99",
    stockDays: 110,
    totalValue: "$2,847.11",
    turnoverRate: 3.3,
    variants: 1,
    category: "Accessories"
  },
  {
    id: "9",
    name: "HDMI Cable",
    price: "$19.99",
    sales: 95,
    status: "declining" as const,
    inventory: 243,
    conversion: 1.4,
    profit: "$580.00",
    margin: 15,
    cost: "$16.99",
    stockDays: 555,
    totalValue: "$4,128.57",
    turnoverRate: 0.7,
    variants: 1,
    category: "Accessories"
  },
  {
    id: "10",
    name: "Wireless Charger",
    price: "$39.99",
    sales: 312,
    status: "trending" as const,
    inventory: 41,
    conversion: 3.1,
    profit: "$6,220.00",
    margin: 39,
    cost: "$24.39",
    stockDays: 29,
    totalValue: "$999.99",
    turnoverRate: 12.7,
    variants: 2,
    category: "Accessories"
  },
  {
    id: "11",
    name: "Smart Watch",
    price: "$199.99",
    sales: 198,
    status: "trending" as const,
    inventory: 24,
    conversion: 2.7,
    profit: "$17,820.00",
    margin: 43,
    cost: "$113.99",
    stockDays: 26,
    totalValue: "$2,735.76",
    turnoverRate: 13.8,
    variants: 4,
    category: "Wearables"
  },
  {
    id: "12",
    name: "LED Desk Lamp",
    price: "$59.99",
    sales: 112,
    status: "stable" as const,
    inventory: 67,
    conversion: 2.2,
    profit: "$3,700.00",
    margin: 32,
    cost: "$40.79",
    stockDays: 130,
    totalValue: "$2,732.93",
    turnoverRate: 2.8,
    variants: 3,
    category: "Home Office"
  }
];

export const productOutOfStock = [
  { id: "101", name: "Wireless Keyboard", category: "Electronics", lastAvailable: "3 days ago", estimatedArrival: "2 weeks" },
  { id: "102", name: "Noise Cancelling Headphones", category: "Audio", lastAvailable: "1 week ago", estimatedArrival: "5 days" },
  { id: "103", name: "Portable SSD", category: "Storage", lastAvailable: "2 weeks ago", estimatedArrival: "unknown" }
];

export const lowStockProducts = productPerformanceData.filter(product => product.inventory <= 20);

export const productInventoryValue = {
  totalCost: "$38,127.37",
  totalRetail: "$67,828.11",
  averageMargin: 36,
  totalProducts: 801,
  totalVariants: 42,
  averageTurnover: 8.9
};

export const productSeasonalityData = [
  { month: "Jan", tshirts: 42, hoodies: 85, sunglasses: 12, swimwear: 5 },
  { month: "Feb", tshirts: 38, hoodies: 73, sunglasses: 15, swimwear: 8 },
  { month: "Mar", tshirts: 55, hoodies: 51, sunglasses: 33, swimwear: 12 },
  { month: "Apr", tshirts: 74, hoodies: 35, sunglasses: 51, swimwear: 25 },
  { month: "May", tshirts: 85, hoodies: 16, sunglasses: 79, swimwear: 48 },
  { month: "Jun", tshirts: 98, hoodies: 8, sunglasses: 92, swimwear: 86 },
  { month: "Jul", tshirts: 102, hoodies: 5, sunglasses: 97, swimwear: 96 },
  { month: "Aug", tshirts: 94, hoodies: 9, sunglasses: 88, swimwear: 82 },
  { month: "Sep", tshirts: 76, hoodies: 24, sunglasses: 62, swimwear: 45 },
  { month: "Oct", tshirts: 58, hoodies: 52, sunglasses: 35, swimwear: 16 },
  { month: "Nov", tshirts: 47, hoodies: 73, sunglasses: 21, swimwear: 8 },
  { month: "Dec", tshirts: 52, hoodies: 91, sunglasses: 18, swimwear: 7 }
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
