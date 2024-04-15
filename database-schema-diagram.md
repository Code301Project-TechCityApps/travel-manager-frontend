# Database Schema Diagram

```
User
-----
- UserID (Primary Key)
- Username (String, Required)
- Email (String, Required)
- Password (String, Required)
- ProfilePicture (String)

Trip
-----
- TripID (Primary Key)
- UserID (Foreign Key)
- Destination (String, Required)
- StartDate (Date, Required)
- EndDate (Date, Required)
- Budget (Number, Required)

Language
-----
- LanguageID (Primary Key)
- Name (String, Required)
- Code (String, Required)

Translation
-----
- TranslationID (Primary Key)
- SourceLanguageID (Foreign Key)
- TargetLanguageID (Foreign Key)
- SourceText (String, Required)
- TranslatedText (String, Required)

Location
-----
- LocationID (Primary Key)
- Name (String, Required)
- Latitude (Number, Required)
- Longitude (Number, Required)

Lodging
-----
- LodgingID (Primary Key)
- LocationID (Foreign Key)
- Name (String, Required)
- Description (String)
- Price (Number, Required)
- Rating (Number)

Currency
-----
- CurrencyID (Primary Key)
- Code (String, Required)
- Name (String, Required)
- Symbol (String)

ExchangeRate
-----
- ExchangeRateID (Primary Key)
- SourceCurrencyID (Foreign Key)
- TargetCurrencyID (Foreign Key)
- Rate (Number, Required)

Transportation
-----
- TransportationID (Primary Key)
- Mode (String, Required)
- DepartureLocationID (Foreign Key)
- ArrivalLocationID (Foreign Key)
- DepartureTime (DateTime, Required)
- ArrivalTime (DateTime, Required)
- Price (Number, Required)

Event
-----
- EventID (Primary Key)
- Name (String, Required)
- LocationID (Foreign Key)
- Date (Date, Required)
- Time (Time, Required)
- Description (String)

Photo
-----
- PhotoID (Primary Key)
- UserID (Foreign Key)
- TripID (Foreign Key)
- LocationID (Foreign Key)
- Image (String, Required)
- Caption (String)
- Timestamp (DateTime, Required)

JournalEntry
-----
- EntryID (Primary Key)
- UserID (Foreign Key)
- TripID (Foreign Key)
- Title (String, Required)
- Content (String, Required)
- Timestamp (DateTime, Required)
```

# Explanation:

- **User**: Stores information about users who use the app.
- **Trip**: Records details of trips taken by users.
- **Language**: Contains supported languages for translation.
- **Translation**: Stores translations between languages.
- **Location**: Represents geographical locations.
- **Lodging**: Contains information about lodging options.
- **Currency**: Stores details of currencies used.
- **ExchangeRate**: Stores exchange rates between currencies.
- **Transportation**: Records transportation options.
- **Event**: Contains details of events and nightlife activities.
- **Photo**: Stores photos uploaded by users during their travels.
- **JournalEntry**: Contains journal entries created by users during their travels.

# Relationships:
- One User can have multiple Trips, Photos, and Journal Entries.
- One Trip can have multiple Translations, Lodgings, Transportations, Events, Photos, and Journal Entries.
- One Language can have multiple Translations.
- One Location can have multiple Lodgings, Transportations, Events, Photos, and Journal Entries.
- One Currency can have multiple Exchange Rates.
- One Transportation can have multiple Departure and Arrival Locations.
