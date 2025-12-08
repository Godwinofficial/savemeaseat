// Counter for dynamic items
let slideCounter = 0;
let bridesmaidCounter = 0;
let groomsmanCounter = 0;
let galleryCounter = 0;

// API endpoint (set to your backend URL)

const API_URL = "http://localhost:8000";
// const API_URL = "https://savemeaseat-backend.onrender.com";
// Map variables
let map;
let marker;
let autocomplete;
let geocoder;

// Fetch event types from the backend
async function fetchEventTypes() {
    try {
        const response = await fetch(`${API_URL}/api/event-types/`);
        if (!response.ok) {
            throw new Error('Failed to fetch event types');
        }
        const eventTypes = await response.json();
        
        const eventTypeSelect = document.getElementById('eventType');
        if (eventTypeSelect) {
            // Clear existing options except the first one (the placeholder)
            while (eventTypeSelect.options.length > 1) {
                eventTypeSelect.remove(1);
            }
            
            // Add new options
            eventTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.name;
                eventTypeSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error fetching event types:', error);
        // Fallback to a default option if the API call fails
        const eventTypeSelect = document.getElementById('eventType');
        if (eventTypeSelect) {
            const option = document.createElement('option');
            option.value = '1'; // Default to wedding
            option.textContent = 'Wedding';
            eventTypeSelect.appendChild(option);
        }
    }
}

// Initialize form on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add initial items
    addSlide();
    addBridesmaid();
    addGroomsman();
    addGalleryImage();
    
    // Setup color picker sync
    setupColorPickers();
    
    // Setup form submission
    setupFormSubmission();
    
    // Initialize map
    initializeMap();
    
    // Setup map method toggle
    setupMapMethodToggle();
    
    // Setup Google Maps embed preview
    setupEmbedPreview();
    
    // Fetch event types
    fetchEventTypes();
});

// Color picker sync with text input
function setupColorPickers() {
    document.querySelectorAll('input[type="color"]').forEach(colorInput => {
        const textInput = colorInput.nextElementSibling;
        
        colorInput.addEventListener('input', function() {
            textInput.value = this.value;
        });
    });
}

// Add Slide
function addSlide() {
    const container = document.getElementById('sliderImagesContainer');
    const index = slideCounter++;
    
    const slideHTML = `
        <div class="repeater-item" data-index="${index}">
            <div class="repeater-header">
                <span class="repeater-title">Slide ${index + 1}</span>
                <button type="button" class="btn btn-danger" onclick="removeItem(this)">Remove</button>
            </div>
            <div class="form-group">
                <label>Slide Image <span class="required">*</span></label>
                <input type="file" name="sliderImages[${index}][imageFile]" class="form-control" accept="image/*" required>
            </div>
            <div class="form-group">
                <label>Slide Title <span class="required">*</span></label>
                <input type="text" name="sliderImages[${index}][title]" class="form-control" placeholder="e.g., Sophia & Alexander" required>
            </div>
            <div class="form-group">
                <label>Slide Subtitle</label>
                <input type="text" name="sliderImages[${index}][subtitle]" class="form-control" placeholder="e.g., We are getting married">
            </div>
            <div class="form-group">
                <label>Slide Date Text</label>
                <input type="text" name="sliderImages[${index}][dateText]" class="form-control" placeholder="e.g., October 14, 2023 • New York">
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', slideHTML);
}

// Add Bridesmaid
function addBridesmaid() {
    const container = document.getElementById('bridesmaidsContainer');
    const index = bridesmaidCounter++;
    
    const bridesmaidHTML = `
        <div class="repeater-item" data-index="${index}">
            <div class="repeater-header">
                <span class="repeater-title">Bridesmaid ${index + 1}</span>
                <button type="button" class="btn btn-danger" onclick="removeItem(this)">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Name <span class="required">*</span></label>
                    <input type="text" name="bridesmaids[${index}][name]" class="form-control" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <label>Role <span class="required">*</span></label>
                    <input type="text" name="bridesmaids[${index}][role]" class="form-control" placeholder="e.g., Maid of Honor" required>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" name="bridesmaids[${index}][description]" class="form-control" placeholder="e.g., Sister and best friend since childhood">
            </div>
            <div class="form-group">
                <label>Image <span class="required">*</span></label>
                <input type="file" name="bridesmaids[${index}][imageFile]" class="form-control" accept="image/*" required>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', bridesmaidHTML);
}

