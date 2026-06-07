# Analiza sentymentu tweetów

---

Aplikacja do wyszukiwania angielskich tweetów, analizy sentymentu (VADER) i wizualizacji wyników. Dane pobierane są aktorem Apify [X Tweet Scraper (`xquik/x-tweet-scraper`)](https://apify.com/xquik/x-tweet-scraper) — pay-per-event (~**$0.015 za tweet** w praktyce; sprawdź billing w Apify Console).

## Funkcje

- Wyszukiwanie po słowie kluczowym (backend dokłada filtry: `lang:en`, bez RT/reply/quote)
- Czyszczenie tekstu pod VADER (URL, @mentions, hashtagi)
- Sentyment: positive / neutral / negative + `compound` score
- Podsumowanie: liczniki i średni compound
- Chmura słów (top słowa z oczyszczonego tekstu)
- Lista tweetów z filtrem sentymentu i paginacją (+25)
- Link do oryginału tweeta na X (pole `url` z Apify)

## Stack

| Warstwa | Technologie |
|--------|-------------|
| Frontend | React 19, Vite, Tailwind CSS 4, TypeScript |
| Backend | FastAPI, Pydantic, NLTK VADER |
| Dane | Apify Actor API (`apify-client`) |

## Struktura repozytorium

```
analiza-sentymentu-react-xapi-fastapi/
|
|
├── sentyment-backend/
│   ├── main.py
│   ├── routes/analysis.py
│   ├── schemas/analysis.py
│   └── services/            # apify, cleaning, sentiment, word_cloud
└── sentyment-frontend/
    └── src/                 # components, api, pages
```

## Wymagania

- **Windows 11**
- **Python 3.13**
- **Node.js 18+** (npm)
- Konto [Apify](https://apify.com/) z tokenem API

| Usługa | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Health | http://localhost:8000/health |

## Konfiguracja

Plik `sentyment-backend/.env`:

```env
APIFY_TOKEN=apify_api_xxxxxxxx
```

Token: [Apify Console → Integrations](https://console.apify.com/account/integrations).

Opcjonalnie frontend `sentyment-frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

## Koszt Apify

- Aktor: [xquik/x-tweet-scraper](https://apify.com/xquik/x-tweet-scraper)
- W aplikacji domyślnie pobierane jest **300 tweetów** na jedno wyszukiwanie.
- Sprawdź rzeczywistą stawkę w Apify (Usage / `charged_event_counts` na runie). W testach bywa **~$0.015 za 1 tweet** → **~$4.50 za 300 tweetów**, niezależnie od marketingu „$0.15/1K” w tytule aktora.
- Nie przerywaj runu w Apify Console w trakcie — naliczane są już pobrane eventy.

## API

**`POST /sentiment/analyze`**

```json
{
  "query": "Tesla",
  "limit": 300
}
```

Odpowiedź (skrót): `meta`, `aggregate`, `word_cloud`, `tweets[]` (m.in. `content`, `sentiment`, `sentiment_score`, `url`).

## Uruchomienie ręczne

### Backend

```powershell
cd sentyment-backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env   # ustaw APIFY_TOKEN
uvicorn main:app --port 8000
```

### Frontend

```powershell
cd sentyment-frontend
npm install
npm run dev
```

## Rozwiązywanie problemów

| Problem | Co zrobić |
|---------|-----------|
| `APIFY_NOT_CONFIGURED` | Ustaw `APIFY_TOKEN` w `.env` |
| `Maximum charged results must be greater than zero` | Doładuj konto Apify / sprawdź limity |
| Brak połączenia z API | Backend musi działać na porcie 8000 |


## Licencja

Używaj zgodnie z regulaminem X/Twitter i Apify przy scrapingu publicznych danych.
