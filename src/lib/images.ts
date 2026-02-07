/**
 * FOOTBALLYTICS - IMAGE SERVICE
 * =============================
 * 
 * Centralized image management with reliable fallbacks
 * Uses multiple sources: Football-Data.org, Wikipedia, UI Avatars
 */

// =============================================================================
// PLAYER IMAGES - Using reliable CDN sources
// =============================================================================

export const playerImages: Record<string, string> = {
  // Premier League
  "haaland": "https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png",
  "salah": "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png",
  "saka": "https://resources.premierleague.com/premierleague/photos/players/250x250/p223340.png",
  "foden": "https://resources.premierleague.com/premierleague/photos/players/250x250/p209244.png",
  "palmer": "https://resources.premierleague.com/premierleague/photos/players/250x250/p244851.png",
  "rice": "https://resources.premierleague.com/premierleague/photos/players/250x250/p204480.png",
  "odegaard": "https://resources.premierleague.com/premierleague/photos/players/250x250/p184029.png",
  
  // La Liga / Real Madrid
  "mbappe": "https://www.realmadrid.com/img/vertical_380px/mbappe_380x501_20240716010217.jpg",
  "bellingham": "https://www.realmadrid.com/img/vertical_380px/bellingham_380x501_20230614013741.jpg",
  "vinicius": "https://www.realmadrid.com/img/vertical_380px/vinicius_380x501_20220816120809.jpg",
  "rodrygo": "https://www.realmadrid.com/img/vertical_380px/rodrygo_380x501_20220816121932.jpg",
  
  // Barcelona
  "yamal": "https://fcbarcelona-static-files.s3.amazonaws.com/fcbarcelona/photo/2023/08/02/ae8b7e37-4aa9-4855-a6e3-a1e8dfe458f3/mini__R5I5671.JPG",
  "pedri": "https://fcbarcelona-static-files.s3.amazonaws.com/fcbarcelona/photo/2023/08/02/f4a8cc1a-8ca2-4b57-b8e0-eed8c4d59723/mini__R5I5458.JPG",
  
  // Bundesliga
  "kane": "https://www.fcbayern.com/binaries/content/gallery/fc-bayern/homepage/saison-23-24/galerien/spielerportraits-23-24/kane_harry_2324.png",
  "musiala": "https://www.fcbayern.com/binaries/content/gallery/fc-bayern/homepage/saison-23-24/galerien/spielerportraits-23-24/musiala_jamal_2324.png",
  "wirtz": "https://img.bundesliga.com/tachyon/sites/2/2024/01/wirtz-1.png",
  
  // Saudi Pro League
  "ronaldo": "https://www.alnassr.sa/files/teams/players/2023-24/cristiano-ronaldo.png",
  "neymar": "https://ssl.c.photoshelter.com/img-get/I0000Rz7p_aBQVrA/s/1200/I0000Rz7p_aBQVrA.jpg",
  "benzema": "https://www.ittihad.com/files/teams/players/2023-24/karim-benzema.png",
  "mahrez": "https://www.alahli.com/files/teams/players/2023-24/riyad-mahrez.png",
  
  // Serie A
  "lautaro": "https://www.inter.it/binaries/content/gallery/inter/giocatori/prima-squadra/23-24/lautaro-martinez.png",
  
  // Ligue 1
  "dembele": "https://www.psg.fr/img/image/upload/c_fill,g_auto,h_400,w_400/rbcwdpxn5xhkxqrmkdsy",
};

// =============================================================================
// LEAGUE LOGOS - Using reliable Wikipedia/Official sources
// =============================================================================

