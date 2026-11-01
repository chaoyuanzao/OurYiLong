// 地块选中状态
let activeItem = null;
// 图表实例
let pieChart = null;
let decisionPieChart = null;
// 日志存储
let eventLogList = [];
// 运行中的决议
let runningResolutions = [];

// 游戏日期
let gameDate = {month:9, day:1, hour:8};
// 时间流速
let timeSpeed = 1;

// 核心数值
const gameState = {
  stability: 85,
  satisfaction:78,
  money:250000,
  admitRate:62,
  outsource:0,
  decisionPower:{
    staff:95,
    studentUnion:4,
    normalStudent:1
  }
};

// 决议池配置
const resolutionPool = [ ... ];
// 事件池配置
const eventPool = [ ... ];
