# Single source for the kept photos and clips (used by the manifests, contact sheet and the build scripts)
IG='https://www.instagram.com/p/'
FBP='https://www.facebook.com/photo.php?fbid='
MAPS='https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b'
CARS={
 'mercedes-c-noire-2024':dict(kind='delivered',label='Mercedes C AMG · 2024',date='2026-02-19',src='FB',post='https://www.instagram.com/reel/DU89Uu-Ci5J/',
   photos=[('fb/1444851517333688','fb','1444851517333688'),('fb/1444851594000347','fb','1444851594000347'),('fb/1444851640667009','fb','1444851640667009'),('fb/1444851710667002','fb','1444851710667002'),('fb/1444852947333545','fb','1444852947333545')]),
 'toyota-rav4-2021':dict(kind='delivered',label='Toyota RAV 4 · 2021',date='2026-01-10',src='IG',post=IG+'DTV9iGUiqtD/',
   photos=[('ig/DTV9iGUiqtD-01',),('ig/DTV9iGUiqtD-02',),('ig/DTV9iGUiqtD-05',),('ig/DTV9iGUiqtD-08',),('ig/DTV9iGUiqtD-07',),('ig/DTV9iGUiqtD-11',)]),
 'mercedes-gle53-2026':dict(kind='export',label='Mercedes GLE 53 AMG · 2026',date='2026-02-12',src='IG',post=IG+'DUq2W_rCtjm/',
   photos=[('ig/DUq2W_rCtjm-01',),('ig/DUq2W_rCtjm-04',),('ig/DUq2W_rCtjm-06',),('ig/DUq2W_rCtjm-03',),('ig/DUq2W_rCtjm-15',),('ig/DUq2W_rCtjm-10',)]),
 'mercedes-glb-2024':dict(kind='export',label='Mercedes GLB AMG · 2024',date='2026-01-30',src='IG',post=IG+'DUJWgVeCp7R/',
   photos=[('ig/DUJWgVeCp7R-01',),('ig/DUJWgVeCp7R-02',),('ig/DUJWgVeCp7R-06',),('ig/DUJWgVeCp7R-07',),('ig/DUJWgVeCp7R-08',),('ig/DUJWgVeCp7R-09',)]),
 'vw-tiguan-2022':dict(kind='export',label='VW Tiguan · 2022',date='2026-01-20',src='IG',post=IG+'DTvZu5rClVV/',
   photos=[('ig/DTvZu5rClVV-02',),('ig/DTvZu5rClVV-04',),('ig/DTvZu5rClVV-05',),('ig/DTvZu5rClVV-06',),('ig/DTvZu5rClVV-07',)]),
 'audi-q3-sportback-2023':dict(kind='export',label='Audi Q3 Sportback S-line · 2023',date='2025-12-24',src='IG',post=IG+'DSpeMqFivOk/',
   photos=[('ig/DSpeMqFivOk-02',),('ig/DSpeMqFivOk-07',),('ig/DSpeMqFivOk-05',),('ig/DSpeMqFivOk-04',),('ig/DSpeMqFivOk-09',),('ig/DSpeMqFivOk-08',)]),
 'mercedes-glc220d-coupe-2021':dict(kind='export',label='Mercedes GLC 220 Coupé AMG · 2021',date='2025-12-20',src='IG',post=IG+'DSfeYHEioEu/',
   photos=[('ig/DSfeYHEioEu-01',),('ig/DSfeYHEioEu-02',),('ig/DSfeYHEioEu-04',),('ig/DSfeYHEioEu-06',),('ig/DSfeYHEioEu-10',),('ig/DSfeYHEioEu-08',)]),
 # Google Maps photos (no caption, no date): model from the badge/shape only, no year. Owner to confirm they are theirs.
 'maps-range-rover-sport':dict(kind='maps',label='Range Rover Sport',date='',src='Maps',post=MAPS,photos=[('maps/owner-11',)]),
 'maps-mercedes-cla':dict(kind='maps',label='Mercedes-Benz CLA',date='',src='Maps',post=MAPS,photos=[('maps/owner-19',)]),
}
# Maps photos: no caption/date -> model only (badge visible)
OTHER=[('maps/owner-16','hero','Mercedes-Benz GLC Coupé'),('maps/owner-02','cta','Cupra Formentor')]
# Clips: (id, car, fb video id, post date, in, out, caption)
CLIPS=[('v1-gle','mercedes-gle-2023','1303791422819156','2026-09-17',6.0,18.8,'Mercedes GLE AMG · Modèle 2023'),
       ('v2-renegade','jeep-renegade-2024','1046189004701269','2026-09-12',14.5,20.2,'Jeep Renegade · Modèle 2024'),
       ('v3-xm','bmw-xm-2026','1629754748748951','2026-08-20',0.3,7.8,'BMW XM · Modèle 2026'),
       ('v4-q5','audi-q5-2024','2835031420206936','2026-09-27',1.0,6.7,'Audi Q5 S-line · Modèle 2024'),
       ('v5-across','suzuki-across-2026','2261131274740566','2026-08-24',23.0,30.5,'Suzuki Across · Modèle 2026')]
