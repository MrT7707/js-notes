const fs = require("fs");
const path = require("path");
const process = require("process");

const ignoreList = [".vuepress", ".DS_Store"];

const workPath = path.join(process.cwd() + "/docs");

function buildChildren(path, parentName = "") {
  const files = fs.readdirSync(path);
  return files
    .map((file) => {
      if (ignoreList.includes(file)) return;
      const current = { title: file };
      const subPath = `${path}/${file}`;
      if (fs.statSync(subPath).isDirectory()) {
        current.children = buildChildren(subPath, `${parentName}/${file}`);
      } else {
        if (file === "README.md") {
          current.path = `${parentName}/`;
        } else {
          const suffixName = file.slice(-3);
          if (suffixName !== ".md") return;
          current.path = `${parentName}/${file.slice(0, -3)}`;
        }
      }
      return current;
    })
    .filter((item) => item);
}

const sidebar = buildChildren(workPath);


module.exports = {
  title: "个人笔记",
  description:
    "记录个人学习路上的前端重要知识点和遇到的好文章",
  themeConfig: {
    nav: [{ text: "GitHub", link: "https://github.com/MrT7707" }],
    sidebar,
  },
  dest: path.resolve(__dirname, "../", "../", "dist"),
  base: "/js-notes/",
  evergreen: true,
};
