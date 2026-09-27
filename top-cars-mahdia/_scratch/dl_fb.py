import json, urllib.request, os
from PIL import Image
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
L=json.load(open('save_urls.json',encoding='utf-8'))
for k,o in enumerate(L,1):
    fn=f"photos-raw/fb_{k:02d}_{o['id'][-6:]}.jpg"
    if not os.path.exists(fn):
        try: open(fn,'wb').write(urllib.request.urlopen(urllib.request.Request(o['src'],headers={'User-Agent':UA}),timeout=40).read())
        except Exception as e: print('FAIL',fn,e); continue
    print(fn, Image.open(fn).size, '|', o['cap'][:90])
