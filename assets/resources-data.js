/* ============================================================
   The Black Man's Toolkit — Regional resource directory
   ------------------------------------------------------------
   Extends window.TOOLKIT.chapters[*].resources (national set)
   with location-aware UK services across England, Scotland,
   Wales, and Northern Ireland.
   
   Each entry has:
     name, note, link, [phone], [black_led]
     chapter:  body | mind | money | spirit | brotherhood | community
     regions:  array of region codes (see REGIONS) or ['national']
     city:     human-readable city/area
     postcodes:[optional] array of postcode-area prefixes
                (e.g. ['M','OL','SK','BL'])
   ============================================================ */

window.BMT_REGIONS = {
  london:      { name: "London",                postcodes: ["E","EC","N","NW","SE","SW","W","WC","BR","CR","DA","EN","HA","IG","KT","RM","SM","TW","UB","WD"] },
  south_east:  { name: "South East England",    postcodes: ["AL","BN","CT","GU","ME","MK","OX","PO","RG","RH","SL","SO","TN"] },
  south_west:  { name: "South West England",    postcodes: ["BA","BH","BS","DT","EX","GL","PL","SN","SP","TA","TQ","TR"] },
  east:        { name: "East of England",       postcodes: ["CB","CM","CO","IP","LU","NR","PE","SG","SS"] },
  east_mids:   { name: "East Midlands",         postcodes: ["DE","DN","LE","LN","NG","NN"] },
  west_mids:   { name: "West Midlands",         postcodes: ["B","CV","DY","HR","ST","TF","WR","WS","WV"] },
  yorkshire:   { name: "Yorkshire & Humber",    postcodes: ["BD","HD","HG","HU","HX","LS","S","WF","YO"] },
  north_west:  { name: "North West England",    postcodes: ["BB","BL","CA","CH","CW","FY","L","LA","M","OL","PR","SK","WA","WN"] },
  north_east:  { name: "North East England",    postcodes: ["DH","DL","NE","SR","TS"] },
  wales:       { name: "Wales",                 postcodes: ["CF","LD","LL","NP","SA","SY"] },
  scotland:    { name: "Scotland",              postcodes: ["AB","DD","DG","EH","FK","G","HS","IV","KA","KW","KY","ML","PA","PH","TD","ZE"] },
  ni:          { name: "Northern Ireland",      postcodes: ["BT"] },
};

/* Map a UK outward postcode (e.g. "BS1", "M14", "LS6 4AA") to a region key.
   Returns null if it cannot be matched. */
window.BMT_postcodeToRegion = function (input) {
  if (!input) return null;
  const code = String(input).toUpperCase().replace(/\s+/g, "");
  // pull the leading letters (1 or 2)
  const m = code.match(/^([A-Z]{1,2})\d/);
  if (!m) return null;
  const prefix = m[1];
  // search longest match first (e.g. "EC" before "E")
  const entries = Object.entries(window.BMT_REGIONS)
    .map(([id, r]) => [id, r])
    .filter(([_, r]) => r.postcodes.includes(prefix));
  // London "E" should beat... actually we add EC, etc explicitly; just take first
  return entries.length ? entries[0][0] : null;
};

/* ============================================================
   REGIONAL DIRECTORY
   ============================================================ */
