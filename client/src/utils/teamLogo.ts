import angersLogo from "../assets/images/teams/ligue1/angers.svg";
import auxerreLogo from "../assets/images/teams/ligue1/auxerre.svg";
import brestLogo from "../assets/images/teams/ligue1/brest.svg";
import leHavreLogo from "../assets/images/teams/ligue1/le-havre.svg";
import lensLogo from "../assets/images/teams/ligue1/lens.svg";
import lilleLogo from "../assets/images/teams/ligue1/lille.svg";
import lorientLogo from "../assets/images/teams/ligue1/lorient.svg";
import lyonLogo from "../assets/images/teams/ligue1/lyon.svg";
import metzLogo from "../assets/images/teams/ligue1/metz.svg";
import monacoLogo from "../assets/images/teams/ligue1/monaco.svg";
import nantesLogo from "../assets/images/teams/ligue1/nantes.svg";
import niceLogo from "../assets/images/teams/ligue1/nice.svg";
import omLogo from "../assets/images/teams/ligue1/om.svg";
import parisFcLogo from "../assets/images/teams/ligue1/paris-fc.svg";
// Ligue 1
import psgLogo from "../assets/images/teams/ligue1/psg.svg";
import rennesLogo from "../assets/images/teams/ligue1/rennes.svg";
import strasbourgLogo from "../assets/images/teams/ligue1/strasbourg.svg";
import toulouseLogo from "../assets/images/teams/ligue1/toulouse.svg";

// Ligue 2
// import reimsLogo from "../assets/images/teams/ligue2/reims.svg";
// import saintEtienneLogo from "../assets/images/teams/ligue2/saint-etienne.svg";
// import montpellierLogo from "../assets/images/teams/ligue2/montpellier.svg";
// import dunkerqueLogo from "../assets/images/teams/ligue2/dunkerque.svg";
// import guingampLogo from "../assets/images/teams/ligue2/guingamp.svg";
// import annecyLogo from "../assets/images/teams/ligue2/annecy.svg";
// import lavalLogo from "../assets/images/teams/ligue2/laval.svg";
// import bastiaLogo from "../assets/images/teams/ligue2/bastia.svg";
// import grenobleLogo from "../assets/images/teams/ligue2/grenoble.svg";
// import troyesLogo from "../assets/images/teams/ligue2/troyes.svg";
// import amiensLogo from "../assets/images/teams/ligue2/amiens.svg";
// import pauLogo from "../assets/images/teams/ligue2/pau.svg";
// import rodezLogo from "../assets/images/teams/ligue2/rodez.svg";
// import redStarLogo from "../assets/images/teams/ligue2/red-star.svg";
// import clermontLogo from "../assets/images/teams/ligue2/clermont.svg";
// import nancyLogo from "../assets/images/teams/ligue2/nancy.svg";
// import leMansLogo from "../assets/images/teams/ligue2/le-mans.svg";
// import boulogneLogo from "../assets/images/teams/ligue2/boulogne.svg";

// Logo par défaut
const defaultLogo = "";

export const teamLogos: Record<number, string> = {
  // Ligue 1
  1: psgLogo,
  2: omLogo,
  3: monacoLogo,
  4: niceLogo,
  5: lilleLogo,
  6: lyonLogo,
  7: strasbourgLogo,
  8: lensLogo,
  9: brestLogo,
  10: toulouseLogo,
  11: auxerreLogo,
  12: rennesLogo,
  13: nantesLogo,
  14: angersLogo,
  15: leHavreLogo,
  16: lorientLogo,
  17: parisFcLogo,
  18: metzLogo,

  // Ligue 2
  //   19: reimsLogo,
  //   20: saintEtienneLogo,
  //   21: montpellierLogo,
  //   22: dunkerqueLogo,
  //   23: guingampLogo,
  //   24: annecyLogo,
  //   25: lavalLogo,
  //   26: bastiaLogo,
  //   27: grenobleLogo,
  //   28: troyesLogo,
  //   29: amiensLogo,
  //   30: pauLogo,
  //   31: rodezLogo,
  //   32: redStarLogo,
  //   33: clermontLogo,
  //   34: nancyLogo,
  //   35: leMansLogo,
  //   36: boulogneLogo,
};

export const getTeamLogo = (teamId: number): string => {
  return teamLogos[teamId] || defaultLogo;
};
