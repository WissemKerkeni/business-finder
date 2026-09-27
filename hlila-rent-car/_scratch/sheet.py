import sys, glob, os
from PIL import Image, ImageDraw
files=sorted(glob.glob(sys.argv[1])); out=sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 5
T=300; rows=(len(files)+cols-1)//cols
sheet=Image.new('RGB',(cols*T,rows*(T+20)),'white'); d=ImageDraw.Draw(sheet)
for k,f in enumerate(files):
    im=Image.open(f).convert('RGB'); w,h=im.size; im.thumbnail((T,T))
    x=(k%cols)*T; y=(k//cols)*(T+20); sheet.paste(im,(x,y))
    d.text((x+3,y+T+3),f"{k}:{os.path.basename(f)[3:22]} {w}x{h}",fill='black')
sheet.save(out,quality=85); print(out, sheet.size)
