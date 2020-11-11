# Vinkjeller

## Importere CSV-fil fra Vinmonopolet.no

1. Last ned CSV-fil fra [Vinmonopolet](https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv)
2. Kjør kommando `csv2json --separator=";" produkter.csv > produkter.json`
3. Last opp JSON-fil i Firebase
    1. Gå til [Firebase DB](https://console.firebase.google.com/u/0/project/vinkjeller-baeb3/database/vinkjeller-baeb3/data/~2Fvinmonopolet_db)
    2. Trykk 'Import JSON'
    3. Last opp fil

[csv2json](https://github.com/julien-f/csv2json) kan brukes til å konvertere fra CSV til JSON
