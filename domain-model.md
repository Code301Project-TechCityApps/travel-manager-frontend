
# Entities:
1. **User**: Represents a person using the app.
   - Attributes: Username, Email, Password, Profile Picture

2. **Trip**: Represents a journey or travel experience undertaken by a user.
   - Attributes: TripID, User (foreign key), Destination, Start Date, End Date, Budget

3. **Language**: Represents a language supported by the app for translation.
   - Attributes: LanguageID, Name, Code

4. **Translation**: Represents a translation between languages.
   - Attributes: TranslationID, Source Language (foreign key), Target Language (foreign key), Source Text, Translated Text

5. **Location**: Represents a geographical location.
   - Attributes: LocationID, Name, Latitude, Longitude

6. **Lodging**: Represents accommodation options available at a location.
   - Attributes: LodgingID, Location (foreign key), Name, Description, Price, Rating

7. **Currency**: Represents a currency used in different countries.
   - Attributes: CurrencyID, Code, Name, Symbol

8. **ExchangeRate**: Represents exchange rates between currencies.
   - Attributes: ExchangeRateID, Source Currency (foreign key), Target Currency (foreign key), Rate

9. **Transportation**: Represents transportation options available at a location.
   - Attributes: TransportationID, Mode (e.g., Bus, Train), Departure Location, Arrival Location, Departure Time, Arrival Time, Price

10. **Event**: Represents events or nightlife activities at a location.
    - Attributes: EventID, Name, Location (foreign key), Date, Time, Description

11. **Photo**: Represents photos uploaded by users during their travels.
    - Attributes: PhotoID, User (foreign key), Trip (foreign key), Location (foreign key), Image, Caption, Timestamp

12. **JournalEntry**: Represents journal entries created by users during their travels.
    - Attributes: EntryID, User (foreign key), Trip (foreign key), Title, Content, Timestamp

# Relationships:
- A User can have multiple Trips.
- A Trip can have multiple Translations, Lodgings, Transportations, Events, Photos, and Journal Entries.
- A Language can have multiple Translations.
- A Location can have multiple Lodgings, Transportations, Events, Photos, and Journal Entries.
- A Currency can have multiple Exchange Rates.
- A Transportation can have multiple Departure and Arrival Locations.
- A User can upload multiple Photos and create multiple Journal Entries.
- Users can view other users' Photos at the end of their travels.

This domain model outlines the main entities and relationships within the app, providing a structured foundation for its development.