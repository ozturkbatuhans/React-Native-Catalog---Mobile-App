# React Native Catalog — Mobile App
> Examenopdracht – Mobile Application 1  
> Graduaat Programmeren

---

## Doel van het project
Deze mobiele applicatie is een kleine **productcatalogus-app** gebouwd met **Expo (React Native)**.  
De app toont dat ik de basisprincipes van **Tabs + Stack navigatie**, **FlashList**, **API-calls**, en **zoeken / sorteren** correct begrijp en kan toepassen.

---

## Projectstructuur
```
src/
 ├── components/       # SearchBar, SortBar, FilterBar
 ├── hooks/            # useProducts, useProductDetail
 ├── navigation/       # RootNavigator (Tabs + Stack)
 ├── screens/          # Home, Detail, Profile
 └── utils/            # sorting.js & filtering.js
```


## Functionele & technische kenmerken

| Onderdeel | Beschrijving |
|------------|---------------|
| **Navigatie** | Twee hoofd-tabs: **Home** en **Profile**. Binnen *Home* bevindt zich een **Stack-navigatie** (*lijst → detail → terug* werkt correct). |
| **Home-tab** | Toont een lijst van producten via **FlashList** (géén FlatList). |
| **Zoeken** | Een live **zoekbalk** filtert op titel terwijl je typt. |
| **Sorteren** | Minstens twee opties: prijs ↑/↓ en rating. |
| **Filter** | Simpele filter: “in stock only” + categorieën. |
| **Detail-pagina** | Navigatie vanuit lijstitem; toont minstens 4 velden (titel, prijs, rating, beschrijving, afbeelding). |
| **Profile-tab** | Statische eigen info (naam, korte rol, contact, avatar uit assets). |
| **React Hooks** | Gebruik van `useState` en `useEffect`, inclusief duidelijke *mount/unmount* logging en cleanup (`AbortController`). |
| **UI / Style** | Gestyled via `StyleSheet` (geen externe UI-kits). |
| **Loading / Error / Empty** | Duidelijke visuele feedback in elk scherm. |

---

## Gebruikte API

**Bron:** [DummyJSON API](https://dummyjson.com)

| Doel | Endpoint | Voorbeeld |
|------|-----------|------------|
| **Lijst van producten** | `https://dummyjson.com/products?limit=100` | Retourneert een array van productobjecten |
| **Detail per product** | `https://dummyjson.com/products/{id}` | Bijvoorbeeld: `/products/5` |

De API levert o.a. volgende velden: `id`, `title`, `price`, `rating`, `stock`, `category`, `description`, `thumbnail`, `images[]`.

---

## Run-instructies

### Vereisten
- Node.js (v18 of hoger)
- Expo CLI (gebruik `npx expo` of `npm install -g expo`)

### Installatie en start

```bash
# 1. Repository klonen
git clone https://github.com/YOUR_USERNAME/React-Native-Catalog---Mobile-App.git

# 2. Dependencies installeren
npm install

# 3. Project starten via Expo
npm start
# of
npx expo start

Scan de QR-code in de terminal met Expo Go (Android/iOS)
of open de webversie via http://localhost:8081.
```

---

## Zoeken, Sorteren & Filteren

### Zoeken
De **zoekbalk** filtert live op titel (*case-insensitive*).  
De filter gebeurt lokaal in de component via `useMemo()` zodat het efficiënt blijft:

```
const filtered = data.filter(p =>
  p.title.toLowerCase().includes(query.toLowerCase())
);
```

### Sorteren
Er zijn drie sorteeropties voorzien:
-Rating ↓ (hoog naar laag) (standaard)
-Prijs ↑ (laag naar hoog)*
-Prijs ↓ (hoog naar laag)*

De logica bevindt zich in utils/sorting.js:
```
switch (sortKey) {
  case SORT_KEYS.PRICE_ASC:
    return arr.sort((a, b) => a.price - b.price);
  case SORT_KEYS.PRICE_DESC:
    return arr.sort((a, b) => b.price - a.price);
  default:
    return arr.sort((a, b) => b.rating - a.rating);
}
```

### Technische keuzes

1. Projectstart: npx create-expo-app --template blank

2. Geen folder-based routing, enkel manuele navigatie met @react-navigation/native

3. Geen TypeScript, enkel JSX

4. Geen externe UI libraries

5. Gebruik van FlashList i.p.v. FlatList voor performantie

6. .gitignore bevat node_modules/, build-cache en lokale Expo-artefacten

