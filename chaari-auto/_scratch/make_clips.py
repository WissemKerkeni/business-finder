# Trim + encode the kept clips (H.264, no audio, 720px short side, faststart) and pick a sharp poster frame.
# python make_clips.py <outdir>   -> <outdir>/<id>.mp4 + <outdir>/<id>-poster.jpg (full-res poster from the 1080p source)
import subprocess, sys, os, cv2, imageio_ffmpeg
from selection import CLIPS
FF=imageio_ffmpeg.get_ffmpeg_exe(); out=sys.argv[1] if len(sys.argv)>1 else 'clips'; os.makedirs(out,exist_ok=True)
for cid,car,vid,date,a,b,cap in CLIPS:
    src=f'videos-raw/fb/{vid}.mp4'; dst=f'{out}/{cid}.mp4'
    subprocess.run([FF,'-v','error','-y','-ss',str(a),'-to',str(b),'-i',src,'-an','-vf','scale=720:-2,fps=30','-c:v','libx264','-crf','24','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart',dst],check=True)
    # poster: sharpest frame (Laplacian variance) sampled every 0.25s from the 1080p source segment
    cap_=cv2.VideoCapture(src); best=(-1,None,None); t=a
    while t<b:
        cap_.set(cv2.CAP_PROP_POS_MSEC,t*1000); ok,fr=cap_.read()
        if ok:
            v=cv2.Laplacian(cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY),cv2.CV_64F).var()
            if v>best[0]: best=(v,fr,t)
        t+=0.25
    if best[1] is None:  # cv2 may not decode AV1: fall back to ffmpeg frames
        best=(-1,None,None); t=a
        while t<b:
            tmp=f'{out}/_f.png'; subprocess.run([FF,'-v','error','-y','-ss',str(t),'-i',src,'-frames:v','1',tmp])
            fr=cv2.imread(tmp)
            if fr is not None:
                v=cv2.Laplacian(cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY),cv2.CV_64F).var()
                if v>best[0]: best=(v,fr,t)
            t+=0.5
        if os.path.exists(f'{out}/_f.png'): os.remove(f'{out}/_f.png')
    cv2.imwrite(f'{out}/{cid}-poster.jpg',best[1],[cv2.IMWRITE_JPEG_QUALITY,92])
    print(cid, f'{os.path.getsize(dst)/1e6:.2f}MB', 'poster t=%.2f lap=%.0f'%(best[2],best[0]), best[1].shape)
