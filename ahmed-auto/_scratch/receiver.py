# Local receiver: GET /?n=<name> serves a page that POSTs location.hash back; the body is saved to <name>.json
import http.server, json, urllib.parse
PAGE=b"""<html><body><pre id=o>sending...</pre><script>
fetch('/save'+location.search,{method:'POST',body:decodeURIComponent(location.hash.slice(1))}).then(r=>r.text()).then(t=>o.textContent=t)
</script></body></html>"""
class H(http.server.BaseHTTPRequestHandler):
    def do_GET(s):
        s.send_response(200); s.send_header('Content-Type','text/html'); s.end_headers(); s.wfile.write(PAGE)
    def do_POST(s):
        n=int(s.headers['Content-Length']); body=s.rfile.read(n)
        json.loads(body)
        name=urllib.parse.parse_qs(urllib.parse.urlparse(s.path).query).get('n',['save_urls'])[0]
        open(name+'.json','wb').write(body)
        s.send_response(200); s.end_headers(); s.wfile.write(b'saved %s %d bytes'%(name.encode(),len(body)))
http.server.HTTPServer(('127.0.0.1',8765),H).serve_forever()
