"""Facts used on the site (all from the business's own posts; see brief.md §6–8). Shared by build_final.py and the site export."""
WA = "491778629077"
PHONE = "+49 177 8629077"
TEL = "tel:+491778629077"
EMAIL = "chaariauto@gmail.com"
ADDRESS = "Lindenstraße 16, 74321 Bietigheim-Bissingen, Allemagne"
LAT, LNG = "48.9455807", "9.0985454"
MAPS_URL = "https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b"
DIR_URL = f"https://www.google.com/maps/dir/?api=1&destination={LAT},{LNG}"
EMBED = "https://maps.google.com/maps?q=CHAARI%20AUTO%2C%20Lindenstra%C3%9Fe%2016%2C%2074321%20Bietigheim-Bissingen&z=16&output=embed"
REVIEWS_URL = "https://www.google.com/search?q=CHAARI+AUTO+Bietigheim-Bissingen&hl=fr#lrd=0x4799d534da3bde8b:0xef513e9a96efbc1b,1,,,,"
FB_URL = "https://www.facebook.com/Hydrographiques"
IG_URL = "https://www.instagram.com/chaari.auto/"
TT_URL = "https://www.tiktok.com/@chaari.auto"
HOURS = [("Lundi – vendredi", "9h – 18h"), ("Samedi", "9h – 14h"), ("Dimanche", "Fermé")]
HOURS_SHORT = "Lun–Ven 9h–18h · Sam 9h–14h"
RATING, REVIEWS_N = "5,0", 89

TAGLINE = "Spécialiste de l'exportation de voitures d'Europe vers la Tunisie."
INTRO = "Tunisiens résidant à l'étranger, nous vous proposons un service clé en main pour acheter votre voiture de rêve sans aucune difficulté !"
STEPS = [("01", "Achat de votre voiture"), ("02", "Préparation du dossier d'exportation"),
         ("03", "Carte grise et assurance"), ("04", "Gestion complète jusqu'à la livraison")]
STEPS_SOURCE = "Nos services incluent : légende publiée par Chaari Auto sur Instagram, Facebook et Google Maps."

# kind: 'client' = post says "Félicitations <client>" (name never shown); 'export' = "Export pour la Tunisie", status unknown
CARS = [
 dict(id="mercedes-c-noire-2024", make="Mercedes", model="C AMG", year="2024", kind="client", date="2026-02-19", source="Instagram",
      url="https://www.instagram.com/reel/DU89Uu-Ci5J/", specs=[("Équipement", "Toutes options")], n=5,
      alt=["Mercedes Classe C noire vue de trois quarts avant", "Mercedes Classe C noire vue de profil arrière", "Mercedes Classe C noire vue arrière",
           "Poste de conduite de la Mercedes Classe C", "Contre-porte de la Mercedes Classe C"]),
 dict(id="mercedes-gle53-2026", make="Mercedes", model="GLE 53 AMG", year="2026", kind="export", date="2026-02-12", source="Instagram",
      url="https://www.instagram.com/p/DUq2W_rCtjm/", specs=[("Kilométrage", "Zéro kilométrage"), ("Équipement", "Toutes options")], n=6,
      alt=["Mercedes GLE 53 AMG noir vue de face, plaque CHAARI AUTO", "Mercedes GLE 53 AMG noir vue de trois quarts avant", "Mercedes GLE 53 AMG noir vue de profil",
           "Mercedes GLE 53 AMG noir vue arrière", "Poste de conduite du Mercedes GLE 53 AMG", "Sièges avant du Mercedes GLE 53 AMG"]),
 dict(id="mercedes-glb-2024", make="Mercedes", model="GLB AMG", year="2024", kind="export", date="2026-01-30", source="Instagram",
      url="https://www.instagram.com/p/DUJWgVeCp7R/", specs=[("Équipement", "Toutes options")], n=6,
      alt=["Mercedes GLB gris argent vue de face, plaque CHAARI AUTO", "Mercedes GLB gris argent vue de trois quarts avant", "Mercedes GLB gris argent vue de profil arrière",
           "Mercedes GLB gris argent vue arrière", "Poste de conduite du Mercedes GLB", "Sièges avant du Mercedes GLB"]),
 dict(id="vw-tiguan-2022", make="Volkswagen", model="Tiguan", year="2022", kind="export", date="2026-01-20", source="Instagram",
      url="https://www.instagram.com/p/DTvZu5rClVV/", specs=[("Kilométrage", "Faible kilométrage"), ("Équipement", "Toutes options")], n=5,
      alt=["Volkswagen Tiguan gris argent vue de face, plaque CHAARI AUTO", "Volkswagen Tiguan gris argent vue de trois quarts avant", "Volkswagen Tiguan gris argent vue de profil",
           "Volkswagen Tiguan gris argent vue arrière", "Poste de conduite du Volkswagen Tiguan"]),
 dict(id="toyota-rav4-2021", make="Toyota", model="RAV 4", year="2021", kind="client", date="2026-01-10", source="Instagram",
      url="https://www.instagram.com/p/DTV9iGUiqtD/", specs=[("Kilométrage", "Faible kilométrage"), ("Équipement", "Toutes options")], n=6,
      alt=["Toyota RAV 4 noir vue de face, plaque CHAARI AUTO", "Toyota RAV 4 noir vue de trois quarts avant", "Toyota RAV 4 noir vue de trois quarts arrière",
           "Toyota RAV 4 noir vue arrière", "Sièges avant du Toyota RAV 4", "Console centrale du Toyota RAV 4"]),
 dict(id="audi-q3-sportback-2023", make="Audi", model="Q3 Sportback S-line", year="2023", kind="export", date="2025-12-24", source="Instagram",
      url="https://www.instagram.com/p/DSpdZnOii7j/", specs=[("Kilométrage", "Faible kilométrage"), ("Équipement", "Toutes options")], n=6,
      alt=["Audi Q3 Sportback noire vue de face, plaque CHAARI AUTO", "Audi Q3 Sportback noire vue de trois quarts avant", "Audi Q3 Sportback noire vue de trois quarts arrière",
           "Audi Q3 Sportback noire vue arrière", "Tableau de bord de l'Audi Q3 Sportback", "Sièges avant de l'Audi Q3 Sportback"]),
 dict(id="mercedes-glc220d-coupe-2021", make="Mercedes", model="GLC 220 Coupé AMG", year="2021", kind="export", date="2025-12-20", source="Instagram",
      url="https://www.instagram.com/p/DSfeYHEioEu/", specs=[("Kilométrage", "Faible kilométrage"), ("Équipement", "Toutes options"), ("Finition", "AMG line")], n=6,
      alt=["Mercedes GLC Coupé gris mat vue de face, plaque CHAARI AUTO", "Mercedes GLC Coupé gris mat vue de trois quarts avant", "Mercedes GLC Coupé gris mat vue de profil",
           "Mercedes GLC Coupé gris mat vue de trois quarts arrière", "Mercedes GLC Coupé gris mat vue arrière", "Poste de conduite du Mercedes GLC Coupé"]),
]

