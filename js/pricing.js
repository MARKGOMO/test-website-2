const checkbox = document.querySelector('.pricecheckbox');

  checkbox.addEventListener('change', function() {
    const priceTags = document.querySelectorAll('.price');
    const packageDurations = document.querySelectorAll('.package-duration');

    if (this.checked) {
      priceTags.forEach(tag => {
        if (tag.classList.contains('pricestand')) {
          tag.innerHTML = '<sup class="pesosign">₱</sup>4,860<sup style="font-size: 0.3em;">/VEHICLE</sup>';
        } else if (tag.classList.contains('priceent')) {
            tag.innerHTML = '<sup class="pesosign">₱</sup>3,850<sup style="font-size: 0.3em;">/VEHICLE</sup>';
          } else if (tag.classList.contains('priceindv')) {
                tag.innerHTML = '<sup class="pesosign">₱</sup>5,400<sup style="font-size: 0.3em;">/VEHICLE</sup>';
            }
      });

      packageDurations.forEach(duration => {
        duration.textContent = 'annual';
      });
    } else {
      priceTags.forEach(tag => {
        if (tag.classList.contains('pricestand')) {
          tag.innerHTML = '<sup class="pesosign">₱</sup>450<sup style="font-size: 0.3em;">/VEHICLE</sup>';
        } else if (tag.classList.contains('priceent')) {
          tag.innerHTML = '<sup class="pesosign">₱</sup>350<sup style="font-size: 0.3em;">/VEHICLE</sup>';
        } else if (tag.classList.contains('priceindv')) {
            tag.innerHTML = '<sup class="pesosign">₱</sup>500<sup style="font-size: 0.3em;">/VEHICLE</sup>';
        }
      });

      packageDurations.forEach(duration => {
        duration.textContent = 'monthly';
      });
    }
  });