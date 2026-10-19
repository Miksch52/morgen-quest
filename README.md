# Morgen-Quest

Tammos tägliches Überraschungs-Workout als Android-App (Capacitor 8).
Jeden Morgen gibt es eine Mystery-Kiste, eine zufällige Spielregel, einen festen Tagestest (Liegestütze), Beute-Truhen und einen Wecker.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `index.html` | Einzige Quelle der App (HTML, CSS, JS). Läuft auch als Webseite. |
| `scripts/build-www.mjs` | Baut daraus `www/index.html` für die App: lokale Schriften, `capacitor.js`. |
| `www/fonts/` | Schriften offline (Bungee, Rubik, JetBrains Mono). |
| `assets/` | Quell-Bilder für Icon und Splash, Weckton `wecker.wav`. |
| `scripts/make-alarm-sound.mjs`, `scripts/make-icons.cjs` | Erzeugen Weckton und Icons neu. |
| `android/` | Natives Android-Projekt (von Capacitor erzeugt, angepasst). |
| `.github/workflows/android.yml` | Baut die APK automatisch auf GitHub. |

Änderungen immer in `index.html` machen, danach `npm run sync`.

## APK bauen

### Variante A: GitHub (kein Android Studio nötig)

Bei jedem Push auf `main` baut GitHub Actions eine signierte APK und veröffentlicht sie als Release.
Der Link bleibt immer gleich und zeigt auf die neueste Version:

`https://github.com/Miksch52/morgen-quest/releases/latest/download/morgen-quest.apk`

Einmalig nötig: zwei Secrets unter **Settings → Secrets and variables → Actions**:

| Name | Inhalt |
|---|---|
| `KEYSTORE_BASE64` | Inhalt von `keystore-base64.txt` |
| `KEYSTORE_PASSWORD` | Passwort aus `passwort.txt` |

Den Schlüssel (`morgen-quest.jks`) sicher aufbewahren und nie ins Repository legen.
Ohne ihn lassen sich keine Updates mehr über die installierte App spielen.

### Variante B: Am eigenen Rechner

Voraussetzung: Node.js 22, Android Studio (mit Android SDK 36), Java 21.

```bash
npm install
npm run sync      # baut www/ und kopiert alles ins Android-Projekt
npm run open      # öffnet Android Studio → "Run" auf angeschlossenem Handy
# oder direkt:
npm run apk       # APK liegt danach in android/app/build/outputs/apk/debug/
```

## Auf Tammos Handy installieren

1. APK aufs Handy kopieren und öffnen. Android fragt einmal nach „Installation aus unbekannten Quellen“ – erlauben.
2. Beim ersten Start **Benachrichtigungen erlauben**. Ohne das klingelt kein Wecker.
3. Einstellungen → Apps → Morgen-Quest → Akku → **Nicht eingeschränkt / Nicht optimiert**. Manche Hersteller (Samsung, Xiaomi, Huawei) verschlucken sonst Wecker.
4. In der App unten „Wecker testen“ tippen, Handy sperren, nach 10 Sekunden muss es klingeln.

## So funktioniert der Wecker

- Die App plant für die nächsten 14 Tage exakte Android-Wecker (Standard: 07:50, Mo–So), dazu je einen zweiten Weckruf 10 Minuten später.
- Bei jedem Öffnen der App wird neu geplant. Wird die App 14 Tage lang nicht geöffnet, hören die Wecker auf.
- Das funktioniert auch bei geschlossener App und nach einem Neustart des Handys.
- Wer die App innerhalb von 20 Minuten nach der Weckzeit öffnet und die Quest startet, bekommt +30 XP. Der zweite Weckruf fällt dann weg.
- Ist die App beim Klingeln offen, klingelt sie zusätzlich selbst, bis „Aufstehen“ gedrückt wird.

## Bekannte Grenzen

- **Lautlos-Modus:** Der Wecker läuft als Benachrichtigung, nicht als System-Wecker. Bei lautlos oder „Bitte nicht stören“ bleibt er stumm. Ein echter Alarm-Kanal (wie die Uhr-App) bräuchte ein eigenes natives Plugin.
- **Spielstand:** liegt im Speicher der App auf dem Gerät. App-Daten löschen oder deinstallieren löscht ihn.
- **Debug-APK:** zum direkten Installieren gedacht, nicht für den Play Store. Dafür braucht es eine signierte Release-Version.
- Diese Version wurde nicht auf einem echten Gerät getestet.
