import marked from "marked";

marked.use({
  gfm: true
});

export function getHtmlContent(markdownText) {
  if (!markdownText) return "";
  return marked(markdownText);
}