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
			return "text-emerald-500";
		case TodoStatus.InProgress:
			return "text-sky-500";
		case TodoStatus.Planned:
			return "text-ink-subtle";
		case TodoStatus.Bug:
			return "text-rose-500";
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
			<div className="flex items-start gap-2 py-1">
				<span className="text-ink-subtle/40 whitespace-pre select-none">
					{prefix}
					{isLast ? "└─ " : "├─ "}
				</span>
				{hasChildren && (
					<button
						onClick={() => onToggleCollapse(nodePath)}
						className="flex-shrink-0 mt-0.5 hover:bg-hairline/10 rounded p-0.5 transition-colors text-ink-subtle hover:text-ink"
						aria-label={isCollapsed ? "展开" : "折叠"}
						aria-expanded={!isCollapsed}
					>
						{isCollapsed ? (
							<FiChevronRight className="w-3.5 h-3.5" />
						) : (
							<FiChevronDown className="w-3.5 h-3.5" />
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
						? "text-ink-subtle/70 line-through"
						: hasChildren
						? "font-semibold text-ink"
						: "text-ink-muted"
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
		<div className="space-y-6">
			<div className="text-center sm:text-left">
				<p className="mb-2 text-sm font-semibold tracking-[0.15em] text-brand">功能演进</p>
				<h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl mb-2">
					开发路线图
				</h1>
				<p className="text-sm text-ink-muted">
					查看 MiniBili 的开发进度、规划特性与问题修复状态
				</p>
			</div>

			{/* 搜索框 */}
			<div className="relative">
				<FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
				<input
					type="text"
					placeholder="搜索功能或模块..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="glass w-full pl-10 pr-4 py-2.5 rounded-2xl text-ink placeholder-ink-subtle text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/30 transition-all"
				/>
			</div>

			{/* 状态筛选与统计 */}
			<div className="glass rounded-3xl p-5">
				<h3 className="text-xs font-semibold uppercase tracking-wider text-ink-subtle mb-3">状态筛选</h3>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
								className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
									isActive
										? "bg-hairline/[0.08] text-ink ring-1 ring-hairline/15 shadow-sm"
										: "opacity-40 hover:opacity-75 text-ink-muted"
								}`}
							>
								<div className="flex items-center gap-2">
									<Icon className={`w-3.5 h-3.5 ${color}`} />
									<span>{getStatusLabel(status)}</span>
								</div>
								<span className="font-bold text-ink">{count}</span>
							</button>
						);
					})}
				</div>
				{statusFilter.size > 0 && (
					<button
						onClick={() => setStatusFilter(new Set())}
						className="mt-3 text-xs text-brand hover:underline font-medium"
					>
						清除状态筛选
					</button>
				)}
			</div>

			{/* 树形待办清单 */}
			<div className="glass rounded-3xl p-5 sm:p-6">
				{filteredItems.length > 0 ? (
					<div className="font-mono text-sm [font-family:ui-monospace,SFMono-Regular,Menlo,monospace,system-ui] leading-relaxed">
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
					<div className="text-center py-12 text-ink-subtle text-sm">
						没有找到匹配的功能或模块
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(RoadmapFull);