export const leagueLogos: Record<string, string> = {
  // European Top 5
  "premier-league": "https://crests.football-data.org/PL.png",
  "la-liga": "https://crests.football-data.org/PD.png",
  "bundesliga": "https://crests.football-data.org/BL1.png",
  "serie-a": "https://crests.football-data.org/SA.png",
  "ligue-1": "https://crests.football-data.org/FL1.png",
  
  // South American
  "brasileirao": "https://upload.wikimedia.org/wikipedia/en/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png",
  "liga-argentina": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Liga_Profesional_de_F%C3%BAtbol_%28Argentina%29_-_2024_logo.svg/200px-Liga_Profesional_de_F%C3%BAtbol_%28Argentina%29_-_2024_logo.svg.png",
  
  // Middle East
  "saudi-pro": "https://upload.wikimedia.org/wikipedia/en/b/ba/Saudi_Pro_League_Logo.svg",
  "uae-pro": "https://upload.wikimedia.org/wikipedia/en/1/16/UAE_Pro_League_logo.png",
  "qatar-stars": "https://upload.wikimedia.org/wikipedia/en/c/c6/Qatar_Stars_League_logo.png",
  "egyptian-premier": "https://upload.wikimedia.org/wikipedia/en/9/96/Egyptian_Premier_League_logo.png",
  
  // Other
  "eredivisie": "https://crests.football-data.org/DED.png",
  "primeira-liga": "https://crests.football-data.org/PPL.png",
  "championship": "https://crests.football-data.org/ELC.png",
};

// =============================================================================
// CLUB LOGOS - Using Football-Data.org API
// =============================================================================

export const clubLogos: Record<string, string> = {
  // Premier League
  "man-city": "https://crests.football-data.org/65.png",
  "arsenal": "https://crests.football-data.org/57.png",
  "liverpool": "https://crests.football-data.org/64.png",
  "chelsea": "https://crests.football-data.org/61.png",
  "man-united": "https://crests.football-data.org/66.png",
  "tottenham": "https://crests.football-data.org/73.png",
  "newcastle": "https://crests.football-data.org/67.png",
  "aston-villa": "https://crests.football-data.org/58.png",
  
  // La Liga
  "real-madrid": "https://crests.football-data.org/86.png",
  "barcelona": "https://crests.football-data.org/81.png",
  "atletico": "https://crests.football-data.org/78.png",
  
  // Bundesliga
  "bayern": "https://crests.football-data.org/5.png",
  "dortmund": "https://crests.football-data.org/4.png",
  "leverkusen": "https://crests.football-data.org/3.png",
  "leipzig": "https://crests.football-data.org/721.png",
  
  // Serie A
  "inter": "https://crests.football-data.org/108.png",
  "milan": "https://crests.football-data.org/98.png",
  "juventus": "https://crests.football-data.org/109.png",
  "napoli": "https://crests.football-data.org/113.png",
  
  // Ligue 1
  "psg": "https://crests.football-data.org/524.png",
  
  // Saudi Pro League
  "al-hilal": "https://upload.wikimedia.org/wikipedia/en/b/b1/Al-Hilal_SFC.svg",
  "al-nassr": "https://upload.wikimedia.org/wikipedia/en/c/c9/Al-Nassr_FC.svg",
  "al-ittihad": "https://upload.wikimedia.org/wikipedia/en/1/12/Al-Ittihad_Club.svg",
  "al-ahli": "https://upload.wikimedia.org/wikipedia/en/1/1b/Al-Ahli_Saudi_FC.svg",
  
  // Brazilian
  "flamengo": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_bridge_logo.svg",
  "palmeiras": "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg",
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get player image with fallback
 */
export function getPlayerImage(playerId: string, playerName: string): string {
  if (playerImages[playerId]) {
    return playerImages[playerId];
  }
  // Generate fallback avatar
  return generateAvatar(playerName, "player");
}

/**
 * Get league logo with fallback
 */
export function getLeagueLogo(leagueId: string, leagueName: string): string {
  if (leagueLogos[leagueId]) {
    return leagueLogos[leagueId];
  }
  return generateAvatar(leagueName, "league");
}

/**
 * Get club logo with fallback
 */
export function getClubLogo(clubId: string, clubName: string): string {
  if (clubLogos[clubId]) {
    return clubLogos[clubId];
  }
  return generateAvatar(clubName, "club");
}

/**
 * Generate avatar placeholder
 */
export function generateAvatar(name: string, type: "player" | "club" | "league"): string {
  const colors: Record<string, string> = {
    player: "6366f1", // Purple
    club: "f59e0b",   // Gold
    league: "10b981", // Green
  };
  
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
    
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${colors[type]}&color=fff&size=200&bold=true&format=png`;
}

/**
 * Preload images for better UX
 */
export function preloadImages(imageUrls: string[]): void {
  if (typeof window === "undefined") return;
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
