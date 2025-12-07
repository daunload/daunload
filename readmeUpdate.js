import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

const staticContent = `# 👋 Hi, there! I'm **Daun Seo**

## 📕 Latest Blog Posts
`;

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  let blogSection = "";

  try {
    const feed = await parser.parseURL("https://seodaun.tistory.com/rss");
    const latestPostsCount = 5;

    blogSection += `<ul>`;
    for (let i = 0; i < latestPostsCount && i < feed.items.length; i++) {
      const { title, link } = feed.items[i];
      blogSection += `<li><a href="${link}">${title}</a></li>\n`;
    }

    blogSection += `</ul>`;
  } catch (error) {
    console.error("RSS 파싱 중 오류 발생:", error);
    blogSection += "블로그 글을 불러오지 못했습니다.\n";
  }

  const finalContent = staticContent + blogSection;
  writeFileSync("README.md", finalContent, "utf8");
})();
