# Contact sheet of images: python sheet.py "<glob>" out.jpg [thumbW] [cols]
import glob, sys, os
from PIL import Image, ImageDraw
fs=sorted(glob.glob(sys.argv[1])); out=sys.argv[2]; W=int(sys.argv[3]) if len(sys.argv)>3 else 170; C=int(sys.argv[4]) if len(sys.argv)>4 else 8
cells=[]
for f in fs:
    im=Image.open(f).convert('RGB'); w,h=im.size; t=im.copy(); t.thumbnail((W,int(W*1.5)))
    cells.append((t,f"{os.path.basename(f)[:22]} {w}x{h}"))
H=int(W*1.5)+14; R=(len(cells)+C-1)//C
sheet=Image.new('RGB',(C*W,R*H),'white'); d=ImageDraw.Draw(sheet)
for i,(t,l) in enumerate(cells):
    x=(i%C)*W; y=(i//C)*H; sheet.paste(t,(x,y+14)); d.text((x+2,y+1),l,fill='black')
sheet.save(out,quality=82); print(out,len(cells))
