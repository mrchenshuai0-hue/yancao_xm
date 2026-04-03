import { 
  Cloud, 
  Wind, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  BarChart3, 
  CalendarDays, 
  CheckCircle2, 
  Plane,
  Home,
  Bell,
  PieChart,
  FileText,
  Settings
} from 'lucide-react';

export interface ClimateRecord {
  element: string;
  value: string;
  time: string;
  station: string;
}

export const MOCK_CLIMATE_ANALYSIS = {
  temp: {
    day: [
      { element: '平均气温', value: '22.5℃', normalValue: '21.2℃', anomaly: '+1.3℃', anomalyRate: '6.1%', time: '2026-03-22', station: '宁化翠江站', trend: [20, 22, 25, 23, 21, 19, 18] },
      { element: '最高气温', value: '32.5℃', normalValue: '27.8℃', anomaly: '+4.7℃', anomalyRate: '16.9%', time: '14:30', station: '沙县夏茂站' },
      { element: '最低气温', value: '12.2℃', normalValue: '16.5℃', anomaly: '-4.3℃', anomalyRate: '26.1%', time: '05:15', station: '永安西洋站' },
      { element: '气温极差', value: '20.3℃', normalValue: '11.3℃', anomaly: '+9.0℃', anomalyRate: '79.6%', time: '2026-03-22', station: '尤溪城关站' },
    ],
    tenDay: [
      { element: '平均气温', value: '21.2℃', normalValue: '20.1℃', anomaly: '+1.1℃', anomalyRate: '5.5%', time: '03中旬', station: '宁化翠江站', trend: [18, 19, 22, 21, 23, 20, 21, 22, 24, 21] },
      { element: '平均最高气温', value: '28.5℃', normalValue: '25.2℃', anomaly: '+3.3℃', anomalyRate: '13.1%', time: '03中旬', station: '建宁濉溪站' },
      { element: '平均最低气温', value: '14.5℃', normalValue: '16.5℃', anomaly: '-2.0℃', anomalyRate: '12.1%', time: '03中旬', station: '泰宁杉城站' },
      { element: '极端最高气温', value: '33.1℃', normalValue: '28.5℃', anomaly: '+4.6℃', anomalyRate: '16.1%', time: '03-15', station: '将乐古镛站' },
      { element: '极端最低气温', value: '10.2℃', normalValue: '14.2℃', anomaly: '-4.0℃', anomalyRate: '28.2%', time: '03-11', station: '大田均溪站' },
    ],
    month: [
      { element: '平均气温', value: '20.5℃', normalValue: '19.2℃', anomaly: '+1.3℃', anomalyRate: '6.8%', time: '2026-02', station: '宁化翠江站', trend: [15, 18, 20, 22, 21, 19] },
      { element: '平均最高气温', value: '25.2℃', normalValue: '24.1℃', anomaly: '+1.1℃', anomalyRate: '4.6%', time: '2026-02', station: '明溪雪峰站' },
      { element: '平均最低气温', value: '16.8℃', normalValue: '15.8℃', anomaly: '+1.0℃', anomalyRate: '6.3%', time: '2026-02', station: '清流龙津站' },
      { element: '极端最高气温', value: '31.5℃', normalValue: '30.2℃', anomaly: '+1.3℃', anomalyRate: '4.3%', time: '02-20', station: '尤溪梅仙站' },
      { element: '极端最低气温', value: '12.2℃', normalValue: '11.1℃', anomaly: '+1.1℃', anomalyRate: '9.9%', time: '02-05', station: '沙县高桥站' },
      { element: '日平均气温≥20℃日数', value: '12天', normalValue: '10天', anomaly: '+2天', anomalyRate: '20%', time: '2026-02', station: '永安安砂站' },
    ],
    quarter: [
      { element: '平均气温', value: '18.2℃', normalValue: '17.1℃', anomaly: '+1.1℃', anomalyRate: '6.4%', time: '2026-Q1', station: '宁化翠江站', trend: [12, 15, 18, 21] },
      { element: '平均最高气温', value: '23.5℃', normalValue: '22.2℃', anomaly: '+1.3℃', anomalyRate: '5.9%', time: '2026-Q1', station: '建宁里心站' },
      { element: '平均最低气温', value: '14.2℃', normalValue: '13.1℃', anomaly: '+1.1℃', anomalyRate: '8.4%', time: '2026-Q1', station: '泰宁朱口站' },
      { element: '极端最高气温', value: '32.1℃', normalValue: '30.5℃', anomaly: '+1.6℃', anomalyRate: '5.2%', time: '03-20', station: '将乐万安站' },
      { element: '极端最低气温', value: '5.2℃', normalValue: '4.1℃', anomaly: '+1.1℃', anomalyRate: '26.8%', time: '01-15', station: '大田广平站' },
    ],
    year: [
      { element: '年平均气温', value: '19.5℃', normalValue: '18.5℃', anomaly: '+1.0℃', anomalyRate: '5.4%', time: '2025', station: '宁化翠江站', trend: [8, 10, 15, 20, 25, 28, 30, 29, 25, 20, 15, 10] },
      { element: '年极端最高气温', value: '38.5℃', normalValue: '37.2℃', anomaly: '+1.3℃', anomalyRate: '3.5%', time: '07-15', station: '沙县虬江站' },
      { element: '年极端最低气温', value: '-2.2℃', normalValue: '-3.5℃', anomaly: '+1.3℃', anomalyRate: '37.1%', time: '01-20', station: '永安曹远站' },
      { element: '最冷月平均气温', value: '8.2℃', normalValue: '7.1℃', anomaly: '+1.1℃', anomalyRate: '15.5%', time: '01月', station: '明溪盖洋站' },
      { element: '最热月平均气温', value: '28.5℃', normalValue: '27.2℃', anomaly: '+1.3℃', anomalyRate: '4.8%', time: '07月', station: '清流嵩溪站' },
      { element: '气温年较差', value: '20.3℃', normalValue: '19.2℃', anomaly: '+1.1℃', anomalyRate: '5.7%', time: '2025', station: '尤溪洋中站' },
    ]
  },
  precip: {
    day: [
      { element: '日总降水量', value: '25.5mm', normalValue: '10.2mm', anomaly: '+15.3mm', anomalyRate: '150%', time: '2026-03-22', station: '宁化翠江站', trend: [0, 0, 2, 5, 10, 5, 3, 0.5] },
      { element: '最大小时降水量', value: '1.2mm', normalValue: '4.1mm', anomaly: '-2.9mm', anomalyRate: '70.7%', time: '16:00', station: '宁化翠江站' },
    ],
    tenDay: [
      { element: '旬总降水量', value: '85.2mm', normalValue: '38.5mm', anomaly: '+46.7mm', anomalyRate: '121.3%', time: '03中旬', station: '宁化翠江站', trend: [0, 12, 25, 10, 5, 8, 15, 10, 0, 0] },
      { element: '降水日数', value: '6天', normalValue: '3天', anomaly: '+3天', anomalyRate: '100%', time: '03中旬', station: '宁化翠江站' },
      { element: '最大日降水量', value: '45.2mm', normalValue: '20.1mm', anomaly: '+25.1mm', anomalyRate: '124.9%', time: '03-15', station: '宁化翠江站' },
      { element: '最大小时降水量', value: '12.5mm', normalValue: '10.2mm', anomaly: '+2.3mm', anomalyRate: '22.5%', time: '03-15 14:00', station: '宁化翠江站' },
    ],
    month: [
      { element: '月总降水量', value: '120.5mm', normalValue: '105.2mm', anomaly: '+15.3mm', anomalyRate: '14.5%', time: '2026-02', station: '宁化翠江站', trend: [10, 25, 40, 30, 15] },
      { element: '降水日数', value: '12天', normalValue: '10天', anomaly: '+2天', anomalyRate: '20%', time: '2026-02', station: '宁化翠江站' },
      { element: '最大日降水量', value: '45.5mm', normalValue: '40.1mm', anomaly: '+5.4mm', anomalyRate: '13.5%', time: '02-10', station: '宁化翠江站' },
      { element: '最大小时降水量', value: '18.2mm', normalValue: '15.2mm', anomaly: '+3.0mm', anomalyRate: '19.7%', time: '02-10 09:00', station: '宁化翠江站' },
    ],
    quarter: [
      { element: '季总降水量', value: '350.2mm', normalValue: '320.5mm', anomaly: '+29.7mm', anomalyRate: '9.3%', time: '2026-Q1', station: '宁化翠江站', trend: [80, 120, 150] },
      { element: '降水日数', value: '35天', normalValue: '30天', anomaly: '+5天', anomalyRate: '16.7%', time: '2026-Q1', station: '宁化翠江站' },
      { element: '最大日降水量', value: '65.2mm', normalValue: '60.1mm', anomaly: '+5.1mm', anomalyRate: '8.5%', time: '03-15', station: '宁化翠江站' },
      { element: '最大月降水量', value: '150.2mm', normalValue: '135.5mm', anomaly: '+14.7mm', anomalyRate: '10.8%', time: '03', station: '宁化翠江站' },
    ],
    year: [
      { element: '年总降水量', value: '1650.5mm', normalValue: '1580.2mm', anomaly: '+70.3mm', anomalyRate: '4.4%', time: '2025', station: '宁化翠江站', trend: [50, 80, 120, 150, 250, 300, 200, 150, 120, 100, 80, 50] },
      { element: '年降水日数', value: '145天', normalValue: '138天', anomaly: '+7天', anomalyRate: '5.1%', time: '2025', station: '宁化翠江站' },
      { element: '最大日降水量', value: '125.5mm', normalValue: '110.2mm', anomaly: '+15.3mm', anomalyRate: '13.9%', time: '06-15', station: '宁化翠江站' },
      { element: '最大月降水量', value: '450.2mm', normalValue: '410.5mm', anomaly: '+39.7mm', anomalyRate: '9.7%', time: '06', station: '宁化翠江站' },
      { element: '最长连续降水日数', value: '12天', normalValue: '10天', anomaly: '+2天', anomalyRate: '20%', time: '06-05至06-16', station: '宁化翠江站' },
      { element: '最长连续无降水日数', value: '25天', normalValue: '22天', anomaly: '+3天', anomalyRate: '13.6%', time: '10-10至11-03', station: '宁化翠江站' },
    ]
  },
  sunshine: {
    day: [
      { element: '日照时长', value: '2.5h', normalValue: '7.8h', anomaly: '-5.3h', anomalyRate: '67.9%', time: '2026-03-22', station: '宁化翠江站', trend: [0, 0, 0, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0] },
    ],
    tenDay: [
      { element: '旬累计日照', value: '85.2h', normalValue: '60.5h', anomaly: '+24.7h', anomalyRate: '40.8%', time: '03中旬', station: '宁化翠江站', trend: [8, 9, 10, 10, 5, 10, 11, 12, 10, 0] },
      { element: '平均日照时长', value: '8.5h', normalValue: '6.0h', anomaly: '+2.5h', anomalyRate: '41.7%', time: '03中旬', station: '宁化翠江站' },
      { element: '最长日照时长', value: '12.2h', normalValue: '9.5h', anomaly: '+2.7h', anomalyRate: '28.4%', time: '03-15', station: '宁化翠江站' },
      { element: '最短日照时长', value: '2.0h', normalValue: '0.0h', anomaly: '+2.0h', anomalyRate: '100%', time: '03-12', station: '宁化翠江站' },
    ],
    month: [
      { element: '月累计日照', value: '180.5h', normalValue: '165.2h', anomaly: '+15.3h', anomalyRate: '9.3%', time: '2026-02', station: '宁化翠江站', trend: [30, 45, 60, 45] },
      { element: '平均日照时长', value: '6.4h', normalValue: '5.9h', anomaly: '+0.5h', anomalyRate: '8.5%', time: '2026-02', station: '宁化翠江站' },
      { element: '最长日照时长', value: '11.5h', normalValue: '10.2h', anomaly: '+1.3h', anomalyRate: '12.7%', time: '02-20', station: '宁化翠江站' },
    ],
    quarter: [
      { element: '季累计日照', value: '450.2h', normalValue: '420.5h', anomaly: '+29.7h', anomalyRate: '7.1%', time: '2026-Q1', station: '宁化翠江站', trend: [120, 150, 180] },
      { element: '平均日照时长', value: '5.2h', normalValue: '4.8h', anomaly: '+0.4h', anomalyRate: '8.3%', time: '2026-Q1', station: '宁化翠江站' },
    ],
    year: [
      { element: '年累计日照', value: '2150.5h', normalValue: '2050.2h', anomaly: '+100.3h', anomalyRate: '4.9%', time: '2025', station: '宁化翠江站', trend: [100, 120, 150, 180, 220, 250, 280, 260, 200, 180, 130, 80] },
      { element: '平均日照时长', value: '5.9h', normalValue: '5.5h', anomaly: '+0.4h', anomalyRate: '7.3%', time: '2025', station: '宁化翠江站' },
    ]
  }
};

