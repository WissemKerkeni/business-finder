# Download IG post images (non-video; video covers too if --covers) for posts newer than a date into photos-raw/ig/<code>-NN.jpg
import json, urllib.request, os, sys, datetime
from PIL import Image
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
since=datetime.datetime.fromisoformat(sys.argv[1]).timestamp(); covers='--covers' in sys.argv
os.makedirs('photos-raw/ig',exist_ok=True)
for p in json.load(open('ig_posts.json',encoding='utf-8')):
    if p['t']<since or p['user']!='ahmedd_autoo': continue
    for k,m in enumerate(p['media'],1):
        if m['video'] and not covers: continue
        fn=f"photos-raw/ig/{p['code']}-{k:02d}{'-cover' if m['video'] else ''}.jpg"
        if not os.path.exists(fn):
            try: open(fn,'wb').write(urllib.request.urlopen(urllib.request.Request(m['u'],headers={'User-Agent':UA}),timeout=40).read())
            except Exception as e: print('FAIL',fn,e); continue
        print(fn, Image.open(fn).size)
