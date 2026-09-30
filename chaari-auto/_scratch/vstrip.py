# Frame strips per video: N evenly spaced frames -> sheets/vstrip-<n>.jpg (rows labelled with file + time)
import subprocess, glob, os, sys, io, json
import imageio_ffmpeg
from PIL import Image, ImageDraw
from probe import probe
FF=imageio_ffmpeg.get_ffmpeg_exe()
N=int(sys.argv[2]) if len(sys.argv)>2 else 8
files=sorted(glob.glob(sys.argv[1]))
W=150; rows=[]
def frame(f,t,w=W):
    out=subprocess.run([FF,'-v','error','-ss',str(t),'-i',f,'-frames:v','1','-vf',f'scale={w}:-2','-f','image2pipe','-vcodec','png','-'],capture_output=True).stdout
    return Image.open(io.BytesIO(out)).convert('RGB') if out else None
for f in files:
    p=probe(f); d=p['dur'] or 10
    ims=[frame(f,round(d*(i+0.5)/N,1)) for i in range(N)]
    ims=[i for i in ims if i]
    h=max(i.height for i in ims)+18
    row=Image.new('RGB',(W*N,h),'white'); dr=ImageDraw.Draw(row)
    for k,i in enumerate(ims): row.paste(i,(k*W,18)); dr.text((k*W+2,2),f"{d*(k+0.5)/N:.0f}s",fill='red')
    dr.text((W*2,2),f"{os.path.basename(f)} {p['w']}x{p['h']} {d}s",fill='blue')
    rows.append(row)
os.makedirs('sheets',exist_ok=True)
per=4
for s in range(0,len(rows),per):
    ch=rows[s:s+per]; sheet=Image.new('RGB',(W*N,sum(r.height for r in ch)),'white'); y=0
    for r in ch: sheet.paste(r,(0,y)); y+=r.height
    fn=f"sheets/vstrip-{sys.argv[3] if len(sys.argv)>3 else 'x'}-{s//per:02d}.jpg"; sheet.save(fn,quality=80); print(fn)