export const MOCK_ELEMENT_DAYS = {
  temp: [
    { id: 't1', name: '平均温度≥20℃天数', value: '15', unit: '天', thresholdUnit: '℃', threshold: 20, op: '≥', period: '2026-03-01 至 2026-03-22', trend: [18, 19, 21, 22, 23, 20, 21, 22, 24, 25, 23, 22, 21, 20, 22, 23, 24, 25, 26, 24, 23, 22] },
    { id: 't2', name: '平均温度≤15℃天数', value: '2', unit: '天', thresholdUnit: '℃', threshold: 15, op: '≤', period: '2026-03-01 至 2026-03-22', trend: [14, 15, 16, 17, 18, 19, 20, 21, 22, 21, 20, 19, 18, 17, 16, 15, 14, 15, 16, 17, 18, 19] },
    { id: 't3', name: '高温持续日数(日最高气温≥35℃)', value: '0', unit: '天', thresholdUnit: '℃', threshold: 35, op: '≥', period: '2026-03-01 至 2026-03-22', trend: [28, 29, 30, 31, 32, 30, 29, 28, 27, 28, 29, 30, 31, 32, 33, 32, 31, 30, 29, 28, 27, 26] },
    { id: 't4', name: '低温持续日数(日最低气温≤5℃)', value: '0', unit: '天', thresholdUnit: '℃', threshold: 5, op: '≤', period: '2026-03-01 至 2026-03-22', trend: [8, 7, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7, 6, 7, 8, 9, 10, 11, 12, 13] },
  ],
  precip: [
    { id: 'p1', name: '日降水量≥0.1mm天数', value: '8', unit: '天', thresholdUnit: 'mm', threshold: 0.1, op: '≥', period: '2026-03-01 至 2026-03-22', trend: [0, 2.5, 0, 0, 1.2, 5.4, 0, 0, 0.8, 12.5, 0, 0, 4.2, 8.5, 15.2, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'p2', name: '日降水量≥10mm天数', value: '3', unit: '天', thresholdUnit: 'mm', threshold: 10, op: '≥', period: '2026-03-01 至 2026-03-22', trend: [0, 2.5, 0, 0, 1.2, 15.4, 0, 0, 0.8, 12.5, 0, 0, 4.2, 8.5, 15.2, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'p3', name: '连续降水天数', value: '3', unit: '天', thresholdUnit: 'mm', threshold: 0.1, op: '≥', period: '2026-03-14 至 2026-03-16', trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12.5, 15.2, 8.4, 0, 0, 0, 0, 0, 0] },
  ],
  sunshine: [
    { id: 's1', name: '晴日数(日照百分率≥60%)', value: '12', unit: '天', thresholdUnit: '%', threshold: 60, op: '≥', period: '2026-03-01 至 2026-03-22', trend: [85, 90, 88, 75, 20, 15, 65, 70, 80, 85, 30, 25, 75, 80, 85, 40, 35, 30, 25, 20, 15, 10] },
    { id: 's2', name: '阴日数(日照百分率≤20%)', value: '5', unit: '天', thresholdUnit: '%', threshold: 20, op: '≤', period: '2026-03-01 至 2026-03-22', trend: [85, 90, 88, 75, 20, 15, 65, 70, 80, 85, 30, 25, 75, 80, 85, 15, 35, 30, 25, 20, 15, 10] },
  ]
};

export const MOCK_WEATHER = {
  temp: 22,
  condition: '多云',
  aqi: 35,
  aqiLevel: '优',
  windDir: '东北风',
  windSpeed: '3级',
  humidity: '65%',
  location: '三明市宁化县翠江镇'
};

export interface Warning {
  id: number;
  category: 'regular' | 'important' | 'shortTerm' | 'direct';
  type: string;
  time: string;
  area: string;
  county: string;
  town: string;
  level: string;
  content: string;
}

export const MOCK_WARNINGS: Warning[] = [
  { 
    id: 1, 
    category: 'regular',
    type: '暴雨橙色预警', 
    time: '2026-03-12 08:30', 
    area: '宁化县全境', 
    county: '宁化县',
    town: '全部',
    level: '橙色', 
    content: '受强对流云团影响，预计未来6小时我县降雨量将达50毫米以上。' 
  },
  { 
    id: 2, 
    category: 'regular',
    type: '雷电黄色预警', 
    time: '2026-03-11 14:20', 
    area: '翠江镇、城郊镇', 
    county: '宁化县',
    town: '翠江镇',
    level: '黄色', 
    content: '预计未来12小时内我县将发生雷电活动，局部伴有短时强降水。' 
  },
  { 
    id: 3, 
    category: 'important',
    type: '重要天气预警报告', 
    time: '2026-03-10 09:15', 
    area: '三明市全境', 
    county: '全部',
    town: '全部',
    level: '重要', 
    content: '受高空槽和低层切变影响，预计12-14日我市将有一次明显的强降水过程。' 
  },
  { 
    id: 4, 
    category: 'shortTerm',
    type: '短时强天气报告', 
    time: '2026-03-12 10:00', 
    area: '宁化县北部', 
    county: '宁化县',
    town: '全部',
    level: '强天气', 
    content: '目前我县北部有强对流云团生成并向东南方向移动，预计未来2小时内将出现短时强降水。' 
  },
  { 
    id: 5, 
    category: 'direct',
    type: '短临直通信息', 
    time: '2026-03-12 10:30', 
    area: '翠江镇', 
    county: '宁化县',
    town: '翠江镇',
    level: '直通', 
    content: '翠江镇降水已达30毫米，预计未来1小时降水仍将持续。' 
  },
];

export const MOCK_ELEMENTS_STATS = Array.from({ length: 30 }, (_, i) => ({
  date: `2026-02-${(28 - i).toString().padStart(2, '0')}`,
  avgTemp: (15 + Math.random() * 10).toFixed(1),
  precipitation: (Math.random() * 20).toFixed(1),
  sunshine: (Math.random() * 10).toFixed(1),
}));

export const MOCK_DAYS_STATS = [
  { element: '高温天数(≥35℃)', count: 2, avg: 1.5, diff: '+0.5' },
  { element: '降雨天数(≥0.1mm)', count: 12, avg: 10.2, diff: '+1.8' },
  { element: '日照天数(≥6h)', count: 15, avg: 14.5, diff: '+0.5' },
  { element: '低温天数(≤5℃)', count: 0, avg: 1.2, diff: '-1.2' },
];

export const MOCK_MODIFICATION_DETAILS = Array.from({ length: 15 }, (_, i) => ({
  time: `2026-03-${(12 - i).toString().padStart(2, '0')} 10:00`,
  county: '宁化县',
  location: '翠江作业点',
  type: i % 2 === 0 ? '人工增雨' : '防雹作业',
  staff: '张三',
  volume: '50发',
  effect: '良好'
}));

export const MOCK_CERT_AREAS = [
  {
    id: 1,
    name: '宁化翠江烤烟产区',
    location: '三明市宁化县翠江镇',
    date: '2026-03-05',
    tag: '特优级',
    desc: '该产区气候温和，日照充足，土壤肥沃，是优质烤烟的核心产地。',
    image: 'https://picsum.photos/seed/tobacco1/400/200',
    indicators: [
      { name: '平均气温', value: '22.5℃', range: '20-25℃', status: '优' },
      { name: '累计降水', value: '120mm', range: '100-150mm', status: '优' },
      { name: '日照时数', value: '180h', range: '≥150h', status: '优' },
      { name: '空气湿度', value: '65%', range: '60-75%', status: '优' }
    ]
  },
  {
    id: 2,
    name: '清流龙津烤烟产区',
    location: '三明市清流县龙津镇',
    date: '2026-03-04',
    tag: '优级',
    desc: '降水适中，昼夜温差大，有利于烟叶内含物质积累。',
    image: 'https://picsum.photos/seed/tobacco2/400/200',
    indicators: [
      { name: '平均气温', value: '21.8℃', range: '20-25℃', status: '优' },
      { name: '累计降水', value: '110mm', range: '100-150mm', status: '优' },
      { name: '日照时数', value: '165h', range: '≥150h', status: '优' },
      { name: '空气湿度', value: '68%', range: '60-75%', status: '优' }
    ]
  },
  {
    id: 3,
    name: '建宁濉溪烤烟产区',
    location: '三明市建宁县濉溪镇',
    date: '2026-03-02',
    tag: '特优级',
    desc: '典型的中亚热带季风气候，水热资源丰富。',
    image: 'https://picsum.photos/seed/tobacco3/400/200',
    indicators: [
      { name: '平均气温', value: '23.1℃', range: '20-25℃', status: '优' },
      { name: '累计降水', value: '135mm', range: '100-150mm', status: '优' },
      { name: '日照时数', value: '190h', range: '≥150h', status: '优' },
      { name: '空气湿度', value: '62%', range: '60-75%', status: '优' }
    ]
  }
];

export const MOCK_PREDICTIONS = [
  {
    id: 1,
    category: 'halfMonth',
    label: '周预报',
    title: '三明市2026年3月下半月气候预测',
    publishTime: '2026-03-15 09:00',
    month: '3月',
    content: '预计3月下半月全市平均气温偏高，降水偏少。主要降水过程出现在25-27日。'
  },
  {
    id: 11,
    category: 'halfMonth',
    label: '周预报',
    title: '三明市2026年3月上半月气候预测',
    publishTime: '2026-03-01 08:30',
    month: '3月',
    content: '预计3月上半月全市平均气温略高，降水接近常年。'
  },
  {
    id: 2,
    category: 'month',
    label: '月预报',
    title: '三明市2026年4月气候趋势预测',
    publishTime: '2026-03-20 10:30',
    month: '4月',
    content: '预计4月全市平均气温偏高0.1～1℃，降水量偏少1～2成。'
  },
  {
    id: 22,
    category: 'month',
    label: '月预报',
    title: '三明市2026年3月气候趋势预测',
    publishTime: '2026-02-20 09:15',
    month: '3月',
    content: '预计3月全市平均气温偏高1～2℃，降水量偏少2～4成。'
  },
  {
    id: 3,
    category: 'season',
    label: '季节预报',
    title: '重要气象信息专报 | 三明市2026年春季（3～4月）气候预测',
    publishTime: '2026-02-28 11:50',
    season: '春季',
    subtitle: '2026年第008期',
    issuer: 'xxx',
    content: `一、冬季以来气候概况
冬季以来（2025年12月1日至2026年2月27日），全市平均气温11.6℃，偏高1.6℃，较去年同期偏高2.0℃。全市平均降水量55.2毫米，偏少173.6毫米（-75.9%），较去年同期偏少9.0毫米，为1961年以来历史同期第二少。全市各县（市、区）降水均偏少70%以上，泰宁、将乐、明溪、沙县降水量为历史同期最少。
入冬以来，全市经历了4次寒潮过程（12月13～15日、12月25～26日、1月1～3日、2月7日～9日）和1次冬旱过程，以2月7～9日的寒潮过程为最强。2025年12月中旬开始出现大范围气象干旱，2026年2月23日旱情最重；24～27日出现降水过程，旱情得到有效缓解。

二、春季气候趋势预测
（1）气温
预计春季平均气温各县（市、区）城区15～19℃，偏高0.1～1℃。
月份分布：3月，全市偏高0.1～1℃；4月，全市偏高0.1～1℃。主要冷空气过程出现在：3月6～7日（弱）、16～18日（弱）、25～27日（中等）和4月5～7日（中等）。西北部（建宁、泰宁、将乐、宁化、清流、明溪6个县）可能有一定程度的低温灾害风险。
（2）降水
预计春季总降水量230～360毫米，偏少2～4成。
月份分布：3月，全市偏少2～4成；4月，全市偏少1～2成。较明显降水时段出现在：2月28日至3月2日（中到大雨，局部暴雨）、12～13日（小到中雨）、27～28日（中到大雨）、31日至4月1日（小到中雨）和4～5日（小到中雨）。

三、重点关注
（1）春季气温变化幅度大，冷空气影响期间气温较低，关注其对人体健康、能源保供和农业生产的不利影响；预计3月下旬中期至4月上旬中期可能有中等强度冷空气过程，关注西北部低温冷害对春播的不利影响。
（2）预计春季降水偏少，气象干旱可能再次抬头，请注意加强水资源合理调配，保障春耕春播用水。
（3）春季雷暴、冰雹等强对流天气多发，需注意防范。`,
    table: [
      { county: '三元', temp: '17.5～18.4', tempNormal: '17.5', tempDiff: '略高', rain: '264.5～302.2', rainNormal: '377.8', rainDiff: '偏少' },
      { county: '宁化', temp: '16.0～16.9', tempNormal: '16.0', tempDiff: '略高', rain: '288.5～329.8', rainNormal: '412.2', rainDiff: '偏少' },
      { county: '清流', temp: '16.2～17.1', tempNormal: '16.2', tempDiff: '略高', rain: '286.5～327.4', rainNormal: '409.3', rainDiff: '偏少' },
      { county: '泰宁', temp: '15.2～16.1', tempNormal: '15.2', tempDiff: '略高', rain: '314.9～359.8', rainNormal: '449.8', rainDiff: '偏少' },
      { county: '将乐', temp: '16.9～17.8', tempNormal: '16.9', tempDiff: '略高', rain: '298.8～341.4', rainNormal: '426.8', rainDiff: '偏少' },
      { county: '建宁', temp: '15.2～16.1', tempNormal: '15.2', tempDiff: '略高', rain: '316.3～361.4', rainNormal: '451.8', rainDiff: '偏少' },
      { county: '明溪', temp: '16.3～17.2', tempNormal: '16.3', tempDiff: '略高', rain: '301.9～345.0', rainNormal: '431.3', rainDiff: '偏少' },
      { county: '沙县', temp: '17.5～18.4', tempNormal: '17.5', tempDiff: '略高', rain: '273.8～312.9', rainNormal: '391.1', rainDiff: '偏少' },
      { county: '尤溪', temp: '17.2～18.1', tempNormal: '17.2', tempDiff: '略高', rain: '237.9～271.9', rainNormal: '339.9', rainDiff: '偏少' },
      { county: '永安', temp: '17.9～18.8', tempNormal: '17.9', tempDiff: '略高', rain: '247.6～283.0', rainNormal: '353.7', rainDiff: '偏少' },
      { county: '大田', temp: '17.4～18.3', tempNormal: '17.4', tempDiff: '略高', rain: '228.1～260.7', rainNormal: '325.9', rainDiff: '偏少' },
    ]
  },
  {
    id: 33,
    category: 'season',
    label: '季节预报',
    title: '三明市2025年冬季气候预测',
    publishTime: '2025-11-28 10:00',
    season: '冬季',
    subtitle: '2025年第045期',
    issuer: 'xxx',
    content: '预计冬季全市平均气温偏高，降水偏少。'
  },
  {
    id: 4,
    category: 'year',
    label: '年度预报',
    title: '三明市2026年度气候趋势预测',
    publishTime: '2026-01-10 15:00',
    year: '2026年',
    content: '预计2026年全市平均气温偏高，总降水量偏少。需重点关注夏季高温及秋季干旱。'
  },
  {
    id: 44,
    category: 'year',
    label: '年度预报',
    title: '三明市2025年度气候趋势预测',
    publishTime: '2025-01-12 14:30',
    year: '2025年',
    content: '预计2025年全市平均气温略高，降水接近常年。'
  }
];

export const MOCK_MODIFICATION_STATS = [
  { county: '三元区', sites: 5, opTotal: 16, opRain: 12, opHail: 4, ammoTotal: 12, ammoRain: 12, ammoHail: 0, rockets: 8, flames: 4, smoke: 36 },
  { county: '大田县', sites: 8, opTotal: 13, opRain: 10, opHail: 3, ammoTotal: 3, ammoRain: 3, ammoHail: 0, rockets: 2, flames: 1, smoke: 36 },
  { county: '宁化县', sites: 12, opTotal: 8, opRain: 8, opHail: 0, ammoTotal: 24, ammoRain: 24, ammoHail: 0, rockets: 20, flames: 4, smoke: 0 },
  { county: '将乐县', sites: 4, opTotal: 2, opRain: 2, opHail: 0, ammoTotal: 6, ammoRain: 6, ammoHail: 0, rockets: 6, flames: 0, smoke: 0 },
  { county: '尤溪县', sites: 6, opTotal: 4, opRain: 4, opHail: 0, ammoTotal: 12, ammoRain: 12, ammoHail: 0, rockets: 12, flames: 0, smoke: 0 },
  { county: '建宁县', sites: 7, opTotal: 5, opRain: 5, opHail: 0, ammoTotal: 13, ammoRain: 13, ammoHail: 0, rockets: 10, flames: 3, smoke: 0 },
  { county: '永安市', sites: 9, opTotal: 7, opRain: 7, opHail: 0, ammoTotal: 0, ammoRain: 0, ammoHail: 0, rockets: 0, flames: 0, smoke: 21 },
  { county: '沙县区', sites: 6, opTotal: 6, opRain: 6, opHail: 0, ammoTotal: 18, ammoRain: 18, ammoHail: 0, rockets: 15, flames: 3, smoke: 0 },
  { county: '泰宁县', sites: 5, opTotal: 15, opRain: 15, opHail: 0, ammoTotal: 0, ammoRain: 0, ammoHail: 0, rockets: 0, flames: 0, smoke: 45 },
  { county: '清流县', sites: 8, opTotal: 4, opRain: 4, opHail: 0, ammoTotal: 12, ammoRain: 12, ammoHail: 0, rockets: 10, flames: 2, smoke: 0 },
];

export const MOCK_IRREGULAR_STATS = [
  { 
    id: 1, 
    city: '三明市', 
    stationNo: '58911', 
    stationName: '三元', 
    precip: 65.4, 
    precipAnomaly: 12.5, 
    precipAnomalyRate: 23.6, 
    precipClimate: 52.9, 
    precipLevel: '偏多', 
    precipLastYear: 48.2, 
    precipLastYearRate: 135.7,
    temp: 18.5,
    tempAnomaly: 1.2,
    tempClimate: 17.3,
    tempLastYear: 16.8,
    sunshine: 45.2,
    sunshineAnomaly: 5.2,
    sunshineClimate: 40.0,
    sunshineLastYear: 42.1
  },
  { 
    id: 2, 
    city: '三明市', 
    stationNo: '58819', 
    stationName: '沙县', 
    precip: 72.1, 
    precipAnomaly: 22.0, 
    precipAnomalyRate: 43.9, 
    precipClimate: 50.1, 
    precipLevel: '偏多', 
    precipLastYear: 50.1, 
    precipLastYearRate: 130.1,
    temp: 18.2,
    tempAnomaly: 0.8,
    tempClimate: 17.4,
    tempLastYear: 17.1,
    sunshine: 42.1,
    sunshineAnomaly: 2.1,
    sunshineClimate: 40.0,
    sunshineLastYear: 41.5
  },
  { 
    id: 3, 
    city: '三明市', 
    stationNo: '58817', 
    stationName: '建宁', 
    precip: 82.4, 
    precipAnomaly: 35.2, 
    precipAnomalyRate: 74.6, 
    precipClimate: 47.2, 
    precipLevel: '异常偏多', 
    precipLastYear: 45.5, 
    precipLastYearRate: 181.1,
    temp: 17.8,
    tempAnomaly: 1.5,
    tempClimate: 16.3,
    tempLastYear: 16.5,
    sunshine: 38.5,
    sunshineAnomaly: -1.3,
    sunshineClimate: 39.8,
    sunshineLastYear: 42.2
  },
  { 
    id: 4, 
    city: '三明市', 
    stationNo: '58818', 
    stationName: '泰宁', 
    precip: 78.5, 
    precipAnomaly: 30.1, 
    precipAnomalyRate: 62.2, 
    precipClimate: 48.4, 
    precipLevel: '偏多', 
    precipLastYear: 46.8, 
    precipLastYearRate: 167.7,
    temp: 17.5,
    tempAnomaly: 1.1,
    tempClimate: 16.4,
    tempLastYear: 16.2,
    sunshine: 39.2,
    sunshineAnomaly: -0.5,
    sunshineClimate: 39.7,
    sunshineLastYear: 41.8
  },
  { 
    id: 5, 
    city: '三明市', 
    stationNo: '58816', 
    stationName: '将乐', 
    precip: 75.2, 
    precipAnomaly: 25.5, 
    precipAnomalyRate: 51.3, 
    precipClimate: 49.7, 
    precipLevel: '偏多', 
    precipLastYear: 49.2, 
    precipLastYearRate: 152.8,
    temp: 18.0,
    tempAnomaly: 1.3,
    tempClimate: 16.7,
    tempLastYear: 16.9,
    sunshine: 41.5,
    sunshineAnomaly: 1.2,
    sunshineClimate: 40.3,
    sunshineLastYear: 43.1
  },
  { 
    id: 6, 
    city: '三明市', 
    stationNo: '58912', 
    stationName: '宁化', 
    precip: 68.9, 
    precipAnomaly: 15.4, 
    precipAnomalyRate: 28.8, 
    precipClimate: 53.5, 
    precipLevel: '偏多', 
    precipLastYear: 52.1, 
    precipLastYearRate: 132.2,
    temp: 18.3,
    tempAnomaly: 1.4,
    tempClimate: 16.9,
    tempLastYear: 17.2,
    sunshine: 43.8,
    sunshineAnomaly: 3.5,
    sunshineClimate: 40.3,
    sunshineLastYear: 42.5
  },
  { 
    id: 7, 
    city: '三明市', 
    stationNo: '58913', 
    stationName: '清流', 
    precip: 70.5, 
    precipAnomaly: 18.2, 
    precipAnomalyRate: 34.8, 
    precipClimate: 52.3, 
    precipLevel: '偏多', 
    precipLastYear: 51.5, 
    precipLastYearRate: 136.9,
    temp: 18.1,
    tempAnomaly: 1.2,
    tempClimate: 16.9,
    tempLastYear: 17.0,
    sunshine: 42.5,
    sunshineAnomaly: 2.2,
    sunshineClimate: 40.3,
    sunshineLastYear: 41.9
  },
  { 
    id: 8, 
    city: '三明市', 
    stationNo: '58914', 
    stationName: '明溪', 
    precip: 73.8, 
    precipAnomaly: 21.5, 
    precipAnomalyRate: 41.1, 
    precipClimate: 52.3, 
    precipLevel: '偏多', 
    precipLastYear: 53.2, 
    precipLastYearRate: 138.7,
    temp: 17.9,
    tempAnomaly: 1.0,
    tempClimate: 16.9,
    tempLastYear: 17.1,
    sunshine: 41.8,
    sunshineAnomaly: 1.5,
    sunshineClimate: 40.3,
    sunshineLastYear: 42.0
  },
  { 
    id: 9, 
    city: '三明市', 
    stationNo: '58915', 
    stationName: '永安', 
    precip: 62.1, 
    precipAnomaly: 8.5, 
    precipAnomalyRate: 15.9, 
    precipClimate: 53.6, 
    precipLevel: '正常', 
    precipLastYear: 55.4, 
    precipLastYearRate: 112.1,
    temp: 18.8,
    tempAnomaly: 1.6,
    tempClimate: 17.2,
    tempLastYear: 17.5,
    sunshine: 46.5,
    sunshineAnomaly: 6.2,
    sunshineClimate: 40.3,
    sunshineLastYear: 43.2
  },
  { 
    id: 10, 
    city: '三明市', 
    stationNo: '58916', 
    stationName: '尤溪', 
    precip: 58.4, 
    precipAnomaly: 5.2, 
    precipAnomalyRate: 9.8, 
    precipClimate: 53.2, 
    precipLevel: '正常', 
    precipLastYear: 52.1, 
    precipLastYearRate: 112.1,
    temp: 18.6,
    tempAnomaly: 1.4,
    tempClimate: 17.2,
    tempLastYear: 17.3,
    sunshine: 44.2,
    sunshineAnomaly: 3.9,
    sunshineClimate: 40.3,
    sunshineLastYear: 42.8
  },
  { 
    id: 11, 
    city: '三明市', 
    stationNo: '58917', 
    stationName: '大田', 
    precip: 55.2, 
    precipAnomaly: 2.1, 
    precipAnomalyRate: 4.0, 
    precipClimate: 53.1, 
    precipLevel: '正常', 
    precipLastYear: 50.5, 
    precipLastYearRate: 109.3,
    temp: 18.4,
    tempAnomaly: 1.2,
    tempClimate: 17.2,
    tempLastYear: 17.1,
    sunshine: 43.5,
    sunshineAnomaly: 3.2,
    sunshineClimate: 40.3,
    sunshineLastYear: 42.2
  },
];

export const SANMING_REGIONS = [
  { county: '三元区', towns: ['列东街道', '列西街道', '徐碧街道', '城关街道', '富兴堡街道', '荆西街道', '陈大镇', '洋溪镇', '莘口镇', '岩前镇', '中村乡'] },
  { county: '沙县区', towns: ['凤岗街道', '虬江街道', '夏茂镇', '青州镇', '高砂镇', '高桥镇', '富口镇', '大洛镇', '南霞乡', '南古镇', '郑湖乡', '湖源乡'] },
  { county: '永安市', towns: ['燕东街道', '燕西街道', '燕南街道', '燕北街道', '西洋镇', '贡川镇', '安砂镇', '小陶镇', '大湖镇', '曹远镇', '洪田镇', '槐南镇', '上坪乡', '罗坊乡', '青水畲族乡'] },
  { county: '明溪县', towns: ['雪峰镇', '盖洋镇', '胡坊镇', '瀚仙镇', '城关乡', '沙溪乡', '夏阳乡', '枫溪乡'] },
  { county: '清流县', towns: ['龙津镇', '嵩溪镇', '嵩口镇', '灵地镇', '长校镇', '温郊乡', '余朋乡', '田源乡', '沙芜乡', '林畲乡', '里田乡', '李家乡', '赖源乡'] },
  { county: '宁化县', towns: ['翠江镇', '泉上镇', '湖村镇', '石壁镇', '曹坊镇', '安远镇', '淮土镇', '安乐镇', '水茜镇', '城郊乡', '城南乡', '济村乡', '方田乡', '治平畲族乡', '中沙乡', '河龙乡'] },
  { county: '大田县', towns: ['均溪镇', '上京镇', '广平镇', '早兴镇', '太华镇', '建设镇', '奇陶镇', '华兴乡', '屏山乡', '吴山乡', '济阳乡', '武陵乡', '谢洋乡', '桃源镇', '梅山乡', '湖美乡', '前坪乡'] },
  { county: '尤溪县', towns: ['城关镇', '梅仙镇', '西滨镇', '洋中镇', '新阳镇', '管前镇', '西城镇', '尤溪口镇', '联合乡', '汤川乡', '溪尾乡', '中仙乡', '台溪乡', '坂面镇'] },
  { county: '将乐县', towns: ['古镛镇', '高唐镇', '万安镇', '白莲镇', '黄潭镇', '光明乡', '漠武乡', '南口乡', '万全乡', '安口乡'] },
  { county: '泰宁县', towns: ['杉城镇', '朱口镇', '新桥乡', '上青乡', '状元乡', '大龙乡', '开善乡', '梅口乡'] },
  { county: '建宁县', towns: ['濉溪镇', '里心镇', '均口镇', '金铙山镇', '溪口镇', '黄坊乡', '客坊乡', '伊家乡', '黄埠乡'] },
];

export const MOCK_CERTIFICATIONS = [
  {
    id: 'SN2026001',
    area: '宁化县翠江镇',
    level: 5,
    dataBasis: '平均气温22.5℃，日照充足',
    time: '2026-03-05',
    traceCode: 'SN2026001-889'
  },
  {
    id: 'SN2026002',
    area: '清流县龙津镇',
    level: 4,
    dataBasis: '降水适中，土壤湿度理想',
    time: '2026-03-04',
    traceCode: 'SN2026002-776'
  }
];
