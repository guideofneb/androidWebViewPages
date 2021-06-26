import katex from 'katex';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
const gfm = require('remark-gfm');

// Enum like structure for identifying "latex" or "markdown"
const type = {
    INLINE_LATEX: 0,
    BLOCK_LATEX: 1,
    MARKDOWN: 2
}
// Regex for matching contents between either inline latex, block latex or markdown
const regex_LtOrMd = /(({i}(.|\s)*?{\/i})|({b}(.|\s)*?{\/b})|({m}(.|\s)*?{\/m}))/g;
const LateMarkRender = ({ input }) => {
    return <>{
        (input.match(regex_LtOrMd) ?? []).map((d1) => {
            // Returns the regex match of current index with the type of data it is; either Markdown or Latex
            return {
                type: d1.includes(String.raw`{i}`) ? type.INLINE_LATEX : (d1.includes(String.raw`{b}`) ? type.BLOCK_LATEX : type.MARKDOWN),
                data: d1.replace(/({i}|{\/i}|{b}|{\/b}|{m}|{\/m})/g, "")
            }
        }).map((d2) => {
            // If latex => render with katex enginse, else render with markdown engine
            if (d2.type === type.INLINE_LATEX) {
                let katexHTML = katex.renderToString(String.raw`${d2.data}`);
                return <span dangerouslySetInnerHTML={{ __html: katexHTML }}></span>
            } else if (d2.type === type.BLOCK_LATEX) {
                let katexHTML = katex.renderToString(String.raw`${d2.data}`);
                return <div dangerouslySetInnerHTML={{ __html: katexHTML }}></div>
            } else {
                return <ReactMarkdown
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    children={String.raw`${d2.data}`}></ReactMarkdown>;
            }
        })
    }</>
}
export default LateMarkRender;
