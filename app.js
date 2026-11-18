/* ============================================================
   好心茂名 · 山海荔乡   app.js
   纯原生 JS，无依赖。数据均可追溯到页脚所列来源。
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 图标 ---------------- */
  var ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.8 20v-5.6h4.4V20"/></svg>',
    goods: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5h17l-1.6 11.2a1 1 0 0 1-1 .8H6.1a1 1 0 0 1-1-.8L3.5 8.5Z"/><path d="M8.4 8.5c0-2.4 1.6-4.4 3.6-4.4s3.6 2 3.6 4.4"/></svg>',
    spots: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m2.5 19 6.6-10.5 4 5.6 3-3.6 5.4 8.5z"/><circle cx="17.4" cy="6.4" r="2.1"/></svg>',
    culture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.6h16"/><path d="M6.2 8.6V19M11 8.6V19M15.6 8.6V19M19.8 8.6V19"/><path d="M3 19.6h18"/><path d="m12 3.4 8.6 3.9H3.4L12 3.4Z"/></svg>',
    me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.6"/><path d="M4.8 20c.6-3.7 3.6-5.8 7.2-5.8s6.6 2.1 7.2 5.8"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="6.6"/><path d="m16 16 4.2 4.2"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.5 1.5M18.1 18.1l1.5 1.5M2.6 12h2.2M19.2 12h2.2M4.4 19.6l1.5-1.5M18.1 5.9l1.5-1.5"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.6 8.6 0 1 0 10.2 10.2Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.4-4.6-7.4-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.4 3c0 5-7.4 9.6-7.4 9.6Z"/></svg>',
    heartOn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.4S4 15.4 4 10.2A4.9 4.9 0 0 1 12 6.6a4.9 4.9 0 0 1 8 3.6c0 5.2-8 10.2-8 10.2Z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5V3.8"/><path d="m8 7.4 4-3.6 4 3.6"/><path d="M5.4 13.2v6.2a1 1 0 0 0 1 1h11.2a1 1 0 0 0 1-1v-6.2"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.6" width="14" height="12.4" rx="3"/><path d="M5 10h14"/><path d="m8 16.4-1.6 3.6M16 16.4l1.6 3.6"/><circle cx="9.2" cy="12.9" r=".9" fill="currentColor" stroke="none"/><circle cx="14.8" cy="12.9" r=".9" fill="currentColor" stroke="none"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15.4V11l1.8-4.2a2 2 0 0 1 1.8-1.2h8.8a2 2 0 0 1 1.8 1.2L20 11v4.4"/><path d="M3.2 15.4h17.6v2.4a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-.7H7.8v.7a1 1 0 0 1-1 1H5.2a1 1 0 0 1-1-1z"/><path d="M4 11h16"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.4 13.6 3 11.4l1.6-1.6 4.6.7 3.3-3.2-6-2.2 1.6-1.6 8.2 2 2.6-2.6a1.6 1.6 0 0 1 2.3 2.3l-2.6 2.6 2 8.2-1.6 1.6-2.2-6-3.2 3.3.7 4.6-1.6 1.6-2.2-7.4Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6.4-6 6.4-10.6A6.4 6.4 0 0 0 12 4a6.4 6.4 0 0 0-6.4 6.4C5.6 15 12 21 12 21Z"/><circle cx="12" cy="10.4" r="2.2"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8.5h16l-1.4 10.2a1 1 0 0 1-1 .8H6.4a1 1 0 0 1-1-.8L4 8.5Z"/><path d="M8.6 8.5c0-2.2 1.5-4 3.4-4s3.4 1.8 3.4 4"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.4v13.2l10.5-6.6z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="7.5" y="5.6" width="3.2" height="12.8" rx="1"/><rect x="13.3" y="5.6" width="3.2" height="12.8" rx="1"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M13.2 2.8 5.6 13.4h5l-1.4 7.8 8-11h-5.2z"/></svg>'
  };

  /* ---------------- 数据 ---------------- */
  var GOODS = [
    { id: 'lychee', name: '荔枝', en: 'Lychee', cat: '佳果', area: '高州 · 电白 · 茂南', img: 'assets/g-litchi', tag: '国家地理标志',
      line: '世界每五颗荔枝，就有一颗来自茂名。',
      stats: [['141.92', '万亩', '种植面积（2025）'], ['62.23', '万吨', '年产量（2025）'], ['1/5', '', '占全球产量'], ['2000+', '年', '种植历史']],
      paras: [
        '茂名在热带与亚热带的过渡带上，北靠云开大山，南临南海，两千多年来一直是荔枝的优生区。2025年全市荔枝种植141.92万亩、产量62.23万吨，约占广东一半、全国四分之一、全球五分之一。',
        '高州根子镇柏桥村的贡园里，31株古荔树龄超过500年、其中9株逾千年，是名副其实的“活的荔枝博物馆”。全市有近300个品种，白糖罂、妃子笑、桂味、糯米糍之外，早熟的“科技一号”农历二月就能上市，晚熟的“马贵荔”要到中秋。',
        '“一日色变、三日味变”曾是荔枝的死穴。茂名用冻眠锁鲜技术把它破解：冻眠荔枝可锁鲜18个月，仍能保留约八成色香味；荔枝果酒、果汁、冰淇淋等衍生产品已超过30种。'
      ],
      months: [2, 5, 6, 7, 9],
      tip: '采摘季集中在5—7月。高州根子、分界，电白霞洞是主产区；贡园研学需提前预约。' },

    { id: 'juhong', name: '化橘红', en: 'Exocarpium Citri', cat: '南药', area: '化州', img: 'assets/g-juhong', tag: '药食同源',
      line: '一味“南方人参”，只认化州这一方土。',
      stats: [['1000+', '年', '种植历史'], ['1990', '年', '载入《中国药典》'], ['2006', '年', '国家地理标志'], ['2024', '年', '入选药食同源目录']],
      paras: [
        '化橘红是化州独有的道地药材，种植史超过一千年。1990年载入《中国药典》，2006年成为国家地理标志保护产品，2012年入选广东省非物质文化遗产，2024年入选国家“药食同源”目录。',
        '化州的赤红壤富含礞石，是它“化痰理气”药性的土壤密码；明清时期，化橘红曾被列为宫廷贡品。',
        '如今它的形态早已不止一片果皮：橘红胎儿童牙膏、化橘红陈皮浆、颗粒、口服液，从入药走到了日常养生。它也是广东首个“中国气候好产品”认证的农产品。'
      ],
      months: [3, 4, 6, 7],
      tip: '3—4月看花，6—7月看果。化橘红产业博览中心可参观、可买伴手礼。' },

    { id: 'longan', name: '储良龙眼', en: 'Longan', cat: '佳果', area: '高州储良', img: 'assets/g-longan', tag: '岭南佳果',
      line: '母树在高州，甜了快一百年。',
      stats: [['7—8', '月', '集中采收'], ['储良', '村', '母树原产地'], ['桂圆肉', '', '经典加工品'], ['全国前列', '', '产区规模']],
      paras: [
        '储良龙眼原产高州储良村，果大、肉厚、爽脆、离核，是鲜食与焙干兼优的品种，也是全国推广面积最大的龙眼良种之一。',
        '在茂名，龙眼是荔枝之后的第二波甜蜜。鲜果之外，它被做成桂圆肉、桂圆干，是岭南人秋冬煲汤的常客，一锅老火汤里放几颗，甜得很克制。'
      ],
      months: [7, 8],
      tip: '龙眼性温，别一次吃太多；配绿豆汤或淡盐水更稳妥。' },

    { id: 'chenxiang', name: '沉香', en: 'Agarwood', cat: '南药', area: '电白观珠', img: 'assets/g-chenxiang', tag: '中国沉香之乡',
      line: '一片万钱，香出电白。',
      stats: [['27.72', '万亩', '种植面积'], ['68.6', '亿元', '全产业链产值'], ['8500+', '家', '企业与合作社'], ['15', '万人', '从业人口']],
      paras: [
        '电白观珠镇沙垌村，是全国奇楠育苗和种植最集中、数量最多的地方。种苗、种植、加工、销售在这里连成一条街——沙垌香街，也连成了一个年产值68.6亿元的产业。',
        '沉香树浑身是宝：叶子制茶，香材提油，枝干做雕件，还能入药。围绕种植、加工、流通、收藏、文创、康养，电白把一棵树做成了一条“三产融合”的链。',
        '茂名正朝年产值100亿元的目标推进，沉香也被列入“五棵树一条鱼一桌菜”特色产业矩阵。'
      ],
      months: [1,2,3,4,5,6,7,8,9,10,11,12],
      tip: '沙垌沉香中心、沙垌香街可逛；真沉香香气层次分明，别贪便宜。' },

    { id: 'sanjhua', name: '三华李', en: 'Sanhua Plum', cat: '佳果', area: '信宜钱排', img: 'assets/g-sanjhua', tag: '中国李乡',
      line: '五月李乡，酸得漂亮。',
      stats: [['5—6', '月', '上市期'], ['钱排', '镇', '核心产区'], ['530', '', '享李季节点'], ['山水双合', '', '李花观赏地']],
      paras: [
        '信宜钱排一带是广东最大的三华李产区。果皮紫红带白霜，果肉玫红，脆而多汁，咬开先是清酸，随后回甘。',
        '每年5月末，“530享李季”开场，摘李、品李、山地跑一并上阵；到了花期，钱排的“中国李乡·山水双合”又是一片雪白。'
      ],
      months: [1, 2, 5, 6],
      tip: '李花在1—2月，果在5—6月；山路多弯，自驾注意会车。' },

    { id: 'banana', name: '香蕉', en: 'Banana', cat: '佳果', area: '高州', img: 'assets/g-banana', tag: '北运主力',
      line: '高州蕉，甜了几百年。',
      stats: [['400+', '年', '种植历史'], ['全年', '', '有果上市'], ['鉴江', '两岸', '主产区'], ['北运', '', '重要菜果']],
      paras: [
        '高州种蕉的历史可追到明清，如今是广东重要的香蕉产区，也是北运菜果的主力之一。蕉园多分布在鉴江两岸的冲积平原上。',
        '当地人说香蕉要“够熟才甜”，七分熟下树、路上慢慢转黄，到北方刚好。香蕉干、蕉叶包粽，也都是它在这片土地上的延伸。'
      ],
      months: [1,2,3,4,5,6,7,8,9,10,11,12],
      tip: '整串买回家挂着，从下往上熟，能吃半个月。' },

    { id: 'tilapia', name: '罗非鱼', en: 'Tilapia', cat: '水产', area: '茂南 · 高州 · 化州', img: 'assets/g-tilapia', tag: '中国罗非鱼之都',
      line: '一条鱼，游出“中国罗非鱼之都”。',
      stats: [['26', '万亩', '养殖面积'], ['28', '万吨', '年产量'], ['1/7', '', '占全国产量'], ['出口', '', '远销海外']],
      paras: [
        '茂名是“中国罗非鱼之都”，产量约占全国七分之一。池塘、网箱、循环水养殖并行，从鱼苗、饲料到加工出口，形成了一条完整的链。',
        '本地吃法很朴素：清蒸淋豉油，或者香煎到两面金黄。它没有土腥味，价格又实在，是茂名人餐桌上的日常蛋白。'
      ],
      months: [10, 11, 12, 1],
      tip: '秋冬的罗非鱼最肥；买活鱼让档主代杀，回家立刻清蒸。' },

    { id: 'jiecai', name: '水东芥菜', en: 'Mustard Green', cat: '山林', area: '电白水东', img: 'assets/g-jiecai', tag: '地理标志',
      line: '霜降之后，最脆的一口。',
      stats: [['秋冬', '', '最佳时节'], ['无渣', '', '口感特点'], ['清甜', '', '白灼即好'], ['地理标志', '', '保护产品']],
      paras: [
        '水东芥菜叶柄肥厚、纤维少，清炒、白灼、与腊味同炒都清甜。当地人讲它“霜打之后最好吃”，入冬到次年三月是上桌高峰。',
        '一碟白灼芥菜，淋一勺熟油和生抽，是茂名人吃海鲜、吃鸡时的固定搭配——解腻，也压得住场。'
      ],
      months: [11, 12, 1, 2, 3],
      tip: '买的时候挑叶柄短而厚的，回家焯水十秒就够。' },

    { id: 'chicken', name: '怀乡鸡', en: 'Huixiang Chicken', cat: '山林', area: '信宜怀乡', img: 'assets/g-chicken', tag: '地方良种',
      line: '走地一百八十天，才叫鸡味。',
      stats: [['信宜', '', '原产地'], ['走地', '', '山地散养'], ['三黄', '', '羽黄脚黄喙黄'], ['白切', '', '最佳吃法']],
      paras: [
        '怀乡鸡是信宜的传统地方鸡种，羽黄、脚黄、喙黄，散养在山地林间，运动量大，肉质紧实。',
        '最地道的吃法是白切：浸熟、过冷、斩件，蘸沙姜酱油。皮爽、肉滑、骨带香，是茂名人判断一只鸡好不好的全部标准。'
      ],
      months: [1,2,3,4,5,6,7,8,9,10,11,12],
      tip: '信宜山区农家乐现杀现做，提前一小时打电话。' },

    { id: 'gaoliang', name: '高凉菜', en: 'Gaoliang Cuisine', cat: '一桌菜', area: '茂名全域', img: 'assets/g-gaoliang', tag: '茂名古称',
      line: '一桌菜，是茂名人的待客之道。',
      stats: [['高凉', '', '茂名古称'], ['清鲜', '', '口味底色'], ['十大名菜', '', '官方评选'], ['550亿', '元', '特色产业链产值']],
      paras: [
        '“高凉”是茂名的古称，高凉菜也是这套饮食的名字。它讲究原味、清鲜：白切鸡、化州香油鸡、水东鸭粥、电白海鲜、簸箕炊、捞粉，都在这一桌里。',
        '茂名把这张餐桌做成了产业，与“五棵树”（荔枝、龙眼、三华李、化橘红、沉香）和“一条鱼”（罗非鱼）并称，全产业链产值已经突破550亿元，带动近60万农民。'
      ],
      months: [1,2,3,4,5,6,7,8,9,10,11,12],
      tip: '想一次吃全，去高凉墟或市区老字号；人少就点鸡、粥、粉三样。' }
  ];

  var SPOTS = [
    { id: 'diyitan', name: '中国第一滩', area: '电白', cat: '滨海', img: 'assets/s-diyitan', tag: '4A 景区',
      line: '十二公里沙滩，赤脚走完要一个下午。',
      stats: [['12', '公里', '沙滩长度'], ['4A', '', '景区等级'], ['免费', '', '海滨浴场'], ['40', '分钟', '距茂名站']],
      paras: [
        '沙质细白、坡度平缓，是中国最早一批海滨度假区之一。清晨赶海、傍晚看落日，冬天人少风清，整片海都安静。',
        '沙滩上有遮阳伞和马尾松林，往东接晏镜岭，往西是博贺渔港，一条线能串起茂名最好的海岸。'
      ], tip: '夏天午后紫外线强，建议早上或傍晚来；停车位周末紧张。' },

    { id: 'fangjidao', name: '放鸡岛', area: '电白博贺', cat: '滨海', img: 'assets/s-fangjidao', tag: '潜水胜地',
      line: '潜下去，看清一口南海。',
      stats: [['亚洲', '', '大型潜水基地'], ['20', '分钟', '船程'], ['环岛', '', '步道'], ['露营', '', '可过夜']],
      paras: [
        '放鸡岛在博贺港外，海水能见度高，是亚洲知名的大型潜水基地，浮潜、深潜、海钓都能安排。',
        '岛上有环岛步道、灯塔和观景平台，傍晚的落日是保留节目。想住一晚，岛上有民宿和露营地。'
      ], tip: '需在博贺码头乘船上岛，风浪大时会停航，出发前先问船班。' },

    { id: 'langman', name: '浪漫海岸', area: '电白', cat: '滨海', img: 'assets/s-langman', tag: '度假区',
      line: '粉色晚风，宜早不宜迟。',
      stats: [['5.3', '公里', '海岸线'], ['椰林', '', '草坪与泳池'], ['婚拍', '', '热门基地'], ['落日', '', '最佳时段']],
      paras: [
        '浪漫海岸把椰林、草坪、无边泳池和婚拍基地连成一线，是茂名最容易出片的一段海岸。',
        '傍晚天光会从橙红转成浅粉，海面像被打磨过的镜子。带一条薄外套，海风到夜里会凉。'
      ], tip: '住度假区内可以免去来回奔波；日落前40分钟到海边最好。' },

    { id: 'xianmiao', name: '冼太庙 · 冼夫人故里', area: '电白电城 / 高州', cat: '人文', img: 'assets/s-xianmiao', tag: '4A 景区',
      line: '我事三代主，唯用一好心。',
      stats: [['400+', '座', '茂名冼太庙'], ['国家级', '', '重点文保单位'], ['4A', '', '故里景区'], ['1400+', '年', '信仰延续']],
      paras: [
        '冼夫人是南北朝至隋的俚人领袖，历梁、陈、隋三朝，一生维护国家统一与岭南安定。周恩来称她为“中国巾帼英雄第一人”。',
        '茂名有400余座冼太庙，“唯用一好心”六个字，后来成了这座城市的精神坐标——好心茂名。',
        '电白电城的冼太夫人故里文化旅游景区为国家4A级景区，其中的隋谯国夫人冼氏墓是全国重点文物保护单位。'
      ], tip: '庙内安静，请勿喧哗；农历十一月廿四冼夫人诞辰前后最热闹。' },

    { id: 'haoxinhu', name: '好心湖 · 露天矿生态公园', area: '茂南', cat: '城区', img: 'assets/s-haoxinhu', tag: '城市公园',
      line: '一座矿坑，改成了一汪湖。',
      stats: [['1958', '年', '开始开采'], ['2013', '年', '停止开采'], ['10', '平方公里', '公园范围'], ['免费', '', '开放']],
      paras: [
        '1958年起，这里开始开采油页岩，一度是南方最大的露天矿，茂名“南方油城”的名字由此而来。2013年停止开采后，矿坑引水成湖。',
        '如今湖面碧绿，崖壁裸露着地层，环湖绿道把工业遗迹和草木连在一起。傍晚来散步，能看到茂名最特别的一段天际线。'
      ], tip: '环湖一圈约10公里，骑行最舒服；日落时分光线最好。' },

    { id: 'boghe', name: '博贺渔港', area: '电白', cat: '滨海', img: 'assets/s-boghe', tag: '广东最大渔港',
      line: '广东最大渔港，凌晨三点最热闹。',
      stats: [['广东', '', '最大渔港'], ['全国', '', '海蜇 南风螺基地'], ['8月', '', '开渔节'], ['海丝', '', '始发港之一']],
      paras: [
        '博贺港是广东最大的渔港，也是全国最大的海蜇、南风螺生产基地，古代海上丝绸之路的始发港之一。',
        '凌晨三点，渔船靠岸、冰块落地、吆喝四起，是这座港口一天里最有生命力的时刻。8月中旬开渔节，千帆竞发。'
      ], tip: '码头湿滑，穿防滑鞋；买海鲜记得让档主加冰打包。' },

    { id: 'douzhou', name: '窦州古城 · 窦州墟', area: '信宜镇隆', cat: '人文', img: 'assets/s-douzhou', tag: '千年州府',
      line: '一座墟，装下千年州府。',
      stats: [['八坊村', '', '全国乡村旅游重点村'], ['古城墙', '', '明清遗存'], ['五大墟', '', '茂名样板墟'], ['逢墟日', '', '最热闹']],
      paras: [
        '镇隆八坊村是全國乡村旅游重点村，古城墙、学宫、书院、骑楼街层层叠叠，走一圈像翻了一遍粤西的地方志。',
        '窦州墟是茂名五大样板墟之一。逢墟日，竹器、农具、小吃、非遗展演一起摆开，是“趁墟”文化最鲜活的样子。'
      ], tip: '墟日人多，自驾停在外围步行进入；学宫适合慢慢看。' },

    { id: 'wenquan', name: '御水古温泉', area: '电白麻岗', cat: '滨海', img: 'assets/s-wenquan', tag: '温泉度假',
      line: '泡在古温泉里，听一夜虫鸣。',
      stats: [['唐风', '', '园林建筑'], ['多种', '', '矿物质成分'], ['秋冬', '', '最佳季节'], ['住宿', '', '可过夜']],
      paras: [
        '御水古温泉在电白麻岗，出水温度高、水质含多种矿物质，园区以唐风建筑与园林造景取胜。',
        '白天在海边吹风，晚上来这里泡汤，是茂名冬天最舒服的一条线路。'
      ], tip: '泡汤前后补水；单次不超过20分钟，心血管疾病人群先问医生。' },

    { id: 'yanjing', name: '晏镜岭 · 滨海旅游公路', area: '电白', cat: '滨海', img: 'assets/s-yanjing', tag: '骑行路线',
      line: '一路向海，左边是山，右边是浪。',
      stats: [['西葛驿站', '', '观海平台'], ['滨海路', '', '骑行首选'], ['日落', '', '最佳时段'], ['免费', '', '开放']],
      paras: [
        '晏镜岭临海而立，山下是滨海旅游公路与西葛驿站。公路贴着海岸线走，一边是山，一边是浪。',
        '骑一段、停一段，是这条线最好的打开方式。日落时海面泛金，风把一天的暑气都吹散了。'
      ], tip: '骑行注意来往车辆，公路部分路段无独立非机动车道。' },

    { id: 'gongyuan', name: '柏桥荔博园 · 贡园', area: '高州根子', cat: '荔乡', img: 'assets/s-gongyuan', tag: '千年古荔',
      line: '千年古荔，还在这里结果。',
      stats: [['39', '株', '贡园古荔'], ['31', '株', '逾500年'], ['9', '株', '逾千年'], ['300万+', '人次', '柏桥服务区客流']],
      paras: [
        '贡园在高州根子镇柏桥村，古荔中31株超过500年、其中9株逾千年，“白糖罂”之名就出自这里。',
        '柏桥荔博园把荔枝文化、研学、民宿、集市装进一个山谷；包茂高速柏桥服务区与园区连通，年客流超过300万人次，是“交农文旅”融合的样板。'
      ], tip: '5—6月采摘季最好玩；古树只看不摘，请勿攀爬。' }
  ];

  var FOOD = [
    { id: 'laofen', name: '捞粉', area: '全市', cat: '早餐', img: 'assets/f-laofen', tag: '早餐标配',
      line: '一碟捞粉，茂名人的开机键。',
      stats: [['早餐', '', '最常见'], ['韭菜油', '', '灵魂'], ['3—6', '元', '一碟'], ['配白粥', '', '标准配置']],
      paras: ['薄河粉淋上韭菜油和生抽，撒一把生蒜米，筷子一拌，米香、油香、蒜香一起上来。', '茂名人的早晨常是这样开始的：一碟捞粉，一碗白粥，吃完才算醒了。'],
      tip: '韭菜油是自家熬的，各家味道不同，多试两家。' },

    { id: 'bogecui', name: '簸箕炊', area: '全市', cat: '小吃', img: 'assets/f-bogecui', tag: '竹簸箕蒸',
      line: '三层米浆，一层一层蒸出来。',
      stats: [['3+', '层', '米浆叠加'], ['菱形', '', '标准切法'], ['香油', '', '芝麻蒜蓉'], ['咸香', '', '软滑']],
      paras: ['米浆倒进竹簸箕蒸熟，刷一层油再淋米浆，如此反复至少三次。出锅切成菱形块，浇香油、撒芝麻与蒜蓉。', '软滑咸香，是很多茂名人童年记忆里的味道。'],
      tip: '趁热吃最软；凉了会变硬，可以稍微蒸一下。' },

    { id: 'he', name: '籺', area: '全市', cat: '小吃', img: 'assets/f-he', tag: '当地读“ei”',
      line: '万物皆可籺。',
      stats: [['薯包籺', '', '木薯粉包馅'], ['寿桃籺', '', '祝寿用'], ['灰水籺', '', '碱水粽'], ['煮籺', '', '糯米大饺']],
      paras: ['木薯粉包花生、猪肉、虾米、香菇，是薯包籺；老人过生日做寿桃籺；枧沙泡糯米包粽叶煮透，是灰水籺；糯米皮裹韭菜、猪肉、花生、虾米，做成大饺子，是煮籺。', '籺大概是茂名最包容的食物，什么馅都能装进去。'],
      tip: '籺店多在小巷里，早上和下午各出一炉。' },

    { id: 'niuzha', name: '化州牛杂', area: '化州', cat: '小吃', img: 'assets/f-niuzha', tag: '剪刀现剪',
      line: '一把剪刀，一锅清汤。',
      stats: [['清汤', '', '与广式不同'], ['剪刀', '', '想吃多少剪多少'], ['两罐', '酱', '辣与不辣'], ['5—20', '元', '人均']],
      paras: ['不同于广式牛杂的酱香浓郁，化州牛杂用高汤清炖，酥而不烂，突出的是本味。', '档口两口白瓷罐，一辣一不辣；老板拿一把剪刀，指哪剪哪。'],
      tip: '先喝一口汤，再蘸酱；牛膀、牛肠最考验火候。' },

    { id: 'tangshui', name: '化州糖水', area: '化州', cat: '甜品', img: 'assets/f-tangshui', tag: '开到深夜',
      line: '中国糖水在广东，广东糖水在化州。',
      stats: [['2', '元起', '一碗'], ['深夜', '', '营业到凌晨'], ['番薯', '', '基本款'], ['海带绿豆', '', '消暑']],
      paras: ['化州是重要的甘蔗产地，当地人用蔗糖煮番薯，就是最基础的番薯糖水；香芋椰汁西米、海带绿豆、鹌鹑蛋西米、莲子百合红豆沙，搭出一个“化州糖水宇宙”。', '太阳下山，暑气稍歇，糖水铺才刚开始热闹。'],
      tip: '一碗糖水配一份炒粉，是本地人的宵夜公式。' },

    { id: 'yazhou', name: '水东鸭粥', area: '电白水东', cat: '主食', img: 'assets/f-yazhou', tag: '深夜食堂',
      line: '鸭汤煲粥，党参北芪打底。',
      stats: [['整鸭', '', '同煮取汤'], ['药材', '', '党参 北芪'], ['白切鸭', '', '必点'], ['无菜单', '', '老店风格']],
      paras: ['整鸭与党参、北芪同煮，汤再拿来煲粥，粥底绵滑，带着淡淡药香。', '老店往往连菜单都没有，只卖鸬鸭、鸭杂、鸭粥、捞粉、芥菜五样——大道至简。'],
      tip: '鸭粥要趁热；白切鸭蘸酱油花生油蒜末。' },

    { id: 'haixian', name: '电白海鲜', area: '电白', cat: '海味', img: 'assets/f-haixian', tag: '上岸就上桌',
      line: '上岸就上桌，鲜字当头。',
      stats: [['博贺港', '', '广东最大渔港'], ['海蜇', '', '全国最大基地'], ['白灼', '', '最佳做法'], ['当季', '', '看渔获']],
      paras: ['博贺港的渔获当天上市，白灼海蟹、对虾、沙虫，清蒸石斑，吃的就是一个“鲜”字。', '在大排档点单，先看冰台上的货色，再决定怎么做。'],
      tip: '海鲜按斤计价，点单前确认单价与做法。' },

    { id: 'baiqie', name: '白切鸡 · 香油鸡', area: '全市 / 化州', cat: '硬菜', img: 'assets/f-baiqie', tag: '待客硬菜',
      line: '一只鸡的两种体面。',
      stats: [['白切', '', '沙姜酱油'], ['香油', '', '二十多种香料'], ['走地', '', '阉鸡为上'], ['浸熟', '', '骨微带血']],
      paras: ['白切鸡用浸煮，皮爽肉滑，蘸沙姜酱油最见功夫。', '化州香油鸡的关键在“香油”：花生油为底，加二十多种香料熬制，淋在斩件的走地阉鸡上，撒一层芝麻，油光发亮。'],
      tip: '鸡要现斩现吃，放久了皮会回软。' }
  ];

  var CULTURE = [
    { id: 'c-xianfuren', name: '冼夫人：唯用一好心', area: '电白 · 高州', cat: '人物', img: 'assets/c-xianfuren', tag: '1400年',
      line: '“我事三代主，唯用一好心。”',
      stats: [['梁陈隋', '', '历三朝'], ['400+', '座', '茂名冼太庙'], ['巾帼', '', '第一人'], ['好心', '', '城市精神']],
      paras: [
        '冼夫人出生于高凉俚人望族，历经梁、陈、隋三朝，一生维护国家统一、促进岭南安定与民族融合。',
        '她留下的那句话——“我事三代主，唯用一好心”，后来成了茂名的城市精神：好心茂名。今天走在茂名街头，“好心”两个字随处可见。',
        '冼夫人信俗已列入国家级非物质文化遗产名录，每年农历十一月廿四她的诞辰前后，各座冼太庙都会迎来最热闹的日子。'
      ], tip: '电白电城冼太夫人故里、高州冼太庙都可以参观。' },

    { id: 'c-nianli', name: '年例：一年中最重要的一顿饭', area: '全市', cat: '民俗', img: 'assets/c-nianli', tag: '正月到二月',
      line: '不是过年，胜似过年。',
      stats: [['正月', '', '起年例'], ['八仙桌', '', '摆宗台'], ['游神', '', '飘色 舞狮'], ['全村', '', '流水席']],
      paras: [
        '年例是粤西独有的民俗：每个村有自己的日子，从正月初二到二月底陆续开席，分“起年例”“正年例”“年例尾”。',
        '这一天，家家摆八仙桌、供三牲果品，叫“摆宗台”；游神队伍抬着神像巡村，飘色、舞狮、木偶戏跟着走；亲戚朋友不请自来，坐下就吃。',
        '茂名人说：年例那天，家里来的人越多，这一年越旺。'
      ], tip: '做客年例带一份手信即可；吃完记得说一句“多谢款待”。' },

    { id: 'c-piaose', name: '飘色与花灯：把故事抬上街', area: '信宜 · 高州', cat: '非遗', img: 'assets/c-piaose', tag: '省级非遗',
      line: '小孩扮成戏文，站在半空里。',
      stats: [['飘色', '', '造型巡游'], ['花灯', '', '六双花灯'], ['正月', '', '集中展演'], ['非遗', '', '省级名录']],
      paras: [
        '飘色是把孩童扮成戏曲人物，固定在精心伪装的钢架上巡游，远看像悬在半空。信宜飘色以“险、巧、美”著称。',
        '六双花灯则是另一种热闹：竹篾扎架、彩纸糊面，点上灯，一条街都亮起来。正月里，这两样常常同场。'
      ], tip: '巡游多在正月，具体日期各村不同，问本地人最准。' },

    { id: 'c-muxi', name: '高州木偶戏：一个人的戏班', area: '高州', cat: '非遗', img: 'assets/c-muxi', tag: '国家级非遗',
      line: '一副担子，就是一台戏。',
      stats: [['单人', '', '一担戏箱'], ['国家级', '', '非遗名录'], ['村头', '', '常演不衰'], ['唱腔', '', '高腔 粤调']],
      paras: [
        '高州木偶戏俗称“鬼仔戏”，一人一担：挑着戏箱走村串巷，支起台子，敲锣、打鼓、唱曲、操纵木偶，全由一人完成。',
        '2006年，高州木偶戏列入第一批国家级非物质文化遗产名录。如今在年例、庙会、村庆上，仍能看到老艺人一个人撑起一台戏。'
      ], tip: '年例期间在村里最容易遇到；看完可以给个彩头。' },

    { id: 'c-tiaohuapeng', name: '化州跳花棚：傩面下的古老舞步', area: '化州', cat: '非遗', img: 'assets/c-tiaohuapeng', tag: '国家级非遗',
      line: '戴着傩面，跳一支祈丰年的舞。',
      stats: [['傩舞', '', '驱邪祈丰'], ['花棚', '', '竹木扎制'], ['国家级', '', '非遗名录'], ['正月', '', '上演']],
      paras: [
        '跳花棚是化州特有的傩舞，舞者戴木刻傩面，在扎起的花棚前按固定程式起舞，祈求风调雨顺、五谷丰登。',
        '它保留了大量古傩的动作与仪轨，被称为研究岭南民俗的“活化石”。'
      ], tip: '多在正月演出，场面古朴，适合安静观看。' },

    { id: 'c-gongyuan', name: '千年荔乡：一骑红尘妃子笑', area: '高州', cat: '历史', img: 'assets/s-gongyuan', tag: '2000年',
      line: '一颗荔枝，写进了唐诗。',
      stats: [['2000+', '年', '种植史'], ['39', '株', '贡园古荔'], ['9', '株', '逾千年'], ['近300', '个', '品种']],
      paras: [
        '“一骑红尘妃子笑，无人知是荔枝来。”荔枝入贡的故事流传千年，而茂名高州根子的贡园，被认为是这段故事最实在的注脚。',
        '园中古荔31株超过500年、其中9株逾千年，至今仍然结果。2025年，茂名荔枝种植141.92万亩、产量62.23万吨。'
      ], tip: '贡园在柏桥村，与柏桥荔博园、包茂高速柏桥服务区连成一片。' }
  ];

  var ROUTES = [
    { id: 'r1', cls: '', days: '2 天 1 夜', name: '山海两日', area: '电白滨海环线', time: '自驾约 120 公里',
      steps: ['D1 中国第一滩 — 晏镜岭滨海公路 — 浪漫海岸看日落', 'D2 博贺码头乘船上放鸡岛浮潜 — 回港吃海鲜 — 返程'] },
    { id: 'r2', cls: 'r2', days: '1 天', name: '荔乡一日', area: '高州根子 · 城区', time: '自驾约 90 公里',
      steps: ['柏桥贡园看千年古荔 — 柏桥荔博园研学', '储良龙眼坊 — 高州冼太庙 — 晚宿高州吃高凉菜'] },
    { id: 'r3', cls: 'r3', days: '3 天 2 夜', name: '山城三日', area: '信宜 · 化州', time: '自驾约 260 公里',
      steps: ['D1 窦州古城八坊村 — 窦州墟趁墟', 'D2 钱排“中国李乡·山水双合” — 马安竹海', 'D3 化橘红产业博览中心 — 化州牛杂与糖水 — 返程'] }
  ];

  var TIMELINE = [
    { y: '约 6 世纪', t: '冼夫人出高凉', d: '冼夫人出生于高凉俚人望族，历梁、陈、隋三朝，“唯用一好心”流传至今。' },
    { y: '唐', t: '荔枝入贡', d: '“一骑红尘妃子笑”，高州贡园古荔相传植于此时，千年后仍在结果。' },
    { y: '明清', t: '化橘红进贡', d: '化橘红列为宫廷贡品，随药商行销各省，成为“南方人参”。' },
    { y: '1958', t: '南方油城起步', d: '露天矿开始开采油页岩，茂名因油而设市，工业血脉自此埋下。' },
    { y: '2013', t: '矿坑变湖', d: '露天矿停止开采，矿坑引水成湖，今天叫“好心湖”。' },
    { y: '2025', t: '五棵树与一条鱼', d: '荔枝141.92万亩、62.23万吨；广湛高铁通车；“五棵树一条鱼一桌菜”产业链产值突破550亿元。' }
  ];

  var HERITAGE = [
    { id: 'c-xianfuren', n: '冼夫人信俗', s: '国家级非遗', img: 'assets/c-xianfuren' },
    { id: 'c-muxi', n: '高州木偶戏', s: '国家级非遗', img: 'assets/c-muxi' },
    { id: 'c-tiaohuapeng', n: '化州跳花棚', s: '国家级非遗', img: 'assets/c-tiaohuapeng' },
    { id: 'c-piaose', n: '信宜飘色', s: '省级非遗', img: 'assets/c-piaose' },
    { id: 'c-nianli', n: '年例', s: '省级非遗', img: 'assets/c-nianli' },
    { id: 'c-gongyuan', n: '千年荔乡', s: '农业文化遗产', img: 'assets/c-lihua' }
  ];

  var MONTHS = [
    { m: 1, tip: '年例陆续开场，温泉最舒服；柑橘、青枣当季。', items: ['年例、冼太庙、御水古温泉'] },
    { m: 2, tip: '年例最旺的一个月，早熟荔枝“科技一号”已经能吃到。', items: ['年例、飘色、科技一号荔枝'] },
    { m: 3, tip: '荔枝花开，化橘红开花，果园是最好的拍摄地。', items: ['荔枝花、化橘红'] },
    { m: 4, tip: '花期尾声，果还青；适合逛古城、看非遗。', items: ['窦州古城、高州木偶戏'] },
    { m: 5, tip: '白糖罂、妃子笑上市，三华李也熟了。', items: ['荔枝、三华李'] },
    { m: 6, tip: '荔枝高峰，“520我爱荔”荔枝季就在这个月。', items: ['荔枝、荔枝季'] },
    { m: 7, tip: '桂味、糯米糍、储良龙眼接力，甜到发腻。', items: ['荔枝、储良龙眼'] },
    { m: 8, tip: '开渔节，博贺港千帆竞发，海鲜最肥。', items: ['博贺渔港、电白海鲜'] },
    { m: 9, tip: '晚熟“马贵荔”中秋上市，海边风开始转凉。', items: ['马贵荔、中国第一滩'] },
    { m: 10, tip: '秋高气爽，最适合骑行滨海公路。', items: ['晏镜岭、放鸡岛'] },
    { m: 11, tip: '罗非鱼最肥，水东芥菜开始上桌。', items: ['罗非鱼、水东芥菜'] },
    { m: 12, tip: '温泉季，年例也在筹备中。', items: ['御水古温泉、年例'] }
  ];

  var DIALECT = [
    ['矛', '没有。“矛所谓”＝无所谓'],
    ['嗲', '语气词，句尾强调。“好靓嗲”'],
    ['食朝', '吃早饭'],
    ['落水', '下雨'],
    ['倾偈', '聊天'],
    ['好食', '好吃']
  ];

  var ARRIVE = [
    { ico: 'train', b: '高铁', s: '广湛高铁2025年通车，广州至茂名约1.5小时；茂名站、电白站', t: '约1.5h' },
    { ico: 'plane', b: '机场', s: '湛江吴川机场，转高速至茂名市区', t: '约1h' },
    { ico: 'car', b: '自驾', s: '沈海高速 / 包茂高速；包茂高速柏桥服务区可直达荔博园', t: '广州约4h' },
    { ico: 'pin', b: '市内', s: '景点分散在各区县，建议自驾或包车；市区打车方便', t: '建议自驾' }
  ];

  /* ---------------- 状态 ---------------- */
  var KEY = 'maoming.v2';
  var S = {
    view: 'home', theme: 'light', fav: [], user: null, points: 0,
    signDate: '', month: new Date().getMonth() + 1, gcat: '全部', scat: '全部',
    recent: [], motion: true
  };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    Object.keys(saved).forEach(function (k) { if (k in S) S[k] = saved[k]; });
  } catch (e) { }
  if (!Array.isArray(S.fav)) S.fav = [];
  if (!Array.isArray(S.recent)) S.recent = [];

  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

  var LV = ['荔乡新人', '山海边民', '高凉食客', '好心使者', '茂名通'];
  function level() {
    var i = Math.min(4, Math.floor(S.points / 50));
    return { i: i, name: LV[i], next: (i + 1) * 50, pct: Math.min(100, ((S.points - i * 50) / 50) * 100) };
  }

  /* ---------------- 工具 ---------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var view = $('#view');
  var tabsEl = $('#tabs');
  var sheet = $('#sheet');
  var sheetScroll = $('#sheetScroll');
  var searchEl = $('#search');
  var searchInput = $('#searchInput');
  var searchBody = $('#searchBody');

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function all() { return GOODS.concat(SPOTS, FOOD, CULTURE); }
  function find(id) { var a = all(); for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function findRoute(id) {
    for (var i = 0; i < ROUTES.length; i++) if (ROUTES[i].id === id) return ROUTES[i];
    return null;
  }
  function isFav(id) { return S.fav.indexOf(id) > -1; }

  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  window.imgOk = function (el) {
    var p = el.parentNode; if (p && p.classList) p.classList.add('done');
  };
  window.imgErr = function (el, ch) {
    var p = el.parentNode; if (!p) return;
    p.classList.add('done');
    p.style.background = 'linear-gradient(140deg,#c0304a,#8d1f33)';
    p.innerHTML = '<div style="position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-family:var(--serif);font-size:34px;opacity:.9">' + esc(ch || '茂') + '</div>';
  };

  function pic(item, cls, lazy) {
    return '<div class="' + cls + ' imgwrap"><img src="' + item.img + '-s.jpg" alt="' + esc(item.name) + '" ' +
      (lazy === false ? '' : 'loading="lazy" ') + 'decoding="async" onload="imgOk(this)" ' +
      'onerror="imgErr(this,\'' + esc(item.name.charAt(0)) + '\')"></div>';
  }

  /* ---------------- 通用片段 ---------------- */
  function secHead(kicker, title, sub, more) {
    return '<div class="sec-head"><div><div class="kicker">' + kicker + '</div><div class="sec-title">' + title + '</div>' +
      (sub ? '<p class="sec-sub">' + sub + '</p>' : '') + '</div>' +
      (more ? '<div class="more" data-act="go" data-v="' + more.v + '">' + more.t + ' ' + ICON.arrow + '</div>' : '') + '</div>';
  }

  function statBadge(v, u) { return '<span class="meta-pill">' + v + (u ? ' ' + u : '') + '</span>'; }

  /* ---------------- 品种 / 种类 ---------------- */
  /* n 名称 · t 时令或等级 · d 一句话 */
  var KINDS = {
    lychee: [
      { n: '科技一号', t: '农历二月 · 3月', d: '特早熟，比三月红还早一步，抢的就是“第一口鲜”。' },
      { n: '三月红', t: '4月下旬', d: '最早一批，皮红带青，酸甜爽口，核略大。' },
      { n: '白糖罂', t: '5月下旬—6月上旬', d: '茂名招牌，皮薄、蜜甜、核小；高州根子镇最出名。' },
      { n: '妃子笑', t: '5月底—6月中', d: '青红皮就能吃，甜里带一点酸，最经得起长途。' },
      { n: '白蜡', t: '6月上旬', d: '果大肉厚、清甜多汁，价格最亲民的一档。' },
      { n: '黑叶', t: '6月中', d: '产量最大，肉厚汁多，晒荔枝干、做罐头的常用种。' },
      { n: '桂味', t: '6月下旬—7月初', d: '果皮带桂花香，核小肉脆，老饕点名的品种。' },
      { n: '糯米糍', t: '6月底—7月上', d: '肉厚软糯、甜度高，鲜食第一梯队。' },
      { n: '鉴江红糯', t: '7月初', d: '鉴江流域本地种，果大色艳，鲜食制干都行。' },
      { n: '贵妃红', t: '6月', d: '果大色红、卖相好，早中熟里的“颜值担当”。' },
      { n: '井岗红糯', t: '7月', d: '中晚熟，核小耐贮运，往北走的货架期长。' },
      { n: '马贵荔', t: '中秋前后 · 9月', d: '晚熟品种，高州马贵镇；别的荔枝收摊了它才来。' }
    ],
    juhong: [
      { n: '正毛橘红', t: '绒毛密而白', d: '品质最好的一档，绒毛越密越值钱，《中国药典》所载即此。' },
      { n: '副毛橘红', t: '绒毛较少', d: '产量大，日常入药、煲汤、泡水多用这一档。' },
      { n: '光青橘红', t: '基本无毛', d: '果皮光洁，多拿去加工成片、颗粒、口服液。' },
      { n: '橘红胎（乳橘）', t: '直径3—5厘米幼果', d: '幼果干燥，香气最冲，价格也最高。' }
    ],
    longan: [
      { n: '储良', t: '7月中—8月上', d: '原产高州储良村，果大肉厚、离核、清甜，茂名龙眼招牌。' },
      { n: '石硖', t: '7月上—8月', d: '早熟，肉脆清甜、核小，鲜食最讨喜。' },
      { n: '大乌圆', t: '8月中', d: '果最大、肉厚汁多，鲜食与焙干两用。' },
      { n: '双孖木', t: '8月', d: '广东本地选育，果中大、味浓，常做桂圆肉。' }
    ],
    sanjhua: [
      { n: '早熟三华李', t: '5月中', d: '果偏小、酸脆，蘸辣椒盐最地道。' },
      { n: '大蜜李', t: '6月', d: '信宜钱排主栽，果大、甜脆、核小，李子界的“甜口”。' }
    ],
    banana: [
      { n: '巴西蕉', t: '全年 · 主产3—6月', d: '茂名香蕉主力，果指长、甜度高。' },
      { n: '威廉斯蕉', t: '全年', d: '香气浓，超市里最常见的那一串。' },
      { n: '粉蕉（芭蕉）', t: '全年', d: '短小皮薄，口感绵密带一点微酸。' },
      { n: '皇帝蕉', t: '全年', d: '指头大小，甜度高，小孩最爱。' }
    ],
    tilapia: [
      { n: '吉富罗非鱼', t: '全年', d: '茂名主养品系，长得快、肉厚刺少。' },
      { n: '奥尼罗非鱼', t: '全年', d: '杂交种，耐寒抗病，适合大水面养殖。' },
      { n: '尼罗罗非鱼', t: '全年', d: '体型大、出肉率高，加工厂喜欢。' },
      { n: '红罗非鱼', t: '全年', d: '体色红亮、卖相好，多走活鲜市场。' }
    ],
    chenxiang: [
      { n: '奇楠', t: '沉香里的顶配', d: '油脂最足、香气最透；电白观珠沙垌的奇楠育苗全国最集中。' },
      { n: '白木香（土沉香）', t: '茂名主栽树种', d: '结香后可入药、制香，是整条产业链的底子。' },
      { n: '板头 · 勾丝', t: '加工边角料', d: '熏香、泡酒、做香囊，一点不浪费。' }
    ],
    tangshui: [
      { n: '番薯糖水', t: '老姜 + 片糖', d: '最家常的一碗，甜里带姜辣，暖胃。' },
      { n: '香芋椰汁西米', t: '芋头粉糯', d: '化州糖水铺的招牌之一，椰香压得住甜。' },
      { n: '海带绿豆沙', t: '要熬到起沙', d: '夏天消暑的第一选择，海带解腻。' },
      { n: '清补凉', t: '薏米 · 莲子 · 百合', d: '甜汤版的“降火”，料多到像一碗粥。' },
      { n: '红豆沙', t: '绵密不齁', d: '冬天热着喝，夏天加冰一样卖得动。' },
      { n: '芝麻糊', t: '现磨黑芝麻', d: '香得糊嘴，配一根油条是宵夜标配。' },
      { n: '木瓜炖雪耳', t: '木瓜 + 银耳', d: '清甜润口，女生点单率很高。' },
      { n: '腐竹白果薏米', t: '广式老配方', d: '腐竹化在汤里，喝的是豆香。' },
      { n: '芋圆西米露', t: '手搓芋圆', d: '年轻人最常点的一碗，嚼头足。' },
      { n: '杨枝甘露', t: '芒果 + 西柚', d: '港式改良款，糖水铺里也有它。' }
    ],
    haixian: [
      { n: '海蜇', t: '4—6月', d: '博贺是全国最大的海蜇集散地之一，凉拌最爽。' },
      { n: '南风螺', t: '春夏', d: '全国最大产地之一，白灼蘸酱油就够了。' },
      { n: '沙虫', t: '全年', d: '电白滩涂货，煮粥、炒韭黄都鲜。' },
      { n: '对虾', t: '全年', d: '白灼或盐焗，虾头留着煲粥。' },
      { n: '膏蟹（青蟹）', t: '秋后最肥', d: '蒸饭、姜葱炒，掀开壳全是膏。' },
      { n: '生蚝', t: '11月—次年3月', d: '炭烧、蒜蓉蒸，冬天最肥。' },
      { n: '马鲛鱼', t: '冬春', d: '切片煎或打鱼丸，肉质紧实。' },
      { n: '金鲳鱼', t: '全年', d: '深海网箱养出来的，清蒸最鲜。' }
    ],
    he: [
      { n: '薯包籺', t: '番薯粉做皮', d: '包肉馅蒸熟，软糯带韧，蘸酱油吃。' },
      { n: '寿桃籺', t: '米粉皮 + 豆沙/花生', d: '捏成寿桃形，年例、做生日必备。' },
      { n: '灰水籺（碱水粽）', t: '草木灰水泡糯米', d: '金黄透亮，蘸蜂蜜或白糖。' },
      { n: '煮籺', t: '下汤煮', d: '米皮包馅下汤，一碗就能当一顿饭。' },
      { n: '艾籺', t: '清明前后', d: '加了艾草，清香里带一点苦。' },
      { n: '白籺', t: '最素的一种', d: '只蘸蒜蓉酱油，本地人的日常早餐。' }
    ],
    niuzha: [
      { n: '牛肚', t: '爽脆', d: '清汤里烫到刚好，咬下去“咔嚓”一声。' },
      { n: '牛肠', t: '油香', d: '洗得干净才不腥，越嚼越香。' },
      { n: '牛肺', t: '吸汤', d: '孔隙多，一泡就把汤吸满。' },
      { n: '牛蒡（牛膀）', t: '粉糯', d: '口感像芋头，是化州牛杂里的隐藏款。' },
      { n: '牛筋', t: '胶质', d: '要炖够时间，糯而不烂。' },
      { n: '牛百叶', t: '一烫就熟', d: '剪刀现剪，烫三下就上桌。' }
    ],
    gaoliang: [
      { n: '白切鸡', t: '宴席头道', d: '浸煮后过冷河，皮爽肉滑，蘸沙姜酱油。' },
      { n: '化州香油鸡', t: '花生油 + 二十多种香料', d: '油是灵魂，一勺淋下去香半条街。' },
      { n: '水东鸭粥 · 白切鸭', t: '早餐到宵夜', d: '鸭汤加党参北芪煲粥，鸭肉白切蘸蒜蓉。' },
      { n: '化州牛杂', t: '清汤 · 剪刀现剪', d: '辣与不辣两罐酱，自己加。' },
      { n: '簸箕炊', t: '竹簸箕蒸三层米浆', d: '切菱形，淋香油、撒芝麻蒜蓉。' },
      { n: '捞粉', t: '早餐标配', d: '韭菜油 + 酱油 + 生蒜米，一拌就香。' },
      { n: '沙煲粉', t: '砂锅现煮', d: '汤滚着上桌，配一份牛腩。' },
      { n: '笪桥黄瓜干', t: '“黄金瓜”', d: '扁薄、甘甜，配香菇猪肉蒸肉饼最下饭。' }
    ]
  };

  var ATLAS = [
    { id: 'lychee', name: '荔枝', unit: '个品种', kicker: 'LYCHEE', sub: '从农历二月的科技一号，到中秋的马贵荔，茂名的荔枝季能拉满半年。', kind: 'lychee' },
    { id: 'tangshui', name: '化州糖水', unit: '碗', kicker: 'SWEET SOUP', sub: '“中国糖水在广东，广东糖水在化州”——一条街能开到凌晨。', kind: 'tangshui' },
    { id: 'haixian', name: '博贺海味', unit: '样', kicker: 'SEAFOOD', sub: '广东最大渔港，全国最大海蜇与南风螺基地。', kind: 'haixian' },
    { id: 'he', name: '籺', unit: '种', kicker: 'HE', sub: '读 hé，本地音近“ei”。米浆、薯粉、艾草，包什么都行。', kind: 'he' },
    { id: 'gaoliang', name: '高凉菜', unit: '道', kicker: 'TABLE', sub: '一张桌子上最有代表性的八道。', kind: 'gaoliang' },
    { id: 'juhong', name: '化橘红', unit: '档', kicker: 'CITRON', sub: '按绒毛分档，正毛、副毛、光青，还有最贵的橘红胎。', kind: 'juhong' },
    { id: 'longan', name: '龙眼', unit: '个品种', kicker: 'LONGAN', sub: '储良、石硖、大乌圆、双孖木，鲜食与焙干各有所长。', kind: 'longan' },
    { id: 'niuzha', name: '牛杂部位', unit: '样', kicker: 'BEEF', sub: '一锅清汤，剪刀现剪，部位不同口感全不同。', kind: 'niuzha' }
  ];

  /* ---------------- 首页 ---------------- */
  function renderHome() {
    var todayItem = all()[(new Date().getDate() + new Date().getMonth()) % all().length];
    var md = MONTHS[S.month - 1];

    var html = '';
    html += '<section class="hero">' +
      '<img class="hero-img" src="assets/g-litchi.jpg" alt="茂名荔枝">' +
      '<div class="hero-top"><div class="brand"><span class="brand-dot"></span>广东 · 茂名</div>' +
      '<div class="hero-tools"><button class="icobtn" data-act="search" aria-label="搜索">' + ICON.search + '</button>' +
      '<button class="icobtn" data-act="theme" aria-label="切换主题">' + (S.theme === 'dark' ? ICON.sun : ICON.moon) + '</button></div></div>' +
      '<div class="hero-copy"><h1 class="hero-title"><span>好心茂名</span></h1><div class="hero-tag">山海荔乡</div></div>' +
      '<div class="hero-seal">茂名<br>荔乡</div>' +
      '<div class="hero-foot"><div class="hero-line"><b>世界每五颗荔枝，就有一颗来自茂名。</b><br>182公里海岸线，两千年的荔园，一句“唯用一好心”。</div>' +
      '<div class="hero-cta"><button class="btn red" data-act="go" data-v="goods">逛好物 ' + ICON.arrow + '</button>' +
      '<button class="btn ghost" data-act="go" data-v="spots">去看海</button></div></div>' +
      '</section>';

    var ribbon = ['世界每五颗荔枝，就有一颗来自茂名', '141.92 万亩荔园', '182 公里海岸线', '冼夫人故里 · 唯用一好心', '中国罗非鱼之都', '2026 年省运会'].map(function (t) {
      return '<span>' + t + '</span><i>·</i>';
    }).join('');
    html += '<div class="ribbon"><div class="ribbon-in">' + ribbon + ribbon + '</div></div>';

    html += '<div class="stats">' +
      '<div class="stat"><b data-count="141.92">0</b><span>万亩荔枝</span></div>' +
      '<div class="stat"><b data-count="62.23">0</b><span>万吨年产量</span></div>' +
      '<div class="stat"><b data-count="182">0</b><span>公里海岸线</span></div>' +
      '<div class="stat"><b data-count="32">0</b><span>个A级景区</span></div>' +
      '</div>';

    /* 动态图册 */
    html += '<div class="cinema reveal">' +
      '<div class="cine-frame" data-act="cine" data-on="false">' +
      '<img class="cine-poster" src="assets/motion/poster.jpg" alt="茂名六景">' +
      '<img class="cine-anim" data-src="assets/motion/maoming.webp" alt="茂名动态图册">' +
      '<button class="cine-play" aria-label="播放">' + ICON.play + '</button>' +
      '<div class="cine-cap"><b>一分钟看见茂名</b><span>荔枝 · 海岸 · 海岛 · 橘红 · 年例 · 贡园</span></div>' +
      '</div></div>';

    /* 产业带 */
    html += '<div class="industry reveal">' +
      '<div class="ind-k">特 色 产 业 矩 阵</div>' +
      '<div class="ind-title">五棵树 · 一条鱼 · 一桌菜</div>' +
      '<div class="ind-num">550<i>亿元</i></div>' +
      '<div class="ind-desc">特色产业链产值，带动近60万农民。农业总产值连续五年稳居千亿元高位。</div>' +
      '<div class="ind-chips">' +
      ['荔枝', '龙眼', '三华李', '化橘红', '沉香', '罗非鱼', '高凉菜'].map(function (n) {
        var it = GOODS.filter(function (g) { return g.name === n; })[0];
        return '<button class="ind-chip" data-act="' + (it ? 'open|' + it.id : 'go|goods') + '">' + n + '</button>';
      }).join('') +
      '</div></div>';

    /* 品种图谱入口 */
    html += '<div class="pad reveal"><div class="atlas-banner" data-act="go" data-v="atlas">' +
      '<div class="ab-l"><span class="kicker">ATLAS</span><b>品种图谱</b>' +
      '<span class="ab-sub">荔枝 12 个品种 · 化州糖水 10 碗 · 博贺海味 8 样 · 籺 6 种 · 高凉菜 8 道</span></div>' +
      '<span class="ab-go">' + ICON.arrow + '</span></div></div>';

    /* 今日推荐 */
    html += '<div class="sec">' + secHead('TODAY', '今日一物', '按日子轮着来，今天轮到它。', { v: 'goods', t: '全部' }) + '</div>';
    html += '<div class="today reveal" data-act="open|' + todayItem.id + '">' +
      '<img class="bg" src="' + todayItem.img + '.jpg" alt="' + esc(todayItem.name) + '" loading="lazy">' +
      '<div class="today-in"><div class="today-k">' + esc(todayItem.area) + '</div>' +
      '<div class="today-t">' + esc(todayItem.name) + '</div>' +
      '<div class="today-d">' + esc(todayItem.line) + '</div>' +
      '<div class="today-row"><span class="today-num">' + esc(todayItem.tag) + '</span>' +
      '<span class="btn sm red">看详情 ' + ICON.arrow + '</span></div></div></div>';

    /* 时令 */
    html += '<div class="sec">' + secHead('SEASON', '四季时令', '什么时候来，吃到什么、看到什么。') + '</div>';
    html += '<div class="months">' + MONTHS.map(function (x) {
      return '<button class="m-chip" data-act="month|' + x.m + '" aria-pressed="' + (x.m === S.month) + '"><b>' + x.m + '</b><span>月</span></button>';
    }).join('') + '</div>';
    html += '<div class="season-note"><b>' + S.month + '月</b>　' + md.tip +
      '<div class="season-list">' + md.items.map(function (t) { return '<span class="season-item">' + t + '</span>'; }).join('') + '</div></div>';

    /* 打卡 */
    html += '<div class="sec">' + secHead('SPOTS', '必去打卡', '山海城村，四种走法。', { v: 'spots', t: '全部' }) + '</div>';
    html += '<div class="hscroll">' + SPOTS.map(function (s) {
      return '<div class="card spot-card" data-act="open|' + s.id + '">' + pic(s, 'card-img') +
        '<div class="card-body"><div class="card-name">' + esc(s.name) + '</div>' +
        '<div class="card-sub">' + esc(s.area) + ' · ' + esc(s.tag) + '</div>' +
        '<div class="card-line">' + esc(s.line) + '</div></div></div>';
    }).join('') + '</div>';

    /* 味道 */
    html += '<div class="sec">' + secHead('TASTE', '一桌菜的茂名', '从早餐到宵夜，256G的胃都不够。', { v: 'goods', t: '看全部' }) + '</div>';
    html += '<div class="hscroll">' + FOOD.map(function (f) {
      return '<div class="card food-card" data-act="open|' + f.id + '">' + pic(f, 'card-img') +
        '<div class="card-body"><div class="card-name">' + esc(f.name) + '</div>' +
        '<div class="card-sub">' + esc(f.area) + '</div></div></div>';
    }).join('') + '</div>';

    /* 路线 */
    html += '<div class="sec">' + secHead('ROUTE', '三条线，安排好了', '两天看海、一天吃荔、三天进山。') + '</div>';
    html += '<div class="hscroll">' + ROUTES.map(function (r) {
      return '<div class="route ' + r.cls + '"><div class="route-top"><div class="route-days">' + r.days + '</div>' +
        '<div class="route-name">' + r.name + '</div><div class="route-area">' + r.area + '</div></div>' +
        '<div class="route-body">' + r.steps.map(function (st, i) {
          return '<div class="route-step"><i>' + (i + 1) + '</i><span>' + st + '</span></div>';
        }).join('') +
        '<div class="route-foot"><span class="route-time">' + r.time + '</span>' +
        '<button class="btn sm" data-act="saveRoute|' + r.id + '">收藏路线</button></div></div></div>';
    }).join('') + '</div>';

    /* 到达 */
    html += '<div class="sec">' + secHead('ARRIVE', '怎么到茂名', '高铁、机场、自驾，都在一小时级。') + '</div>';
    html += '<div class="arrive">' + ARRIVE.map(function (a) {
      return '<div class="arrive-row"><div class="arrive-ico">' + ICON[a.ico] + '</div>' +
        '<div class="arrive-b"><b>' + a.b + '</b><span>' + a.s + '</span></div>' +
        '<div class="arrive-t">' + a.t + '</div></div>';
    }).join('') + '</div>';

    html += foot();
    return html;
  }

  function foot() {
    return '<div class="foot"><b>关于这份地图</b>' +
      '数据来自茂名市人民政府、广东省人民政府、广东省农业农村厅、南方日报、茂名发布等公开报道（2024—2026）。' +
      '产量、面积等为对应年份口径，出行前请以景区与官方最新公告为准。<br><br>' +
      '本页为茂名城市宣传小程序，照片来自公开网络，仅用于非商业展示；如需商用请替换为授权素材。<br><br>' +
      '好心茂名 · 山海荔乡　v2.0</div>';
  }

  /* ---------------- 好物 ---------------- */
  function renderGoods() {
    var cats = ['全部', '佳果', '南药', '水产', '山林', '一桌菜'];
    var list = GOODS.filter(function (g) { return S.gcat === '全部' || g.cat === S.gcat; });
    var h = '';
    h += '<div class="pagehead"><div class="kicker">TREASURES</div><h1>五棵树，一条鱼</h1>' +
      '<p>荔枝、龙眼、三华李、化橘红、沉香，是茂名的“五棵树”；罗非鱼是“一条鱼”；一张高凉菜的桌子，是“一桌菜”。</p></div>';
    h += '<div class="chips">' + cats.map(function (c) {
      return '<button class="chip" data-act="gcat|' + c + '" aria-pressed="' + (S.gcat === c) + '">' + c + '</button>';
    }).join('') + '</div>';
    h += '<div class="grid-2" style="margin-top:6px">' + list.map(function (g) {
      return '<div class="card gcard reveal" data-act="open|' + g.id + '">' + pic(g, 'card-img') +
        '<div class="card-body"><div class="card-name">' + esc(g.name) + '</div>' +
        '<div class="card-sub">' + esc(g.area) + '</div>' +
        '<div class="card-meta">' + statBadge(g.stats[0][0], g.stats[0][1]) + '</div></div></div>';
    }).join('') + '</div>';
    h += '<div class="sec">' + secHead('TABLE', '一桌菜', '高凉菜是茂名的古称，也是一张桌子的名字。') + '</div>';
    h += '<div class="hscroll">' + FOOD.map(function (f) {
      return '<div class="card food-card" data-act="open|' + f.id + '">' + pic(f, 'card-img') +
        '<div class="card-body"><div class="card-name">' + esc(f.name) + '</div><div class="card-sub">' + esc(f.cat) + '</div></div></div>';
    }).join('') + '</div>';
    h += '<div class="sec">' + secHead('ATLAS', '品种图谱', '荔枝 12 个品种、化州糖水 10 碗、博贺海味 8 样、籺 6 种。', { v: 'atlas', t: '全部' }) + '</div>';
    h += '<div class="atlas-tiles">' + ATLAS.slice(0, 4).map(function (a) {
      return '<button class="atlas-tile" data-act="atlasAt|' + a.id + '"><b>' + a.name + '</b><i>' + KINDS[a.kind].length + ' ' + a.unit + '</i></button>';
    }).join('') + '</div>';
    h += foot();
    return h;
  }

  /* ---------------- 游玩 ---------------- */
  function pinStyle(p) { return 'left:' + p[0] + '%;top:' + p[1] + '%'; }
  function renderSpots() {
    var cats = ['全部', '滨海', '荔乡', '山区', '城区', '人文'];
    var list = SPOTS.filter(function (s) { return S.scat === '全部' || s.cat === S.scat; });
    var pins = [
      { n: '好心湖', x: 44, y: 26, sea: false },
      { n: '冼太庙', x: 63, y: 38, sea: false },
      { n: '贡园', x: 33, y: 44, sea: false },
      { n: '窦州古城', x: 74, y: 18, sea: false },
      { n: '博贺渔港', x: 70, y: 66, sea: true },
      { n: '第一滩', x: 52, y: 74, sea: true },
      { n: '放鸡岛', x: 82, y: 78, sea: true }
    ];
    var h = '';
    h += '<div class="pagehead"><div class="kicker">TRAVEL</div><h1>一路向海，一路进山</h1>' +
      '<p>北边是云开大山与云雾山，南边是182公里海岸线。截至2024年11月，茂名有32个A级景区，其中11个4A。</p></div>';
    h += '<div class="map"><svg viewBox="0 0 400 210" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M0 132 C60 118 96 138 150 128 C210 116 250 134 320 122 L400 130 L400 210 L0 210Z" fill="rgba(15,103,113,.18)"/>' +
      '<path d="M0 132 C60 118 96 138 150 128 C210 116 250 134 320 122 L400 130" fill="none" stroke="rgba(15,103,113,.45)" stroke-width="1.4"/>' +
      '<path d="M18 74 L66 34 L104 62 L150 26 L196 60 L238 30 L286 58 L330 22 L372 56" fill="none" stroke="rgba(80,110,80,.4)" stroke-width="1.4"/>' +
      '<text x="12" y="24" font-size="9" fill="rgba(80,110,80,.75)" font-family="serif">云开大山</text>' +
      '<text x="330" y="200" font-size="9" fill="rgba(15,103,113,.8)" font-family="serif">南海</text></svg>' +
      pins.map(function (p) {
        return '<div class="map-pin' + (p.sea ? ' sea' : '') + '" style="' + pinStyle([p.x, p.y]) + '"><i></i><span>' + p.n + '</span></div>';
      }).join('') +
      '<div class="map-legend">示意地图 · 非比例尺</div></div>';
    h += '<div class="chips">' + cats.map(function (c) {
      return '<button class="chip" data-act="scat|' + c + '" aria-pressed="' + (S.scat === c) + '">' + c + '</button>';
    }).join('') + '</div>';
    h += '<div class="slist">' + list.map(function (s) {
      return '<div class="srow reveal" data-act="open|' + s.id + '">' +
        '<div class="srow-img imgwrap"><img src="' + s.img + '-s.jpg" alt="' + esc(s.name) + '" loading="lazy" onload="imgOk(this)" onerror="imgErr(this,\'' + esc(s.name.charAt(0)) + '\')"></div>' +
        '<div class="srow-b"><div class="srow-name">' + esc(s.name) + '<em>' + esc(s.tag) + '</em></div>' +
        '<div class="srow-sub">' + esc(s.area) + '</div>' +
        '<div class="srow-line">' + esc(s.line) + '</div>' +
        '<div class="srow-meta">' + statBadge(s.stats[0][0], s.stats[0][1]) + statBadge(s.stats[1][0], s.stats[1][1]) + '</div></div></div>';
    }).join('') + '</div>';
    h += '<div class="sec">' + secHead('PLAN', '三条现成路线', '照着走就行。') + '</div>';
    h += '<div class="hscroll">' + ROUTES.map(function (r) {
      return '<div class="route ' + r.cls + '"><div class="route-top"><div class="route-days">' + r.days + '</div>' +
        '<div class="route-name">' + r.name + '</div><div class="route-area">' + r.area + '</div></div>' +
        '<div class="route-body">' + r.steps.map(function (st, i) {
          return '<div class="route-step"><i>' + (i + 1) + '</i><span>' + st + '</span></div>';
        }).join('') + '<div class="route-foot"><span class="route-time">' + r.time + '</span>' +
        '<button class="btn sm" data-act="saveRoute|' + r.id + '">收藏路线</button></div></div></div>';
    }).join('') + '</div>';
    h += foot();
    return h;
  }

  /* ---------------- 人文 ---------------- */
  function renderCulture() {
    var h = '';
    h += '<div class="pagehead"><div class="kicker">CULTURE</div><h1>好心之城</h1>' +
      '<p>“我事三代主，唯用一好心。”冼夫人留下的一句话，成了茂名的城市精神；年例、木偶戏、跳花棚、飘色，把它演成了活着的日常。</p></div>';
    h += '<div class="sec">' + secHead('TIME', '时间轴', '') + '</div>';
    h += '<div class="timeline">' + TIMELINE.map(function (t) {
      return '<div class="tl-item reveal"><div class="tl-dot"></div><div class="tl-year">' + t.y + '</div>' +
        '<div class="tl-t">' + t.t + '</div><div class="tl-d">' + t.d + '</div></div>';
    }).join('') + '</div>';
    h += '<div class="sec">' + secHead('HERITAGE', '非遗与民俗', '六张名片，点击看故事。') + '</div>';
    h += '<div class="heritage">' + HERITAGE.map(function (x) {
      return '<div class="hcard" data-act="open|' + x.id + '"><img src="' + x.img + '-s.jpg" alt="' + esc(x.n) + '" loading="lazy">' +
        '<div><b>' + x.n + '</b><span>' + x.s + '</span></div></div>';
    }).join('') + '</div>';
    h += '<div class="sec">' + secHead('STORY', '四段茂名故事', '人、年例、戏与荔枝。') + '</div>';
    h += '<div class="slist">' + CULTURE.map(function (c) {
      return '<div class="srow" data-act="open|' + c.id + '">' +
        '<div class="srow-img imgwrap"><img src="' + c.img + '-s.jpg" alt="' + esc(c.name) + '" loading="lazy" onload="imgOk(this)" onerror="imgErr(this,\'' + esc(c.name.charAt(0)) + '\')"></div>' +
        '<div class="srow-b"><div class="srow-name">' + esc(c.name) + '</div>' +
        '<div class="srow-sub">' + esc(c.area) + ' · ' + esc(c.tag) + '</div>' +
        '<div class="srow-line">' + esc(c.line) + '</div></div></div>';
    }).join('') + '</div>';
    h += '<div class="sec">' + secHead('DIALECT', '学两句茂名话', '各县口音差别大，先记几个通用词。') + '</div>';
    h += '<div class="dialect">' + DIALECT.map(function (d) {
      return '<div class="dia"><b>' + d[0] + '</b><span>' + d[1] + '</span></div>';
    }).join('') + '</div>';
    h += '<div class="pad" style="margin-top:20px"><div class="nightcard imgwrap" style="border-radius:var(--r-m);overflow:hidden">' +
      '<img src="assets/c-night.jpg" alt="茂名夜色" loading="lazy" onload="imgOk(this)" onerror="imgErr(this,\'夜\')" style="width:100%;height:100%;object-fit:cover">' +
      '<div class="nightcap"><b>夜里的油城</b><span>灯一盏盏亮起来，茂名才慢慢安静下来。</span></div></div></div>';
    h += '<div class="season-note" style="margin-top:16px">趁墟是茂名人的日常：油城墟、高凉墟、窦州墟、杨梅墟、疍家墟五大样板墟，加上沙垌香街与庙街墟，逢墟日去最热闹。</div>';
    h += foot();
    return h;
  }

  /* ---------------- 我的 ---------------- */
  function renderMe() {
    var lv = level();
    var favs = S.fav.filter(function (id) { return id.indexOf('route:') !== 0; }).map(find).filter(Boolean);
    var favRoutes = S.fav.filter(function (id) { return id.indexOf('route:') === 0; })
      .map(function (id) { return findRoute(id.slice(6)); }).filter(Boolean);
    var h = '';
    h += '<div class="pagehead"><div class="kicker">MY</div><h1>我的茂名</h1></div>';
    if (!S.user) {
      h += '<div class="profile"><div class="pf-top"><div class="pf-av">茂</div>' +
        '<div><div class="pf-name">还没登录</div><div class="pf-sub">起个名字，收藏和积分会存在本机</div></div></div>' +
        '<div class="pf-lv"><div style="display:flex;gap:8px;margin-top:14px">' +
        '<input id="nameInput" class="search-input" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);color:#fff" placeholder="输入昵称，例如：阿茂" maxlength="12">' +
        '<button class="btn red" data-act="login">开始</button></div></div></div>';
    } else {
      h += '<div class="profile"><div class="pf-top"><div class="pf-av">' + esc(S.user.charAt(0)) + '</div>' +
        '<div style="flex:1"><div class="pf-name">' + esc(S.user) + '</div><div class="pf-sub">' + lv.name + ' · 已收集 ' + favs.length + ' 个茂名</div></div>' +
        '<button class="btn sm ghost" style="color:#fff;border-color:rgba(255,255,255,.3)" data-act="logout">退出</button></div>' +
        '<div class="pf-stats"><div><b>' + S.points + '</b><span>积分</span></div>' +
        '<div><b>' + (favs.length + favRoutes.length) + '</b><span>收藏</span></div>' +
        '<div><b>' + (lv.i + 1) + '</b><span>等级</span></div></div>' +
        '<div class="pf-lv"><div class="pf-bar"><i style="width:' + lv.pct + '%"></i></div>' +
        '<div class="pf-lvt"><span>' + lv.name + '</span><span>' + (lv.next - S.points > 0 ? '再 ' + (lv.next - S.points) + ' 分升级' : '已满级') + '</span></div></div></div>';
    }

    h += '<div class="sec">' + secHead('DAILY', '每日打卡', S.signDate === today() ? '今天已经打过卡了。' : '打卡得 10 积分。') + '</div>';
    h += '<div class="list"><div class="li"><div class="li-b"><b>签到</b><span>' + (S.signDate === today() ? '今日已签，明天再来' : '点一下，+10 积分') + '</span></div>' +
      '<button class="btn sm ' + (S.signDate === today() ? 'ghost' : 'red') + '" data-act="signin">' + (S.signDate === today() ? '已签到' : '签到') + '</button></div></div>';

    h += '<div class="sec">' + secHead('FAV', '我的收藏', (favs.length + favRoutes.length) ? '点卡片看详情，点“取消”移除。' : '还没有收藏，去逛逛。', { v: 'goods', t: '去收藏' }) + '</div>';
    if (!favs.length && !favRoutes.length) {
      h += '<div class="empty">' + ICON.empty + '<div>收藏的荔枝、景点、路线和故事会出现在这里</div></div>';
    } else {
      if (favs.length) {
        h += '<div class="slist">' + favs.map(function (f) {
          return '<div class="srow" data-act="open|' + f.id + '">' +
            '<div class="srow-img imgwrap"><img src="' + f.img + '-s.jpg" alt="' + esc(f.name) + '" loading="lazy" onload="imgOk(this)" onerror="imgErr(this,\'' + esc(f.name.charAt(0)) + '\')"></div>' +
            '<div class="srow-b"><div class="srow-name">' + esc(f.name) + '</div>' +
            '<div class="srow-sub">' + esc(f.area) + '</div>' +
            '<div class="srow-meta"><button class="meta-pill" data-act="fav|' + f.id + '">取消收藏</button></div></div></div>';
        }).join('') + '</div>';
      }
      if (favRoutes.length) {
        h += '<div class="slist" style="margin-top:' + (favs.length ? '12px' : '0') + '">' + favRoutes.map(function (r) {
          return '<div class="srow" data-act="openRoute|' + r.id + '" style="display:block;padding:14px 15px">' +
            '<div class="srow-b" style="padding:0">' +
            '<div class="srow-name">' + r.name + '<em>' + r.days + '</em></div>' +
            '<div class="srow-sub">' + r.area + ' · ' + r.time + '</div>' +
            '<div class="srow-line">' + r.steps.join(' → ') + '</div>' +
            '<div class="srow-meta"><button class="meta-pill" data-act="unfavRoute|' + r.id + '">取消收藏</button></div></div></div>';
        }).join('') + '</div>';
      }
    }

    h += '<div class="sec">' + secHead('SET', '设置', '') + '</div>';
    h += '<div class="list">' +
      '<div class="li"><div class="li-b"><b>夜间模式</b><span>深色底，晚上看不刺眼</span></div>' +
      '<button class="switch" role="switch" aria-checked="' + (S.theme === 'dark') + '" data-act="theme"><i></i></button></div>' +
      '<div class="li"><div class="li-b"><b>动效</b><span>飘叶、视差、动图册；手机发烫就关掉</span></div>' +
      '<button class="switch" role="switch" aria-checked="' + (S.motion !== false) + '" data-act="motion"><i></i></button></div>' +
      '<div class="li"><div class="li-b"><b>清除本机数据</b><span>收藏、积分、昵称都会清空</span></div>' +
      '<button class="btn sm ghost" data-act="reset">清除</button></div></div>';

    h += '<div class="sec">' + secHead('ABOUT', '关于', '') + '</div>';
    h += '<div class="list">' +
      '<div class="li"><div class="li-b"><b>数据来源</b><span>茂名市人民政府 · 广东省人民政府 · 广东省农业农村厅 · 南方日报 · 茂名发布（2024—2026）</span></div></div>' +
      '<div class="li"><div class="li-b"><b>图片说明</b><span>来自公开网络，仅作非商业展示；商用请替换授权素材</span></div></div>' +
      '<div class="li"><div class="li-b"><b>版本</b><span>v2.0 · 单页小程序，可离线打开</span></div></div></div>';
    h += foot();
    return h;
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  /* ---------------- 品种图谱 ---------------- */
  function renderAtlas() {
    var h = '';
    h += '<div class="pagehead"><div class="kicker">ATLAS</div><h1>品种图谱</h1>' +
      '<p>同样是荔枝，二月到九月能吃到十二个品种；同样一碗糖水，化州人能卖出十种。这里把“种类”摊开看。</p></div>';

    h += '<div class="atlas-nav">' + ATLAS.map(function (a) {
      return '<button class="atlas-chip" data-act="jump|a-' + a.id + '">' + a.name + '<i>' + KINDS[a.kind].length + '</i></button>';
    }).join('') + '</div>';

    ATLAS.forEach(function (a) {
      var list = KINDS[a.kind] || [];
      h += '<section class="atlas" id="a-' + a.id + '">' +
        '<div class="atlas-h"><span class="kicker">' + a.kicker + '</span>' +
        '<h2>' + a.name + '<i>' + list.length + ' ' + a.unit + '</i></h2>' +
        '<p>' + a.sub + '</p></div>' +
        '<div class="kindlist">' + list.map(function (k, i) {
          return '<div class="kind"><span class="kid">' + (i + 1) + '</span><div>' +
            '<div class="kt"><b>' + esc(k.n) + '</b><i>' + esc(k.t) + '</i></div>' +
            '<p class="kd">' + esc(k.d) + '</p></div></div>';
        }).join('') + '</div></section>';
    });

    h += '<div class="pad"><button class="btn red wide" data-act="go" data-v="goods">回到好物 ' + ICON.arrow + '</button></div>';
    h += foot();
    return h;
  }

  /* ---------------- 路由 ---------------- */
  var VIEWS = { home: renderHome, goods: renderGoods, spots: renderSpots, culture: renderCulture, me: renderMe, atlas: renderAtlas };
  var TABS = [
    { v: 'home', n: '首页', i: 'home' },
    { v: 'goods', n: '好物', i: 'goods' },
    { v: 'spots', n: '游玩', i: 'spots' },
    { v: 'culture', n: '人文', i: 'culture' },
    { v: 'me', n: '我的', i: 'me' }
  ];

  function renderTabs() {
    var active = S.view === 'atlas' ? 'goods' : S.view;
    tabsEl.innerHTML = TABS.map(function (t) {
      var badge = (t.v === 'me' && S.fav.length) ? '<span class="badge">' + S.fav.length + '</span>' : '';
      return '<button class="tab" role="tab" data-act="go" data-v="' + t.v + '" aria-selected="' + (active === t.v) + '">' +
        ICON[t.i] + '<span>' + t.n + '</span>' + badge + '</button>';
    }).join('');
  }

  function mount() {
    view.innerHTML = (VIEWS[S.view] || renderHome)();
    view.scrollTop = 0;
    view.classList.remove('view-enter');
    void view.offsetWidth;
    view.classList.add('view-enter');
    var shell = document.getElementById('app');
    if (shell) shell.setAttribute('data-view', S.view);
    renderTabs();
    observeReveal();
    countUp();
  }

  function go(v) {
    if (!v || !VIEWS[v]) { S.view = 'home'; save(); mount(); return; }
    if (S.view === v) { view.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    S.view = v; save();
    try { history.replaceState(null, '', '#' + v); } catch (e) { }
    mount();
  }

  /* ---------------- 动效 ---------------- */
  var io = null;
  function observeReveal() {
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(view.querySelectorAll('.reveal'), function (el) { el.classList.add('in'); });
      return;
    }
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { root: view, threshold: .12 });
    Array.prototype.forEach.call(view.querySelectorAll('.reveal'), function (el) { io.observe(el); });
  }

  function countUp() {
    var els = view.querySelectorAll('[data-count]');
    Array.prototype.forEach.call(els, function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var dec = (String(target).split('.')[1] || '').length;
      var start = performance.now(), dur = 900;
      function step(t) {
        var p = Math.min(1, (t - start) / dur);
        var v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = dec ? v.toFixed(dec) : Math.round(v);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------- 详情 ---------------- */
  function monthBar(months) {
    var s = '<div class="yearbar">';
    for (var i = 1; i <= 12; i++) s += '<div class="yb' + (months.indexOf(i) > -1 ? ' on' : '') + '">' + i + '</div>';
    return s + '</div>';
  }

  function openItem(id) {
    var it = find(id); if (!it) return;
    var faved = isFav(id);
    var h = '<div class="sheet-hero"><img src="' + it.img + '.jpg" alt="' + esc(it.name) + '">' +
      '<button class="sheet-close" data-act="closeSheet" aria-label="关闭">' + ICON.close + '</button></div>';
    h += '<div class="sheet-content">';
    h += '<div class="sheet-k">' + esc(it.area) + ' · ' + esc(it.tag) + '</div>';
    h += '<h2 class="sheet-t">' + esc(it.name) + '</h2>';
    h += '<div class="sheet-sub">' + esc(it.line) + '</div>';
    h += '<div class="sheet-tags">' + (it.months && it.months.length < 12
      ? '<span class="tag">时令 ' + it.months.join('/') + ' 月</span>' : '<span class="tag">全年</span>') +
      '<span class="tag">' + esc(it.cat || '茂名') + '</span></div>';
    h += '<div class="sheet-h">关键数字</div><div class="sheet-facts">' + it.stats.map(function (s) {
      return '<div class="fact"><b>' + s[0] + (s[1] ? '<i>' + s[1] + '</i>' : '') + '</b><span>' + s[2] + '</span></div>';
    }).join('') + '</div>';
    if (it.months) { h += '<div class="sheet-h">一年之中</div>' + monthBar(it.months); }
    var ks = KINDS[id];
    if (ks && ks.length) {
      h += '<div class="sheet-h">品种与种类<i class="cnt">' + ks.length + '</i></div>' +
        '<div class="kindlist">' + ks.map(function (k, i) {
          return '<div class="kind"><span class="kid">' + (i + 1) + '</span><div>' +
            '<div class="kt"><b>' + esc(k.n) + '</b><i>' + esc(k.t) + '</i></div>' +
            '<p class="kd">' + esc(k.d) + '</p></div></div>';
        }).join('') + '</div>';
    }
    h += '<div class="sheet-h">细说</div>';
    it.paras.forEach(function (p) { h += '<p class="sheet-p">' + p + '</p>'; });
    if (it.tip) { h += '<div class="sheet-h">小提示</div><p class="sheet-p">' + it.tip + '</p>'; }
    h += '<div class="sheet-actions">' +
      '<button class="btn ' + (faved ? 'ghost' : 'red') + '" data-act="fav|' + id + '">' + (faved ? ICON.heartOn + ' 已收藏' : ICON.heart + ' 收藏') + '</button>' +
      '<button class="btn" data-act="poster|' + id + '">' + ICON.share + ' 生成分享卡</button></div>';
    h += '</div>';
    sheetScroll.innerHTML = h;
    sheetScroll.scrollTop = 0;
    sheet.setAttribute('data-open', 'true');
    sheet.setAttribute('aria-hidden', 'false');
  }

  function closeSheet() {
    sheet.setAttribute('data-open', 'false');
    sheet.setAttribute('aria-hidden', 'true');
  }

  /* ---------------- 分享卡 ---------------- */
  function poster(id) {
    var it = find(id); if (!it) return;
    var W = 900, H = 1200;
    var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    var x = cv.getContext('2d');
    x.fillStyle = '#fbf6ee'; x.fillRect(0, 0, W, H);

    function draw() {
      /* 图 */
      var iw = im.width, ih = im.height;
      var sc = Math.max(W / iw, 760 / ih);
      var dw = iw * sc, dh = ih * sc;
      x.save(); x.beginPath(); x.rect(0, 0, W, 760); x.clip();
      x.drawImage(im, (W - dw) / 2, (760 - dh) / 2, dw, dh);
      x.restore();
      var g = x.createLinearGradient(0, 0, 0, 760);
      g.addColorStop(0, 'rgba(20,12,8,.42)'); g.addColorStop(.45, 'rgba(20,12,8,.06)');
      g.addColorStop(.78, 'rgba(20,12,8,.42)'); g.addColorStop(1, 'rgba(251,246,238,1)');
      x.fillStyle = g; x.fillRect(0, 0, W, 760);
      /* 竖排标题 */
      x.save();
      x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = '700 62px "Songti SC", "Noto Serif SC", serif';
      var name = it.name;
      for (var i = 0; i < name.length; i++) x.fillText(name.charAt(i), W - 74, 120 + i * 70);
      x.restore();
      /* 文字 */
      x.fillStyle = '#c0304a';
      x.font = '600 22px "PingFang SC", sans-serif';
      x.fillText(it.area + ' · ' + it.tag, 60, 812);
      x.fillStyle = '#1d1917';
      x.font = '700 54px "Songti SC","Noto Serif SC",serif';
      x.fillText(name.slice(0, 12), 60, 884);
      x.fillStyle = '#514741';
      x.font = '26px "PingFang SC", sans-serif';
      wrap(x, it.line, 60, 936, W - 120, 42);
      /* 数字 */
      x.fillStyle = '#c0304a';
      var cx = 60;
      it.stats.slice(0, 3).forEach(function (s) {
        x.font = '700 40px "Songti SC","Noto Serif SC",serif';
        var txt = s[0] + (s[1] || '');
        x.fillText(txt, cx, 1058);
        x.fillStyle = '#8b8078'; x.font = '20px "PingFang SC", sans-serif';
        x.fillText(s[2], cx, 1088);
        x.fillStyle = '#c0304a';
        cx += (W - 120) / 3;
      });
      /* 页脚 */
      x.fillStyle = '#1d1917'; x.fillRect(60, 1122, W - 120, 1);
      x.fillStyle = '#8b8078'; x.font = '20px "PingFang SC", sans-serif';
      x.fillText('好心茂名 · 山海荔乡', 60, 1160);
      x.textAlign = 'right';
      x.fillText('数据 2024—2026 · 茂名市公开报道', W - 60, 1160);
      x.textAlign = 'left';
      show();
    }

    function show() {
      var data = null;
      try { data = cv.toDataURL('image/jpeg', .92); } catch (e) { data = null; }
      var h = '<div class="sheet-content" style="padding-top:18px">' +
        '<div class="sheet-h">分享卡已生成</div>' +
        (data ? '<img src="' + data + '" alt="分享卡" style="width:100%;border-radius:14px;box-shadow:var(--shadow-m)">'
          : '<div class="season-note">本地打开时浏览器会限制图片导出，可长按下方卡片截图保存；部署到网页后即可直接导出。</div>' +
          '<div id="posterHolder" style="width:100%"></div>') +
        (data ? '<div style="margin-top:14px"><a class="btn red" href="' + data + '" download="maoming-' + id + '.jpg" style="width:100%;justify-content:center">保存图片</a></div>' : '') +
        '<div style="margin-top:10px;display:flex;gap:8px">' +
        '<button class="btn ghost" data-act="copyLink|' + id + '" style="flex:1;justify-content:center">复制页面链接</button>' +
        '<button class="btn ghost" data-act="closeSheet" style="flex:1;justify-content:center">关掉</button></div></div>';
      sheetScroll.innerHTML = h;
      if (!data) { var holder = $('#posterHolder'); if (holder) holder.appendChild(cv); }
      sheetScroll.scrollTop = 0;
      sheet.setAttribute('data-open', 'true');
    }

    var im = new Image();
    im.onload = draw;
    im.onerror = function () {
      x.fillStyle = '#c0304a'; x.fillRect(0, 0, W, 760);
      draw();
    };
    im.src = it.img + '.jpg';
  }

  function wrap(ctx, text, x, y, maxW, lh) {
    var line = '', yy = y;
    for (var i = 0; i < text.length; i++) {
      var t = line + text.charAt(i);
      if (ctx.measureText(t).width > maxW && line) {
        ctx.fillText(line, x, yy); line = text.charAt(i); yy += lh;
        if (yy > y + lh * 2) break;
      } else line = t;
    }
    if (line && yy <= y + lh * 2) ctx.fillText(line, x, yy);
  }

  /* ---------------- 搜索：全站索引 + 打分排序 ---------------- */
  var ALIAS = {
    lychee: '妃子笑 白糖罂 桂味 糯米糍 荔枝干 冻眠 荔园 贡园 根子 分界 荔博园',
    juhong: '橘红 橘红片 礞石 化痰 化州 药食同源',
    longan: '储良 龙眼干 桂圆 分界',
    chenxiang: '奇楠 棋楠 观珠 沙垌 电白沉香 香街',
    sanjhua: '钱排 银妃 信宜李 李乡 双合',
    banana: '高州蕉 遁地蕾 蕉林',
    tilapia: '罗非鱼片 淡水鱼 茂南 鱼塘',
    jiecai: '水东芥菜 电白 芥菜',
    chicken: '怀乡鸡 信宜 盐焗鸡 白切鸡',
    gaoliang: '捞粉 沙煲粉 簸箕炊 牛杂 糖水 鸭粥 香油鸡 白切鸡 籺 海鲜 笪桥黄瓜 杨桃鸭',
    diyitan: '中国第一滩 第一滩 海滩 沙滩 虎头山 海滨',
    fangjidao: '放鸡岛 潜水 出海 海岛 浮潜',
    langman: '浪漫海岸 椰林 沙滩 日落',
    xianmiao: '冼太庙 冼太 好心 祭祀 庙街',
    haoxinhu: '好心湖 露天矿 矿坑 生态公园',
    boghe: '博贺渔港 渔港 海蜇 南风螺 开渔',
    douzhou: '窦州古城 镇隆 骑楼 八坊 书院 古城',
    wenquan: '御水古温泉 温泉 泡汤',
    yanjing: '晏镜岭 滨海公路 西葛驿站 灯塔 观海',
    gongyuan: '贡园 古荔 千年荔 柏桥 活的荔枝博物馆',
    nianli: '摆宗 游神 做年例 年例宴 宴席',
    piaose: '飘色 信宜飘色 民间艺术',
    xianfuren: '冼夫人 冼太 唯用一好心 好心精神',
    tiaohuapeng: '跳花棚 化州 傩',
    muxi: '木偶戏 高州木偶 杖头木偶 非遗',
    lihua: '荔枝花 花期 开花 春'
  };
  var KIND_ORDER = ['好物', '品种', '景点', '味道', '人文', '非遗', '时令', '方言', '路线', '行程', '年表'];

  var IDX = (function () {
    var rows = [];
    function add(o) {
      o.tags = o.tags || [];
      o.text = [o.title, o.sub].concat(o.tags, o.paras || []).join(' ').toLowerCase();
      o.tagsText = o.tags.join(' ').toLowerCase();
      o.alias = (ALIAS[o.id] || '').toLowerCase();
      rows.push(o);
    }
    function base(list, kind) {
      list.forEach(function (x) {
        add({
          id: x.id, act: 'open|' + x.id, kind: kind, title: x.name, sub: x.area + ' · ' + x.line,
          img: x.img, tags: [x.cat, x.tag, x.area], paras: (x.paras || []).concat([x.tip || ''])
        });
      });
    }
    base(GOODS, '好物'); base(SPOTS, '景点'); base(FOOD, '味道'); base(CULTURE, '人文');
    Object.keys(KINDS).forEach(function (key) {
      var parent = find(key);
      var pname = parent ? parent.name : '茂名';
      KINDS[key].forEach(function (k, i) {
        add({
          id: 'k-' + key + '-' + i, act: 'openKind|' + key, kind: '品种',
          title: k.n, sub: pname + ' · ' + k.t, glyph: k.n.charAt(0),
          tags: [pname, k.t, '品种'], paras: [k.d]
        });
      });
    });
    HERITAGE.forEach(function (h) {
      add({ id: h.id, act: 'open|' + h.id, kind: '非遗', title: h.n, sub: h.s, img: h.img, tags: ['非遗', '民俗'] });
    });
    MONTHS.forEach(function (m) {
      add({
        id: 'm' + m.m, act: 'month|' + m.m, kind: '时令', title: m.m + ' 月', sub: m.tip,
        glyph: m.m, tags: m.items, paras: m.items
      });
    });
    ROUTES.forEach(function (r) {
      add({
        id: r.id, act: 'openRoute|' + r.id, kind: '路线', title: r.name, sub: r.days + ' · ' + r.area + ' · ' + r.time,
        glyph: r.days.replace(/\s/g, ''), tags: [r.area], paras: r.steps
      });
    });
    ARRIVE.forEach(function (a) {
      add({ id: 'a-' + a.b, act: '', kind: '行程', title: a.b, sub: a.s, glyph: a.t, tags: ['交通', a.t] });
    });
    TIMELINE.forEach(function (t) {
      add({ id: 't-' + t.y, act: '', kind: '年表', title: t.y + ' · ' + t.t, sub: t.d, glyph: t.y.slice(0, 2), tags: ['历史'] });
    });
    DIALECT.forEach(function (d) {
      add({ id: 'd-' + d[0], act: '', kind: '方言', title: d[0], sub: d[1], glyph: d[0], tags: ['方言', '茂名话'] });
    });
    return rows;
  })();

  var SEARCH_KIND = '全部';

  function scoreRow(row, terms) {
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var q = terms[i], t = row.title.toLowerCase(), s = 0;
      if (t === q) s = 120;
      else if (t.indexOf(q) === 0) s = 84;
      else if (t.indexOf(q) > -1) s = 58;
      else if (row.tagsText.indexOf(q) > -1) s = 30;
      else if (row.alias.indexOf(q) > -1) s = 26;
      else if (row.text.indexOf(q) > -1) s = 12;
      if (!s) return -1;
      total += s;
    }
    return total;
  }

  function hl(text, terms) {
    var out = esc(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  function runSearch(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var res = [];
    for (var i = 0; i < IDX.length; i++) {
      var sc = scoreRow(IDX[i], terms);
      if (sc > 0) res.push({ row: IDX[i], score: sc });
    }
    res.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return KIND_ORDER.indexOf(a.row.kind) - KIND_ORDER.indexOf(b.row.kind);
    });
    return res;
  }

  var SEARCH_HOT = ['荔枝', '放鸡岛', '年例', '簸箕炊', '化橘红', '中国第一滩', '冼夫人', '捞粉', '温泉', '贡园'];

  function openSearch() {
    searchEl.setAttribute('data-open', 'true');
    searchEl.setAttribute('aria-hidden', 'false');
    document.getElementById('app').classList.add('searching');
    SEARCH_KIND = '全部';
    searchInput.value = '';
    renderSearch('');
    setTimeout(function () { searchInput.focus(); }, 120);
  }
  function closeSearch() {
    searchEl.setAttribute('data-open', 'false');
    searchEl.setAttribute('aria-hidden', 'true');
    document.getElementById('app').classList.remove('searching');
  }

  function sresRow(r, terms) {
    var thumb = r.img
      ? '<div class="sres-img imgwrap"><img src="' + r.img + '-s.jpg" alt="" loading="lazy" onload="imgOk(this)" onerror="imgErr(this,\'' + esc(r.title.charAt(0)) + '\')"></div>'
      : '<div class="sres-glyph k-' + KIND_ORDER.indexOf(r.kind) + '">' + esc(r.glyph || r.title.charAt(0)) + '</div>';
    var actName = r.act ? (r.act.indexOf('open|') === 0 ? 'openFromSearch|' + r.id : r.act) : '';
    return '<div class="sres" data-act="' + (actName || 'searchMiss') + '">' + thumb +
      '<div class="sres-b"><div class="sres-top"><b>' + hl(r.title, terms) + '</b>' +
      '<span class="sres-kind k-' + KIND_ORDER.indexOf(r.kind) + '">' + r.kind + '</span></div>' +
      '<span class="sres-sub">' + hl(r.sub, terms) + '</span></div></div>';
  }

  function renderSearch(q) {
    q = (q || '').trim();
    var t0 = (window.performance && performance.now) ? performance.now() : 0;

    if (!q && SEARCH_KIND !== '全部') {
      var kv = IDX.filter(function (r) { return r.kind === SEARCH_KIND; });
      searchBody.innerHTML =
        '<div class="search-stat"><b>' + kv.length + '</b> 条 · ' + SEARCH_KIND + '分类</div>' +
        '<div class="hot-tags kinds">' + ['全部'].concat(KIND_ORDER.filter(function (k) {
          return IDX.some(function (r) { return r.kind === k; });
        })).map(function (k) {
          return '<button class="chip' + (SEARCH_KIND === k ? ' on' : ' ghost') + '" data-act="skind|' + k + '">' + k + '</button>';
        }).join('') + '</div>' +
        '<div class="sres-list">' + kv.map(function (r, i) {
          return sresRow(r, []).replace('class="sres"', 'class="sres" style="animation-delay:' + Math.min(i * 24, 300) + 'ms"');
        }).join('') + '</div>';
      return;
    }

    if (!q) {
      var h = '';
      if (S.recent.length) {
        h += '<div class="search-sec"><span>最近搜索</span><button class="search-clear" data-act="sdel">清空</button></div>' +
          '<div class="hot-tags">' + S.recent.map(function (t) {
            return '<button class="chip ghost" data-act="hot|' + esc(t) + '">' + esc(t) + '</button>';
          }).join('') + '</div>';
      }
      h += '<div class="search-sec"><span>大家都在搜</span></div><div class="hot-tags">' +
        SEARCH_HOT.map(function (t, i) {
          return '<button class="chip" data-act="hot|' + t + '"><i>' + (i + 1) + '</i>' + t + '</button>';
        }).join('') + '</div>';
      h += '<div class="search-sec"><span>按分类逛</span></div><div class="hot-tags">' +
        [['好物', '再看一眼五棵树一条鱼'], ['景点', '山海城村四种走法'], ['味道', '从早餐吃到宵夜'], ['人文', '冼夫人与非遗'], ['时令', '什么时候来最合适'], ['路线', '三条现成路线']].map(function (k) {
          return '<button class="chip ghost" data-act="skind|' + k[0] + '">' + k[0] + '</button>';
        }).join('') + '</div>';
      h += '<button class="search-lucky" data-act="lucky">随便逛逛 · 看看今天推荐什么</button>';
      searchBody.innerHTML = h;
      return;
    }

    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var res = runSearch(q);
    var ms = t0 ? Math.max(1, Math.round(((window.performance && performance.now ? performance.now() : t0) - t0))) : 1;

    if (!res.length) {
      var guess = SEARCH_HOT.filter(function (t) {
        return t.indexOf(q.charAt(0)) > -1 || q.indexOf(t.charAt(0)) > -1;
      }).slice(0, 5);
      searchBody.innerHTML =
        '<div class="search-empty"><b>没找到「' + esc(q) + '」</b><span>换个说法试试，比如「荔枝」「放鸡岛」「年例」。</span></div>' +
        (guess.length ? '<div class="search-sec"><span>可能你在找</span></div><div class="hot-tags">' +
          guess.map(function (t) { return '<button class="chip" data-act="hot|' + t + '">' + t + '</button>'; }).join('') + '</div>' : '');
      return;
    }

    var counts = {}, kinds = ['全部'];
    res.forEach(function (r) {
      counts[r.row.kind] = (counts[r.row.kind] || 0) + 1;
      if (kinds.indexOf(r.row.kind) < 0) kinds.push(r.row.kind);
    });
    kinds.sort(function (a, b) {
      if (a === '全部') return -1;
      if (b === '全部') return 1;
      return KIND_ORDER.indexOf(a) - KIND_ORDER.indexOf(b);
    });

    var h2 = '<div class="search-stat"><b>' + res.length + '</b> 条结果 · 用时 ' + ms + ' ms · 「' + esc(q) + '」</div>';
    h2 += '<div class="hot-tags kinds">' + kinds.map(function (k) {
      var n = k === '全部' ? res.length : counts[k];
      return '<button class="chip' + (SEARCH_KIND === k ? ' on' : ' ghost') + '" data-act="skind|' + k + '">' + k +
        '<i>' + n + '</i></button>';
    }).join('') + '</div>';

    var shown = res.filter(function (r) { return SEARCH_KIND === '全部' || r.row.kind === SEARCH_KIND; });
    h2 += '<div class="sres-list">' + shown.slice(0, 60).map(function (r, i) {
      return sresRow(r.row, terms).replace('class="sres"', 'class="sres" style="animation-delay:' + Math.min(i * 24, 300) + 'ms"');
    }).join('') + '</div>';
    if (shown.length > 60) h2 += '<div class="search-more">还有 ' + (shown.length - 60) + ' 条，换个更具体的词试试</div>';
    searchBody.innerHTML = h2;
  }

  function pushRecent(q) {
    q = (q || '').trim();
    if (!q) return;
    S.recent = [q].concat(S.recent.filter(function (x) { return x !== q; })).slice(0, 8);
    save();
  }

  /* ---------------- 交互 ---------------- */
  function toggleFav(id) {
    var i = S.fav.indexOf(id);
    if (i > -1) { S.fav.splice(i, 1); toast('已取消收藏'); }
    else { S.fav.push(id); S.points += 2; toast('已收藏 · 积分 +2'); }
    save(); renderTabs();
    if (S.view === 'me') mount();
    if (sheet.getAttribute('data-open') === 'true') openItem(id);
  }

  function doLogin() {
    var input = $('#nameInput');
    var v = input ? input.value.trim() : '';
    if (!v) { toast('先起个名字吧'); return; }
    S.user = v; S.points += 5; save(); mount(); toast('欢迎，' + v);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    var parts = act.split('|');
    var a = parts[0], b = parts[1];

    switch (a) {
      case 'go': go(b || el.getAttribute('data-v')); break;
      case 'open': openItem(b); break;
      case 'openFromSearch': pushRecent(searchInput.value); closeSearch(); openItem(b); break;
      case 'closeSheet': closeSheet(); break;
      case 'search': openSearch(); break;
      case 'theme': setTheme(S.theme === 'dark' ? 'light' : 'dark'); break;
      case 'fav': toggleFav(b); break;
      case 'gcat': S.gcat = b; save(); mount(); break;
      case 'scat': S.scat = b; save(); mount(); break;
      case 'month': closeSearch(); S.month = parseInt(b, 10); S.view = 'home'; save(); mount(); break;
      case 'signin':
        if (S.signDate === today()) { toast('今天已经签过啦'); break; }
        S.signDate = today(); S.points += 10; save(); mount(); toast('签到成功 · 积分 +10');
        break;
      case 'login': doLogin(); break;
      case 'logout': S.user = null; save(); mount(); toast('已退出'); break;
      case 'reset':
        S.fav = []; S.points = 0; S.user = null; S.signDate = ''; save(); mount(); toast('已清除本机数据');
        break;
      case 'poster': poster(b); break;
      case 'openRoute': closeSearch(); openRoute(b); break;
      case 'unfavRoute':
        var ri = S.fav.indexOf('route:' + b);
        if (ri > -1) { S.fav.splice(ri, 1); save(); renderTabs(); mount(); toast('已取消收藏'); }
        break;
      case 'copyLink':
        copy(location.href.split('#')[0] + '#' + b);
        break;
      case 'hot': searchInput.value = b; SEARCH_KIND = '全部'; pushRecent(b); renderSearch(b); break;
      case 'skind': SEARCH_KIND = b; searchInput.value = ''; renderSearch(''); break;
      case 'sdel': S.recent = []; save(); toast('最近搜索已清空'); renderSearch(searchInput.value); break;
      case 'lucky':
        closeSearch();
        var pool = GOODS.concat(SPOTS, FOOD, CULTURE);
        openItem(pool[Math.floor(Math.random() * pool.length)].id);
        break;
      case 'searchMiss': toast('这条内容在页面里，去对应 tab 翻翻'); break;
      case 'jump':
        closeSearch();
        S.view = 'atlas'; save(); mount();
        setTimeout(function () {
          var t = document.getElementById(b);
          if (t) view.scrollTo({ top: t.offsetTop - 12, behavior: 'smooth' });
        }, 60);
        break;
      case 'atlasAt':
        closeSearch();
        S.view = 'atlas'; save(); mount();
        setTimeout(function () {
          var t = document.getElementById('a-' + b);
          if (t) view.scrollTo({ top: t.offsetTop - 12, behavior: 'smooth' });
        }, 60);
        break;
      case 'openKind':
        closeSearch(); openItem(b);
        setTimeout(function () {
          var t = sheetScroll.querySelector('.kindlist');
          if (t) sheetScroll.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
        }, 200);
        break;
      case 'cine': toggleCine(el); break;
      case 'motion':
        S.motion = !S.motion; save(); applyMotion(); mount();
        toast(S.motion ? '动效已打开' : '动效已关闭');
        break;
      case 'saveRoute':
        var r = ROUTES.filter(function (x) { return x.id === b; })[0];
        if (r) {
          if (S.fav.indexOf('route:' + b) > -1) { toast('这条路线已在收藏里'); break; }
          S.fav.push('route:' + b); S.points += 3; save(); renderTabs(); toast('路线已收藏 · 积分 +3');
        }
        break;
    }
  });

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('链接已复制'); }, function () { toast(text); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('链接已复制'); } catch (e) { toast(text); }
      document.body.removeChild(ta);
    }
  }

  function setTheme(t) {
    S.theme = t; save();
    document.documentElement.setAttribute('data-theme', t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#14100e' : '#c0304a');
    if (S.view === 'home' || S.view === 'me') mount();
  }

  $('#searchCancel').addEventListener('click', closeSearch);
  searchInput.addEventListener('input', function () { SEARCH_KIND = '全部'; renderSearch(searchInput.value); });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var first = searchBody.querySelector('.sres[data-act]');
    if (first) { first.click(); }
    else if (searchInput.value.trim()) { pushRecent(searchInput.value); toast('已经是最接近的说法了'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeSheet(); }
  });

  /* 收藏路线在“我的”里也可点 */
  function openRoute(id) {
    var r = findRoute(id); if (!r) return;
    sheetScroll.innerHTML = '<div class="sheet-content" style="padding-top:22px">' +
      '<div class="sheet-k">' + r.days + ' · ' + r.area + '</div>' +
      '<h2 class="sheet-t">' + r.name + '</h2>' +
      '<div class="sheet-sub">' + r.time + '</div>' +
      r.steps.map(function (s, i) { return '<p class="sheet-p"><b>' + (i + 1) + '.</b> ' + s + '</p>'; }).join('') +
      '<div class="sheet-actions"><button class="btn ghost" data-act="closeSheet" style="flex:1;justify-content:center">关掉</button></div></div>';
    sheetScroll.scrollTop = 0;
    sheet.setAttribute('data-open', 'true');
    sheet.setAttribute('aria-hidden', 'false');
  }

  /* ---------------- 动效层 ---------------- */
  function applyMotion() {
    document.documentElement.setAttribute('data-motion', S.motion ? 'on' : 'off');
  }

  function toggleCine(el) {
    var frame = el.closest ? el.closest('.cine-frame') : null;
    if (!frame) return;
    var anim = frame.querySelector('.cine-anim');
    var btn = frame.querySelector('.cine-play');
    var on = frame.getAttribute('data-on') === 'true';
    if (on) {
      frame.setAttribute('data-on', 'false');
      anim.removeAttribute('src');
      btn.innerHTML = ICON.play;
    } else {
      anim.removeAttribute('src');
      anim.src = anim.getAttribute('data-src');
      frame.setAttribute('data-on', 'true');
      btn.innerHTML = ICON.pause;
    }
  }

  /* 顶部滚动进度 + hero 视差 */
  var bar = document.createElement('div');
  bar.id = 'progressbar';
  bar.innerHTML = '<i></i>';
  var appEl = document.getElementById('app') || document.body;
  appEl.appendChild(bar);
  var barFill = bar.firstChild;

  var ticking = false;
  view.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = view.scrollHeight - view.clientHeight;
      var p = max > 0 ? view.scrollTop / max : 0;
      barFill.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
      var hero = view.querySelector('.hero-img');
      if (hero && S.motion) {
        var y = Math.min(view.scrollTop, 420);
        hero.style.transform = 'translate3d(0,' + (y * 0.32).toFixed(1) + 'px,0) scale(' + (1 + y / 4200).toFixed(3) + ')';
      }
      ticking = false;
    });
  }, { passive: true });

  /* 飘落的荔枝叶 */
  (function petals() {
    var cv = document.createElement('canvas');
    cv.id = 'petals';
    cv.setAttribute('aria-hidden', 'true');
    appEl.appendChild(cv);
    var ctx = cv.getContext('2d');
    var dots = [];
    function resize() {
      var r = appEl.getBoundingClientRect();
      cv.width = Math.round(r.width * (window.devicePixelRatio || 1));
      cv.height = Math.round(r.height * (window.devicePixelRatio || 1));
      cv.style.width = r.width + 'px';
      cv.style.height = r.height + 'px';
    }
    function seed() {
      dots = [];
      for (var i = 0; i < 9; i++) {
        dots.push({
          x: Math.random(), y: Math.random(), s: 3 + Math.random() * 6,
          vx: -0.00018 - Math.random() * 0.00022, vy: 0.00016 + Math.random() * 0.00024,
          a: 0.08 + Math.random() * 0.12, rot: Math.random() * 6.28, vr: (Math.random() - .5) * 0.02
        });
      }
    }
    function draw() {
      var w = cv.width, h = cv.height;
      ctx.clearRect(0, 0, w, h);
      if (document.documentElement.getAttribute('data-motion') === 'off') {
        requestAnimationFrame(draw);
        return;
      }
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy; d.rot += d.vr;
        if (d.y > 1.06) { d.y = -0.06; d.x = Math.random(); }
        if (d.x < -0.08) d.x = 1.04;
        var px = d.x * w, py = d.y * h, s = d.s * (window.devicePixelRatio || 1);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(d.rot);
        ctx.globalAlpha = d.a;
        ctx.fillStyle = '#c0304a';
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.52, 0, 0, 6.2832);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    resize(); seed(); draw();
    window.addEventListener('resize', function () { resize(); seed(); });
  })();

  /* PWA */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { });
    });
  }

  /* ---------------- 启动 ---------------- */
  document.documentElement.setAttribute('data-theme', S.theme);
  applyMotion();
  var HASH_VIEW = { '#home': 'home', '#goods': 'goods', '#spots': 'spots', '#culture': 'culture', '#me': 'me' };
  if (location.hash && HASH_VIEW[location.hash]) S.view = HASH_VIEW[location.hash];
  window.addEventListener('hashchange', function () {
    if (HASH_VIEW[location.hash]) { S.view = HASH_VIEW[location.hash]; save(); mount(); }
  });
  mount();

  /* 双击 tab 回到顶部 */
  tabsEl.addEventListener('dblclick', function () { view.scrollTo({ top: 0, behavior: 'smooth' }); });

})();
