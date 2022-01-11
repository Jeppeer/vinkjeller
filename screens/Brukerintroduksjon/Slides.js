import { colors } from "../../styles/common";

export const slides = [
  {
    key: "1",
    title: "Velkommen til Vinkjeller!",
    text:
      "Med Vinkjeller kan du enkelt holde oversikt over vinene du har i kjelleren.",
    backgroundColor: colors.primaryBg,
    titleStyle: { paddingBottom: 20 }
  },
  {
    key: "2",
    title: "Søk i Vinmonopolets sortiment",
    text:
      "Vinkjeller snakker med Vinmonopolet! Du kan enkelt søke i hele Vinmonopolets sortiment.\n\nSøk på produktnavn/varenummer, eller ...",
    image: require("../../assets/images/brukerintroduksjon/soek-copy2.jpg"),
    backgroundColor: colors.primaryBg,
    imageStyle: { transform: [{ rotate: "-10deg" }] }
  },
  {
    key: "3",
    title: "Strekkodeleser",
    text: "... ved å scanne strekkoden på flasken!",
    image: require("../../assets/images/brukerintroduksjon/strekkode-hvit.png"),
    backgroundColor: colors.primaryBg
  },
  {
    key: "4",
    title: "Få produktinformasjon",
    text:
      "Informasjon om produktet hentes direkte fra Vinmonopolet. Du kan også legge til egen informasjon, som notat og drikkevindu.\n\nDersom vinen ikke finnes hos Vinmonopolet kan du legge den til i kjelleren manuelt.",
    image: require("../../assets/images/brukerintroduksjon/produkt2.jpg"),
    titleStyle: { color: "black" },
    textStyle: { color: "black" }
  },
  {
    key: "5",
    title: "Hold oversikt\n",
    text:
      "Lagre vinene dine, og hold oversikt over hva du har i kjelleren.\n\nVi håper du liker Vinkjeller!",
    image: require("../../assets/images/brukerintroduksjon/kjeller2.jpg"),
    titleStyle: { color: "black" },
    textStyle: { color: "black" }
  }
];
