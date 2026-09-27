import sys,glob,os
from PIL import Image,ImageDraw
files=sorted(glob.glob(sys.argv[1]))
cols=5; W=300; H=300
rows=(len(files)+cols-1)//cols
sheet=Image.new('RGB',(cols*W,rows*(H+20)),'white')
d=ImageDraw.Draw(sheet)
for i,f in enumerate(files):
    im=Image.open(f).convert('RGB'); im.thumbnail((W,H))
    x=(i%cols)*W; y=(i//cols)*(H+20)
    sheet.paste(im,(x,y+20)); d.text((x+4,y+4),os.path.basename(f),fill='black')
sheet.save(sys.argv[2],quality=85)
