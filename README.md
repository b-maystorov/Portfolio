# Bilgin Maystorov – Portfolio

Statische deutsche Portfolio-Website: HTML, CSS und JavaScript, ohne Framework,
Build-Schritt, externe Schriftarten oder Tracking.

## Lokal ansehen

Im Projektordner starten:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

http://127.0.0.1:8000 öffnen. Änderungen mit `Strg+R` neu laden; bei alten
CSS-/JS-Dateien `Strg+Umschalt+R` verwenden. Server mit `Strg+C` stoppen.
Wenn der Preview-Server schon läuft, nicht noch einmal starten.

**Nur `dist/` ausliefern.** Der Projektstamm enthält private Referenzen.
Bei späterem Hosting ausschließlich den Inhalt von `dist/` bereitstellen.
Es wurde nichts veröffentlicht oder zu GitHub gepusht.

## Bearbeiten

- **Alle öffentlichen persönlichen Inhalte:** `dist/index.html`.
  Hier stehen Vorstellung, Kenntnisse, Projekttexte, Zeiträume, Sprachen und
  Kontaktinformationen. Die Kopierfunktion liest die E-Mail direkt aus dem Mail-Link.
- `dist/styles.css`: Farben unter `:root`, Layout und responsive Ansichten.
  Die Navigationshöhe wird für korrekte Sprungmarken automatisch gemessen.
- `dist/script.js`: mobiles Menü, Projektfilter, Bilddialog, E-Mail-Kopieren,
  aktive Navigation und reduzierte bzw. pausierte Animationen.
- `dist/assets/`: lokales Porträt und Original-Projektscreenshots.

Projekte filtern über `data-category` (`systeme`, `netzwerke`, `daten`).
Neue Bilder mit korrekten `width`/`height`-Attributen und beschreibendem `alt`
einbinden. Ein Bildlink mit `data-preview` und `data-caption` erhält die modale
Vorschau. Ohne JavaScript öffnet der Link das Originalbild.

Ohne JavaScript bleiben Navigation, sämtliche Projekte, native `details`-
Elemente und Kontaktlinks nutzbar. Filter und Kopierbutton erscheinen erst mit
JavaScript. Kopieren benötigt eine erlaubte Clipboard-API; andernfalls erscheint
Hinweis zur manuellen Kopie. `127.0.0.1` gilt in gängigen Browsern als sicherer
lokaler Kontext. Der Mail-Link nutzt das eingerichtete E-Mail-Programm.

Die dekorativen SVG-Verbindungen bewegen sich nur bei sichtbarer Grafik,
aktivem Browser-Tab und ohne reduzierte Bewegung. Inhalte werden durch
Entrance-Animationen nie dauerhaft versteckt.

## Private Referenzen

`reference/` ist über `.gitignore` vollständig ausgeschlossen und wird nicht
vom Preview-Server bedient. Original-CV, Cover, extrahierter CV-Text und private
Inhaltsfragen liegen dort. Der CV ist die Quelle für Zeiträume, Einrichtungen,
Berufsweg und Sprachen. Straße, Telefonnummer, Signatur und Original-PDF sind
nicht in `dist/` enthalten. Es gibt keinen CV-Download.

## Projekt- und Bildquellen

Öffentliches Profil: https://github.com/b-maystorov (geprüft am 20.10.2026).
Die Projektbeschreibungen basieren auf den READMEs und spezifischen Lab-Anleitungen:

- https://github.com/b-maystorov/active-directory-homelab
  – `docs/09-file-shares-permissions.md`, Bilder
  `images/domain-verification.png` → `assets/ad-domain.png` und
  `images/share-client-access.png` → `assets/ad-share.png`.
- https://github.com/b-maystorov/ccna-learning
  – `05-stp-etherchannel/labs/05-stp-redundancy-failover.md`, Bilder
  `05-stp-etherchannel/labs/images/stp-topology.png` → `assets/cisco-topology.png`
  und `stp-failover.png` im selben Quellordner → `assets/cisco-failover.png`.
- https://github.com/b-maystorov/python-dice-adventure
- https://github.com/b-maystorov/ubuntu-installation-autoinstall
- https://github.com/b-maystorov/metropolis-library-db

Die letzten drei Projekte enthalten aktuell keine passenden Repository-
Screenshots. Sie werden deshalb mit Text und Projektdetails dargestellt.
Porträt: GitHub-Avatar von b-maystorov, mit Zustimmung lokal gespeichert.
Die Dateien wurden nicht beschnitten oder gestreckt. Das Cover dient nur als
Inspiration für Farben und eigens gezeichnete SVG-Verbindungen.

Die Programme und Labs wurden für die Website nicht neu ausgeführt. Vor neuen
Leistungsbehauptungen den aktuellen Repository-Stand prüfen. CCNA-Material wird
als Lernweg beschrieben, nicht als abgeschlossene Zertifizierung.

## Prüfung

Statische Prüfung: HTML-Struktur, Sprungmarken, Asset-Dateien und Bildmaße,
Kontaktlinks, private Ausschlüsse und Hauptfarbkontraste. HTTP-Prüfung gegen den
lokalen Server einschließlich Nichterreichbarkeit privater Referenzdateien.
Ein Browser bzw. eine JavaScript-Laufzeit steht in der Arbeitsumgebung nicht
zur Verfügung; tatsächliche Bedienung, Rendering, mobile Darstellung und
Clipboard-Berechtigungen konnten hier nicht im Browser geprüft werden.

Für die gemeinsame Browserprüfung: Filter einzeln bedienen, Bilder mit Enter
öffnen und Escape schließen, Menü auf kleinem Bildschirm testen, Sprungmarken
und aktive Navigation kontrollieren, E-Mail kopieren sowie reduzierte Bewegung
und die Ansicht ohne JavaScript überprüfen.

## Bildausschnitte und letzter Feinschliff

Die Hauptkarten verwenden CSS-Ausschnitte (`.thumbnail-window`) statt veränderter
Bilddateien. `--crop-ratio`, `--image-width`, `--image-left` und `--image-top`
bestimmen die Vorschau. Die Bildlinks und der Dialog öffnen immer die unbeschnittene
Originaldatei. Technische Bildinhalte werden nicht retuschiert.

Die AD-Hauptkarte zeigt jetzt `images/group-it-created.png` aus dem AD-Repository,
lokal als `assets/ad-groups.png`. Der bisherige Domänen-Screenshot bleibt erhalten.
Packet Tracer zeigt einen Ausschnitt um die drei Switches statt den ganzen Desktop.
Auch das Original des Gruppen-Screenshots bleibt unverändert.

Ältere Beschäftigungen zeigen Titel, Arbeitgeber und Datum; die Aufgaben lassen
sich über native `details` öffnen. Die Umschulung und der Praktikumszeitraum sind
immer sichtbar. Das aktive Navigationsziel wird anhand des tatsächlichen unteren
Header-Randes bestimmt, auch nach Filterwechseln und aufgeklappten Details.

Offene Sachfragen stehen in `reference/CONTENT-CHECKLIST.md` und werden nicht
öffentlich ausgeliefert. Manuelle Prüfung weiterhin erforderlich: 360, 390, 768px
und Desktop (z.B. 1440px), Textumbruch/Overflow, Menü per Tastatur, Sprungmarken,
aktive Navigation, Filter (5/2/1/2), Details, Bilddialog samt Escape/Fokusrückgabe,
Clipboard-Erfolg und verweigerter Zugriff, reduzierte Bewegung.
