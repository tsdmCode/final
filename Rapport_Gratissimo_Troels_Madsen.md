#                                                                                                     								Svendeprøve

##                        Troels Madsen
##                        h1we080125  
##                        brugernavn: info@webudvikler.dk
##                        password: password


### Vurdering af egen indsats
Jeg startede ugen ud med at kigge API'et igennem samt figma og læse opgavebeskrivelsen. Jeg besluttede mig rimelig hurtigt for at lave pagination som min valgopgave, da jeg allerede havde nogle komponenter fra den før. Fik også hurtigt sat både mine types op samt defineret nogle SCSS variables baseret på hvad jeg kunne se inde på figma. Jeg generede mit projekt samt de forskellige pages og lignende jeg ville komme til at skulle bruge. Dernæst satte jeg mig til at lave både min nav og min footer.

En af mine klare problemer i denne her proces her været min mangler motivation. Har haft en del problemer med det de sidste par måneder, men regnede med at det ville aftage når det nu gjaldt for alvor. Som resultat har min arbejdsproces været lidt hist of her, hvor jeg har kodet når jeg nu kunne tage mig sammen til det. En af de ting jeg især kløjs ved, var når jeg skulle lave store lange former med mange inputs der skulle valideres o.l. Havde også et problem i mine annoncelister hvor jeg var meget sur over debuggingprocessen, indtil det slog mig at jeg havde glemt at sætte en "Content-Type" header på. Andre ting såsom implementering af searchParams gik rimelig fint.
\

### Argumentation for valg
I forhold til designet har jeg ændret på et par ting. Har for eksempel fravalgt at sætte et link til at logge ud i headeren på "Min Side", da jeg føler det er nok for brugeren med den logout der er oppe i navbar'en. Det er fint nok at have et lille banner med et call to action der leder brugeren ind i vores registreringsflow, men synes ikke vi skal opmuntre dem til at logge ud! Har også endt med at skulle tage nogle indgreb på backenden, da jeg ikke havde lyst til lade brugeren konstant gennemfiltrere joblistings for at konstruere kategorier med jobantal på forsiden. Apropos backend har jeg også fravalgt cookies, og har istedet brugt local/sessionStorage. Jeg ved godt det ikke er særlig smart sikkerhedsmæssigt. XSS og CSRF angreb er et problem, men jeg vil argumentere for at det ikke er så vigtigt igen nu hvor vi ikke rigtig ligger inde med ting som betalingsinfo eller CPR-numre. Vi har heller ikke password i userData. Jeg vil også argumentere, at det som frontender ikke er mit problem at sætte cookies op, det skulle have været gjort af Backendmanden da han satte den op.