# (id, file, fb video id, post date, caption, w, h)
CLIPS = [
 ("v3-xm", "BMW XM", "2026", "1629754748748951", "2026-08-20"),
 ("v5-across", "Suzuki Across", "2026", "2261131274740566", "2026-08-24"),
 ("v2-renegade", "Jeep Renegade", "2024", "1046189004701269", "2026-09-12"),
 ("v1-gle", "Mercedes GLE AMG", "2023", "1303791422819156", "2026-09-17"),
 ("v4-q5", "Audi Q5 S-line", "2024", "2835031420206936", "2026-09-27"),
]

REVIEWS = [
 ("Du premier contact jusqu'à la livraison, tout s'est déroulé de manière fluide et professionnelle. Mr Mohamed Chaari a été à l'écoute, transparent et de très bon conseil.", "mohamed walha"),
 ("La communication a toujours été claire, les documents d'export parfaitement préparés, et la voiture était strictement conforme à la description.", "nourelesslem badra"),
 ("Ils m'ont apporté une aide précieuse dans la préparation de l'ensemble du dossier, rendant des démarches parfois complexes beaucoup plus simples et accessibles.", "Trigui Kawthar"),
 ("Retour d'expérience suite à deux opérations d'acquisition de voitures Mercedes depuis l'Allemagne (2023 et 2025): Mohamed est professionnel et honnête, il assure un accompagnement et un service parfait.", "Kais KAMMOUN"),
 ("Le meilleur : dés le premier contact il était avec moi pas à pas au dernier moment, dossier traité dans des conditions d'urgence et il a assuré et même en avance de la date prévue.", "issam aydi"),
]

FAQ = [
 ("Quels services sont inclus ?", "Achat de votre voiture, préparation du dossier d'exportation, carte grise et assurance, et gestion complète jusqu'à la livraison."),
 ("À qui s'adresse le service ?", "Aux Tunisiens résidant à l'étranger."),
 ("Vers quels pays exportez-vous ?", "De l'Europe vers la Tunisie et la France."),
 ("Où êtes-vous situés ?", "Lindenstraße 16, 74321 Bietigheim-Bissingen, Allemagne."),
 ("Comment faire une demande ?", "Sur WhatsApp au +49 177 8629077, par téléphone, ou avec le formulaire de cette page, qui prépare votre message WhatsApp."),
 ("Quels sont vos horaires ?", "Du lundi au vendredi de 9h à 18h, le samedi de 9h à 14h. Fermé le dimanche."),
]

BANNED = [r"d[ée]douan", r"\bdouane", r"garantie", r"tout compris", r"frais cach", r"[ée]conomis", r"moins cher", r"livraison en \d",
          r"\bferry", r"\bbateau", r"conteneur", r"container", r"\bport\b", r"goulette", r"rad[èe]s", r"g[êe]nes", r"marseille",
          r"contr[ôo]le technique", r"t[üu]v\b", r"inspect", r"accident", r"premi[èe]re main", r"agr[ée][ée]", r"certifi", r"ans d'exp",
          r"meilleurs? prix", r"financement", r"cr[ée]dit", r"reprise", r"s[ée]r[ée]nit", r"\bfcr\b", r"[€$] ?\d|\d ?€",
          r"hlila", r"la cucina", r"dar zmen", r"top car", r"ahmed auto", r"di pi[uù]"]
