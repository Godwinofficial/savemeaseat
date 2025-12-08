# Wedding Event Form - Documentation

## Overview
A comprehensive form to collect all wedding event details with image uploads and interactive map location selection.


### ✅ Enhanced Features

#### 1. **Image Uploads Only**
All images now require file uploads from device:
- Slider images
- Couple photos (bride & groom)
- Wedding party photos (bridesmaids & groomsmen)
- Gallery images
- RSVP background image

#### 2. **Interactive Map Location Picker**
Replaced manual Google Maps URL input with an interactive map:

**Features:**
- **Search by Location**: Type location name in search box and press Enter
- **Map Search Control**: Use the search icon on the map
- **Click to Place**: Click anywhere on the map to set location
- **Auto-Reverse Geocoding**: Clicking on map automatically gets place name
- **Visual Marker**: Red marker shows selected location
- **Stored Data**: Captures latitude, longitude, and place name

**How to Use:**
1. Type venue location in "Search Location" field
2. Press Enter or use map search control
3. OR click directly on the map
4. Marker will appear at selected location
5. Location data is automatically saved

## Form Sections

1. **Basic Information**: Event title, logo, date, location
2. **Color Theme**: Primary, secondary, accent colors
3. **Hero Slider**: Multiple slides with images and text
4. **Countdown**: Customizable countdown title
5. **Couple Information**: Names, photos, descriptions
6. **Love Story**: Three text sections for story
7. **Wedding Party**: Bridesmaids and groomsmen details
8. **Venue Information**: Name, description, address, times, parking, transport
9. **Map Location**: Interactive map with search
10. **Wedding Details**: Dress code, accommodations
11. **Gallery**: Multiple photo uploads
12. **RSVP Settings**: Title, subtitle, background image
13. **Footer**: Logo, text, date & location

## Technical Details

### Libraries Used
- **Leaflet.js**: Interactive map display
- **Leaflet Control Geocoder**: Location search and geocoding
- **OpenStreetMap**: Map tiles

### Data Output
Form outputs JSON with:
- All text fields
- Image file names (actual files need backend handling)
- Map coordinates (latitude, longitude)
- Place name from map selection

### File Structure
```
add-wedding-event.html        - Main form HTML
add-wedding-event-styles.css  - Styling
add-wedding-event-script.js   - JavaScript functionality
```

## Next Steps for Backend Integration

1. **File Upload Handling**: Process uploaded images on server
2. **Database Storage**: Store form data and file paths
3. **Image Processing**: Resize/optimize uploaded images
4. **Map Integration**: Use stored coordinates to generate embed URLs
5. **Validation**: Server-side validation of all inputs

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Internet connection needed for map functionality
