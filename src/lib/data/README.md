# Location datasets

These JSON files power the destination autocomplete without requiring a paid
geocoding key.

## `ports.json`

Global seaport list derived from the **WFP Global Ports** dataset
(`wld_trs_ports_wfp`, World Food Programme / HDX), with major commercial ports
and common trade-name aliases added in `src/lib/locations.ts`.

Fields: `n` name, `c` ISO country code, `co` country name, `t` port type,
`s` size class, `lat`/`lon`, `code` UN/LOCODE where known, `m` prominence rank.

## `countries-geo.json`

Country names (English/French) and approximate centroids used for country
suggestions and the map fallback. Centroids are approximate and intended for
UI orientation, not surveying.

## Attribution

- WFP Global Ports / HDX — humanitarian data exchange, public dataset.
- Country centroids — public country-centroid data (Google DSPL / Natural Earth
  derived). Verify licensing before redistributing this file separately.

Live city, region, airport and country searches use
[Photon](https://photon.komoot.io/) on OpenStreetMap data. The public instance
needs no key; set `PHOTON_URL` to a self-hosted endpoint for production volume.
Map tiles/embeds are © OpenStreetMap contributors.
