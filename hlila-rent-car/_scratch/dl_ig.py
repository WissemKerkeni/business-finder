import json, urllib.request, os
from PIL import Image
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
d=json.load(open('ig_urls.json'))
os.makedirs('photos-raw',exist_ok=True)
for code,items in d.items():
    for i,it in enumerate(items,1):
        ext='webp' if '.webp' in it['u'].split('?')[0] else 'jpg'
        fn=f'photos-raw/ig_{code}_{i:02d}.{ext}'
        if not os.path.exists(fn):
            req=urllib.request.Request(it['u'],headers={'User-Agent':UA,'Referer':'https://www.instagram.com/'})
            open(fn,'wb').write(urllib.request.urlopen(req,timeout=30).read())
        im=Image.open(fn); print(fn, im.size, os.path.getsize(fn)//1024,'KB')
