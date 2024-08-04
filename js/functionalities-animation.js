const allButton = document.getElementById('allButton');
		const filterButtons = document.querySelectorAll('.filter-button-group button');
		const galleryGrids = document.querySelectorAll('.gallery-grid');

		// Add the active class to all galleryGrids initially
		galleryGrids.forEach(function(grid) {
			grid.classList.add('active');
			grid.style.transition = 'all 1s ease-in-out';
		});

		filterButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			if (button === allButton) {
			galleryGrids.forEach(function(grid) {
				grid.classList.add('active');
			});
			} else {
			galleryGrids.forEach(function(grid) {
				grid.classList.remove('active');
				grid.style.transition = 'all 1s ease-in-out';
			});
			}
		});
		});


