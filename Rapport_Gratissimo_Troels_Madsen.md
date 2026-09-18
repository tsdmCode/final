#                                                                                                     								Svendeprøve

##                        Troels Madsen
##                        h1we080125  
##                        brugernavn: info@webudvikler.dk
##                        password: password


### Vurdering af egen indsats
Jeg startede ugen ud med at kigge API'et igennem samt figma og læse opgavebeskrivelsen. Jeg besluttede mig rimelig hurtigt for at lave pagination som min valgopgave, da jeg allerede havde noget komponenter en tidligere opgave. Fik også hurtigt sat både mine types op samt defineret nogle SCSS variables baseret på hvad jeg kunne se inde på figma. Jeg generede mit projekt samt de forskellige pages og lignende jeg ville komme til at skulle bruge. Dernæst satte jeg mig til at lave både min nav og min footer.

En af mine klare problemer i denne her proces her været min mangler motivation. Har haft en del problemer med det de sidste par måneder, men regnede med at det ville aftage når det nu gjaldt for alvor. Som resultat har min arbejdsproces været lidt hist of her, hvor jeg har kodet når jeg nu kunne tage mig sammen til det. En af de ting jeg især kløjs ved, var når jeg skulle lave store lange former med mange inputs der skulle valideres o.l. Havde også et problem i mine annoncelister hvor jeg var meget sur over debuggingprocessen, indtil det slog mig at jeg havde glemt at sætte en "Content-Type" header på. Andre ting såsom implementering af searchParams gik rimelig fint.
Da jeg har gjort et par ændringer, skal i bruge min version af backenden. Den er inkluderet i besvarelsen som et repo for sig. Ellers virker min side altså ikke.
\

### Argumentation for valg
I forhold til designet har jeg ændret på et par ting. Har for eksempel fravalgt at sætte et link til at logge ud i headeren på "Min Side", da jeg føler det er nok for brugeren med den logout der er oppe i navbar'en. Det er fint nok at have et lille banner med et call to action der leder brugeren ind i vores registreringsflow, men synes ikke vi skal opmuntre dem til at logge ud! Har også endt med at skulle tage nogle indgreb på backenden, da jeg ikke havde lyst til lade brugeren konstant gennemfiltrere joblistings for at konstruere kategorier med jobantal på forsiden. Apropos backend har jeg også fravalgt cookies, og har istedet brugt local/sessionStorage. Jeg ved godt det ikke er særlig smart sikkerhedsmæssigt. XSS og CSRF angreb er et problem, men jeg vil argumentere for at det ikke er så vigtigt igen nu hvor vi ikke rigtig ligger inde med ting som betalingsinfo eller CPR-numre. Vi har heller ikke password i userData. Jeg vil også argumentere, at det som frontender ikke er mit problem at sætte cookies op, det skulle have været gjort af Backendmanden da han satte den op. Jeg har også taget nogle beslutninger i forhold til mobilvisning, der egentlig mest går ud på at jeg har stacket ting i columns i stedet. Jeg brød også med designet under min valgfrie opgave.

### Valg af tilvalgsopgave og fremgangsmetode
Som nævnt valgte jeg at tage pagination, da det virkede ret overkommeligt ift. at jeg allerede havde noget kode jeg kunne genbruge. Den måde jeg løste det på, var at først tackle den nemme af den, som var at lave pagination på søgeresultaterne. Det blev lidt mere grelt da jeg skulle lave minside, da det blev lidt inviklet med at jonglere to forskellige datasets der skulle conditionally renderes. Som nævnt ovenfor brød jeg med designet. Det er svært at få plads til alle de knapper når man kun må have 5 af gangen, og man har enormt mange annoncer. Derfor kunne jeg se to eller tre muligheder: Enten lave sådan en hvor man kun kan se de 3 sider man er tættest på, samt de 3 sidste hvis man får for mange. Alternativt kunne man også give brugeren et input der kunne navigere til en side de indtaster. Jeg valgte umiddelbart den kedeligste, men også meget hurtige løsning: Implementerede bare et element der fortæller brugeren hvilken side de er på og hvor mange der er.

### Redegørelse for kodestumper.
Der er sådan lidt af hvert.
Min Authcontext og min useFetch har jeg fået fra en lærer for mange måneder siden, og har genbrugt den i utallige projekter. \
Min shuffleArray function som jeg bruge til at hive tilfældige artikler ud, fandt jeg inde på [Stackoverflow](https://medium.com/web-dev-survey-from-kyoto/the-visually-hidden-technique-303f8e2bd409).\
Har lånt en af mine Regexes (Email) fra [Regexr](regexr.com). \
Min HiddenHeader blev jeg inspireret til at lave af dette [https://medium.com/web-dev-survey-from-kyoto/the-visually-hidden-technique-303f8e2bd409](https://medium.com/web-dev-survey-from-kyoto/the-visually-hidden-technique-303f8e2bd409). \
Meget af det jeg ved om searchParams og pagination kommer fra [Scrimba](https://scrimba.com/) og [Contentful](https://www.contentful.com/blog/react-pagination/). \

### Bedømmelse
Til min eksamen vil jeg gerne snakke om Regexes, hvordan de virker og lignende. 
Kommer også til at snakke om searchParams, samt mit bash script.

### Bilag
Min tidsplan har været sådan meget løs, da jeg som nævnt har været let all over the place i den her uge, men har en let skitseret plan. \
Har også et [Kanban board](https://github.com/users/tsdmCode/projects/4) med nogle issues. \

- Mandag: Kig hele projektet igennem, API, backend, læg alt grundlæggende arbejde såsom types, variables der kan bruges og sådan. Plus lav de to faste elementer Nav og Footer.
- Tirsdag til Torsdag: Arbejd støt på projektet, prøv at få et par sider om dagen færdig og have det hele klart til om fredagen så den bare kan gå med at finpudse lidt.
- Fredag som sagt: finpudsning og færdiggørelse af rapport.