window.BMT_REGIONAL = [

  /* ─── LONDON ────────────────────────────────────────────── */
  { chapter: "mind", regions: ["london"], city: "London (Lambeth, Lewisham, Southwark)",
    name: "Black Thrive Lambeth", note: "Partnership working to reduce mental-health inequalities for Black people in Lambeth. CAPSA peer support, advocacy, community programmes.",
    link: "https://lambeth.blackthrive.org", black_led: true },
  { chapter: "mind", regions: ["london"], city: "London",
    name: "BAATN", note: "Black, African and Asian Therapy Network. UK's largest directory of Black and heritage therapists; sliding-scale fees available.",
    link: "https://www.baatn.org.uk", black_led: true },
  { chapter: "mind", regions: ["london","national"], city: "Online + London", postcodes: [],
    name: "The Empowerment Group", note: "Heavily subsidised online 1:1 counselling for Black individuals in the UK aged 18+. Culturally informed Black therapists.",
    link: "https://www.theempowermentgroup.co.uk", black_led: true },
  { chapter: "mind", regions: ["london"], city: "London (Hackney, Tower Hamlets)",
    name: "Mind in the City, Hackney and Waltham Forest", note: "Local Mind branch with specific Black men's wellbeing groups. Self-referral; free.",
    link: "https://www.mithwf.org.uk" },
  { chapter: "mind", regions: ["london"], city: "Croydon",
    name: "Off The Record (OTR) Croydon", note: "Free counselling for young people 14-25, with specialist Black & POC therapist team.",
    link: "https://www.talkofftherecord.org" },
  { chapter: "brotherhood", regions: ["london"], city: "London",
    name: "100 Black Men of London", note: "Mentoring, education, economic empowerment, health & wellness. Free Saturday programme for boys 10-16.",
    link: "https://100bmol.org.uk", black_led: true },
  { chapter: "brotherhood", regions: ["london"], city: "London (citywide)",
    name: "The Black Men's Consortium", note: "London-based intergenerational peer group; regular gatherings, mentoring, brotherhood circles.",
    link: "https://theblackmensconsortium.com", black_led: true },
  { chapter: "body", regions: ["london"], city: "London (Camberwell + outreach)",
    name: "Cancer Black Care", note: "Black-led cancer support charity. Information, advocacy and family support across London and online.",
    link: "https://www.cancerblackcare.org.uk", black_led: true },
  { chapter: "spirit", regions: ["london"], city: "London (Brixton)",
    name: "Black Cultural Archives", note: "Home of Black British history. Library, exhibitions, talks, and community programmes that ground identity in heritage.",
    link: "https://blackculturalarchives.org", black_led: true },
  { chapter: "spirit", regions: ["london"], city: "London (Southwark)",
    name: "Africa Centre London", note: "Cultural and educational events celebrating contemporary African culture; talks, music, food, gatherings.",
    link: "https://www.africacentre.org.uk", black_led: true },
  { chapter: "money", regions: ["london"], city: "London (Camberwell + branches)",
    name: "London Mutual Credit Union", note: "Ethical, FCA-regulated savings and affordable loans. Serves Lambeth, Southwark, Camden, Westminster.",
    link: "https://www.creditunion.co.uk" },
  { chapter: "money", regions: ["london"], city: "East London",
    name: "London Community Credit Union", note: "Member-owned. Branches in Hackney, Tower Hamlets, Newham, Haringey, Waltham Forest.",
    link: "https://www.londoncu.co.uk" },
  { chapter: "money", regions: ["london","national"], city: "London-founded, UK-wide",
    name: "Pentecostal Community Bank", note: "Britain's first Black-led credit union, founded 1980 by Rev. Carmel Jones. Postal services UK-wide; main branches in Brixton.",
    link: "https://pcuuk.com", black_led: true },
  { chapter: "community", regions: ["london"], city: "London (Eltham + UK)",
    name: "Stephen Lawrence Day Foundation", note: "Legacy programmes for young Black people: classrooms, career mentoring, leadership pathways.",
    link: "https://stephenlawrenceday.org", black_led: true },
  { chapter: "community", regions: ["london"], city: "London",
    name: "The Ubele Initiative", note: "African-diaspora-led intergenerational social-action charity. Programmes on community asset transfer, leadership, mental wellbeing.",
    link: "https://www.ubele.org", black_led: true },
  { chapter: "community", regions: ["london"], city: "London",
    name: "Operation Black Vote", note: "Voter registration, MP Shadowing Scheme, leadership pipelines for Black, Asian and minority ethnic Britons.",
    link: "https://www.obv.org.uk", black_led: true },

  /* ─── NORTH WEST (Manchester, Liverpool) ────────────────── */
  { chapter: "mind", regions: ["north_west"], city: "Manchester", postcodes: ["M"],
    name: "African & Caribbean Mental Health Services (ACMHS)", note: "Founded 1989 to address overrepresentation of Black men in psychiatric admissions. Advocacy, recovery, family support.",
    link: "https://www.acmh-services.co.uk", phone: "0161 226 9562", black_led: true },
  { chapter: "mind", regions: ["north_west"], city: "Manchester", postcodes: ["M","OL","SK","BL"],
    name: "42nd Street", note: "Free, confidential mental-health support for young people 11-25 in Greater Manchester. We Tell You peer-research group with young Black men.",
    link: "https://www.42ndstreet.org.uk", phone: "0161 228 7321" },
  { chapter: "mind", regions: ["north_west"], city: "Manchester",
    name: "Greater Manchester BME Network", note: "Network of BME-led organisations advocating culturally appropriate mental-health care across GM.",
    link: "https://www.gmbmen.org", black_led: true },
  { chapter: "mind", regions: ["north_west"], city: "Liverpool", postcodes: ["L"],
    name: "Mary Seacole House", note: "Liverpool's Black-led mental-health charity. Advocacy, counselling, advice for people of African, Caribbean and Asian heritage.",
    link: "https://www.maryseacolehouse.com", phone: "0151 734 1300", black_led: true },
  { chapter: "brotherhood", regions: ["north_west"], city: "Liverpool",
    name: "Liverpool Black Men's Network", note: "Brotherhood, mentoring and community organising for Black men across Merseyside.",
    link: "https://www.facebook.com/LiverpoolBlackMensNetwork", black_led: true },
  { chapter: "body", regions: ["north_west"], city: "Manchester",
    name: "BHA for Equality", note: "Manchester-based BME-led health charity. HIV, sexual health, wellbeing services with strong Black community work.",
    link: "https://thebha.org.uk", phone: "0161 274 4500" },
  { chapter: "community", regions: ["north_west"], city: "Manchester",
    name: "Manchester BME Network", note: "Voice and capacity-building for over 100 BME community organisations across Manchester.",
    link: "https://manchesterbmenetwork.co.uk", black_led: true },

  /* ─── YORKSHIRE (Leeds, Bradford, Sheffield) ─────────────── */
  { chapter: "mind", regions: ["yorkshire"], city: "Leeds", postcodes: ["LS","WF"],
    name: "Black Health Initiative (BHI)", note: "Free, confidential counselling for African, African Caribbean and dual-heritage adults & young people 13+ in Leeds.",
    link: "https://www.blackhealthinitiative.org", phone: "0113 307 0300", black_led: true },
  { chapter: "mind", regions: ["yorkshire"], city: "Bradford", postcodes: ["BD"],
    name: "Sharing Voices Bradford", note: "Community-development mental-health organisation supporting BME communities in Bradford. Group work, advocacy, peer support.",
    link: "https://sharingvoices.net", phone: "01274 305 060", black_led: true },
  { chapter: "mind", regions: ["yorkshire"], city: "Bradford",
    name: "African Caribbean Achievement Project (ACAP)", note: "Bradford-based grassroots charity delivering culturally responsive mental-health support, mentoring and youth programmes.",
    link: "https://acap.org.uk", black_led: true },
  { chapter: "body", regions: ["yorkshire"], city: "Leeds",
    name: "Touchstone Leeds", note: "Mental-health and wellbeing services for marginalised communities in Leeds, including specialist Sahara and BME teams.",
    link: "https://touchstonesupport.org.uk", phone: "0113 219 2727" },
  { chapter: "spirit", regions: ["yorkshire"], city: "Leeds, Bradford, Huddersfield",
    name: "West Yorkshire African Caribbean Council of Churches", note: "Network of Black Majority Churches supporting community work, mental health and youth programmes across West Yorkshire.",
    link: "https://www.wyaccc.org.uk", black_led: true },
  { chapter: "brotherhood", regions: ["yorkshire"], city: "Sheffield", postcodes: ["S"],
    name: "SADACCA", note: "Sheffield & District African Caribbean Community Association. Brotherhood meetings, men's wellbeing, elder support.",
    link: "https://www.sadacca.com", phone: "0114 275 3479", black_led: true },
  { chapter: "community", regions: ["yorkshire"], city: "Leeds",
    name: "Leeds Black Elders Association", note: "Befriending, advocacy, social activities and intergenerational programmes for African and Caribbean elders.",
    link: "https://www.facebook.com/LeedsBlackElders", black_led: true },

  /* ─── WEST MIDLANDS (Birmingham, Wolverhampton, Coventry) ─ */
  { chapter: "mind", regions: ["west_mids"], city: "Sandwell, West Bromwich, West Birmingham", postcodes: ["B","WV","DY","WS"],
    name: "Sandwell African Caribbean Mental Health Foundation (SACMHF)", note: "Operating since 1994 from the Kuumba Centre. Culturally responsive mental-health services for Black communities in Sandwell & West Birmingham.",
    link: "https://www.sacmhf.co.uk", phone: "0121 525 1629", black_led: true },
  { chapter: "mind", regions: ["west_mids"], city: "Birmingham",
    name: "The Living Well Consortium", note: "Free NHS Talking Therapies for adults in Birmingham & Solihull. Self-referral, with culturally aware therapists.",
    link: "https://livingwelluk.com", phone: "0121 663 1217" },
  { chapter: "body", regions: ["west_mids"], city: "Birmingham (Newtown)",
    name: "ACCI Health (African Caribbean Community Initiative)", note: "Wolverhampton-based health and wellbeing charity for African Caribbean and Black communities.",
    link: "https://www.acci.org.uk", phone: "01902 571 230", black_led: true },
  { chapter: "brotherhood", regions: ["west_mids"], city: "Birmingham (Handsworth, Lozells)",
    name: "Legacy Centre of Excellence", note: "Birmingham-based hub for African and Caribbean culture, brotherhood events, fitness, business workshops.",
    link: "https://www.legacycentreofexcellence.com", black_led: true },
  { chapter: "community", regions: ["west_mids"], city: "Birmingham",
    name: "Birmingham African & Caribbean People's Movement", note: "Advocacy and community organising for Black Brummies. Forums on policing, education, health.",
    link: "https://www.facebook.com/BACPMovement", black_led: true },
  { chapter: "spirit", regions: ["west_mids"], city: "Birmingham",
    name: "New Testament Church of God (NTCG) UK", note: "One of the largest Black Majority Church networks in the UK. Pastoral care and men's fellowships in Birmingham, Handsworth, etc.",
    link: "https://ntcg.org.uk", black_led: true },

  /* ─── SOUTH WEST (Bristol) ─────────────────────────────── */
  { chapter: "mind", regions: ["south_west"], city: "Bristol", postcodes: ["BS"],
    name: "Nilaari", note: "Bristol-based Black and minority ethnic-led therapy, counselling and wellbeing service. Sliding-scale fees.",
    link: "https://nilaari.co.uk", phone: "0117 952 5742", black_led: true },
  { chapter: "body", regions: ["south_west"], city: "Bristol",
    name: "The Black & Green Project", note: "Bristol initiative supporting BME engagement with environment, food, allotments, men's mental wellbeing through nature.",
    link: "https://www.blackandgreenproject.org.uk", black_led: true },
  { chapter: "community", regions: ["south_west"], city: "Bristol (St Pauls)",
    name: "St Pauls Learning Centre", note: "Community hub in Bristol's historically Black neighbourhood. Adult learning, family support, men's groups.",
    link: "https://www.stpaulslearning.org.uk" },
  { chapter: "spirit", regions: ["south_west"], city: "Bristol",
    name: "Malcolm X Community Centre", note: "St Pauls cultural and community space. Heritage events, youth work, Black history programmes.",
    link: "https://www.malcolmxcentre.org.uk", black_led: true },

  /* ─── NORTH EAST (Newcastle, Sunderland, Middlesbrough) ── */
  { chapter: "mind", regions: ["north_east"], city: "Newcastle upon Tyne", postcodes: ["NE"],
    name: "Connected Voice Haref", note: "Newcastle-based BME mental-health advocacy and partnership. Information, support and culturally appropriate services.",
    link: "https://www.connectedvoice.org.uk/services/haref", phone: "0191 235 7012" },
  { chapter: "community", regions: ["north_east"], city: "Newcastle, Middlesbrough",
    name: "North East Africa Caribbean Foundation", note: "Cultural and community programmes for African and Caribbean families across the North East.",
    link: "https://www.facebook.com/NEACFoundation", black_led: true },
  { chapter: "brotherhood", regions: ["north_east"], city: "Newcastle",
    name: "Angelou Centre", note: "Black-led women's centre with linked men's wellbeing groups and family advocacy across the North East.",
    link: "https://angelou-centre.org.uk", phone: "0191 226 0394", black_led: true },

  /* ─── EAST MIDLANDS (Nottingham, Leicester, Derby) ───── */
  { chapter: "mind", regions: ["east_mids"], city: "Nottingham", postcodes: ["NG"],
    name: "Nottingham Counselling Service", note: "Low-cost counselling in Nottingham with culturally informed practitioners. Self-referral.",
    link: "https://www.nottinghamcounsellingservice.org.uk", phone: "0115 950 1743" },
  { chapter: "mind", regions: ["east_mids"], city: "Leicester", postcodes: ["LE"],
    name: "The Race Equality Centre", note: "Leicester-based equality and wellbeing charity. Culturally appropriate mental-health peer support, community-led programmes.",
    link: "https://www.theraceequalitycentre.org.uk", phone: "0116 299 3456" },
  { chapter: "community", regions: ["east_mids"], city: "Nottingham (Hyson Green)",
    name: "ACNA Centre", note: "African Caribbean National Artistic Centre. Brotherhood meetings, elders' lunches, Black history events.",
    link: "https://acnacentre.com", black_led: true },
  { chapter: "brotherhood", regions: ["east_mids"], city: "Nottingham",
    name: "Pythian Club", note: "Nottingham-based youth and men's mentoring tackling violence, brotherhood, mental health.",
    link: "https://www.thepythianclub.com", black_led: true },

  /* ─── WALES ───────────────────────────────────────────── */
  { chapter: "mind", regions: ["wales"], city: "Cardiff, Newport, Swansea", postcodes: ["CF","NP","SA"],
    name: "EYST Wales", note: "Ethnic Youth Support Team. Wellbeing, mentoring and advocacy for Black & ethnic-minority young men across Wales.",
    link: "https://eyst.org.uk", phone: "029 2046 6235" },
  { chapter: "community", regions: ["wales"], city: "Cardiff (Butetown, Tiger Bay)",
    name: "Race Council Cymru", note: "All-Wales charity supporting Black, Asian and minority-ethnic communities. Heritage, history, advocacy.",
    link: "https://racecouncilcymru.org.uk", black_led: true },
  { chapter: "spirit", regions: ["wales"], city: "Cardiff",
    name: "Butetown History & Arts Centre", note: "Documents and celebrates the heritage of Cardiff's historic multi-ethnic Tiger Bay community.",
    link: "https://www.bhac.org" },

  /* ─── SCOTLAND ─────────────────────────────────────────── */
  { chapter: "mind", regions: ["scotland"], city: "Glasgow, Edinburgh, UK-wide", postcodes: ["G","EH"],
    name: "BEMIS Scotland", note: "Empowering Scotland's ethnic and cultural minority communities. Mental-health, advocacy and policy work across Scotland.",
    link: "https://bemis.org.uk", phone: "0141 548 8047" },
  { chapter: "mind", regions: ["scotland"], city: "Edinburgh",
    name: "Saheliya", note: "Edinburgh-based BME-led mental-health and wellbeing organisation. Has begun extending men's services.",
    link: "https://www.saheliya.co.uk", phone: "0131 556 9302", black_led: true },
  { chapter: "community", regions: ["scotland"], city: "Glasgow",
    name: "African Challenge Scotland", note: "African-led charity supporting integration, men's groups, sport and family support in Glasgow.",
    link: "https://www.africanchallenge.scot", black_led: true },
  { chapter: "community", regions: ["scotland"], city: "Edinburgh",
    name: "Edinburgh & Lothians Regional Equality Council (ELREC)", note: "Race equality, community cohesion and BME advocacy across Edinburgh and the Lothians.",
    link: "https://www.elrec.org.uk", phone: "0131 556 0441" },

  /* ─── NORTHERN IRELAND ───────────────────────────────── */
  { chapter: "community", regions: ["ni"], city: "Belfast", postcodes: ["BT"],
    name: "African and Caribbean Support Organisation NI (ACSONI)", note: "Belfast-based, supporting African and Caribbean communities in NI. Wellbeing, advocacy, family support.",
    link: "https://www.acsoni.org", phone: "028 9023 8645", black_led: true },
  { chapter: "mind", regions: ["ni"], city: "Belfast",
    name: "Inspire Wellbeing NI", note: "All-Ireland mental-health charity. Free helpline and counselling; growing intercultural programme.",
    link: "https://www.inspirewellbeing.org", phone: "0808 800 0002" },

  /* ─── SOUTH EAST (Brighton, Oxford, Kent, etc) ──────── */
  { chapter: "mind", regions: ["south_east"], city: "Brighton & Hove", postcodes: ["BN"],
    name: "MindOut", note: "LGBTQ-led mental-health service in Brighton, with specific support for Black LGBTQ men.",
    link: "https://mindout.org.uk", phone: "01273 234 839" },
  { chapter: "community", regions: ["south_east"], city: "Oxford", postcodes: ["OX"],
    name: "Oxford African & Caribbean Association", note: "Heritage, mentoring, community events and men's wellbeing programmes across Oxfordshire.",
    link: "https://www.facebook.com/OxfordACA", black_led: true },
  { chapter: "brotherhood", regions: ["south_east"], city: "Reading, Slough, Milton Keynes",
    name: "Thames Valley Black Men's Network", note: "Quarterly meet-ups, brotherhood circles and mentoring across Berkshire, Buckinghamshire and Hampshire.",
    link: "https://www.facebook.com/TVBMN", black_led: true },

  /* ─── EAST OF ENGLAND ───────────────────────────────── */
  { chapter: "community", regions: ["east"], city: "Cambridge, Peterborough", postcodes: ["CB","PE"],
    name: "African Caribbean Cambridgeshire", note: "Cultural events, mentoring and family support; growing men's wellbeing network across Cambridgeshire.",
    link: "https://www.facebook.com/AfricanCaribbeanCambs", black_led: true },
  { chapter: "mind", regions: ["east"], city: "Luton", postcodes: ["LU"],
    name: "Bedfordshire & Luton African Community", note: "African and Caribbean wellbeing, advocacy and youth work in Luton, Bedford and South Beds.",
    link: "https://www.facebook.com/BLACommunity", black_led: true },

  /* ─── NATIONAL / UK-WIDE (extra to data.js) ──────────── */
  { chapter: "mind", regions: ["national"], city: "UK-wide (find a local Mind)",
    name: "Mind &mdash; Young Black Men programme", note: "Mind's specific programme working with Black men 11-30 across the UK. Tailored local services.",
    link: "https://www.mind.org.uk/about-us/our-policy-work/equality-and-human-rights/young-black-men", phone: "0300 123 3393" },
  { chapter: "mind", regions: ["national"], city: "UK-wide",
    name: "Bayo", note: "A space to find Black-led collectives, organisations and services from across the UK. Built by Mind.",
    link: "https://www.bayocollective.com" },
  { chapter: "mind", regions: ["national"], city: "UK-wide (online)",
    name: "Black Mind UK", note: "Black mental-health information, signposting and online community.",
    link: "https://www.blackmind.co.uk", black_led: true },
  { chapter: "brotherhood", regions: ["national"], city: "UK-wide (online groups)",
    name: "HUMEN Space", note: "Free, anonymous in-person groups for men across the UK plus an online HUMEN Space. No booking, just turn up.",
    link: "https://www.wearehumen.org" },
  { chapter: "brotherhood", regions: ["national"], city: "UK-wide",
    name: "MANUP?", note: "Men talking to men about mental health. Workshops, talks, community building. Registered charity.",
    link: "https://manup.how" },
  { chapter: "brotherhood", regions: ["national"], city: "UK-wide",
    name: "Talk Club", note: "Talking-and-listening clubs for men, with a simple 'how are you out of 10?' check-in. 100+ UK groups.",
    link: "https://talkclub.org" },
  { chapter: "brotherhood", regions: ["national"], city: "UK-wide",
    name: "Movember", note: "Men's health charity covering mental health, suicide prevention, prostate and testicular cancer. Local events and resources.",
    link: "https://uk.movember.com" },
  { chapter: "brotherhood", regions: ["national"], city: "UK-wide",
    name: "BoysBeing", note: "Community for boys and men exploring healthy masculinity, mental health and identity. Strong Black-male contribution.",
    link: "https://www.boysbeing.com" },
  { chapter: "body", regions: ["national"], city: "UK-wide",
    name: "Black Men's Health Alliance", note: "UK-wide network championing Black men's physical and mental wellbeing. Information, events, advocacy.",
    link: "https://www.bmhalliance.org", black_led: true },
  { chapter: "body", regions: ["national"], city: "UK-wide",
    name: "Sickle Cell Society", note: "Support and advocacy for people living with sickle-cell disorder &mdash; a condition disproportionately affecting Black communities.",
    link: "https://www.sicklecellsociety.org", phone: "020 8961 7795" },
  { chapter: "body", regions: ["national"], city: "UK-wide",
    name: "Race Equality Foundation", note: "National charity working to tackle racial inequalities in health, housing, social care and education.",
    link: "https://raceequalityfoundation.org.uk" },
  { chapter: "body", regions: ["national"], city: "UK-wide",
    name: "Sangu Delle / Black Health Foundation", note: "Black-led health information hub; campaigns on prostate, heart and metabolic health for Black men.",
    link: "https://blackhealthuk.org", black_led: true },
  { chapter: "money", regions: ["national"], city: "UK-wide",
    name: "Wealthify by Black Wealth Matters", note: "Black-led financial-literacy and investment community. Free guides, mentoring, events.",
    link: "https://www.blackwealthmatters.co.uk", black_led: true },
  { chapter: "money", regions: ["national"], city: "UK-wide",
    name: "Foundervine", note: "Programmes for Black and underrepresented founders. Bootcamps, accelerator, free advice clinics.",
    link: "https://www.foundervine.com", black_led: true },
  { chapter: "spirit", regions: ["national"], city: "UK-wide",
    name: "Premier Christianity &mdash; UK Black Church directory", note: "Find your nearest Black Majority Church across the UK, searchable by area or denomination.",
    link: "https://www.premierchristianity.com" },
  { chapter: "spirit", regions: ["national"], city: "UK-wide",
    name: "Muslim Youth Helpline", note: "Confidential, faith-and-culture-sensitive emotional support for young Muslim men. Free.",
    link: "https://myh.org.uk", phone: "0808 808 2008" },
  { chapter: "spirit", regions: ["national"], city: "UK-wide",
    name: "Hidayah LGBTQ+ Muslims", note: "Spiritual and pastoral support for LGBTQ+ Muslim men, an underserved group.",
    link: "https://www.hidayahlgbt.com" },
  { chapter: "community", regions: ["national"], city: "UK-wide",
    name: "Black Equity Organisation", note: "UK-wide civil-rights organisation for Black Britons. Policy, legal advocacy, community organising.",
    link: "https://blackequityorg.com", black_led: true },
  { chapter: "community", regions: ["national"], city: "UK-wide",
    name: "Power The Fight", note: "Tackling youth violence through faith and community. UK-wide training, advocacy, family support.",
    link: "https://www.powerthefight.org.uk", black_led: true },
  { chapter: "community", regions: ["national"], city: "UK-wide",
    name: "Black Cultural Foundation Trust", note: "National charity preserving Black British history and supporting community heritage projects.",
    link: "https://blackculturalarchives.org", black_led: true },
  { chapter: "community", regions: ["national"], city: "UK-wide",
    name: "Locality", note: "UK network of community organisations. Asset-transfer support if you want to save or run a local space.",
    link: "https://locality.org.uk" },
  { chapter: "community", regions: ["national"], city: "UK-wide",
    name: "Reach Society", note: "UK-wide network training Black men as role models. Mentoring and career events.",
    link: "https://reachsociety.com", black_led: true },
  { chapter: "community", regions: ["national"], city: "UK-wide",
    name: "The Patchwork Foundation", note: "Free Masterclass for 18-30s from underrepresented backgrounds, in politics and civil society.",
    link: "https://patchworkfoundation.org.uk" },
];
