"""Convert the accepted report to LaTeX; do not rewrite its prose.

Run from any directory: py docs/report/prepare_content.py
Requires the Python markdown package.
"""
from pathlib import Path
import copy
import re
import shutil
import xml.etree.ElementTree as ET

import markdown

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / "bao-cao"


def document_tree(source):
    root = ET.fromstring("<article>" + markdown.markdown(source, extensions=["tables"]) + "</article>")
    children = list(root)
    for index, node in enumerate(children):
        if node.tag != "p" or node.find("img") is None:
            continue
        figure = ET.Element("figure")
        figure.append(copy.deepcopy(node.find("img")))
        if index + 1 < len(children) and children[index + 1].find("em") is not None:
            ET.SubElement(figure, "figcaption").text = "".join(children[index + 1].itertext())
            root.remove(children[index + 1])
        position = list(root).index(node)
        root.remove(node)
        root.insert(position, figure)
    return root


def tex(text):
    substitutions = {
        "\\": r"\textbackslash{}", "&": r"\&", "%": r"\%", "$": r"\$",
        "#": r"\#", "_": r"\_", "{": r"\{", "}": r"\}",
        "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
        "→": r"\ensuremath{\rightarrow}", "←": r"\ensuremath{\leftarrow}",
    }
    return "".join(substitutions.get(c, c) for c in text)


def inline(node):
    result = tex(node.text or "")
    for child in node:
        content = inline(child)
        if child.tag == "strong":
            result += r"\textbf{" + content + "}"
        elif child.tag == "em":
            result += r"\emph{" + content + "}"
        elif child.tag == "code":
            result += r"{\small\texttt{" + content + "}}"
        elif child.tag == "a":
            href = child.get("href", "").replace("%", r"\%")
            if "".join(child.itertext()) == child.get("href"):
                result += r"\url{" + href + "}"
            else:
                result += r"\href{" + href + "}{" + content + "}"
        else:
            result += content
        result += tex(child.tail or "")
    return result


def figure(node, number):
    name = Path(node.find("img").get("src")).name
    caption = re.sub(r"^Hình\s+4\.\d+\.\s*", "", node.findtext("figcaption", ""))
    caption = re.sub(r"\s*Nguồn:.*$", "", caption).rstrip(".")
    short = tex(caption)
    full = short + ". Nguồn: website của nhóm, chụp ngày 23/11/2026."
    if "di-dong" in name:
        media = r"""\begin{subfigure}[t]{0.27\textwidth}
\centering
\includegraphics[width=\linewidth]{img/screenshots/""" + name + r"""}
\caption{Phần đầu bài ôn tập}
\end{subfigure}\hspace{0.06\textwidth}%
\begin{subfigure}[t]{0.27\textwidth}
\centering
\includegraphics[width=\linewidth]{img/screenshots/hinh-4-14-giao-dien-di-dong-cuon.png}
\caption{Phần dưới sau khi cuộn}
\end{subfigure}"""
        short = "Giao diện ôn tập trên điện thoại"
        full = "Giao diện điện thoại: phần đầu bài ôn tập và phần dưới sau khi cuộn. Nguồn: website của nhóm, chụp ngày 23/11/2026."
    else:
        media = (r"\includegraphics[width=0.94\linewidth,height=0.33\textheight,keepaspectratio]"
                 + "{img/screenshots/" + name + "}")
    return ("\\begin{figure}[H]\n\\centering\n" + media
            + "\n\\caption[" + short + "]{" + full + "}"
            + "\n\\label{fig:web-" + str(number) + "}\n\\end{figure}\n")


