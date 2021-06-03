import React from "react";
import { ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";

const Personvern = () => {
  const vilkaar = `
# Betingelser for bruk av Vinkjeller
Målet med Vinkjeller-tjenesten er å gjøre det enklere for deg å lagre og holde oversikt over vinen du eier. Disse betingelsene gjelder for alle tjenester som inngår i Vinkjeller-applikasjonen. Ved å bruke tjenesten godtar du disse vilkårene.

## Dine forpliktelser
Alle kan opprette en konto i Vinkjeller, gitt at vi ikke tidligere har deaktivert kontoen din for brudd på loven eller noen av våre retningslinjer.

## Hvordan du ikke kan bruke Vinkjeller
* Du kan ikke gjøre noe ulovlig, villedende eller uredelig eller til et ulovlig eller uautorisert formål
* Du kan ikke bryte (eller hjelpe eller oppfordre andre til å bryte) disse betingelsene eller våre retningslinjer
* Du kan ikke forsøke å opprette kontoer på uautoriserte måter
* Du kan ikke manuelt eller automatisk samle informasjon om produktene eller andre brukere av Vinkjeller
* Du kan ikke selge, lisensiere eller kjøpe kontoer eller data innhentet fra oss eller tjenesten vår
* Du kan ikke modifisere, transformere, lage derivater av eller omvendt konstruere produktene våre eller deres komponenter

## Tillatelser du gir oss
Som en del av avtalen vår gir du oss også tillatelsene som vi trenger for å levere tjenesten. Du godtar at vi kan laste ned og installere oppdateringer til tjenesten på enheten din. Du kan når som helst velge å slette kontoen din dersom du ønsker det. Alt innhold du har lagret i tjenesten vil da bli slettet fra våre systemer.

## Fjerning av innhold og sletting av kontoen din
Vi kan fjerne innhold eller informasjon du lagrer på tjenesten hvis vi mener det bryter disse bruksbetingelsene eller retningslinjene våre, eller hvis vi ifølge loven er pålagt å gjøre det. Vi kan umiddelbart nekte å levere eller slutte å levere hele eller deler av tjenesten til deg.

Vi forbeholder oss alle rettigheter vi ikke uttrykkelig har tildelt deg.

## Endringer
Vi forbeholder oss retten til å endre disse opplysningene til enhver tid. Registrerte brukere vil få beskjed på e-post i forkant av alle eventuelle endringer.

# Personvernregler
Innholdet du lagrer i Vinkjeller vil ikke deles med tjedjeparter eller brukes til markedsføring. Du kan til enhver tid slette kontoen din og all informasjonen du har lagret i Vinkjeller. E-posten du oppgir ved registrering kan kun brukes til å sende ut nødvendig informasjon om endringer i tjenesten.

## Lagring av data
* Vinkjeller lagrer alle data leverandøren som hoster databasen: Firebase
* Vinkjeller bruker Google Analytics for statistikk og analyse
* Vinkjeller bruker Google AdMob til å levere reklame i tjenesten
`;
  return (
    <ScrollView>
      <View style={{ margin: 20 }}>
        <Markdown>{vilkaar}</Markdown>
      </View>
    </ScrollView>
  );
};

export default Personvern;
