# Crop/resize kept originals into stitch/photos/ (JPEG, max 1600 long side; hero 2400)
from PIL import Image, ImageOps
import os
R='_scratch/photos-raw/'; O='stitch/photos/'
# name: (src, crop box as fractions l,t,r,b or None, max long side)
P={
 'maps_06':('maps_06.jpg',(0,0.3,1,1),2400),
 'maps_05':('maps_05.jpg',(0,0.3,1,0.95),1600),
 'maps_02':('maps_02.jpg',(0,0.25,0.62,1),1600),
 'maps_09':('maps_09.jpg',None,1600),
 'maps_10':('maps_10.jpg',(0.35,0.2,1,1),1600),
 'ig_arona':('ig_C_XmGiyMPct_01.webp',None,1600),
 'ig_xuv300':('ig_DIyXF4nMYNj_01.webp',None,1600),
 'ig_xuv300_2':('ig_DIyXF4nMYNj_03.webp',None,1600),
 'fb_01':('fb_01_387230.jpg',(0,0.15,1,0.85),1600),
 'fb_04':('fb_04_387230.jpg',(0,0.35,1,1),1600),
 'fb_06':('fb_06_387230.jpg',(0,0.3,1,1),1600),
 'fb_07':('fb_07_387230.jpg',(0,0.28,1,0.62),1600),
 'fb_09':('fb_09_387230.jpg',(0,0.2,1,0.9),1600),
 'fb_10':('fb_10_387230.jpg',(0.2,0,1,1),1600),
 'fb_11':('fb_11_387230.jpg',(0,0.5,1,0.82),1600),
 'fb_13':('fb_13_387230.jpg',None,1600),
 'fb_14':('fb_14_387230.jpg',None,1600),
 'fb_15':('fb_15_387230.jpg',(0,0.12,1,0.8),1600),
}
for n,(f,c,m) in P.items():
    im=ImageOps.exif_transpose(Image.open(R+f)).convert('RGB'); w,h=im.size
    if c: im=im.crop((int(c[0]*w),int(c[1]*h),int(c[2]*w),int(c[3]*h)))
    im.thumbnail((m,m),Image.LANCZOS); im.save(O+n+'.jpg',quality=84,optimize=True)
    print(n,im.size,os.path.getsize(O+n+'.jpg')//1024,'KB')
