document.addEventListener('DOMContentLoaded', function () {
  const pickupDate = document.getElementById('pickup-date');
  const pickupTime = document.getElementById('pickup-time');
  const dropoffDate = document.getElementById('dropoff-date');
  const dropoffTime = document.getElementById('dropoff-time');

  function validateDropoff() {
    const pickupDateTime = new Date(pickupDate.value + 'T' + pickupTime.value);
    const dropoffDateTime = new Date(dropoffDate.value + 'T' + dropoffTime.value);

    if (dropoffDateTime <= pickupDateTime) {
      dropoffDate.setCustomValidity('Dropoff date and time must be after pickup date and time.');
    } else {
      dropoffDate.setCustomValidity('');
    }
  }

  pickupDate.addEventListener('change', validateDropoff);
  pickupTime.addEventListener('change', validateDropoff);
  dropoffDate.addEventListener('change', validateDropoff);
  dropoffTime.addEventListener('change', validateDropoff);
});
document.getElementById('vehicleFilterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  filterVehicles();
});

document.getElementById('resetFilters').addEventListener('click', function() {
  resetFilters();
});

function filterVehicles() {
  const formData = new FormData(document.getElementById('vehicleFilterForm'));

  fetch('filterVehicles.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      displayFilteredVehicles(data);
  })
  .catch(error => console.error('Error:', error));
}

function resetFilters() {
  document.getElementById('vehicleFilterForm').reset();
  document.getElementById('vehicleResults').innerHTML = '';
}

function displayFilteredVehicles(vehicles) {
  const vehicleResults = document.getElementById('vehicleResults');
  vehicleResults.innerHTML = '';

  if (vehicles.length === 0) {
      vehicleResults.innerHTML = '<p>No vehicles found matching the criteria.</p>';
      return;
  }

  vehicles.forEach(vehicle => {
      const vehicleCard = document.createElement('div');
      vehicleCard.classList.add('vehicle-card');
      vehicleCard.innerHTML = `
          <img src="${vehicle.image}" alt="${vehicle.name}">
          <h3>${vehicle.name}</h3>
          <p>Type: ${vehicle.type}</p>
          <p>Brand: ${vehicle.brand}</p>
          <p>Price: $${vehicle.price} per day</p>
          <p>Features: ${vehicle.features}</p>
          <p>Passenger Capacity: ${vehicle.passenger_capacity}</p>
          <p>Availability: ${vehicle.availability}</p>
          <p>Rental Period: ${vehicle.rental_period}</p>
          <p>Pickup Location: ${vehicle.pickup_location}</p>
      `;
      vehicleResults.appendChild(vehicleCard);
  });
}