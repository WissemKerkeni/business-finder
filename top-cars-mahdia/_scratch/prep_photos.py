# Crop/resize kept originals into stitch/photos/ (JPEG, max 1600 long side; hero 2400)
from PIL import Image, ImageOps
import os
R='_scratch/photos-raw/'; O='stitch/photos/'
# name: (src, crop box as fractions l,t,r,b or None, max long side)
P={
 'hero_eljem':('maps_10.jpg',(0,0.34,1,0.93),2400),
 'eljem_arches':('maps_03.jpg',None,1600),
 'cap_mahdia':('maps_07.jpg',None,1600),
 'terrasse':('maps_04.jpg',(0,0.1,1,0.85),1600),
 'musee':('maps_05.jpg',(0,0.15,1,0.9),1600),
 'rue_dromadaire':('maps_08.jpg',None,1600),
}
for n,(f,c,m) in P.items():
    im=ImageOps.exif_transpose(Image.open(R+f)).convert('RGB'); w,h=im.size
    if c: im=im.crop((int(c[0]*w),int(c[1]*h),int(c[2]*w),int(c[3]*h)))
    im.thumbnail((m,m),Image.LANCZOS); im.save(O+n+'.jpg',quality=84,optimize=True)
    print(n,im.size,os.path.getsize(O+n+'.jpg')//1024,'KB')