def table(node, number):
    captions = {
        1: "Kết quả xây dựng các thành phần của website",
        2: "Kết quả kiểm tra các thao tác chính trên website",
    }
    rows = node.findall(".//tr")
    result = [r"\begin{table}[H]", r"\centering",
              r"\begingroup\small\setstretch{1.1}\renewcommand{\arraystretch}{1.25}\setlength{\extrarowheight}{2pt}",
              r"\begin{tabularx}{\textwidth}{|>{\raggedright\arraybackslash}p{0.33\textwidth}|L|}",
              r"\hline"]
    for i, row in enumerate(rows):
        cells = [inline(cell) for cell in row]
        if i == 0:
            cells = [r"\textbf{" + cell + "}" for cell in cells]
        result.append(" & ".join(cells) + r" \\")
        result.append(r"\hline")
    result.extend([r"\end{tabularx}", r"\endgroup",
                   r"\caption{" + captions[number] + "}",
                   r"\label{tab:web-" + str(number) + "}", r"\end{table}"])
    return "\n".join(result) + "\n"


def main():
    source = (SOURCE / "bao-cao-hoan-chinh.md").read_text(encoding="utf-8")
    tree = document_tree(source)
    parts = {i: [] for i in range(1, 6)}
    part = 0
    references = []
    image_count = 0
    table_count = 0
    for node in tree:
        text = "".join(node.itertext())
        if node.tag == "h1":
            match = re.match(r"PHẦN (\d) (.*)", text)
            if match:
                part = int(match[1])
                parts[part].append(r"\chapter{" + tex(match[2]) + "}\n")
            elif "TÀI LIỆU THAM KHẢO" in text:
                part = 6
            continue
        if part == 0:
            continue  # Metadata belongs on the new cover, not in part 1.
        if part == 6:
            if node.tag == "p":
                references.append(re.sub(r"^\[\d+\]\s*", "", inline(node)))
            continue
        if node.tag in ("h2", "h3"):
            title = re.sub(r"^(?:Chương\s+)?\d+(?:\.\d+)*\s+", "", text)
            command = "section" if node.tag == "h2" else "subsection"
            parts[part].append("\\" + command + "{" + tex(title) + "}\n")
        elif node.tag == "p":
            parts[part].append(inline(node) + "\n")
        elif node.tag in ("ol", "ul"):
            environment = "enumerate" if node.tag == "ol" else "itemize"
            parts[part].append("\\begin{" + environment + "}\n" + "\n".join(
                r"\item " + inline(li) for li in node) + "\n\\end{" + environment + "}\n")
        elif node.tag == "figure":
            image_count += 1
            parts[part].append(figure(node, image_count))
        elif node.tag == "table":
            table_count += 1
            parts[part].append(table(node, table_count))
    for number, paragraphs in parts.items():
        (ROOT / "content" / f"part-{number}.tex").write_text(
            "% Generated by prepare_content.py from the accepted Markdown report.\n"
            + "\n".join(paragraphs) + "\n\\clearpage\n", encoding="utf-8")
    bibliography = (r"\begin{thebibliography}{9}" + "\n"
                    + r"\addcontentsline{toc}{chapter}{TÀI LIỆU THAM KHẢO}" + "\n"
                    + "\n\n".join(r"\bibitem{ref" + str(i) + "} " + ref
                                  for i, ref in enumerate(references, 1))
                    + "\n" + r"\end{thebibliography}" + "\n")
    (ROOT / "ref" / "ref.tex").write_text(bibliography, encoding="utf-8")
    images = ROOT / "img" / "screenshots"
    images.mkdir(exist_ok=True)
    used = [n.find("img").get("src") for n in tree if n.tag == "figure"]
    for relative in used:
        source = (SOURCE / relative).resolve()
        destination = (images / source.name).resolve()
        if source != destination:
            shutil.copy2(source, destination)
        assert destination.is_file(), destination
    assert (images / "hinh-4-14-giao-dien-di-dong-cuon.png").is_file()
    assert image_count == 12 and table_count == 2 and len(references) == 3
    print("Prepared 5 parts, 12 figures (13 screenshots), 2 content tables and 3 references.")


if __name__ == "__main__":
    main()
