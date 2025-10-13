import { TodoStatus, type RoadmapProps, type TodoNode } from "config";
import { memo, useState, useMemo } from "react";
import { FiCheckCircle, FiCircle, FiAlertCircle, FiClock, FiChevronDown, FiChevronRight, FiSearch } from "react-icons/fi";

const getStatusIcon = (status: TodoStatus) => {
	switch (status) {
		case TodoStatus.Completed:
			return FiCheckCircle;
		case TodoStatus.InProgress:
			return FiClock;
		case TodoStatus.Planned:
			return FiCircle;
		case TodoStatus.Bug:
			return FiAlertCircle;
	}
};

const getStatusColor = (status: TodoStatus) => {
	switch (status) {
		case TodoStatus.Completed:
			return "text-green-600 dark:text-green-400";
		case TodoStatus.InProgress:
			return "text-blue-600 dark:text-blue-400";
		case TodoStatus.Planned:
			return "text-gray-400 dark:text-gray-500";
		case TodoStatus.Bug:
			return "text-red-600 dark:text-red-400";
	}
};

const getStatusLabel = (status: TodoStatus) => {
	switch (status) {
		case TodoStatus.Completed:
			return "已完成";
		case TodoStatus.InProgress:
			return "开发中";
		case TodoStatus.Planned:
			return "计划中";
		case TodoStatus.Bug:
			return "Bug";
	}
};

// 递归计算统计信息
const countStats = (nodes: TodoNode[]): { completed: number; inProgress: number; planned: number; bug: number; total: number } => {
	let completed = 0;
	let inProgress = 0;
	let planned = 0;
	let bug = 0;
	let total = 0;

	const count = (node: TodoNode) => {
		if (node.status !== undefined) {
			total++;
			switch (node.status) {
				case TodoStatus.Completed:
					completed++;
					break;
				case TodoStatus.InProgress:
					inProgress++;
					break;
				case TodoStatus.Planned:
					planned++;
					break;
				case TodoStatus.Bug:
					bug++;
					break;
			}
		}
		if (node.children) {
			node.children.forEach(count);
		}
	};

	nodes.forEach(count);
	return { completed, inProgress, planned, bug, total };
};

// 搜索和筛选节点
const filterNode = (node: TodoNode, searchTerm: string, statusFilter: Set<TodoStatus>): boolean => {
	// 如果有状态且不在筛选列表中，过滤掉
	if (node.status !== undefined && statusFilter.size > 0 && !statusFilter.has(node.status)) {
		return false;
	}

	// 搜索标题
	const matchesSearch = searchTerm === "" || node.title.toLowerCase().includes(searchTerm.toLowerCase());

	// 如果当前节点匹配，返回 true
	if (matchesSearch && (node.status !== undefined || !node.children)) {
		return true;
	}

	// 如果有子节点，递归检查子节点
	if (node.children) {
		return node.children.some(child => filterNode(child, searchTerm, statusFilter));
	}

	return false;
};

// 递归过滤树结构
const filterTree = (nodes: TodoNode[], searchTerm: string, statusFilter: Set<TodoStatus>): TodoNode[] => {
	return nodes.map(node => {
		if (!node.children) {
			// 叶子节点，直接检查是否匹配
			return filterNode(node, searchTerm, statusFilter) ? node : null;
		}

		// 有子节点的节点，递归过滤子节点
		const filteredChildren = filterTree(node.children, searchTerm, statusFilter).filter(Boolean) as TodoNode[];

		// 如果有匹配的子节点，保留此节点
		if (filteredChildren.length > 0) {
			return { ...node, children: filteredChildren };
		}

		// 如果节点标题匹配搜索词，保留此节点（即使子节点被过滤掉）
		if (searchTerm !== "" && node.title.toLowerCase().includes(searchTerm.toLowerCase())) {
			return node;
		}

		return null;
	}).filter(Boolean) as TodoNode[];
};

// 递归渲染树节点
interface TreeNodeProps {
	node: TodoNode;
	isLast: boolean;
	prefix: string;
	collapsedNodes: Set<string>;
	onToggleCollapse: (path: string) => void;
	nodePath: string;
}

