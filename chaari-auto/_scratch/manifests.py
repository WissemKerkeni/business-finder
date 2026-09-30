import csv, os
from PIL import Image
from selection import *
from probe import probe
rows=[]
for cid,c in CARS.items():
    for p in c['photos']:
        f=p[0]; im=Image.open(f'photos-raw/{f}.jpg'); w,h=im.size
        post=(FBP+p[2]) if f.startswith('fb/') else c['post']
        rows.append([os.path.basename(f)+'.jpg',cid,c['kind'],c['src'] if not f.startswith('fb/') else 'FB',post,c['date'] or 'unknown',f'{w}x{h}',c['label'],'pre-pixelated by business (rear plates); none readable','none','gallery + car panel'])
for f,use,label in OTHER:
    im=Image.open(f'photos-raw/{f}.jpg'); w,h=im.size
    rows.append([os.path.basename(f)+'.jpg','—','other','Stitch (AI)' if f.startswith('stitch/') else 'Maps','Stitch screen 32cbdaab503d4feb847950b30db75b56' if f.startswith('stitch/') else MAPS,'—' if f.startswith('stitch/') else 'unknown',f'{w}x{h}',label,'n/a' if f.startswith('stitch/') else 'no readable plate','none',use])
with open('../photo-manifest.csv','w',newline='',encoding='utf-8') as fh:
    wr=csv.writer(fh); wr.writerow(['file','car_or_subject','kind','source','source_post','post_date','original_wxh','label','plate_blurred','face','used_in']); wr.writerows(rows)
vr=[]
for cid,car,vid,date,a,b,cap in CLIPS:
    p=probe(f'videos-raw/fb/{vid}.mp4')
    vr.append([cid+'.mp4',car,'export (status unknown)','FB',f'https://www.facebook.com/reel/{vid}',date,f"{p['w']}x{p['h']}",p['dur'],p['fps'],f'{a}-{b}','source pre-pixelated / CHAARI AUTO holder only','none',cap,'En vidéo row + car'])
with open('../video-manifest.csv','w',newline='',encoding='utf-8') as fh:
    wr=csv.writer(fh); wr.writerow(['file','car','kind','source','source_post','post_date','original_resolution','duration_s','fps','kept_segment_s','plates','faces','caption_facts','used_in']); wr.writerows(vr)
print(len(rows),'photos',len(vr),'clips')
