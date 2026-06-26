# Dane do odbudowy showcase (nb-showcase) — FAZA 3

Po redesignie KAŻDEJ rodziny: przebuduj jej podfolder tym samym poleceniem (bez flagi = premium), `git -C . add -A && commit && push`. Linki na landingu już prowadzą do podfolderów.
SKILL_DIR=~/.claude/skills/strona-klienta ; SHOW=~/Desktop/New\ Beginning/dema/nb-showcase

| podfolder | rodzina | pack | firma | miasto | woj | tel | rok | ocena | opinie | brief |
|---|---|---|---|---|---|---|---|---|---|---|
| hydraulik | fachowcy | trade | AquaFix Hydraulika | Warszawa | mazowieckie | +48 601 240 580 | 2011 | 4,9 | 87 | - |
| meble | rzemioslo | wood | Dębowy Detal - Meble na Wymiar | Kraków | małopolskie | +48 602 118 340 | 2008 | 5,0 | 64 | - (NIE RUSZAĆ) |
| dentysta | klinika | gabinet | Dentevia Centrum Stomatologii | Wrocław | dolnośląskie | +48 603 770 215 | 2014 | 4,9 | 210 | - |
| beauty | wellness | beauty | Lumea Beauty Studio | Gdańsk | pomorskie | +48 604 905 130 | 2017 | 4,9 | 142 | - |
| restauracja | gastro | gastro | Stół Numer 7 | Poznań | wielkopolskie | +48 605 412 760 | 2015 | 4,8 | 176 | - (DONE) |
| detailing | auto | detailing | Lustro Studio Detailingu | Katowice | śląskie | +48 606 330 190 | 2016 | 5,0 | 98 | brief-detailing.json (FAZA 3 DONE) |
| okna | dom | okna | OknoDom Stolarka Otworowa | Łódź | łódzkie | +48 607 880 245 | 2009 | 4,8 | 73 | brief-dom.json (FAZA 3 DONE) |
| tatuaz | studio | tattoo | Czarna Owca Tattoo | Wrocław | dolnośląskie | +48 608 150 470 | 2016 | 4,9 | 128 | brief-studio.json (DONE) |

Przykład polecenia (restauracja): `python3 "$SKILL_DIR/build.py" --pack gastro --out "$SHOW/restauracja" --firma "Stół Numer 7" --miasto "Poznań" --woj "wielkopolskie" --telefon "+48 605 412 760" --rok 2015 --ocena 4,8 --opinie 176`
