import { productFacts } from "../config/productFacts";
import { disclaimer, downloadLinks, keyFacts, list, officialLinks, sponsorshipFacts, textResponse } from "../lib/llms";

export function GET() {
	return textResponse(`# MiniBili

> ${productFacts.description}

${disclaimer}

## 关键事实

${list(keyFacts)}

## 下载

${list(downloadLinks)}

## 赞助权益

${list(sponsorshipFacts)}

## 官方页面

${list(officialLinks)}
- 完整说明：https://minibili.zhaohe.org/llms-full.txt
`);
}
