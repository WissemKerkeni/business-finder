"""clips/*.mp4 (make_clips.py) -> site/public/videos/ + site/src/data/videos.json (metadata from selection.py + probe)."""
import json, shutil, os
from selection import CLIPS
from probe import probe
out='../site/public/videos'; os.makedirs(out,exist_ok=True)
for f in os.listdir(out): os.remove(os.path.join(out,f))
meta=[]; tot=0
for cid,car,vid,date,a,b,cap in CLIPS:
    shutil.copy(f'clips/{cid}.mp4',f'{out}/{cid}.mp4'); p=probe(f'clips/{cid}.mp4'); tot+=os.path.getsize(f'{out}/{cid}.mp4')
    assert not p['audio'] and p['w']==720, p
    meta.append(dict(id=cid,file=f'/videos/{cid}.mp4',poster=f'poster-{cid}',w=p['w'],h=p['h'],duration=round(b-a,1),carId=car,
                     postUrl=f'https://www.facebook.com/reel/{vid}',uploadDate=date,segment=[a,b]))
json.dump(meta,open('../site/src/data/videos.json','w'),indent=1)
print(len(meta),'clips',round(tot/1e6,1),'MB')
