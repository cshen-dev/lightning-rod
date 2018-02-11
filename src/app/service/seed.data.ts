export const courses = [
  {
    code: 'COMP5347',
    institute: 'USYD',
    lastUpdatedAt: new Date(),
    logo: `url('../../../assets/img/usyd.png')`,
    versions: [{
      createdAt: new Date('Mar 25 2018'),
      name: 'Web Application Development',
      avatar: '../../../assets/instructors/ying_zhou.png',
      semesters: ['2018S1', '2017S2'],
      instructor: 'Dr Zhou, Ying'
    }, {
      createdAt: new Date('Mar 25 2017'),
      name: 'Web Application Development',
      avatar: '../../../assets/instructors/ying_zhou.png',
      semesters: ['2017S1', '2016S2'],
      instructor: 'Dr Uwe'
    }]
  },
  {
    code: 'INFO5990',
    institute: 'USYD',
    lastUpdatedAt: new Date(),
    logo: `url('../../../assets/img/usyd.png')`,
    versions: [{
      createdAt: new Date('Mar 25 2018'),
      name: 'Professional Practice in IT',
      avatar: '../../../assets/instructors/Vaghjiani, Khimji.png',
      semesters: ['2017S2', '2017S1', '2016S2', '2016S1', '2015S2'],
      instructor: 'Dr Vaghjiani, Khimji'
    }]
  },
  {
    code: 'INFO6007',
    institute: 'USYD',
    lastUpdatedAt: new Date(),
    logo: `url('../../../assets/img/usyd.png')`,
    versions: [{
      createdAt: new Date('Mar 25 2018'),
      name: 'Professional Practice in IT',
      avatar: '../../../assets/instructors/Vaghjiani, Khimji.png',
      semesters: ['2018S2', '2018S1'],
      instructor: 'Dr Hasan, M. Rabiul'
    }, {
      createdAt: new Date('Mar 25 2017'),
      name: 'Web Application Development',
      avatar: '../../../assets/instructors/Wong, Bernard.png',
      semesters: ['2017S1', '2017S2'],
      instructor: 'Dr Wong, Bernard'
    }, {
      createdAt: new Date('Mar 25 2017'),
      name: 'Web Application Development',
      avatar: '../../../assets/instructors/Sommer, Steven.png',
      semesters: ['2016S1', '2016S2', '2015S2', '2015S1', '2014S2'],
      instructor: 'Dr Sommer, Steven'
    }]
  }// TODO: add more course data in the tail of this array structure
];

// This part can avoid repetitition. Touch it on second thought
export const reviews = [
  {
    category: 'workload',
    tag: '只需要上课，平时没作业',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'workload',
    tag: '有一些作业，总共耗时不超过5小时',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'workload',
    tag: '有一些作业，但不是每周都有，总共耗时不超过5－10小时',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'workload',
    tag: '有一些作业，但不是每周都有，总共耗时超过10小时',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'workload',
    tag: '每周都有作业，总共耗时超过20小时',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'exam',
    tag: '不用上这个课都可以做出所有作业',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'exam',
    tag: '不用上课也能做出一些，上课对考试有一定帮助',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'exam',
    tag: '能记住课件内容就可以考好',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'exam',
    tag: '除了能记住课件内容，还需要有一定的归纳总结和分析能力',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'exam',
    tag: '需要充分理解上课内容，需要很多归纳总结和分析的能力',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'assignment',
    tag: '不用上这个课都可以做出所有作业',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'assignment',
    tag: '不用上课也能做出一些，上课对完成作业有一定帮助',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'assignment',
    tag: '上课学的知识足以完成所有作业',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'assignment',
    tag: '除了上课学的，还要自学一点东西才能完成',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'assignment',
    tag: '如果不自己额外学习很多的话无法完成作业',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'programming',
    tag: '不需要会编程就能学',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'programming',
    tag: '会一点点编程就能学，不会也能过',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'programming',
    tag: '会编程才能学，不会编程很容易挂科',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'programming',
    tag: '需要有一定的编程经验，即使不是该课使用的编程语言，努力一下也能学',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'programming',
    tag: '对该课使用的编程语言一定要非常熟悉，最好有相关项目的经验',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'marking',
    tag: '大部分人都能拿高分',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'marking',
    tag: '总体来说不错，但是还是有人只拿了CR甚至挂科',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'marking',
    tag: '正常，努力学习还是能拿高分， 不学可能会挂科',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'marking',
    tag: '很难拿高分，很厉害的人也没能拿很高的分，大部分人挣扎着不挂科',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  },
  {
    category: 'marking',
    tag: '大家都觉得很难，几乎所有的人都只是刚刚不挂',
    createdAt: new Date(),
    createdBy: '',
    instructor: '',
  }
];