// Add Groomsman
function addGroomsman() {
    const container = document.getElementById('groomsmenContainer');
    const index = groomsmanCounter++;
    
    const groomsmanHTML = `
        <div class="repeater-item" data-index="${index}">
            <div class="repeater-header">
                <span class="repeater-title">Groomsman ${index + 1}</span>
                <button type="button" class="btn btn-danger" onclick="removeItem(this)">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Name <span class="required">*</span></label>
                    <input type="text" name="groomsmen[${index}][name]" class="form-control" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <label>Role <span class="required">*</span></label>
                    <input type="text" name="groomsmen[${index}][role]" class="form-control" placeholder="e.g., Best Man" required>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" name="groomsmen[${index}][description]" class="form-control" placeholder="e.g., Childhood friend and college roommate">
            </div>
            <div class="form-group">
                <label>Image <span class="required">*</span></label>
                <input type="file" name="groomsmen[${index}][imageFile]" class="form-control" accept="image/*" required>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', groomsmanHTML);
}

// Add Gallery Image
function addGalleryImage() {
    const container = document.getElementById('galleryImagesContainer');
    const index = galleryCounter++;
    
    const galleryHTML = `
        <div class="repeater-item" data-index="${index}">
            <div class="repeater-header">
                <span class="repeater-title">Gallery Image ${index + 1}</span>
                <button type="button" class="btn btn-danger" onclick="removeItem(this)">Remove</button>
            </div>
            <div class="form-group">
                <label>Image <span class="required">*</span></label>
                <input type="file" name="galleryImages[${index}][imageFile]" class="form-control" accept="image/*" required>
            </div>
            <div class="form-group">
                <label>Alt Text</label>
                <input type="text" name="galleryImages[${index}][altText]" class="form-control" placeholder="e.g., Couple photo 1">
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', galleryHTML);
}

// Remove item
function removeItem(button) {
    const item = button.closest('.repeater-item');
    if (item) {
        // Check if it's the last item in the container
        const container = item.parentElement;
        const items = container.querySelectorAll('.repeater-item');
        
        if (items.length > 1) {
            item.remove();
        } else {
            alert('You must have at least one item.');
        }
    }
}

// Initialize Map with Search
function initializeMap() {
    // Initialize map centered on Zambia (Lusaka)
    map = L.map('map').setView([-15.4167, 28.2833], 6); // Default: Lusaka, Zambia
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Initialize geocoder
    const geocoder = L.Control.Geocoder.nominatim();
    
    // Add search control to map
    const searchControl = L.Control.geocoder({
        geocoder: geocoder,
        defaultMarkGeocode: false
    }).on('markgeocode', function(e) {
        const latlng = e.geocode.center;
        
        // Remove existing marker if any
        if (marker) {
            map.removeLayer(marker);
        }
        
        // Add new marker
        marker = L.marker(latlng).addTo(map);
        map.setView(latlng, 16);
        
        // Update hidden fields
        document.getElementById('map_latitude').value = latlng.lat;
        document.getElementById('map_longitude').value = latlng.lng;
        document.getElementById('map_place_name').value = e.geocode.name;
        
        // Update search input
        document.getElementById('location_search').value = e.geocode.name;
    }).addTo(map);
    
    // Manual search input handler
    const searchInput = document.getElementById('location_search');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value;
            
            if (query) {
                geocoder.geocode(query, function(results) {
                    if (results && results.length > 0) {
                        const result = results[0];
                        const latlng = result.center;
                        
                        // Remove existing marker if any
                        if (marker) {
                            map.removeLayer(marker);
                        }
                        
                        // Add new marker
                        marker = L.marker(latlng).addTo(map);
                        map.setView(latlng, 16);
                        
                        // Update hidden fields
                        document.getElementById('map_latitude').value = latlng.lat;
                        document.getElementById('map_longitude').value = latlng.lng;
                        document.getElementById('map_place_name').value = result.name;
                        
                        // Update search input
                        searchInput.value = result.name;
                    } else {
                        alert('Location not found. Please try a different search term.');
                    }
                });
            }
        }
    });
    
    // Allow clicking on map to set location
    map.on('click', function(e) {
        const latlng = e.latlng;
        
        // Remove existing marker if any
        if (marker) {
            map.removeLayer(marker);
        }
        
        // Add new marker
        marker = L.marker(latlng).addTo(map);
        
        // Update hidden fields
        document.getElementById('map_latitude').value = latlng.lat;
        document.getElementById('map_longitude').value = latlng.lng;
        
        // Reverse geocode to get place name
        geocoder.reverse(latlng, map.options.crs.scale(map.getZoom()), function(results) {
            if (results && results.length > 0) {
                const placeName = results[0].name;
                document.getElementById('map_place_name').value = placeName;
                document.getElementById('location_search').value = placeName;
            }
        });
    });
}

