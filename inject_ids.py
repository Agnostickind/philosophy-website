"""
Adds a unique id="..." to every <div class="book-card"> on your
world-literature.html page, based on each book's <h3> title.
Does NOT touch classes, structure, CSS, or JS — only adds one attribute.

Usage:
    python3 inject_ids_standalone.py world-literature.html

Writes: world-literature.html.new  (review it, then rename over the original)
"""
import re, sys

def slugify(title):
    s = title.lower().replace("&", "and")
    s = re.sub(r"[''`]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")

def main(path):
    html = open(path, encoding="utf-8").read()
    pattern = re.compile(r'<div class="book-card">')
    parts = pattern.split(html)

    rebuilt = [parts[0]]
    used = {}
    h3_re = re.compile(r'<h3>(.*?)</h3>', re.S)
    count = 0

    for part in parts[1:]:
        h3m = h3_re.search(part)
        title = re.sub(r'\s+', ' ', h3m.group(1)).strip() if h3m else "untitled"
        base = slugify(title)
        slug, n = base, 2
        while slug in used:
            slug = f"{base}-{n}"
            n += 1
        used[slug] = True
        rebuilt.append(f'<div class="book-card" id="{slug}">' + part)
        count += 1

    out_path = path + ".new"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("".join(rebuilt))
    print(f"Injected {count} ids. Review {out_path}, then replace your original file.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 inject_ids_standalone.py world-literature.html")
        sys.exit(1)
    main(sys.argv[1])
