import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

const staticContent = `
<div align="center">

👋 Hi, there! I'm **Daun Seo**

</div>
`;

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  let blogSection = `
    <div align="center">
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">
        Blog Posts
    </h2>
    <div align="center">
        <a href="https://dev-district.tistory.com">
        <img src="https://img.shields.io/badge/Tistory-000000?style=for-the-badge&logo=Tistory&logoColor=white&link=https://dev-district.tistory.com">
        </a>
    </div>
  `;

  try {
    const feed = await parser.parseURL("https://seodaun.tistory.com/rss");
    const latestPostsCount = 5;

    for (let i = 0; i < latestPostsCount && i < feed.items.length; i++) {
      const { title, link } = feed.items[i];
      blogSection += `<a href="${link}">${title}</a></br>\n`;
    }
  } catch (error) {
    console.error("RSS 파싱 중 오류 발생:", error);
    blogSection += "블로그 글을 불러오지 못했습니다.\n";
  }

  const finalContent = staticContent + blogSection;
  writeFileSync("README.md", finalContent, "utf8");
})();
