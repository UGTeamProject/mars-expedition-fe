# Mars Expedition - instrukcja uruchomienia

*Mars Expedition* to projekt dyplomowy będący kodem źródłowym do pracy pt. *Mars Expedition - projekt i implementacja gry przeglądarkowej*. Przedstawia grę przeglądarkową science-fiction z elementami strategii, w której głównym zadaniem gracza jest zbieranie surowców do rozwoju kolonii na obcej planecie.

W poniższych rozdziałach omówione jest uruchomienie aplikacji.

### Narzędzia

Do uruchomienia programu potrzebne są:

- Docker Desktop (lub sam silnik Docker) - Mars Expedition jest w pełni skonteneryzowana.
- Dowolna przeglądarka - do korzystania ze strony.

### Pliki środowiskowe

Po pierwsze, należy stworzyć pliki **.env** w obu folderach (`./mars-expedition-fe/mars-expedition` i `./mars-expedition-be`) i stworzyć wymagane zmienne środowiskowe. Zmienne wraz z przykładowymi wartościami są utworzone w plikach `.env-example` we wcześniej wymienionych folderach. Można skopiować ich zawartość do pliku **.env** lub usunąć **-example** z nazwy pliku. Zaleca się pozostawienie domyślnych ustawień.

### Uruchomienie

Ponieważ aplikacja była rozwijana w oddzielnych repozytoriach, zawiera dwie konfiguracje kontenerów: frontendową i backendową.

W pierwszej kolejności zaleca się zbudowanie kontenerów backendu:

```sh
cd ./mars-expedition-be
docker compose up    // z flagą -d aby ukryć logi
```

Następnie zbudować kontener frontendu:
```sh
cd ../mars-expedition-fe
docker compose up    // z flagą -d aby ukryć logi
```

Aplikacja będzie dostępna na http://localhost:8082. Backend domyślnie działa na porcie 8081, a serwer autoryzacyjny Keycloak na 8080.

##### Natalia Niewiadowska (288503), Michał Pomirski (293676), Kacper Prarat (285800)
