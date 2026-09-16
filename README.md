# Farmer Game in Browser

Ein kleines Top-down-Pixelspiel im Browser. Erkunde die Welt, sammle Ressourcen,
wechsle zwischen Werkzeugen und baue dir den Weg in den naechsten Bereich frei.

## Aktueller Stand

Das Spiel ist ein Vanilla-JavaScript-Prototyp ohne Frontend-Framework und ohne
Build-Schritt. Ein Express-Server liefert die Anwendung und die Assets aus.

Aktuell enthalten sind:

- rasterbasierte Bewegung mit den Pfeiltasten;
- Kollisionen mit soliden Objekten;
- Axt, Hacke und Sense als auswaehlbare Werkzeuge;
- Baeume als Holzquelle und Steine mit mehreren Abbaustufen;
- Ressourcenanzeige fuer Holz und Stein;
- ein Schild, das Ressourcen prueft und ein Haus bauen kann;
- ein Wechsel zwischen Aussenbereich und Innenbereich;
- eine Truhe und eine Ruecktuer im Innenbereich;
- persistente Ortszustaende: gesammelte Ressourcen und gebaute Objekte bleiben
  beim Ortswechsel erhalten.

Noch nicht enthalten sind unter anderem Gegner, Audio, Speichern/Laden und
automatisierte Tests.

## Steuerung

| Eingabe | Aktion |
| --- | --- |
| `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` | Bewegen |
| `ShiftLeft` oder `ShiftRight` | In Bewegungsrichtung interagieren/angreifen |
| `Z` | Axt auswaehlen |
| `X` | Hacke auswaehlen |
| `C` | Sense auswaehlen |
| Mausklick auf ein Werkzeug | Werkzeug ueber die UI auswaehlen |

## Voraussetzungen

- Node.js
- npm

## Installation und Start

Im Projektordner ausfuehren:

```bash
npm install
npm start
```

Anschliessend im Browser oeffnen:

```text
http://localhost:3000
```

Der Startbefehl fuehrt `server.js` aus. Express rendert `views/index.ejs` und
stellt den Ordner `public/` als statische Webanwendung bereit.

## Projektstruktur

```text
.
├── public/
│   ├── assets/
│   │   ├── fonts/             # Pixelify Sans und Press Start 2P
│   │   └── img/               # Spiel-, UI-, Haus- und Hintergrundgrafiken
│   └── src/
│       ├── index.html         # Canvas- und UI-Grundstruktur
│       ├── main.js            # Einstiegspunkt der Spielanwendung
│       ├── core/              # Game-Loop, Eingabe, Welt und Assets
│       ├── data/              # Leveldefinitionen
│       ├── entities/          # Spieler, Haus, Baum, Stein und weitere Objekte
│       ├── rendering/         # Canvas- und Hintergrund-Rendering
│       ├── systems/           # Levelverwaltung, Factory und Aufraeumen
│       └── ui/                # Werkzeug- und Ressourcenanzeige
├── views/
│   └── index.ejs              # Vom Express-Server gerenderte Spielseite
├── server.js                  # Express-Server auf Port 3000
├── package.json               # Abhaengigkeiten und npm-Skripte
└── README.md
```

## Architektur

- `Game` steuert Game-Loop, Update und Rendering.
- `World` verwaltet die aktiven Orte und Objekte.
- `LevelManager` liest die Leveldaten und erstellt die passenden Entities.
- `Actor` verarbeitet Bewegung, Werkzeugwahl und Interaktionen.
- `Renderer` zeichnet Hintergrund, Objekte und Spieler auf das Canvas.
- `AssetManager` laedt und cached die Bilder.
- `GameUI` aktualisiert Werkzeugauswahl und Ressourcenanzeige.

Die Leveldaten liegen in `public/src/data/levels.js`. Neue Objekte werden ueber
die Objekt-Factory erzeugt und koennen dadurch als eigene Entity-Klasse
implementiert werden.

## Entwicklung

Es gibt derzeit keinen automatisierten Testlauf. Der in `package.json`
definierte Testbefehl ist deshalb noch ein Platzhalter:

```bash
npm test
```

Fuer Aenderungen am Spiel genuegt normalerweise ein Neustart des Servers. Die
Anwendung kann danach unter `http://localhost:3000` neu geladen werden.

## Assets und Lizenzen

Die Pixel-Art-Assets stammen aus den mitgelieferten Kenney-Paketen. Die
zugehoerigen Lizenzdateien liegen direkt in den jeweiligen Asset-Ordnern:

- `public/assets/img/kenney_tiny-farm/License.txt`
- `public/assets/img/kenney_tiny-town/License.txt`
- `public/assets/img/kenney_ui-pack-pixel-adventure/License.txt`
- `public/assets/fonts/Pixelify_Sans/OFL.txt`
- `public/assets/fonts/Press_Start_2P/OFL.txt`

Bitte die jeweiligen Lizenzbedingungen beachten, wenn das Projekt oder einzelne
Assets veroeffentlicht oder weitergegeben werden.