// Setup map method toggle
function setupMapMethodToggle() {
    const searchRadio = document.getElementById('map_method_search');
    const embedRadio = document.getElementById('map_method_embed');
    const searchSection = document.getElementById('map_search_section');
    const embedSection = document.getElementById('map_embed_section');
    const locationSearchInput = document.getElementById('location_search');
    const embedUrlInput = document.getElementById('google_maps_embed_url');
    
    function toggleMapMethod() {
        if (searchRadio.checked) {
            searchSection.style.display = 'block';
            embedSection.style.display = 'none';
            locationSearchInput.required = true;
            embedUrlInput.required = false;
            
            // Reinitialize map if needed
            if (map) {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        } else {
            searchSection.style.display = 'none';
            embedSection.style.display = 'block';
            locationSearchInput.required = false;
            embedUrlInput.required = true;
        }
    }
    
    searchRadio.addEventListener('change', toggleMapMethod);
    embedRadio.addEventListener('change', toggleMapMethod);
    
    // Initial state
    toggleMapMethod();
}

// Setup Google Maps embed preview
function setupEmbedPreview() {
    const embedUrlInput = document.getElementById('google_maps_embed_url');
    const embedPreview = document.getElementById('embed_preview');
    
    embedUrlInput.addEventListener('input', function() {
        let url = this.value.trim();
        
        if (url) {
            let embedUrl = url;
            
            // Check if it's a coordinate-based URL like: https://www.google.com/maps?q=-12.8088501,28.214301&z=15&output=embed
            if (url.includes('google.com/maps?q=') && url.includes('output=embed')) {
                // Already in embed format, use as is
                embedUrl = url;
            }
            // Check if it's a coordinate URL without output=embed
            else if (url.includes('google.com/maps?q=') || url.includes('google.com/maps/@')) {
                // Add output=embed if not present
                if (!url.includes('output=embed')) {
                    embedUrl = url + (url.includes('?') ? '&' : '?') + 'output=embed';
                }
            }
            // Check if it's already an embed URL
            else if (url.includes('google.com/maps/embed')) {
                embedUrl = url;
            }
            // Check if it's a place URL
            else if (url.includes('google.com/maps/place/')) {
                // Convert place URL to embed format
                embedUrl = url.replace('/maps/place/', '/maps/embed/v1/place?key=&q=');
            }
            // Check for shortened URLs
            else if (url.includes('goo.gl/maps') || url.includes('maps.app.goo.gl')) {
                embedPreview.innerHTML = '<p style="color: #ff9800;">⚠️ Shortened URLs need to be expanded. Please use the full Google Maps URL.</p>';
                return;
            }
            
            // Validate it's a Google Maps URL
            if (embedUrl.includes('google.com/maps')) {
                // Create iframe for preview
                embedPreview.innerHTML = `
                    <iframe 
                        src="${embedUrl}" 
                        width="100%" 
                        height="100%" 
                        style="border:0; border-radius: 8px;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                `;
                
                // Update the input with the proper embed URL
                if (embedUrl !== url) {
                    this.value = embedUrl;
                }
            } else {
                embedPreview.innerHTML = '<p style="color: #e74c3c;">❌ Invalid Google Maps URL. Please paste a valid Google Maps link.</p>';
            }
        } else {
            embedPreview.innerHTML = '<p style="color: #999;">Paste Google Maps URL above to see preview</p>';
        }
    });
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('weddingEventForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Build multipart FormData from the form (includes repeater fields and files)
        const formData = new FormData(form);
        
        // Map field names to match backend expectations
        const fieldMappings = {
            'eventType': 'event_type_id',
            'eventTitle': 'event_title',
            'eventDate': 'event_date',
            'eventLocation': 'event_location',
            'brideName': 'bride_name',
            'groomName': 'groom_name',
            'venueName': 'venue_name',
            'ceremonyTime': 'ceremony_time'
        };
        
        // Create a new FormData with mapped field names
        const mappedFormData = new FormData();
        for (let [key, value] of formData.entries()) {
            // Use mapped name if it exists, otherwise use original key
            const newKey = fieldMappings[key] || key;
            if (value !== '') {  // Only add non-empty values
                mappedFormData.append(newKey, value);
            }
        }
        
        // Log the final form data being sent
        console.log('Mapped Form Data:');
        for (let [key, value] of mappedFormData.entries()) {
            console.log(`${key}:`, value);
        }

        // Ensure map method is included and mutually consistent
        const mapMethod = (form.querySelector('input[name="map_method"]:checked') || {}).value || 'search';
        formData.set('map_method', mapMethod);

        // When using embed method, clear coordinate fields to avoid backend confusion
        if (mapMethod === 'embed') {
            formData.delete('map_latitude');
            formData.delete('map_longitude');
            formData.delete('map_place_name');
            formData.delete('map_formatted_address');
        } else {
            // If using search method, clear embed URL
            formData.delete('google_maps_embed_url');
        }

        // Disable submit while sending
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        // Debug: Log form data
        console.log('Form Data Entries:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const res = await fetch(`${API_URL}/api/wedding-events/`, {
                method: 'POST',
                body: mappedFormData,  // Use the mapped form data
            });

            const isJson = res.headers.get('content-type')?.includes('application/json');
            const payload = isJson ? await res.json() : await res.text();

            if (!res.ok) {
                console.error('Submission failed:', payload);
                
                let errorMessage = 'Please fix the following errors:\n\n';
                let hasErrors = false;
                
                // Handle validation errors
                if (res.status === 400) {
                    // Handle field-specific errors
                    if (payload.details && typeof payload.details === 'object') {
                        hasErrors = true;
                        for (const [field, errors] of Object.entries(payload.details)) {
                            const fieldLabel = field.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ') + ':';
                            errorMessage += `• ${fieldLabel} ${Array.isArray(errors) ? errors.join(', ') : errors}\n`;
                        }
                    }
                    
                    // Add required fields if provided
                    if (payload.required_fields && payload.required_fields.length > 0) {
                        if (hasErrors) errorMessage += '\n';
                        errorMessage += 'Required fields that need attention:\n';
                        errorMessage += payload.required_fields.map(field => 
                            `• ${field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`
                        ).join('\n');
                        hasErrors = true;
                    }
                }
                
                if (hasErrors) {
                    alert(errorMessage);
                } else {
                    // Fallback to generic error if no specific errors found
                    alert(payload.error || 'Failed to create wedding event. Please review your inputs and try again.');
                }
                return;
            }

            // Success handling
            console.log('Submission success:', payload);
            alert('Wedding event created successfully!');

            // If backend returns a URL, offer to navigate
            const eventUrl = (payload && (payload.event_url || payload.url)) || null;
            if (eventUrl && confirm('Open the event page now?')) {
                window.open(eventUrl, '_blank');
            }

            // Optionally reset the form
            form.reset();
        } catch (err) {
            console.error('Network or server error:', err);
            alert('An error occurred while submitting. Please check your network and try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Download JSON file
function downloadJSON(data, filename) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
