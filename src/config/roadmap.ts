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
					}
				]
			},
		],
	},
	{
		title: "动态",
		children: [
			{
				title: "视频",
				status: TodoStatus.Completed,
			},
			{
				title: "综合",
				status: TodoStatus.Planned,
			}
		],
	},
	{
		title: "我的",
		children: [
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
								status: TodoStatus.Planned,
							}
						]
					},
					{
						title: "关注",
						children: [
							{
								title: "数量",
								status: TodoStatus.Bug,
							},
							{
								title: "二级列表",
								status: TodoStatus.Planned,
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
								status: TodoStatus.Bug,
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
							}
						]
					}
				]
			},
			{
				title: "设置",
				status: TodoStatus.Planned,
				children: [
					{
						title: "隐私",
						status: TodoStatus.Planned,
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
						status: TodoStatus.InProgress,
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
						status: TodoStatus.InProgress,
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
						status: TodoStatus.Bug,
					},
					{
						title: "收藏",
						status: TodoStatus.Bug,
					},
					{
						title: "分享",
						status: TodoStatus.Planned,
					},
					{
						title: "关注",
						status: TodoStatus.Planned,
					},
				]
			}
		]
	},
	{
		title: "UP主",
		children: [
			{
				title: "个人信息",
				status: TodoStatus.Planned,
			},
			{
				title: "关注",
				status: TodoStatus.Planned,
			}
		]
	},
	{
		title: "评论",
		children: [
			{
				title: "基本展示",
				status: TodoStatus.Planned,
			},
			{
				title: "楼中楼展示",
				status: TodoStatus.Planned,
			},
			{
				title: "回复",
				status: TodoStatus.Planned,
			}
		]
	}
];
