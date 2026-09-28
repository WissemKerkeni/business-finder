# Download FB viewer photos from <name>.json (list of {id,src,w,h,post,date}) into photos-raw/fb/
import json, urllib.request, os, sys, re
from PIL import Image
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
os.makedirs('photos-raw/fb',exist_ok=True)
for name in sys.argv[1:]:
    for o in json.load(open(name,encoding='utf-8')):
        m=re.search(r'story_fbid=(pfbid\w{6})',o.get('post',''))
        grp=m.group(1)[-6:] if m else 'nopost'
        fn=f"photos-raw/fb/{grp}_{o['id']}.jpg"
        if not os.path.exists(fn):
            try: open(fn,'wb').write(urllib.request.urlopen(urllib.request.Request(o['src'],headers={'User-Agent':UA}),timeout=40).read())
            except Exception as e: print('FAIL',fn,e); continue
        print(fn, Image.open(fn).size)
