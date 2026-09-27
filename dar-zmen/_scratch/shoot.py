"""Screenshot a local HTML file with headless Edge and slice it. usage: shoot.py in.html out.png width height"""
import pathlib, subprocess, sys, time
from PIL import Image
src, out, W, H = pathlib.Path(sys.argv[1]).resolve(), pathlib.Path(sys.argv[2]).resolve(), int(sys.argv[3]), int(sys.argv[4])
out.unlink(missing_ok=True)
subprocess.run([r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "--headless=new", "--disable-gpu", "--hide-scrollbars",
    r"--user-data-dir=C:\Users\A0E13918\AppData\Local\Temp\edge-headless-darzmen", "--virtual-time-budget=20000",
    f"--window-size={W},{H}", f"--screenshot={out}", (sys.argv[1] if sys.argv[1].startswith("http") else src.as_uri())], check=False)
for _ in range(90):
    if out.exists() and out.stat().st_size > 0: time.sleep(1); break
    time.sleep(1)
im = Image.open(out).convert("RGB"); print(im.size)
for i, y in enumerate(range(0, H, 1200)):
    im.crop((0, y, W, min(H, y + 1200))).resize((1080, int((min(H, y + 1200) - y) * 1080 / W))).save(out.with_name(f"{out.stem}-{i:02d}.jpg"), quality=80)
