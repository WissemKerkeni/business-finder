# Local receiver on 127.0.0.1:8765
#  POST /save?name=<relpath>   body = raw bytes (JSON or media) -> written under _scratch/<relpath>
#  GET  /#<json>               page that POSTs the hash to /save?name=data/hash.json (fallback)
# CORS + Private Network Access headers so https pages (IG/FB/TikTok) can POST blobs directly.
import http.server, os, urllib.parse
ROOT=os.path.dirname(os.path.abspath(__file__))
PAGE=b"""<html><body><pre id=o>sending...</pre><script>
if(location.hash.length>1)fetch('/save?name='+(new URLSearchParams(location.search).get('name')||'data/hash.json'),{method:'POST',body:decodeURIComponent(location.hash.slice(1))}).then(r=>r.text()).then(t=>o.textContent=t)
</script></body></html>"""
class H(http.server.BaseHTTPRequestHandler):
    def cors(s):
        s.send_header('Access-Control-Allow-Origin','*'); s.send_header('Access-Control-Allow-Methods','POST, GET, OPTIONS')
        s.send_header('Access-Control-Allow-Headers','*'); s.send_header('Access-Control-Allow-Private-Network','true')
    def do_OPTIONS(s): s.send_response(204); s.cors(); s.end_headers()
    def do_GET(s): s.send_response(200); s.send_header('Content-Type','text/html'); s.end_headers(); s.wfile.write(PAGE)
    def do_POST(s):
        q=urllib.parse.parse_qs(urllib.parse.urlparse(s.path).query); name=q.get('name',['data/out.bin'])[0]
        p=os.path.normpath(os.path.join(ROOT,name)); assert p.startswith(ROOT)
        os.makedirs(os.path.dirname(p),exist_ok=True)
        n=int(s.headers['Content-Length']); body=s.rfile.read(n); open(p,'wb').write(body)
        s.send_response(200); s.cors(); s.end_headers(); s.wfile.write(b'saved %d bytes to %s'%(len(body),name.encode()))
    def log_message(s,*a): pass
http.server.ThreadingHTTPServer(('127.0.0.1',8765),H).serve_forever()
