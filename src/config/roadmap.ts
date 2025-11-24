import { TodoStatus, type TodoNode } from "./types";

export const roadmap: TodoNode[] = [
	{
		title: "首页",
		children: [
			{
				title: "搜索",
				children: [
					{
						title: "搜索条件",
						status: TodoStatus.Completed,
					},
					{
						title: "搜索结果",
						status: TodoStatus.Completed,
					},
					{
						title: "热门搜索",
						status: TodoStatus.Planned,
					},
					{
						title: "搜索建议",
						status: TodoStatus.Planned,
					}
				]
			},
			{
				title: "视频列表",
				children: [
					{
						title: "UP主信息",
						status: TodoStatus.Completed,
					},
					{
						title: "视频封面",
						status: TodoStatus.Completed,
					},
					{
						title: "点赞投币等信息",
						status: TodoStatus.Completed,
					},
					{
						title: "单列或双列显示视频卡片",
						status: TodoStatus.Completed,
					},
					{
						title: "自定义双列模式下，卡片要展示的信息",
						status: TodoStatus.Completed,
					},
					{
						title: "不看这个视频和不看这个UP主功能",
						status: TodoStatus.Planned,
					},
				]
			},
		],
	},
	{
		title: "动态",
		children: [
			{
				title: "视频",
				children: [
					{
						title: "观看",
						status: TodoStatus.Completed,
					}
				]
			},
			{
				title: "综合",
				children: [
					{
						title: "文本动态",
						status: TodoStatus.Completed,
					},
					{
						title: "图片动态",
						status: TodoStatus.Completed,
					},
					{
						title: "评论信息",
						status: TodoStatus.Completed,
					},
				]
			}
		],
	},
	{
		title: "我的",
		children: [
			{
				title: "登陆",
				children: [
					{
						title: "短信验证码登陆",
						status: TodoStatus.Completed,
					},
					{
						title: "iPad扫码登陆",
						status: TodoStatus.Completed,
					},
					{
						title: "密码登陆",
						status: TodoStatus.Planned,
					},
				]
			},
			{
				title: "个人信息",
				children: [
					{
						title: "基本信息（名字、简介等等）",
						status: TodoStatus.Completed,
					},
					{
						title: "硬币",
						status: TodoStatus.Completed,
					},
					{
						title: "粉丝",
						children: [
							{
								title: "数量",
								status: TodoStatus.Completed,
							},
							{
								title: "二级列表",
								status: TodoStatus.Completed,
							}
						]
					},
					{
						title: "关注",
						children: [
							{
								title: "数量",
								status: TodoStatus.Completed,
							},
							{
								title: "二级列表",
								status: TodoStatus.Completed,
							}
						]
					},
					{
						title: "历史记录",
						children: [
							{
								title: "列表展示",
								status: TodoStatus.Completed,
							},
							{
								title: "基本信息",
								status: TodoStatus.Completed,
							},
							{
								title: "播放",
								status: TodoStatus.Completed,
							},
							{
								title: "记录MiniBili观看视频",
								status: TodoStatus.Completed,
							},
							{
								title: "删除记录",
								status: TodoStatus.Planned,
							},
							{
								title: "搜索",
								status: TodoStatus.Planned,
							}
						]
					},
					{
						title: "收藏夹",
						children: [
							{
								title: "收藏列表展示",
								status: TodoStatus.Completed,
							},
							{
								title: "收藏视频内容展示",
								status: TodoStatus.Completed,
							},
							{
								title: "基本信息",
								status: TodoStatus.Completed,
							},
							{
								title: "播放",
								status: TodoStatus.Completed,
							}
						]
					},
					{
						title: "稍后再看",
						children: [
							{
								title: "列表展示",
								status: TodoStatus.Completed,
							},
							{
								title: "基本信息",
								status: TodoStatus.Completed,
							},
							{
								title: "播放",
								status: TodoStatus.Completed,
							},
							{
								title: "删除稍后再看",
								status: TodoStatus.Completed,
							}
						]
					}
				]
			},
			{
				title: "设置",
				children: [
					{
						title: "隐私",
						children: [
							{
								title: "隐身模式（不同步观看记录）",
								status: TodoStatus.Completed,
							}
						]
					},
					{
						title: "缓存",
						children: [
							{
								title: "清理缓存",
								status: TodoStatus.Completed,
							},
							{
								title: "视频缓存管理",
								status: TodoStatus.Completed,
							},
						]
					}
				]
			}
		],
	},
	{
		title: "视频详情页",
		children: [
			{
				title: "视频播放",
				children: [
					{
						title: "基本播放能力",
						status: TodoStatus.Completed,
					},
					{
						title: "长按倍速播放",
						status: TodoStatus.Completed,
					},
					{
						title: "横向视频点击全屏自动横屏",
						status: TodoStatus.Completed,
					},
					{
						title: "播放设置",
						status: TodoStatus.Planned,
					},
					{
						title: "画中画",
						status: TodoStatus.Completed,
					},
					{
						title: "手机横屏自动视频全屏",
						status: TodoStatus.Planned,
					},
					{
						title: "合集",
						status: TodoStatus.Completed,
					},
				]
			},
			{
				title: "弹幕",
				children: [
					{
						title: "弹幕播放",
						status: TodoStatus.InProgress,
					},
					{
						title: "弹幕设置",
						status: TodoStatus.Bug,
					},
					{
						title: "高级弹幕",
						status: TodoStatus.Planned,
					},
				]
			},
			{
				title: "操作",
				children: [
					{
						title: "点赞",
						status: TodoStatus.Completed,
					},
					{
						title: "投币",
						status: TodoStatus.Completed,
					},
					{
						title: "收藏",
						status: TodoStatus.Completed,
					},
					{
						title: "分享",
						status: TodoStatus.Completed,
					},
					{
						title: "关注",
						status: TodoStatus.Completed,
					},
					{
						title: "稍后再看",
						status: TodoStatus.Completed,
					},
				]
			},
			{
				title: "下载",
				children: [
					{
						title: "下载",
						status: TodoStatus.Completed,
					},
					{
						title: "任务队列",
						status: TodoStatus.Completed,
					},
					{
						title: "任务恢复",
						status: TodoStatus.Completed,
					},
					{
						title: "错误处理",
						status: TodoStatus.InProgress,
					},
					{
						title: "缓存资源删除",
						status: TodoStatus.Completed,
					},
					{
						title: "下载到图库",
						status: TodoStatus.InProgress,
					},
				]
			},
			{
				title: "画质选择",
				children: [
					{
						title: "直接拿最高画质",
						status: TodoStatus.Completed,
					},
					{
						title: "设置默认清晰度",
						status: TodoStatus.Completed,
					},
					{
						title: "手动选择清晰度",
						status: TodoStatus.Completed,
					}
				]
			},
			{
				title: "字幕选择",
				status: TodoStatus.Planned,
			}
		]
	},
	{
		title: "UP主",
		children: [
			{
				title: "个人信息",
				status: TodoStatus.Completed,
			},
			{
				title: "个人空间",
				children: [
					{
						title: "投稿列表",
						status: TodoStatus.Completed,
					},
					{
						title: "动态列表",
						status: TodoStatus.Completed,
					},
					{
						title: "关注、取关",
						status: TodoStatus.Completed,
					}
				],
			},
		]
	},
	{
		title: "番剧",
		status: TodoStatus.Completed,
	},
	{
		title: "直播",
		status: TodoStatus.Completed,
	},
	{
		title: "电影",
		status: TodoStatus.Completed,
	},
	{
		title: "评论",
		children: [
			{
				title: "展示",
				children: [
					{
						title: "置顶评论",
						status: TodoStatus.Planned,
					},
					{
						title: "一级评论",
						status: TodoStatus.Completed,
					},
					{
						title: "楼中楼",
						status: TodoStatus.Completed,
					},
					{
						title: "全部评论页",
						status: TodoStatus.Completed,
					},
					{
						title: "引用回复",
						status: TodoStatus.Planned,
					},
					{
						title: "@功能",
						status: TodoStatus.Planned,
					}
				]
			},
			{
				title: "操作",
				children: [
					{
						title: "点赞",
						status: TodoStatus.Completed,
					},
					{
						title: "点踩",
						status: TodoStatus.Planned,
					},
					{
						title: "评论",
						status: TodoStatus.Completed,
					},
					{
						title: "回复",
						status: TodoStatus.Completed,
					},
					{
						title: "删除",
						status: TodoStatus.InProgress,
					},
				]
			},
			{
				title: "排序",
				children: [
					{
						title: "最热",
						status: TodoStatus.Completed,
					},
					{
						title: "最新",
						status: TodoStatus.Planned,
					}
				]
			}
		]
	},
	{
		title: "推送通知",
		children: [
			{
				title: "私信",
				status: TodoStatus.Planned,
			},
			{
				title: "UP主动态",
				status: TodoStatus.Planned,
			}
		]
	},
	{
		title: "其他需要优化的部分",
		children: [
			{
				title: "点击全屏后，视频被暂停",
				status: TodoStatus.Completed,
			},
			{
				title: "简介部分做成可收起设计，同官B",
				status: TodoStatus.Completed,
			},
			{
				title: "「iOS26」底部菜单参考App Store设计，单独搜索按钮",
				status: TodoStatus.Completed,
			},
			{
				title: "部分界面支持手势操作",
				status: TodoStatus.Planned,
			},
			{
				title: "播放进度记录同步",
				status: TodoStatus.Completed,
			},
			{
				title: "高刷屏帧率问题",
				status: TodoStatus.Planned,
			},
			{
				title: "动态的评论功能",
				status: TodoStatus.Planned,
			},
			{
				title: "连续播放",
				status: TodoStatus.Planned,
			},
			{
				title: "透明logo优化",
				status: TodoStatus.Planned,
			},
			{
				title: "顶部状态栏优化",
				status: TodoStatus.Completed,
			},
			{
				title: "黑暗主题下，优化部分字体和背景颜色对比度不足的问题",
				status: TodoStatus.Planned,
			},
			{
				title: "其他插件集成，如空降助手等",
				status: TodoStatus.Planned,
			}
		]
	}
];
