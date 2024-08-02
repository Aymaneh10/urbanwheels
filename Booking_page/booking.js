document.addEventListener('DOMContentLoaded', function () {
    const pickupDate = document.getElementById('pickup_date');
    const pickupTime = document.getElementById('pickup_time');
    const dropoffDate = document.getElementById('Dropoff_date');
    const dropoffTime = document.getElementById('Dropoff_time');

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
  function resetFilters() {
    document.getElementById('vehicleFilterForm').reset();
    // Optionally, you can also clear the vehicle results when filters are reset
    document.getElementById('vehicleResults').innerHTML = '';
}
