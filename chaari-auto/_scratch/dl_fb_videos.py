# Download FB DASH video-only representations (best res) from data/fb_reels.json -> videos-raw/fb/<video_id>.mp4
import json, urllib.request, os, concurrent.futures as cf
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
os.makedirs('videos-raw/fb',exist_ok=True)
d=json.load(open('data/fb_reels.json',encoding='utf-8'))
def get(item):
    vid,r=item; fn=f'videos-raw/fb/{vid}.mp4'
    if os.path.exists(fn) and os.path.getsize(fn)>0: return fn+' exists'
    try:
        data=urllib.request.urlopen(urllib.request.Request(r['u'],headers={'User-Agent':UA,'Referer':'https://www.facebook.com/'}),timeout=180).read()
        open(fn,'wb').write(data); return f'{fn} {len(data)//1024}KB'
    except Exception as e: return f'FAIL {fn} {e}'
with cf.ThreadPoolExecutor(5) as ex:
    for r in ex.map(get,[(k,v) for k,v in d['dash'].items() if v]): print(r)
