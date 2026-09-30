# Download every IG image (largest candidate) and video (largest progressive MP4) from data/ig_posts.json
#   images -> photos-raw/ig/<code>-NN.jpg ; videos -> videos-raw/ig/<code>-vNN.mp4 (+ cover as photos-raw/ig/<code>-NN-cover.jpg)
import json, urllib.request, os, concurrent.futures as cf
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
os.makedirs('photos-raw/ig',exist_ok=True); os.makedirs('videos-raw/ig',exist_ok=True)
jobs=[]
for p in json.load(open('data/ig_posts.json',encoding='utf-8')):
    for k,m in enumerate(p['media'],1):
        if m['vid']:
            jobs.append((m['vid']['u'],f"videos-raw/ig/{p['code']}-v{k:02d}.mp4"))
            if m['img']: jobs.append((m['img']['u'],f"photos-raw/ig/{p['code']}-{k:02d}-cover.jpg"))
        elif m['img']:
            jobs.append((m['img']['u'],f"photos-raw/ig/{p['code']}-{k:02d}.jpg"))
def get(j):
    u,fn=j
    if os.path.exists(fn) and os.path.getsize(fn)>0: return fn+' exists'
    try:
        data=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA,'Referer':'https://www.instagram.com/'}),timeout=120).read()
        open(fn,'wb').write(data); return f'{fn} {len(data)//1024}KB'
    except Exception as e: return f'FAIL {fn} {e}'
with cf.ThreadPoolExecutor(6) as ex:
    res=list(ex.map(get,jobs))
print(len(jobs),'jobs'); print('\n'.join(r for r in res if 'FAIL' in r) or 'no failures')
