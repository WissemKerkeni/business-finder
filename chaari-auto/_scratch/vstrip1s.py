# 1 frame per second strip for one video -> sheets/1s-<name>.jpg
import subprocess, sys, os, io, imageio_ffmpeg
from PIL import Image, ImageDraw
from probe import probe
FF=imageio_ffmpeg.get_ffmpeg_exe()
f=sys.argv[1]; p=probe(f); d=int(p['dur']); W=110
tmp=subprocess.run([FF,'-v','error','-i',f,'-vf',f'fps=1,scale={W}:-2','-f','image2pipe','-vcodec','png','-'],capture_output=True).stdout
# split PNG stream
ims=[]; i=0; sig=b'\x89PNG'
parts=tmp.split(sig)[1:]
for part in parts: ims.append(Image.open(io.BytesIO(sig+part)).convert('RGB'))
C=16; H=ims[0].height+14; R=(len(ims)+C-1)//C
s=Image.new('RGB',(W*C,H*R),'white'); dr=ImageDraw.Draw(s)
for k,im in enumerate(ims):
    x=(k%C)*W; y=(k//C)*H; s.paste(im,(x,y+14)); dr.text((x+2,y+1),f'{k}s',fill='red')
out=f"sheets/1s-{os.path.basename(f)[:-4]}.jpg"; s.save(out,quality=80); print(out,len(ims))
