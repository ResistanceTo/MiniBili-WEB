import { TodoStatus, type TodoNode } from "./types";

export const roadmap: TodoNode[] = [
	{
		title: "我的",
		children: [
			{
				title: "个人信息",
				children: [
					{
						title: "资产",
						status: TodoStatus.Completed,
					},
					{
						title: "粉丝",
						status: TodoStatus.Completed,
					},
					{
						title: "关注",
						status: TodoStatus.Bug,
					}
				]
			},
			{
				title: "设置",
				status: TodoStatus.Planned,
			}
		],
	},
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
						title: "热榜",
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
		title: "视频详情页",
		children: [
			{
				title: "视频播放",
				status: TodoStatus.Completed,
			},
			{
				title: "弹幕播放",
				status: TodoStatus.InProgress,
			},
			{
				title: "弹幕设置",
				status: TodoStatus.InProgress,
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
				]
			}
		]
	}
];
