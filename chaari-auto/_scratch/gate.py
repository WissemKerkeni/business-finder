# Photo quality gate metrics: size, long side, Laplacian variance (sharpness, on 1080-long-side downscale), JPEG quant estimate
import glob, sys, json, cv2, numpy as np
from PIL import Image
rows=[]
for f in sorted(glob.glob(sys.argv[1])):
    im=Image.open(f); w,h=im.size
    q=None
    try:
        qt=im.quantization; q=round(float(np.mean(qt[0])),1)
    except Exception: pass
    a=cv2.imread(f,cv2.IMREAD_GRAYSCALE); s=1080/max(a.shape); a=cv2.resize(a,None,fx=s,fy=s,interpolation=cv2.INTER_AREA) if s<1 else a
    lap=round(cv2.Laplacian(a,cv2.CV_64F).var(),1)
    rows.append((f,w,h,max(w,h),lap,q))
for r in rows: print('%-45s %5dx%-5d long=%4d lap=%7.1f q=%s %s'%(r[0],r[1],r[2],r[3],r[4],r[5],'SMALL' if r[3]<1080 else ('BLURRY?' if r[4]<60 else '')))
