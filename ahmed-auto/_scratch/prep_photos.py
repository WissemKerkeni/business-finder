# Select kept photos per car (ordered), blur plate boxes, write kept/<car>-NN.jpg and ../photo-manifest.csv
import glob, os, csv, json
from PIL import Image, ImageFilter
os.makedirs('kept', exist_ok=True)
def fb(g, i): return sorted(glob.glob(f'photos-raw/fb/{g}_*.jpg'))[i]
def ig(code, n): return f'photos-raw/ig/{code}-{n:02d}.jpg'
FB='https://www.facebook.com/permalink.php?story_fbid=%s&id=100064048541047'
POSTS={'027A5z':'pfbid027A5z1Ggo9os6qDDawjV8YX85hVeg5f45UdQwefD4AVY1Atnu6d6U8hi3Zs2Rm9oZl',
       '0KZfzm':'pfbid0KZfzmsXycSkLRRH8sBXzqgKDrh9nrPUncPcmjJ2gRetqAEz4SkgBL8gkgmbVKAdvl',
       '022G96':'pfbid022G96iLNmP','02Ya6V':'pfbid02Ya6VigLwM','0319GW':'pfbid0319GWRVXNf',
       '02oyyo':'pfbid02oyyoyWrG4iw9A7rJGLGHNnNXepRvhttFsbsP79D2QyPuSzGVZRFCrVUK4q8J4i5ml'}
full=json.load(open('fbposts.json',encoding='utf-8'))['posts']
for k in list(POSTS):
    for pk,p in full.items():
        if pk.startswith(POSTS[k][:14]): POSTS[k]=p['url']
