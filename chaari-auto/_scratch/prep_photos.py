"""Copy kept photos (selection.py) to _scratch/kept/<key>.jpg with site keys. No plate blur needed: rear plates are
pre-pixelated by the business in every kept photo; only the CHAARI AUTO plate holder (their sign) is visible."""
import shutil, os
from selection import CARS, OTHER
os.makedirs('kept',exist_ok=True)
for f in os.listdir('kept'): os.remove(os.path.join('kept',f))
keys={}
for cid,c in CARS.items():
    for i,p in enumerate(c['photos'],1):
        k=f'{cid}-{i}'; shutil.copy(f'photos-raw/{p[0]}.jpg',f'kept/{k}.jpg'); keys[k]=p[0]
names={'hero':'hero','cta':'cta'}
n=0
for f,use,label in OTHER:
    if use in names: k=names[use]
    else: n+=1; k=f'place-{n}'
    shutil.copy(f'photos-raw/{f}.jpg',f'kept/{k}.jpg'); keys[k]=f
for cid,car,vid,date,a,b,cap in __import__('selection').CLIPS:
    shutil.copy(f'clips/{cid}-poster.jpg',f'kept/poster-{cid}.jpg'); keys[f'poster-{cid}']=f'clips/{cid}-poster.jpg'
print(len(keys),'kept'); [print(k,v) for k,v in keys.items() if not k[0].isdigit()][:0]
