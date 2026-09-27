# Local receiver: GET / serves a page that POSTs location.hash back; POST /save writes urls to fb_urls.json
import http.server, json
PAGE=b"""<html><body><pre id=o>sending...</pre><script>
fetch('/save',{method:'POST',body:decodeURIComponent(location.hash.slice(1))}).then(r=>r.text()).then(t=>o.textContent=t)
</script></body></html>"""
class H(http.server.BaseHTTPRequestHandler):
    def do_GET(s):
        s.send_response(200); s.send_header('Content-Type','text/html'); s.end_headers(); s.wfile.write(PAGE)
    def do_POST(s):
        n=int(s.headers['Content-Length']); body=s.rfile.read(n)
        json.loads(body); open(s.path.strip('/').split('?')[0]+'_urls.json','wb').write(body)
        s.send_response(200); s.end_headers(); s.wfile.write(b'saved %d bytes'%len(body))
http.server.HTTPServer(('127.0.0.1',8765),H).serve_forever()