# plate boxes in "long side = 1000" coordinates (x0,y0,x1,y1)
CARS={
 'cupra-formentor':('FB','0KZfzm','2026-09-27',[(15,None),(0,None),(3,None),(6,(610,420,820,495)),(14,(140,400,310,475)),(11,None),(10,None),(20,None)],
   ['Cupra Formentor e-Hybrid gris Nardo, vue avant trois-quarts','Cupra Formentor, avant','Cupra Formentor, profil avant','Cupra Formentor, arrière trois-quarts','Cupra Formentor, arrière','Cupra Formentor, poste de conduite','Cupra Formentor, sièges baquets','Cupra Formentor, jante bronze R19']),
 'mercedes-glc300e-coupe':('FB','027A5z','2026-09-27',[(13,None),(23,None),(17,(150,437,400,537)),(24,(575,412,825,525)),(8,None),(15,None),(16,None),(6,None)],
   ['Mercedes-Benz GLC 300e Coupé 4MATIC, vue avant trois-quarts','GLC 300e Coupé, avant','GLC 300e Coupé, arrière trois-quarts','GLC 300e Coupé, arrière','GLC 300e Coupé, planche de bord','GLC 300e Coupé, sièges cuir Nappa camel','GLC 300e Coupé, éclairage d’ambiance','GLC 300e Coupé, monogramme arrière']),
 'bmw-530e':('FB','022G96','2026-09-25',[(7,None),(11,None),(0,(700,305,865,375)),(12,(125,335,285,415)),(9,None),(6,None),(8,None)],
   ['BMW 530e Luxury Line, vue avant trois-quarts','BMW 530e, avant','BMW 530e, arrière trois-quarts','BMW 530e, arrière','BMW 530e, poste de conduite cuir marron','BMW 530e, console centrale','BMW 530e, contre-porte']),
 'mercedes-a250e':('FB','02Ya6V','2026-09-11',[(0,None),(9,None),(5,None),(12,None),(10,(160,310,360,395)),(4,(670,425,750,540)),(1,None),(3,None)],
   ['Mercedes-Benz A250e AMG-Line, vue avant trois-quarts','A250e, profil avant','A250e, avant','A250e, face avant','A250e, arrière trois-quarts','A250e, arrière','A250e, poste de conduite','A250e, éclairage d’ambiance']),
 'vw-tiguan-gte':('FB','0319GW','2026-09-07',[(0,None),(11,None),(6,None),(4,None),(12,None),(15,None),(7,None)],
   ['Volkswagen Tiguan R-Line GTE blanc nacré, vue avant trois-quarts','Tiguan R-Line GTE, avant','Tiguan R-Line GTE, feux IQ.LIGHT','Tiguan R-Line GTE, arrière trois-quarts','Tiguan R-Line GTE, feux arrière','Tiguan R-Line GTE, volant et cockpit digital','Tiguan R-Line GTE, caméra de recul']),
 'canam-outlander-max':('FB','02oyyo','2026-08-26',[(5,None),(6,None),(2,None),(4,None),(3,None),(0,None),(1,None)],
   ['Can-Am Outlander MAX XT, avant avec treuil','Can-Am Outlander MAX XT, arrière avec coffre','Can-Am Outlander MAX XT, coffre arrière','Can-Am Outlander MAX XT, treuil','Can-Am Outlander MAX XT, écran','Can-Am Outlander MAX XT, commandes au guidon','Can-Am Outlander MAX XT, coffre avant']),
 'vw-golf-8':('IG','Dbxo7Eajsmv','2026-08-08',[(1,None),(2,None),(5,None),(6,None),(8,None),(9,None),(10,None),(13,None)],
   ['Volkswagen Golf 8 Diesel, vue avant trois-quarts','Golf 8, avant','Golf 8, profil avant','Golf 8, arrière trois-quarts','Golf 8, arrière','Golf 8, poste de conduite','Golf 8, cockpit digital','Golf 8, caméra de recul']),
}
rows=[]
for car,(src,g,date,sel,labels) in CARS.items():
    for n,((i,box),label) in enumerate(zip(sel,labels),1):
        p=fb(g,i) if src=='FB' else ig(g,i)
        im=Image.open(p).convert('RGB'); W,H=im.size; s=max(W,H)/1000
        if box:
            b=tuple(int(v*s) for v in box); reg=im.crop(b)
            reg=reg.resize((max(1,reg.width//16),max(1,reg.height//16))).resize(reg.size).filter(ImageFilter.GaussianBlur(6))
            im.paste(reg,b)
        out=f'kept/{car}-{n:02d}.jpg'; im.save(out,quality=94)
        url=POSTS[g] if src=='FB' else f'https://www.instagram.com/p/{g}/'
        rows.append([os.path.basename(out),car,'Facebook' if src=='FB' else 'Instagram',url,date,f'{W}x{H}',label,'yes' if box else 'no (dealer plate or none visible)','stock: car panel'+(' + cover' if n==1 else '')])
# showroom / identity from Google Maps
MAPS=[('maps_07','showroom-exterior','Façade du showroom AHMED AUTO, Route de Monastir'),('maps_02','showroom-1','Devant le showroom AHMED AUTO, Route de Monastir'),
      ('maps_03','showroom-2','Mercedes-Benz exposée au showroom AHMED AUTO'),('maps_04','showroom-3','Mercedes-Benz exposée au showroom AHMED AUTO'),('maps_05','showroom-4','Volkswagen exposée au showroom AHMED AUTO'),('maps_08','logo','Logo AHMED AUTO')]
for f,name,label in MAPS:
    im=Image.open(f'photos-raw/{f}.jpg').convert('RGB'); im.save(f'kept/{name}.jpg',quality=94)
    rows.append([f'{name}.jpg','—','Google Maps','https://www.google.com/maps?cid=6322496852364681938','',f'{im.width}x{im.height}',label,'no (dealer plates)','gallery' if name!='logo' else 'identity reference'])
with open('../photo-manifest.csv','w',newline='',encoding='utf-8') as fh:
    w=csv.writer(fh); w.writerow(['file','car_id','source','source_url','post_date','original_size','label','plate_blurred','used_in']); w.writerows(rows)
print(len(rows),'rows')
