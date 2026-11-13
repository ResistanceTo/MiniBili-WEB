import { productFacts } from "../config/productFacts";
import {
	communityLinks,
	disclaimer,
	disclaimerEn,
	downloadLinks,
	fullTextLink,
	keyFacts,
	list,
	optionalLinks,
	pageLinks,
	textResponse,
} from "../lib/llms";

// 结构遵循 https://llmstxt.org ：H1 → 引用块摘要 → 不带标题的说明 → 若干 H2 链接列表（Optional 段可跳过）
// H2 段落下只放 Markdown 链接，事实陈述放在 H2 之前
export function GET() {
	return textResponse(`# MiniBili

> ${productFacts.description}

${disclaimer}

${productFacts.descriptionEn} ${disclaimerEn}

关键事实：

${list(keyFacts)}

## 下载

${list(downloadLinks)}

## 官方页面

${list([...pageLinks, fullTextLink])}

## 社区与赞助

${list(communityLinks)}

## Optional

${list(optionalLinks)}
`);
}