const TreeNode = ({ node, isLast, prefix, collapsedNodes, onToggleCollapse, nodePath }: TreeNodeProps) => {
	const hasStatus = node.status !== undefined;
	const StatusIcon = hasStatus ? getStatusIcon(node.status!) : null;
	const statusColor = hasStatus ? getStatusColor(node.status!) : "";
	const hasChildren = node.children && node.children.length > 0;
	const isCollapsed = collapsedNodes.has(nodePath);

	return (
		<div className="leading-relaxed">
			{/* 当前节点 */}
			<div className="flex items-start gap-2 py-0.5">
				<span className="text-gray-400 dark:text-gray-600 whitespace-pre">
					{prefix}
					{isLast ? "└─ " : "├─ "}
				</span>
				{hasChildren && (
					<button
						onClick={() => onToggleCollapse(nodePath)}
						className="flex-shrink-0 mt-0.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded p-0.5 transition-colors"
						aria-label={isCollapsed ? "展开" : "折叠"}
					>
						{isCollapsed ? (
							<FiChevronRight className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
						) : (
							<FiChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
						)}
					</button>
				)}
				{StatusIcon && (
					<div className="flex-shrink-0 mt-0.5">
						<StatusIcon className={`w-4 h-4 ${statusColor}`} />
					</div>
				)}
				<span className={`flex-1 font-sans ${
					hasStatus && node.status === TodoStatus.Completed
						? "text-gray-500 dark:text-gray-500 line-through"
						: hasChildren
						? "font-semibold text-gray-900 dark:text-white"
						: "text-gray-700 dark:text-gray-300"
				}`}>
					{node.title}
				</span>
			</div>

			{/* 递归渲染子节点 */}
			{hasChildren && !isCollapsed && (
				<div>
					{node.children!.map((child, idx) => (
						<TreeNode
							key={idx}
							node={child}
							isLast={idx === node.children!.length - 1}
							prefix={prefix + (isLast ? "    " : "│   ")}
							collapsedNodes={collapsedNodes}
							onToggleCollapse={onToggleCollapse}
							nodePath={`${nodePath}/${child.title}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const RoadmapFull = ({ items }: RoadmapProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<Set<TodoStatus>>(new Set());
	const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());

	// 过滤后的数据
	const filteredItems = useMemo(() => {
		return filterTree(items, searchTerm, statusFilter);
	}, [items, searchTerm, statusFilter]);

	const stats = countStats(filteredItems);

	const handleToggleCollapse = (path: string) => {
		setCollapsedNodes(prev => {
			const newSet = new Set(prev);
			if (newSet.has(path)) {
				newSet.delete(path);
			} else {
				newSet.add(path);
			}
			return newSet;
		});
	};

	const toggleStatusFilter = (status: TodoStatus) => {
		setStatusFilter(prev => {
			const newSet = new Set(prev);
			if (newSet.has(status)) {
				newSet.delete(status);
			} else {
				newSet.add(status);
			}
			return newSet;
		});
	};

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					开发路线图
				</h1>
				<p className="text-gray-600 dark:text-gray-400 text-sm">
					查看 MiniBili 的开发进度和计划
				</p>
			</div>

			{/* 搜索框 */}
			<div className="relative">
				<FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<input
					type="text"
					placeholder="搜索功能..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
				/>
			</div>

			{/* 状态筛选与统计 */}
			<div className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
				<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">状态筛选</h3>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{[
						{ status: TodoStatus.Completed, count: stats.completed },
						{ status: TodoStatus.InProgress, count: stats.inProgress },
						{ status: TodoStatus.Planned, count: stats.planned },
						{ status: TodoStatus.Bug, count: stats.bug },
					].map(({ status, count }) => {
						const Icon = getStatusIcon(status);
						const color = getStatusColor(status);
						const isActive = statusFilter.size === 0 || statusFilter.has(status);
						return (
							<button
								key={status}
								onClick={() => toggleStatusFilter(status)}
								className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
									isActive
										? "bg-gray-100 dark:bg-white/5"
										: "opacity-40 hover:opacity-60"
								}`}
							>
								<Icon className={`w-4 h-4 ${color}`} />
								<span className="text-sm text-gray-600 dark:text-gray-400">
									{getStatusLabel(status)} <span className="font-semibold text-gray-800 dark:text-gray-200">{count}</span>
								</span>
							</button>
						);
					})}
				</div>
				{statusFilter.size > 0 && (
					<button
						onClick={() => setStatusFilter(new Set())}
						className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
					>
						清除筛选
					</button>
				)}
			</div>

			{/* 树形待办清单 */}
			<div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5">
				{filteredItems.length > 0 ? (
					<div className="font-mono text-sm">
						{filteredItems.map((node, idx) => (
							<TreeNode
								key={idx}
								node={node}
								isLast={idx === filteredItems.length - 1}
								prefix=""
								collapsedNodes={collapsedNodes}
								onToggleCollapse={handleToggleCollapse}
								nodePath={node.title}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
						没有找到匹配的结果
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(RoadmapFull);
