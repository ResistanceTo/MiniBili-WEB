<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MiniBili 更新订阅</title>
        <style>
          :root {
            color-scheme: light dark;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", sans-serif;
            background: #f6f7fb;
            color: #11141b;
          }

          * { box-sizing: border-box; }

          body {
            margin: 0;
            min-height: 100vh;
            background:
              radial-gradient(circle at 10% -10%, rgba(251, 114, 153, 0.2), transparent 36rem),
              radial-gradient(circle at 92% 8%, rgba(251, 146, 60, 0.14), transparent 30rem),
              #f6f7fb;
          }

          main {
            width: min(760px, calc(100% - 32px));
            margin: 0 auto;
            padding: 56px 0 72px;
          }

          header, article {
            border: 1px solid rgba(17, 20, 27, 0.08);
            background: rgba(255, 255, 255, 0.76);
            box-shadow: 0 20px 60px rgba(30, 35, 60, 0.08);
            backdrop-filter: blur(24px);
          }

          header {
            padding: clamp(24px, 5vw, 42px);
            border-radius: 32px;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #6b7280;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .brand img { width: 28px; height: 28px; border-radius: 8px; }
          .brand span { color: #f97316; }

          h1 {
            margin: 22px 0 10px;
            font-size: clamp(36px, 8vw, 60px);
            line-height: 1;
            letter-spacing: -0.045em;
          }

          header p {
            max-width: 580px;
            margin: 0;
            color: #5f6675;
            font-size: 16px;
            line-height: 1.75;
          }

          .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }

          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0 17px;
            border: 0;
            border-radius: 14px;
            background: #11141b;
            color: white;
            font: inherit;
            font-size: 14px;
            font-weight: 650;
            text-decoration: none;
            cursor: pointer;
          }

          .button.secondary {
            border: 1px solid rgba(17, 20, 27, 0.1);
            background: rgba(255, 255, 255, 0.7);
            color: #313744;
          }

          .feed-heading {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 16px;
            margin: 38px 4px 16px;
          }

          .feed-heading h2 { margin: 0; font-size: 19px; }
          .feed-heading span { color: #8a909d; font-size: 13px; }

          .items { display: grid; gap: 14px; }

          article { padding: 22px; border-radius: 24px; }
          article h3 { margin: 0; font-size: 18px; }
          article h3 a { color: inherit; text-decoration: none; }
          article h3 a:hover { color: #fb7299; }
          article time { display: block; margin-top: 7px; color: #9096a3; font-size: 12px; }
          article p { margin: 13px 0 0; color: #606775; font-size: 14px; line-height: 1.7; }

          footer { margin-top: 28px; text-align: center; color: #969ca8; font-size: 12px; }

          @media (prefers-color-scheme: dark) {
            :root { background: #090a0d; color: #f4f5f8; }
            body {
              background:
                radial-gradient(circle at 10% -10%, rgba(251, 114, 153, 0.16), transparent 36rem),
                radial-gradient(circle at 92% 8%, rgba(251, 146, 60, 0.1), transparent 30rem),
                #090a0d;
            }
            header, article {
              border-color: rgba(255, 255, 255, 0.09);
              background: rgba(30, 33, 42, 0.68);
              box-shadow: none;
            }
            header p, article p { color: #a8adba; }
            .button { background: #f4f5f8; color: #11141b; }
            .button.secondary {
              border-color: rgba(255, 255, 255, 0.12);
              background: rgba(255, 255, 255, 0.06);
              color: #e5e7eb;
            }
          }

          @media (max-width: 520px) {
            main { padding-top: 20px; }
            header { border-radius: 26px; }
            .actions, .button { width: 100%; }
          }
        </style>
      </head>
      <body>
        <main>
          <header>
            <div class="brand">
              <img src="/favicon-512.png" alt="MiniBili" />
              MiniBili <span>RSS</span>
            </div>
            <h1>更新订阅</h1>
            <p>把这个地址添加到你常用的 RSS 阅读器。MiniBili 发布新 Build 后，阅读器会自动获取更新并提醒你。</p>
            <div class="actions">
              <button class="button" id="copy-feed" type="button" onclick="copyFeedUrl()">复制订阅地址</button>
              <a class="button secondary" href="/changelog/">返回更新日志</a>
            </div>
          </header>

          <div class="feed-heading">
            <h2>最近更新</h2>
            <span><xsl:value-of select="count(rss/channel/item)" /> 个 Build</span>
          </div>

          <section class="items">
            <xsl:for-each select="rss/channel/item">
              <article>
                <h3>
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                    <xsl:value-of select="title" />
                  </a>
                </h3>
                <time>
                  <xsl:attribute name="datetime"><xsl:value-of select="pubDate" /></xsl:attribute>
                  <xsl:value-of select="pubDate" />
                </time>
                <p><xsl:value-of select="description" /></p>
              </article>
            </xsl:for-each>
          </section>

          <footer>MiniBili 更新日志 · RSS 2.0</footer>
        </main>

        <script>
          document.querySelectorAll("time[datetime]").forEach(function (time) {
            var date = new Date(time.getAttribute("datetime"));
            time.textContent = new Intl.DateTimeFormat("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "Asia/Shanghai"
            }).format(date);
          });

          function copyFeedUrl() {
            var button = document.getElementById("copy-feed");
            var feedUrl = window.location.href.split("#")[0];
            navigator.clipboard.writeText(feedUrl).then(function () {
              button.textContent = "已复制订阅地址";
              window.setTimeout(function () { button.textContent = "复制订阅地址"; }, 2000);
            });
          }
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
