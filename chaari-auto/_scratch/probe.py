# ffprobe stand-in: parse `ffmpeg -i` for duration, resolution, fps, bitrates, audio. Usage: python probe.py files...
import subprocess, re, sys, glob, json, os
import imageio_ffmpeg
FF=imageio_ffmpeg.get_ffmpeg_exe()
def probe(f):
    e=subprocess.run([FF,'-hide_banner','-i',f],capture_output=True,text=True,errors='replace').stderr
    d=re.search(r'Duration: (\d+):(\d+):([\d.]+).*?bitrate: (\d+) kb/s',e)
    v=re.search(r'Video: (\w+).*?, (\d{2,5})x(\d{2,5}).*?(?:(\d+) kb/s)?.*?([\d.]+) fps',e)
    rot=re.search(r'rotate\s*:\s*(-?\d+)|rotation of (-?[\d.]+)',e)
    return dict(file=os.path.basename(f),dur=round(int(d[1])*3600+int(d[2])*60+float(d[3]),1) if d else None,kbps=int(d[4]) if d else None,
        codec=v[1] if v else None,w=int(v[2]) if v else None,h=int(v[3]) if v else None,fps=float(v[5]) if v else None,
        audio='Audio:' in e,rot=(rot[1] or rot[2]) if rot else None,mb=round(os.path.getsize(f)/1e6,1))
if __name__=='__main__':
    fs=[g for a in sys.argv[1:] for g in glob.glob(a)]
    for f in fs: print(json.dumps(probe(f)))
