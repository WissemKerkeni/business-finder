"""Render desktop-final.html at a true 375px width (iframe) and slice it for review."""
import pathlib, subprocess, sys, re
from PIL import Image
here = pathlib.Path(__file__).parent
html = (here.parent / "stitch" / "desktop-final.html").read_text(encoding="utf-8")
# vh units would follow the (tall) iframe height, so pin them to a phone viewport.
html = html.replace("100svh", "812px").replace("h-screen", "h-[812px]").replace("max-h-screen", "max-h-[812px]")
html = re.sub(r"(\d+)vh", lambda m: f"{int(m.group(1))*8.12:.0f}px", html)
(here / "render-mobile.html").write_text(html, encoding="utf-8")
(here / "mobile-frame.html").write_text((here / "mobile-frame.html").read_text().replace("/stitch/desktop-final.html", "/_scratch/render-mobile.html"), encoding="utf-8")
out = pathlib.Path(sys.argv[1])
out.unlink(missing_ok=True)
H = int(sys.argv[2]) if len(sys.argv) > 2 else 16000
subprocess.run([r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "--headless=new", "--disable-gpu", "--hide-scrollbars",
    r"--user-data-dir=C:\Users\A0E13918\AppData\Local\Temp\edge-headless-dipiu", "--virtual-time-budget=20000",
    f"--window-size=600,{H}", f"--screenshot={out}", "http://localhost:4180/_scratch/mobile-frame.html"], check=False)
import time
for _ in range(90):
    if out.exists() and out.stat().st_size > 0: time.sleep(1); break
    time.sleep(1)
im = Image.open(out).convert("RGB").crop((0, 0, 375, H))
px = im.load(); last = H - 1
while last > 0 and px[10, last] == (51, 51, 51): last -= 1
im = im.crop((0, 0, 375, last + 1)); print("height", last + 1)
cols = 5; seg = (last + cols) // cols
sheet = Image.new("RGB", (cols * 385, seg), (51, 51, 51))
for c in range(cols):
    sheet.paste(im.crop((0, c * seg, 375, min(last + 1, (c + 1) * seg))), (c * 385, 0))
sheet.save(out.with_name("mobile-sheet.jpg"), quality=80)
for i, y in enumerate(range(0, last + 1, 1400)):
    im.crop((0, y, 375, min(last + 1, y + 1400))).save(out.with_name(f"m{i:02d}.jpg"), quality=85)
