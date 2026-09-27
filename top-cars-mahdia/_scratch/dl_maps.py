import urllib.request, os, sys
from PIL import Image
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
src=sys.argv[1] if len(sys.argv)>1 else 'maps_urls.txt'; start=int(sys.argv[2]) if len(sys.argv)>2 else 1
for k,u in enumerate([l.strip() for l in open(src) if l.strip()],start):
    fn=f'photos-raw/maps_{k:02d}.jpg'
    if not os.path.exists(fn):
        for suf in ('=s0','=w2400'):
            try:
                open(fn,'wb').write(urllib.request.urlopen(urllib.request.Request(u+suf,headers={'User-Agent':UA}),timeout=40).read()); break
            except Exception as e: print('fail',suf,e)
    im=Image.open(fn); print(fn, im.size, os.path.getsize(fn)//1024,'KB')
